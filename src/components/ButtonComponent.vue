<template>
  <button :type="btnType" class="button-primary" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: ["type"],
  methods: {
    handleClick() {
      this.$emit("onClick");
    },
  },
  computed: {
    btnType() {
      return this.type;
    },
  },
};
</script>

<style scoped>
.button-primary {
  min-width: 60px;
  padding: 5px 10px;
  font-weight: bold;
  background: #2c3e50;
  color: #fff;
  font-size: 0.7rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.button-primary:hover {
  background: #42b983;
}
</style>
