<template>
  <div class="login-container">
    <h1 class="title">로그인</h1>
    <form class="form-container" v-on:submit.prevent="handleSubmit">
      <input
        type="email"
        name="email"
        placeholder="이메일"
        v-on:input="handleChange"
        ref="emailRef"
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        v-on:input="handleChange"
        ref="passwordRef"
      />
      <p class="validate-message">{{ message }}</p>
      <div class="submit-container">
        <button-component :type="`submit`"> 로그인 </button-component>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import ButtonComponent from "@/components/ButtonComponent.vue";
import { ACTION } from "@/store/user/actions";
export default {
  components: {
    ButtonComponent,
  },
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    handleChange(e: any) {
      this[e.target.name] = e.target.value;
      this.message = "";
    },
    handleSubmit() {
      const { email, password } = this;
      this.$store
        .dispatch({
          type: ACTION.FETCH_LOGIN,
          account: { email, password },
        })
        .then((res: any) => {
          debugger;
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: grid;
  grid-template-rows: 0.5fr 1fr;
  align-items: center;
  justify-content: center;
}

.title {
  color: #2c3e50;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
.form-container {
  display: grid;
  grid-template-rows: 1fr 1fr 0.5fr 1fr;
  width: 30rem;
  gap: 1rem;
  margin: 0 auto;
}

.form-container input {
  padding: 1rem;
  border: 1px solid #ccc;
}
.submit-container button {
  width: 100%;
  height: 2.5rem;
}

.validate-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  color: #42b883;
  font-weight: bold;
  font-size: 0.7rem;
}
</style>
