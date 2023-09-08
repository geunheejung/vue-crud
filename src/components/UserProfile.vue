<template>
  <div class="profile">
    <img :src="img_url" alt="프로필 이미지" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    img_url: String,
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  align-items: center;
}
.profile > img {
  background: #000;
  border-radius: 50%;
  height: 40px;
}
</style>
