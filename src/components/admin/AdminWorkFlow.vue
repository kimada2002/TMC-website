<template>
  <div class="admin-workflow">
    <h2>Quản lý WorkFlow</h2>

    <!-- Form thêm hoặc chỉnh sửa -->
    <div class="form-section">
      <input type="file" @change="handleImageChange" />
      <input v-model="form.stepNumber" type="number" placeholder="Số bước" />
      <input
        v-model="form.stepTitle.vi"
        placeholder="Tiêu đề bước (Tiếng Việt)"
      />

      <!-- Các chi tiết bước -->
      <div v-for="(detail, index) in form.stepDetails" :key="index">
        <input v-model="detail.vi" placeholder="Chi tiết bước (Tiếng Việt)" />
      </div>

      <button @click="addDetail">+ Thêm chi tiết</button>
      <br />

      <!-- Nút lưu -->
      <button @click="isEditing ? updateWorkflow() : addWorkflow()">
        {{ isEditing ? "Cập nhật" : "Thêm mới" }}
      </button>
      <button v-if="isEditing" @click="resetForm">Huỷ</button>
    </div>

    <h2>Danh Sách</h2>

    <!-- Danh sách workflow -->
    <div class="workflow-list">
      <div
        v-for="item in paginatedWorkflows"
        :key="item.id"
        class="workflow-card"
      >
        <img :src="item.imageUrl" alt="icon" width="50" />
        <div>
          <p>
            <strong>Bước {{ item.stepNumber }}</strong> -
            {{ item.stepTitle?.vi || "" }}
          </p>
          <ul>
            <li v-for="(d, i) in item.stepDetails" :key="i">{{ d.vi }}</li>
          </ul>
        </div>
        <button @click="editWorkflow(item)">Sửa</button>
        <button @click="confirmDelete(item.id)">Xoá</button>
      </div>
    </div>

    <!-- Phân trang -->
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

const workflows = ref([]);
const isEditing = ref(false);
const editingId = ref(null);
const imageFile = ref(null);
const currentPage = ref(1);
const itemsPerPage = 2;

const form = ref({
  imageUrl: "",
  stepNumber: 1,
  stepTitle: { vi: "", en: "" },
  stepDetails: [],
});

const fetchWorkflows = async () => {
  const querySnapshot = await getDocs(collection(db, "workflows"));
  workflows.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const handleImageChange = (e) => {
  imageFile.value = e.target.files[0];
};

const addDetail = () => {
  form.value.stepDetails.push({ vi: "", en: "" });
};

const addWorkflow = async () => {
  try {
    let imageUrl = "";

    if (imageFile.value) {
      try {
        const imgRef = storageRef(
          storage,
          `workflow-icons/${Date.now()}_${imageFile.value.name}`
        );
        const snapshot = await uploadBytes(imgRef, imageFile.value);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        return Swal.fire("Lỗi", "Không thể upload hình ảnh", "error");
      }
    }

    const translatedStepTitle = await translateText(
      form.value.stepTitle.vi,
      "en"
    );
    const translatedStepDetails = await Promise.all(
      form.value.stepDetails.map(async (detail) => ({
        vi: detail.vi,
        en: await translateText(detail.vi, "en"),
      }))
    );

    const workflowData = {
      imageUrl,
      stepNumber: Number(form.value.stepNumber),
      stepTitle: { vi: form.value.stepTitle.vi, en: translatedStepTitle },
      stepDetails: translatedStepDetails,
    };

    await addDoc(collection(db, "workflows"), workflowData);

    Swal.fire("Thành công", "Thêm workflow thành công", "success");

    resetForm();
    fetchWorkflows();
  } catch (e) {
    Swal.fire("Lỗi", "Đã xảy ra lỗi khi thêm workflow", "error");
  }
};

const editWorkflow = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  form.value = {
    imageUrl: item.imageUrl || "",
    stepNumber: item.stepNumber || 1,
    stepTitle: item.stepTitle || { vi: "", en: "" },
    stepDetails: item.stepDetails || [],
  };
  imageFile.value = null;
};

