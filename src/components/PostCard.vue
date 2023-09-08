<template>
  <article class="card-container" v-bind:key="id">
    <router-link to="/" class="banner-container">
      <div class="banner-image">
        <img v-bind:src="thumbnail_url" alt="게시글 썸네일" />
      </div>
    </router-link>

    <div class="content-container">
      {{ content }}
    </div>
    <p class="info-container">
      <span class="time_ago">{{ time_ago }}</span>
      <span> | </span>
      <span class="reviews">{{ reviews }}개의 댓글</span>
    </p>
    <div class="post-info-container">
      <div class="profile">
        <div class="profile-container">
          <img :src="user_profile_url" alt="유저 프로필 이미지" />
        </div>
        <span class="username">{{ user_name }}</span>
      </div>
      <div class="likes">
        <i class="fa-solid fa-heart"></i>
        <span class="count">{{ likes }}</span>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
export default {
  props: {
    id: String,
    thumbnail_url: String,
    content: String,
    time_ago: String,
    reviews: Number,
    user_profile_url: String,
    user_name: String,
    likes: Number,
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #2c3e50;
  border-radius: 3px;
}

.banner-container {
  display: block;
  text-decoration: none;
}

.banner-container .banner-image {
  position: relative;
  padding-top: 52.19206680584551%;
  background: #f8f9fa;
}

.banner-container .banner-image img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.content-container {
  height: 3.9rem;
  padding: 1rem;
}

.info-container {
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  color: #ced4da;
}

.post-info-container {
  display: flex;
  align-items: center;
  border-top: 1px solid #2c3e50;
  padding: 0.5rem 1rem;
}

.likes {
  margin-left: auto;
}
</style>
