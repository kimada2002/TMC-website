<template>
    <div class="simple-language-admin">
      <h1>Quản Lý Nội Đa Ngôn Ngữ</h1>
      
      <div class="controls">
        <div class="language-selector">
          <label>Chọn ngôn ngữ:</label>
          <select v-model="selectedLanguage" @change="loadFromFirebase">
            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
              {{ lang.name }} ({{ lang.code }})
            </option>
            <option value="new">+ Thêm ngôn ngữ mới</option>
          </select>
        </div>
        
        <div v-if="selectedLanguage === 'new'" class="new-language-form">
          <input v-model="newLanguageCode" placeholder="Mã ngôn ngữ (vd: fr, ja)" maxlength="2">
          <input v-model="newLanguageName" placeholder="Tên ngôn ngữ (vd: Tiếng Pháp)">
          <button @click="addNewLanguage" class="btn-add">Thêm Ngôn Ngữ</button>
        </div>
      </div>
      
      <div class="translation-editor" v-if="selectedLanguage !== 'new'">
        <textarea 
          v-model="jsonContent" 
          placeholder="Dán nội dung JSON vào đây..."
        ></textarea>
      </div>
      
      <div class="actions" v-if="selectedLanguage !== 'new'">
        <button @click="loadFromFirebase" class="btn-load">Tải từ Firebase</button>
        <button @click="saveToFirebase" class="btn-save">Lưu lên Firebase</button>
      </div>
      
      <div v-if="message" class="message" :class="{ success: isSuccess, error: !isSuccess }">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import { doc, getDoc, setDoc } from 'firebase/firestore';
  
  export default {
    name: 'SimpleLanguageAdmin',
    data() {
      return {
        languages: [
          { code: 'en', name: 'Tiếng Anh' },
          { code: 'vi', name: 'Tiếng Việt' }
        ],
        selectedLanguage: 'en',
        newLanguageCode: '',
        newLanguageName: '',
        jsonContent: '',
        message: '',
        isSuccess: false
      };
    },
    methods: {
      async loadFromFirebase() {
        if (this.selectedLanguage === 'new') return;
        
        try {
          const docRef = doc(db, 'translations', this.selectedLanguage);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            this.jsonContent = JSON.stringify(docSnap.data(), null, 2);
            this.showMessage('Đã tải nội dung từ Firebase!', true);
          } else {
            this.jsonContent = '{}';
            this.showMessage('Chưa có dữ liệu cho ngôn ngữ này', false);
          }
        } catch (error) {
          console.error('Lỗi khi tải:', error);
          this.showMessage('Lỗi khi tải dữ liệu', false);
        }
      },
      
      async saveToFirebase() {
        try {
          // Validate JSON
          const parsedJson = JSON.parse(this.jsonContent);
          
          const docRef = doc(db, 'translations', this.selectedLanguage);
          await setDoc(docRef, parsedJson); // Lưu toàn bộ object JSON
          
          this.showMessage('Đã lưu thành công lên Firebase!', true);
        } catch (error) {
          console.error('Lỗi khi lưu:', error);
          this.showMessage('Lỗi: Nội dung không phải JSON hợp lệ', false);
        }
      },
      
      async addNewLanguage() {
        if (!this.newLanguageCode || !this.newLanguageName) {
          this.showMessage('Vui lòng nhập đầy đủ mã và tên ngôn ngữ', false);
          return;
        }
        
        // Kiểm tra mã ngôn ngữ có hợp lệ không (2 ký tự)
        if (!/^[a-z]{2}$/.test(this.newLanguageCode)) {
          this.showMessage('Mã ngôn ngữ phải gồm 2 chữ cái thường (vd: en, vi, fr)', false);
          return;
        }
        
        // Kiểm tra ngôn ngữ đã tồn tại chưa
        if (this.languages.some(lang => lang.code === this.newLanguageCode)) {
          this.showMessage('Ngôn ngữ này đã tồn tại', false);
          return;
        }
        
        try {
          // Tạo document mới trong collection translations
          const docRef = doc(db, 'translations', this.newLanguageCode);
          await setDoc(docRef, {}); // Tạo document rỗng
          
          // Thêm vào danh sách ngôn ngữ
          this.languages.push({
            code: this.newLanguageCode,
            name: this.newLanguageName
          });
          
          // Chọn ngôn ngữ mới
          this.selectedLanguage = this.newLanguageCode;
          this.newLanguageCode = '';
          this.newLanguageName = '';
          this.jsonContent = '{}';
          
          this.showMessage(`Đã thêm ngôn ngữ ${this.newLanguageName} thành công!`, true);
        } catch (error) {
          console.error('Lỗi khi thêm ngôn ngữ:', error);
          this.showMessage('Lỗi khi thêm ngôn ngữ mới', false);
        }
      },
      
      showMessage(text, success) {
        this.message = text;
        this.isSuccess = success;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    },
    mounted() {
      this.loadFromFirebase();
    }
  };
  </script>
  
  <style scoped>
  .simple-language-admin {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .controls {
    margin-bottom: 20px;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .language-selector {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .language-selector label {
    font-weight: bold;
  }
  
  .language-selector select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 200px;
  }
  
  .new-language-form {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
  }
  
  .new-language-form input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .new-language-form input:first-of-type {
    width: 100px;
  }
  
  .btn-add {
    padding: 8px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-add:hover {
    background-color: #45a049;
  }
  
  .translation-editor textarea {
    width: 100%;
    height: 500px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    resize: vertical;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .actions button {
    padding: 10px 25px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-load {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .btn-load:hover {
    background-color: #e0e0e0;
  }
  
  .btn-save {
    background-color: #2196F3;
    color: white;
  }
  
  .btn-save:hover {
    background-color: #0b7dda;
  }
  
  .message {
    margin-top: 20px;
    padding: 12px;
    border-radius: 4px;
    text-align: center;
  }
  
  .success {
    background-color: #d4edda;
    color: #155724;
  }
  
  .error {
    background-color: #f8d7da;
    color: #721c24;
  }
  </style>