<template>
  <div class="admin-services">
    <h2>Quản lý Services</h2>

    <div class="form-section">
      <input type="file" @change="handleImageChange" />
      <input v-model="form.title.vi" placeholder="Tiêu đề (Tiếng Việt)" />
      <input v-model="form.description.vi" placeholder="Mô tả (Tiếng Việt)" />

      <button @click="isEditing ? updateService() : addService()">
        {{ isEditing ? "Cập nhật" : "Thêm mới" }}
      </button>
      <button v-if="isEditing" @click="resetForm">Huỷ</button>
    </div>

    <h2>Danh Sách</h2>

    <div class="service-list">
      <div
        v-for="item in paginatedServices"
        :key="item.id"
        class="service-card"
      >
        <img :src="item.imageUrl" alt="Service" width="80" />
        <div>
          <p><strong>{{ item.title.vi }}</strong></p>
          <p>{{ item.description.vi }}</p>
        </div>
        <button @click="editService(item)">Sửa</button>
        <button @click="confirmDelete(item.id)">Xoá</button>
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button @click="currentPage--" :disabled="currentPage === 1">« Trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages">Tiếp »</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { db, storage } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { translateText } from "@/utils/translate";
import Swal from "sweetalert2";

const services = ref([]);
const isEditing = ref(false);
const editingId = ref(null);
const imageFile = ref(null);
const currentPage = ref(1);
const perPage = 2;

const form = ref({
  imageUrl: "",
  title: { vi: "", en: "" },
  description: { vi: "", en: "" },
});

const fetchServices = async () => {
  const querySnapshot = await getDocs(collection(db, "services"));
  services.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const handleImageChange = (e) => {
  imageFile.value = e.target.files[0];
};

const addService = async () => {
  let imageUrl = "";

  try {
    if (imageFile.value) {
      const imgRef = storageRef(storage, `service-icons/${Date.now()}_${imageFile.value.name}`);
      const snapshot = await uploadBytes(imgRef, imageFile.value);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const translatedTitle = await translateText(form.value.title.vi, "en");
    const translatedDescription = await translateText(form.value.description.vi, "en");

    const serviceData = {
      imageUrl,
      title: { vi: form.value.title.vi, en: translatedTitle },
      description: { vi: form.value.description.vi, en: translatedDescription },
    };

    await addDoc(collection(db, "services"), serviceData);
    await Swal.fire("Thành công", "Đã thêm mới dịch vụ!", "success");

    resetForm();
    fetchServices();
  } catch (err) {
    await Swal.fire("Lỗi", "Không thể upload ảnh hoặc thêm dịch vụ", "error");
  }
};

const editService = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  form.value = {
    imageUrl: item.imageUrl || "",
    title: { vi: item.title?.vi || "", en: item.title?.en || "" },
    description: {
      vi: item.description?.vi || "",
      en: item.description?.en || "",
    },
  };
  imageFile.value = null;
};

const updateService = async () => {
  if (!editingId.value) return;

  const currentService = services.value.find((s) => s.id === editingId.value);
  if (!currentService) return;

  let imageUrl = currentService.imageUrl;

  try {
    if (imageFile.value) {
      const imgRef = storageRef(storage, `service-icons/${Date.now()}_${imageFile.value.name}`);
      const snapshot = await uploadBytes(imgRef, imageFile.value);
      imageUrl = await getDownloadURL(snapshot.ref);

      if (currentService.imageUrl) {
        try {
          const oldImageRef = storageRef(storage, currentService.imageUrl);
          await deleteObject(oldImageRef);
        } catch (e) {
          console.warn("Không tìm thấy ảnh cũ để xoá:", e.message);
        }
      }
    }

    const translatedTitle = await translateText(form.value.title.vi, "en");
    const translatedDescription = await translateText(form.value.description.vi, "en");

    const updatedData = {
      imageUrl,
      title: { vi: form.value.title.vi, en: translatedTitle },
      description: { vi: form.value.description.vi, en: translatedDescription },
    };

    await updateDoc(doc(db, "services", editingId.value), updatedData);
    await Swal.fire("Cập nhật thành công", "Dịch vụ đã được cập nhật!", "success");

    resetForm();
    fetchServices();
  } catch (err) {
    await Swal.fire("Lỗi", "Không thể upload ảnh hoặc cập nhật dịch vụ", "error");
  }
};

const confirmDelete = async (id) => {
  const result = await Swal.fire({
    title: "Bạn có chắc muốn xoá?",
    text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xoá",
    cancelButtonText: "Huỷ",
  });

  if (result.isConfirmed) {
    await deleteService(id);
  }
};

const deleteService = async (id) => {
  const item = services.value.find((s) => s.id === id);
  if (item?.imageUrl) {
    try {
      const imageRef = storageRef(storage, item.imageUrl);
      await deleteObject(imageRef);
    } catch (e) {
      console.warn("Không tìm thấy ảnh để xoá:", e.message);
    }
  }

  await deleteDoc(doc(db, "services", id));
  await Swal.fire("Đã xoá", "Dịch vụ đã được xoá.", "success");
  fetchServices();
};

const resetForm = () => {
  form.value = {
    imageUrl: "",
    title: { vi: "", en: "" },
    description: { vi: "", en: "" },
  };
  imageFile.value = null;
  isEditing.value = false;
  editingId.value = null;
};

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return services.value.slice(start, start + perPage);
});

const totalPages = computed(() => {
  return Math.ceil(services.value.length / perPage);
});

onMounted(fetchServices);
</script>

<style scoped>
.admin-services {
  padding: 32px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 28px;
  color: #333;
}

.form-section {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-section input,
.form-section textarea {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  width: 100%;
}

.form-section input[type="file"] {
  border: none;
}

.form-section button {
  padding: 10px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
  width: fit-content;
}

.form-section button:hover {
  background-color: #45a049;
}

.form-section button:nth-child(4) {
  background-color: #f44336;
}

.form-section button:nth-child(4):hover {
  background-color: #d32f2f;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.service-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: relative;
}

.service-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.service-card div {
  flex: 1;
}

.service-card p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

.service-card strong {
  font-weight: 600;
  color: #222;
}

.service-card button {
  padding: 6px 10px;
  font-size: 13px;
  background-color: #2196f3;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: 8px;
}

.service-card button:hover {
  background-color: #1976d2;
}

.service-card button:nth-child(4) {
  background-color: #f44336;
}

.service-card button:nth-child(4):hover {
  background-color: #d32f2f;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.pagination button {
  padding: 6px 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 15px;
  color: #333;
}
</style>
