<template>
  <common-modal v-bind:isOpen="isOpen">
    <form v-on:submit.prevent="handleSubmit">
      <div class="title-container">
        <input
          id="title"
          type="text"
          v-model="title"
          placeholder="제목 없음"
          ref="titleField"
        />
      </div>
      <div class="content-container">
        <textarea
          id="content"
          cols="30"
          rows="10"
          name="content"
          v-model="content"
          placeholder="..."
          ref="contentField"
        ></textarea>
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
        <button-component v-bind:type="'submit'">
          <i class="fa-solid fa-plus"></i>
          작성하기
        </button-component>
        <button-component @onClick="handleClose">
          <i class="fa-solid fa-xmark"></i>
          닫기
        </button-component>
      </div>
    </form>
  </common-modal>
</template>

<script lang="ts">
import imageFileReader from "@/utils/readImgFile";
import { ACTION } from "@/store/post/actions";
import { PostPayloadType } from "../db/createPost";
import CommonModal from "@/components/CommonModal.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  props: {
    isOpen: Boolean,
  },
  components: {
    CommonModal,
    ButtonComponent,
  },
  data() {
    return {
      title: "",
      content: "",
      selectedFile: null,
      previewImgUrl: null,
      isValid: false,
    };
  },
  methods: {
    clear() {
      this.title = "";
      this.content = "";
      this.selectedFile = null;
      this.previewImgUrl = null;
    },
    validate() {
      const {
        title,
        content,
        $refs: { titleField, contentField },
      } = this;

      const textCheck = (text: string) => text.trim().length > 0;

      if (!textCheck(title)) {
        titleField.focus();
        return false;
      }

      if (!textCheck(content)) {
        contentField.focus();
        return false;
      }

      return true;
    },
    handleClose() {
      this.$emit("onClose");
    },
    handleFileInput(e: any) {
      const fileList = e.target.files;

      // 선택된 파일이 없는 경우
      if (0 >= fileList.length) {
        alert("파일을 다시 선택해 주세요");
        this.selectedFile = null;
        this.previewImgUrl = null;
      }

      imageFileReader(
        fileList,
        (e) => {
          this.previewImgUrl = e.target?.result;
        },
        () => {
          this.previewImgUrl = null;
        }
      );
    },
    handleSubmit() {
      this.isValid = this.validate();

      if (!this.isValid) return;

      const { title, content } = this;

      const post: PostPayloadType = {
        title,
        content,
        author: "geuni",
        thumbnail_url: this.previewImgUrl || `https://picsum.photos/40/40`,
        user_profile_url: "https://picsum.photos/40/40",
      };

      this.$store
        .dispatch({ type: ACTION.FETCH_SET_POST, data: post })
        .then((res: unknown) => {
          this.$emit("onClose");
          this.clear();
        });
    },
  },
};
</script>

<style scope>
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
