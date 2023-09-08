<template>
  <div id="app">
    <div class="wrapper">
      <header class="header">
        <div class="logo-container">
          <router-link to="/">
            <img src="./assets/clogo.png" alt="" class="logo-img" />
          </router-link>
        </div>
        <div class="menu-container">
          <div class="color-mode">
            <i class="fa-solid fa-sun"></i>
          </div>
          <div class="search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <button class="write-btn" @click="toggleWriteModal(true)">
            새 글 작성
          </button>
          <user-profile
            v-bind:img_url="`https://picsum.photos/40/40`"
          ></user-profile>
        </div>
      </header>
      <div class="main">
        <router-view />
      </div>
    </div>
    <write-modal
      v-bind:isOpen="isWriteModalOpen"
      v-on:onClose="toggleWriteModal(false)"
    ></write-modal>
  </div>
</template>

<script lang="ts">
import UserProfile from "@/components/UserProfile.vue";
import WriteModal from "@/components/WriteModal.vue";

export default {
  components: {
    UserProfile,
    WriteModal,
  },
  data() {
    return {
      isWriteModalOpen: false,
    };
  },
  methods: {
    toggleWriteModal(isOpen: boolean) {
      this.isWriteModalOpen = isOpen;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.wrapper {
  display: grid;
  grid-template-areas:
    "header header header"
    "main main main";
  width: 1728px;
  margin: 0 auto;
}

.header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.header .menu-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header .menu-container div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
}

.main {
  grid-area: main;
}

.logo-container a {
  display: flex;
  height: 24px;
  align-items: center;
}

.logo-img {
  height: 24px;
}

.write-btn {
  height: 2rem;
  margin-right: 1rem;
  padding: 0 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  outline: none;
  font-weight: bold;
  word-break: keep-all;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  background: #fff;
  border: 1px solid #34495e;
}

.write-btn:hover {
  color: #fff;
  background: #41b883;
  border-color: #41b883;
}

@media (max-width: 1919px) {
  .wrapper {
    width: 1370px;
  }
}

@media (max-width: 1440px) {
  .wrapper {
    width: 1024px;
  }
}

@media (max-width: 1056px) {
  .wrapper {
    width: calc(100% - 2rem);
  }
}
</style>
