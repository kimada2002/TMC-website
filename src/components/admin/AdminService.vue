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

    <hr />

    <div class="service-list">
      <div v-for="item in services" :key="item.id" class="service-card">
        <img :src="item.imageUrl" alt="Service" width="80" />
        <div>
          <p><strong>{{ item.title.vi }}</strong></p>
          <p>{{ item.description.vi }}</p>
        </div>
        <button @click="editService(item)">Sửa</button>
        <button @click="deleteService(item.id)">Xoá</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
import { translateText } from "@/utils/translate"; // 🔥

const services = ref([]);
const isEditing = ref(false);
const editingId = ref(null);
const imageFile = ref(null);

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

  if (imageFile.value) {
    const imgRef = storageRef(
      storage,
      `service-icons/${Date.now()}_${imageFile.value.name}`
    );
    const snapshot = await uploadBytes(imgRef, imageFile.value);
    imageUrl = await getDownloadURL(snapshot.ref);
  }

  const translatedTitle = await translateText(form.value.title.vi, "en");
  const translatedDescription = await translateText(
    form.value.description.vi,
    "en"
  );

  const serviceData = {
    imageUrl,
    title: { vi: form.value.title.vi, en: translatedTitle },
    description: { vi: form.value.description.vi, en: translatedDescription },
  };

  await addDoc(collection(db, "services"), serviceData);

  resetForm();
  fetchServices();
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

  if (imageFile.value) {
    const imgRef = storageRef(
      storage,
      `service-icons/${Date.now()}_${imageFile.value.name}`
    );
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
  const translatedDescription = await translateText(
    form.value.description.vi,
    "en"
  );

  const updatedData = {
    imageUrl,
    title: { vi: form.value.title.vi, en: translatedTitle },
    description: { vi: form.value.description.vi, en: translatedDescription },
  };

  await updateDoc(doc(db, "services", editingId.value), updatedData);

  resetForm();
  fetchServices();
};

const deleteService = async (id) => {
  const item = services.value.find((s) => s.id === id);
  if (item?.imageUrl) {
    const imageRef = storageRef(storage, item.imageUrl);
    try {
      await deleteObject(imageRef);
    } catch (e) {
      console.warn("Không tìm thấy ảnh để xoá:", e.message);
    }
  }

  await deleteDoc(doc(db, "services", id));
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

onMounted(fetchServices);
</script>

<style scoped>
.admin-services {
  padding: 20px;
  max-width: 900px;
  margin: auto;
}

.form-section {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.service-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
</style>
