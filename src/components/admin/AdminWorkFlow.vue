<template>
  <div class="admin-workflow">
    <h2>Quản lý WorkFlow</h2>

    <!-- Form thêm hoặc chỉnh sửa -->
    <div class="form-section">
      <input type="file" @change="handleImageChange" />
      <input v-model="form.stepNumber" type="number" placeholder="Số bước" />

      <!-- Tiêu đề bước -->
      <input v-model="form.stepTitle.vi" placeholder="Tiêu đề bước (Tiếng Việt)" />

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

    <hr />

    <!-- Danh sách workflow -->
    <div class="workflow-list">
      <div v-for="item in workflows" :key="item.id" class="workflow-card">
        <img :src="item.imageUrl" alt="icon" width="50" />
        <div>
          <p>
            <strong>Bước {{ item.stepNumber }}</strong> - {{ item.stepTitle?.vi || "" }}
          </p>
          <ul>
            <li v-for="(d, i) in item.stepDetails" :key="i">
              {{ d.vi }}
            </li>
          </ul>
        </div>
        <button @click="editWorkflow(item)">Sửa</button>
        <button @click="deleteWorkflow(item.id)">Xoá</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db, storage } from "@/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { translateText } from "@/utils/translate"; // Hàm dịch ngôn ngữ có sẵn

const workflows = ref([]);
const isEditing = ref(false);
const editingId = ref(null);
const imageFile = ref(null);

const form = ref({
  imageUrl: "",
  stepNumber: 1,
  stepTitle: { vi: "", en: "" },
  stepDetails: [],
});

const fetchWorkflows = async () => {
  const querySnapshot = await getDocs(collection(db, "workflows"));
  workflows.value = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      imageUrl: data.imageUrl || "",
      stepNumber: data.stepNumber || 0,
      stepTitle: data.stepTitle || { vi: "", en: "" },
      stepDetails: data.stepDetails || [],
    };
  });
};

const handleImageChange = (e) => {
  imageFile.value = e.target.files[0];
};

const addDetail = () => {
  form.value.stepDetails.push({ vi: "", en: "" });
};

const addWorkflow = async () => {
  let imageUrl = "";

  if (imageFile.value) {
    const imgRef = storageRef(storage, `workflow-icons/${Date.now()}_${imageFile.value.name}`);
    const snapshot = await uploadBytes(imgRef, imageFile.value);
    imageUrl = await getDownloadURL(snapshot.ref);
  }

  const translatedStepTitle = await translateText(form.value.stepTitle.vi, "en");
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

  resetForm();
  fetchWorkflows();
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

  const item = workflows.value.find((w) => w.id === editingId.value);
  if (!item) return;

  let imageUrl = item.imageUrl;

  if (imageFile.value) {
    const imgRef = storageRef(storage, `workflow-icons/${Date.now()}_${imageFile.value.name}`);
    const snapshot = await uploadBytes(imgRef, imageFile.value);
    imageUrl = await getDownloadURL(snapshot.ref);

    // Xóa ảnh cũ
    if (item.imageUrl) {
      try {
        const oldImageRef = storageRef(storage, item.imageUrl);
        await deleteObject(oldImageRef);
      } catch (e) {
        console.warn("Không tìm thấy ảnh cũ để xoá:", e.message);
      }
    }
  }

  const translatedStepTitle = await translateText(form.value.stepTitle.vi, "en");
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

  resetForm();
  fetchWorkflows();
};

const deleteWorkflow = async (id) => {
  const item = workflows.value.find((w) => w.id === id);
  if (item?.imageUrl) {
    try {
      const imageRef = storageRef(storage, item.imageUrl);
      await deleteObject(imageRef);
    } catch (e) {
      console.warn("Không tìm thấy ảnh để xoá:", e.message);
    }
  }
  await deleteDoc(doc(db, "workflows", id));
  fetchWorkflows();
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

onMounted(fetchWorkflows);
</script>

<style scoped>
.admin-workflow {
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

.workflow-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.workflow-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
</style>
