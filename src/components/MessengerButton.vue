<template>
  <a
    class="messenger-button"
    href="https://m.me/61576301480054"
    target="_blank"
    rel="noopener"
    title="Nhắn tin Facebook"
  >
    <img
      src="@/assets/images/messenger-icon.png"
      alt="Messenger Icon"
      class="icon"
    />
  </a>
</template>
<style scoped>
.messenger-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  padding: 0;
}

.messenger-button:hover {
  transform: scale(1.1);
}

.icon {
  width: 32px;
  height: 32px;
}
</style>
