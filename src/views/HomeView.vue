<template>
  <div class="home">
    <div class="card-list-container">
      <div
        class="card-container"
        v-for="item in post.postList"
        v-bind:key="item.id"
      >
        <post-card
          v-bind:content="item.content"
          v-bind:id="item.id"
          v-bind:likes="item.likes"
          v-bind:reviews="item.reviews"
          v-bind:thumbnail_url="item.thumbnail_url"
          v-bind:user_name="item.user_name"
          v-bind:user_profile_url="item.user_profile_url"
          v-bind:created_at="item.created_at"
        >
        </post-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { ACTION } from "../store/post/actions";

import PostCard from "@/components/PostCard.vue";

export default {
  name: "HomeView",
  components: {
    PostCard,
  },
  computed: {
    ...mapState(["post"]),
  },
  created() {
    this.$store.dispatch({ type: ACTION.FETCH_POST_LIST });
  },
};
</script>

<style>
.card-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  gap: 10px;
}

@media (max-width: 1919px) {
  .card-list-container {
    grid-template-columns: repeat(auto-fill, minmax(22%, auto));
  }
}

@media (max-width: 1440px) {
  .card-list-container {
    grid-template-columns: repeat(auto-fill, minmax(33%, auto));
  }
}

@media (max-width: 1056px) {
  .card-list-container {
    grid-template-columns: repeat(auto-fill, minmax(44%, auto));
  }
}
@media (max-width: 767px) {
  .card-list-container {
    grid-template-columns: 1fr;
  }
}
</style>
