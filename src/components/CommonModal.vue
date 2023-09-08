<template>
  <div class="modal-container" v-if="isOpen">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
};
</script>

<style>
.modal-container {
  z-index: 10;
  position: absolute;
  left: 0;
  top: 50px;

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
</style>