const updateWorkflow = async () => {
  if (!editingId.value) return;

  try {
    const item = workflows.value.find((w) => w.id === editingId.value);
    if (!item) return;

    let imageUrl = item.imageUrl;

    if (imageFile.value) {
      try {
        const imgRef = storageRef(
          storage,
          `workflow-icons/${Date.now()}_${imageFile.value.name}`
        );
        const snapshot = await uploadBytes(imgRef, imageFile.value);
        imageUrl = await getDownloadURL(snapshot.ref);

        if (item.imageUrl) {
          try {
            const oldImageRef = storageRef(storage, item.imageUrl);
            await deleteObject(oldImageRef);
          } catch (e) {
            console.warn("Không tìm thấy ảnh cũ:", e.message);
          }
        }
      } catch (error) {
        return Swal.fire("Lỗi", "Không thể upload ảnh mới", "error");
      }
    }

    const translatedStepTitle = await translateText(
      form.value.stepTitle.vi,
      "en"
    );
    const translatedStepDetails = await Promise.all(
      form.value.stepDetails.map(async (detail) => ({
        vi: detail.vi,
        en: await translateText(detail.vi, "en"),
      }))
    );

    const workflowData = {
      imageUrl,
      stepNumber: Number(form.value.stepNumber),
      stepTitle: { vi: form.value.stepTitle.vi, en: translatedStepTitle },
      stepDetails: translatedStepDetails,
    };

    await updateDoc(doc(db, "workflows", editingId.value), workflowData);

    Swal.fire("Thành công", "Cập nhật workflow thành công", "success");

    resetForm();
    fetchWorkflows();
  } catch (e) {
    Swal.fire("Lỗi", "Đã xảy ra lỗi khi cập nhật", "error");
  }
};

const confirmDelete = async (id) => {
  const result = await Swal.fire({
    title: "Bạn có chắc muốn xoá?",
    text: "Thao tác này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xoá",
    cancelButtonText: "Huỷ",
  });

  if (result.isConfirmed) {
    await deleteWorkflow(id);
  }
};

const deleteWorkflow = async (id) => {
  try {
    const item = workflows.value.find((w) => w.id === id);
    if (item?.imageUrl) {
      try {
        const imageRef = storageRef(storage, item.imageUrl);
        await deleteObject(imageRef);
      } catch (e) {
        console.warn("Không thể xoá ảnh:", e.message);
      }
    }

    await deleteDoc(doc(db, "workflows", id));
    Swal.fire("Đã xoá", "Workflow đã được xoá", "success");
    fetchWorkflows();
  } catch (e) {
    Swal.fire("Lỗi", "Không thể xoá workflow", "error");
  }
};

const resetForm = () => {
  form.value = {
    imageUrl: "",
    stepNumber: 1,
    stepTitle: { vi: "", en: "" },
    stepDetails: [],
  };
  imageFile.value = null;
  isEditing.value = false;
  editingId.value = null;
};

const sortedWorkflows = computed(() =>
  workflows.value.slice().sort((a, b) => a.stepNumber - b.stepNumber)
);

const totalPages = computed(() =>
  Math.ceil(sortedWorkflows.value.length / itemsPerPage)
);

const paginatedWorkflows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return sortedWorkflows.value.slice(start, start + itemsPerPage);
});

onMounted(fetchWorkflows);
</script>

<style scoped>
.admin-workflow {
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

.form-section button:nth-of-type(2) {
  background-color: #2196f3;
}

.form-section button:nth-of-type(2):hover {
  background-color: #1976d2;
}

.form-section button:nth-of-type(3) {
  background-color: #f44336;
}

.form-section button:nth-of-type(3):hover {
  background-color: #d32f2f;
}

.workflow-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.workflow-card {
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

.workflow-card img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
}

.workflow-card div {
  flex: 1;
}

.workflow-card p {
  margin: 4px 0;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.workflow-card ul {
  margin: 8px 0 0;
  padding-left: 20px;
  list-style: disc;
}

.workflow-card li {
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
}

.workflow-card button {
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

.workflow-card button:hover {
  background-color: #1976d2;
}

.workflow-card button:nth-of-type(2) {
  background-color: #f44336;
}

.workflow-card button:nth-of-type(2):hover {
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
