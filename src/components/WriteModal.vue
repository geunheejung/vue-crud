<template>
  <common-modal v-bind:isOpen="isOpen">
    <div class="title-container">
      <input type="text" v-model="title" placeholder="제목 없음" />
    </div>
    <div class="content-container">
      <textarea cols="30" rows="10" v-model="content"></textarea>
    </div>
    <div class="upload-img-container">
      <div
        class="preview-img"
        v-bind:style="{ backgroundImage: `url(${previewImgUrl})` }"
      >
        <img
          src="../assets/upload.png"
          alt=""
          width="100"
          v-if="!previewImgUrl"
        />
      </div>
      <label for="upload-image" class="button-primary">썸네일 업로드</label>
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        v-on:change="handleFileInput"
        hidden
      />
    </div>

    <div class="button-container">
      <button class="button-primary" @click="handleWrite">
        <i class="fa-solid fa-plus"></i>
        작성하기
      </button>
      <button class="button-primary" @click="handleClose">
        <i class="fa-solid fa-xmark"></i>
        닫기
      </button>
    </div>
  </common-modal>
</template>

<script lang="ts">
import imageFileReader from "@/utils/imageFileReader";
import { ACTION } from "@/store/post/actions";
import { PostPayloadType } from "../db/createPost";
import CommonModal from "@/components/CommonModal.vue";

export default {
  props: {
    isOpen: Boolean,
  },
  components: {
    CommonModal,
  },
  data() {
    return {
      title: "",
      content: "",
      selectedFile: null,
      previewImgUrl: null,
    };
  },
  methods: {
    handleWrite() {
      const { title, content, $store } = this;
      const post: PostPayloadType = {
        title,
        content,
        author: "geuni",
        thumbnail_url: this.previewImgUrl,
        user_profile_url: "https://picsum.photos/40/40 ",
      };

      $store
        .dispatch({ type: ACTION.FETCH_SET_POST, data: post })
        .then((res: unknown) => {
          this.$emit("onClose");
          this.clear();
        });
    },
    handleClose() {
      this.$emit("onClose");
    },
    clear() {
      this.title = "";
      this.content = "";
      this.selectedFile = null;
      this.previewImgUrl = null;
    },
    handleFileInput(e: any) {
      const fileList = e.target.files;

      // 선택된 파일이 없는 경우
      if (0 >= fileList.length) {
        alert("파일을 다시 선택해 주세요");
        this.selectedFile = null;
        this.previewImgUrl = null;
      }

      const file = imageFileReader(
        fileList,
        (e) => {
          this.previewImgUrl = e.target?.result;
        },
        () => {
          this.previewImgUrl = null;
        }
      );
    },
  },
};
</script>

<style scope>
.write-modal-container {
  z-index: 10;
  position: absolute;
  left: 0;
  bottom: 40px;
  right: 0;
  min-width: 400px;
  width: 80vw;
  height: 80vh;
  padding: 63px;
  box-sizing: border-box;
  border-radius: 3px;
  background: #fff;
  margin: auto;

  box-shadow: rgba(15, 15, 15, 0.016) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px;
  color: rgb(55, 53, 47);
}
.title-container {
  font-weight: 700;
  line-height: 1.2;
  font-size: 2.5rem;
  cursor: text;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.title-container input {
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  font-size: 1em;
  font-weight: inherit;
  margin: 0px;
  border: none;
}

.title-container input:focus,
.content-container textarea {
  outline: none;
}

.content-container textarea {
  width: 100%;
  height: 100%;
  padding: 3px 2px;
  border: none;
}

.button-container {
  display: flex;
  gap: 10px;
  position: absolute;
  right: 15px;
  bottom: 15px;
}

.upload-img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background: #f0f0f0;
}

.img-icon {
  background-image: url("../assets/upload.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 107px;
  height: 80px;
}

.preview-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

@media (min-width: 1280px) {
  .write-modal-container {
    max-width: 960px;
    padding: 126px;
  }
}
</style>
