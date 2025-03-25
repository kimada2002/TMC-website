<template>
  <div class="gallery-container">
    <h2>Hình Ảnh</h2>

    <!-- Upload Button -->
    <label class="upload-label">
      <input type="file" @change="handleImageUpload" accept="image/*" hidden />
      <span class="upload-button">Tải Ảnh Lên</span>
    </label>

    <!-- Image Grid -->
    <div v-if="paginatedImages.length" class="image-grid">
      <div v-for="image in paginatedImages" :key="image.id" class="image-card">
        <img
          :src="image.url"
          alt="Uploaded Image"
          class="image"
          @click="openImageModal(image.url)"
        />
        <button @click="confirmImageDeletion(image.id)" class="delete-button">
          Delete
        </button>
      </div>
    </div>

    <p v-else class="empty-message">Hiện tại không có ảnh nào...</p>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">
        Trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">
        Sau
      </button>
    </div>

    <!-- Image Preview Modal -->
    <div v-if="isModalOpen" class="modal" @click="closeImageModal">
      <div class="modal-content">
        <img :src="modalImageUrl" alt="Large Preview" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Firebase Initialization
const db = getFirestore();
const storage = getStorage();
const imagesCollection = collection(db, "images");

// Component State
const images = ref([]);
const currentPage = ref(1);
const isModalOpen = ref(false);
const modalImageUrl = ref("");
const IMAGES_PER_PAGE = 4;

// Computed Properties
const totalPages = computed(() =>
  Math.ceil(images.value.length / IMAGES_PER_PAGE)
);

const paginatedImages = computed(() => {
  const startIndex = (currentPage.value - 1) * IMAGES_PER_PAGE;
  return images.value.slice(startIndex, startIndex + IMAGES_PER_PAGE);
});

// Lifecycle Hooks
onMounted(() => {
  fetchImages();
});

// Methods
const fetchImages = async () => {
  try {
    const querySnapshot = await getDocs(imagesCollection);
    images.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      url: doc.data().url,
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    showErrorToast("Lỗi khi tải ảnh.");
  }
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    // Upload to Storage
    const fileRef = storageRef(storage, `images/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(fileRef);

    // Save to Firestore
    await addDoc(imagesCollection, { url: downloadUrl });

    // Update local state
    images.value.push({ id: fileRef.fullPath, url: downloadUrl });
    showSuccessToast("Hình ảnh đã được tải lên thành công!");
  } catch (error) {
    console.error("Tải lên bị lỗi:", error);
    showErrorToast("Lỗi khi tải lên hình ảnh");
  }
};

const confirmImageDeletion = (imageId) => {
  Swal.fire({
    title: "Bạn muốn xóa ảnh này?",
    text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Xóa",
    cancelButtonText: "Đóng",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteImage(imageId);
    }
  });
};

const deleteImage = async (imageId) => {
  try {
    // Get image document from Firestore
    const imageDocRef = doc(db, "images", imageId);
    const imageDoc = await getDoc(imageDocRef);

    if (!imageDoc.exists()) {
      throw new Error("Hình ảnh không có trong dữ liệu");
    }

    // Extract file path from URL
    const imageUrl = imageDoc.data().url;
    const filePath = decodeURIComponent(
      imageUrl.split("images%2F")[1].split("?")[0]
    );

    // Delete from Storage
    const fileRef = storageRef(storage, `images/${filePath}`);
    await deleteObject(fileRef);

    // Delete from Firestore
    await deleteDoc(imageDocRef);

    // Update local state
    images.value = images.value.filter((image) => image.id !== imageId);
    showSuccessToast("Xóa ảnh thành công!");
  } catch (error) {
    console.error("Deletion error:", error);
    showErrorToast("Lỗi khi xóa ảnh!");
  }
};

const openImageModal = (url) => {
  modalImageUrl.value = url;
  isModalOpen.value = true;
};

const closeImageModal = () => {
  isModalOpen.value = false;
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const showSuccessToast = (message) => {
  Swal.fire("Thành công!", message, "success");
};

const showErrorToast = (message) => {
  Swal.fire("Lỗi!", message, "error");
};
</script>

<style scoped>
.gallery-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.upload-label {
  display: inline-block;
  cursor: pointer;
  margin-bottom: 1rem;
}

.upload-button {
  display: inline-block;
  background: #4a89dc;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.upload-button:hover {
  background: #3b7dd8;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.25rem;
  margin: 2rem 0;
}

.image-card {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.image-card:hover {
  transform: translateY(-4px);
}

.image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

.delete-button {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(231, 76, 60, 0.9);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-button:hover {
  background: #e74c3c;
}

.empty-message {
  color: #666;
  font-style: italic;
  margin: 2rem 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background: #4a89dc;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background: #3b7dd8;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}
</style>