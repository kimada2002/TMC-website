<template>
    <button @click="showAddForm">Thêm thông tin mới</button>
  <div class="admin-about">

    <h2>Danh sách About Us đã có</h2>
    <div v-if="aboutUsList.length === 0">Không có dữ liệu.</div>
    <ul class="aboutus-list">
      <li v-for="item in aboutUsList" :key="item.id">
        <strong>{{ item.title }}</strong>
        <p>{{ item.content }}</p>
        <button @click="editAboutUs(item)">Sửa</button>
        <button @click="deleteAboutUs(item.id)">Xóa</button>
      </li>
    </ul>

    <hr class="divider" />

    <!-- Nút thêm mới sẽ hiển thị modal -->

    <!-- Modal Thêm Mới -->
    <div
      v-if="isAddMode || isEditMode"
      class="modal-overlay"
      @click="closeModal"
    >
      <div class="modal-content" @click.stop>
        <h2>{{ isEditMode ? "Chỉnh sửa About Us" : "Thêm mới About Us" }}</h2>

        <div class="form-group">
          <label>Tiêu đề</label>
          <input v-model="title" type="text" />
        </div>

        <div class="form-group">
          <label>Nội dung</label>
          <textarea v-model="content" rows="8"></textarea>
        </div>

        <button @click="saveAboutUs">
          {{ isEditMode ? "Cập nhật" : "Lưu" }}
        </button>
        <button @click="closeModal" class="cancel-btn">Hủy</button>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

const title = ref("");
const content = ref("");
const successMessage = ref("");
const aboutUsList = ref([]);
const isEditMode = ref(false);
const isAddMode = ref(false); // Chế độ thêm mới
const currentEditId = ref(null);

const fetchAboutUs = async () => {
  const querySnapshot = await getDocs(collection(db, "aboutus"));
  aboutUsList.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const saveAboutUs = async () => {
  try {
    if (isEditMode.value) {
      await setDoc(doc(db, "aboutus", currentEditId.value), {
        title: title.value,
        content: content.value,
      });
      successMessage.value = "Cập nhật thành công!";
    } else {
      const docRef = doc(collection(db, "aboutus"));
      await setDoc(docRef, {
        title: title.value,
        content: content.value,
      });
      successMessage.value = "Đã lưu thành công!";
    }

    title.value = "";
    content.value = "";
    isEditMode.value = false;
    isAddMode.value = false;

    await fetchAboutUs();

    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu:", error);
  }
};

const editAboutUs = (item) => {
  isEditMode.value = true;
  isAddMode.value = false;
  currentEditId.value = item.id;
  title.value = item.title;
  content.value = item.content;
};

const deleteAboutUs = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    try {
      await deleteDoc(doc(db, "aboutus", id));
      successMessage.value = "Đã xóa thành công!";
      fetchAboutUs();
      setTimeout(() => (successMessage.value = ""), 3000);
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
    }
  }
};

const showAddForm = () => {
  isAddMode.value = true;
  isEditMode.value = false;
};

const closeModal = () => {
  isAddMode.value = false;
  isEditMode.value = false;
};

onMounted(fetchAboutUs);
</script>
  
  <style scoped>
.admin-about {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
}

.aboutus-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.aboutus-list li {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #0056b3;
}

.success {
  margin-top: 15px;
  color: green;
}

.divider {
  margin: 30px 0;
  border: none;
  border-top: 1px solid #ccc;
}

.form-container {
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.cancel-btn {
  background: #f44336;
}

.cancel-btn:hover {
  background: #d32f2f;
}
</style>
  