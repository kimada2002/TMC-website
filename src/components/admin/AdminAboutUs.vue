<template>
  <div class="admin-about">
    <h2>Quản lý About Us</h2>

    <div class="form-section">
      <input type="file" @change="handleImageChange" />
      <input v-model="form.title.vi" placeholder="Tiêu đề (Tiếng Việt)" />
      <textarea
        v-model="form.description.vi"
        placeholder="Mô tả (Tiếng Việt)"
        rows="5"
      ></textarea>
      <input
        v-model.number="form.order"
        type="number"
        placeholder="Thứ tự (STT)"
      />

      <button @click="isEditing ? updateAbout() : addAbout()">
        {{ isEditing ? "Cập nhật" : "Thêm mới" }}
      </button>
      <button v-if="isEditing" @click="resetForm">Huỷ</button>
    </div>

    <h2>Danh Sách</h2>

    <div class="about-list">
      <div v-for="item in paginatedAboutList" :key="item.id" class="about-card">
        <img :src="item.imageUrl" alt="About Image" width="80" />
        <div>
          <p>
            <strong>STT: {{ item.order ?? "N/A" }}</strong>
          </p>
          <p>
            <strong>VIE: {{ item.title.vi }}</strong> /
            <strong>ENG: {{ item.title.en }}</strong>
          </p>
          <p>VIE: {{ item.description.vi }}</p>
          <p>ENG: {{ item.description.en }}</p>
        </div>
        <div class="action-buttons">
          <button @click="editAbout(item)">Sửa</button>
          <button @click="deleteAbout(item.id)">Xoá</button>
        </div>
      </div>

      <!-- PHÂN TRANG -->
      <div class="pagination" v-if="totalPages > 1">
        <button @click="currentPage--" :disabled="currentPage === 1">
          « Trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages">
          Tiếp »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
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

// State
const aboutList = ref([]);
const isEditing = ref(false);
const editingId = ref(null);
const imageFile = ref(null);

const form = ref({
  imageUrl: "",
  title: { vi: "", en: "" },
  description: { vi: "", en: "" },
  order: null,
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 2;

const aboutListSorted = computed(() =>
  [...aboutList.value].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
);
const totalPages = computed(() =>
  Math.ceil(aboutListSorted.value.length / itemsPerPage)
);
const paginatedAboutList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return aboutListSorted.value.slice(start, start + itemsPerPage);
});

// Fetch dữ liệu
const fetchAbouts = async () => {
  const querySnapshot = await getDocs(collection(db, "aboutus"));
  aboutList.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const handleImageChange = (e) => {
  imageFile.value = e.target.files[0];
};

const uploadImage = async () => {
  try {
    if (!imageFile.value) return "";
    const imgRef = storageRef(
      storage,
      `aboutus/${Date.now()}_${imageFile.value.name}`
    );
    const snapshot = await uploadBytes(imgRef, imageFile.value);
    const imageUrl = await getDownloadURL(snapshot.ref);
    return imageUrl;
  } catch (error) {
    console.error("Upload ảnh thất bại:", error);
    await Swal.fire({
      icon: "error",
      title: "Lỗi upload ảnh!",
      text: error.message || "Đã có lỗi khi tải ảnh lên.",
    });
    throw error; // chặn xử lý tiếp nếu lỗi
  }
};

const addAbout = async () => {
  try {
    const imageUrl = await uploadImage();

    const translatedTitle = await translateText(form.value.title.vi, "en");
    const translatedDescription = await translateText(
      form.value.description.vi,
      "en"
    );

    const aboutData = {
      imageUrl,
      title: { vi: form.value.title.vi, en: translatedTitle },
      description: { vi: form.value.description.vi, en: translatedDescription },
      order: form.value.order ?? 9999,
    };

    await addDoc(collection(db, "aboutus"), aboutData);
    resetForm();
    await fetchAbouts();

    Swal.fire({
      icon: "success",
      title: "Thêm mới thành công!",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    // uploadImage đã hiển thị thông báo lỗi, không cần thêm ở đây
  }
};

const editAbout = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  form.value = {
    imageUrl: item.imageUrl || "",
    title: { vi: item.title?.vi || "", en: item.title?.en || "" },
    description: {
      vi: item.description?.vi || "",
      en: item.description?.en || "",
    },
    order: item.order ?? null,
  };
  imageFile.value = null;
};

const updateAbout = async () => {
  if (!editingId.value) return;

  const currentAbout = aboutList.value.find((a) => a.id === editingId.value);
  if (!currentAbout) return;

  try {
    let imageUrl = currentAbout.imageUrl;

    if (imageFile.value) {
      imageUrl = await uploadImage();

      // Xoá ảnh cũ
      if (currentAbout.imageUrl) {
        try {
          const oldImageRef = storageRef(storage, currentAbout.imageUrl);
          await deleteObject(oldImageRef);
        } catch (e) {
          console.warn("Không thể xoá ảnh cũ:", e.message);
        }
      }
    }

    const translatedTitle = await translateText(form.value.title.vi, "en");
    const translatedDescription = await translateText(
      form.value.description.vi,
      "en"
    );

    const updatedData = {
      imageUrl,
      title: { vi: form.value.title.vi, en: translatedTitle },
      description: { vi: form.value.description.vi, en: translatedDescription },
      order: form.value.order ?? 9999,
    };

    await updateDoc(doc(db, "aboutus", editingId.value), updatedData);
    resetForm();
    await fetchAbouts();

    Swal.fire({
      icon: "success",
      title: "Cập nhật thành công!",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    // lỗi upload đã được xử lý ở uploadImage()
  }
};

const deleteAbout = async (id) => {
  const result = await Swal.fire({
    title: "Bạn có chắc chắn muốn xoá?",
    text: "Thao tác này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xoá",
    cancelButtonText: "Huỷ",
  });

  if (result.isConfirmed) {
    const item = aboutList.value.find((a) => a.id === id);
    if (item?.imageUrl) {
      try {
        const imageRef = storageRef(storage, item.imageUrl);
        await deleteObject(imageRef);
      } catch (e) {
        console.warn("Không tìm thấy ảnh để xoá:", e.message);
      }
    }

    await deleteDoc(doc(db, "aboutus", id));
    await fetchAbouts();

    Swal.fire({
      icon: "success",
      title: "Đã xoá thành công!",
      timer: 1500,
      showConfirmButton: false,
    });
  }
};

const resetForm = () => {
  form.value = {
    imageUrl: "",
    title: { vi: "", en: "" },
    description: { vi: "", en: "" },
    order: null,
  };
  imageFile.value = null;
  isEditing.value = false;
  editingId.value = null;
};

onMounted(fetchAbouts);
</script>

<style scoped>
.admin-about {
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

.form-section button:nth-child(2) {
  background-color: #f44336;
}

.form-section button:nth-child(2):hover {
  background-color: #d32f2f;
}

.about-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-card {
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

.about-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.about-card div {
  flex: 1;
}

.about-card p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

.about-card strong {
  font-weight: 600;
  color: #222;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: 16px;
  right: 16px;
}

.action-buttons button {
  padding: 6px 10px;
  font-size: 13px;
  background-color: #2196f3;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.action-buttons button:hover {
  background-color: #1976d2;
}

.action-buttons button:nth-child(2) {
  background-color: #f44336;
}

.action-buttons button:nth-child(2):hover {
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
