<template>
  <div class="signup-container">
    <h1 class="title">회원가입</h1>
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        v-on:input="handleChange"
        ref="confirmPasswordRef"
      />
      <input
        type="text"
        name="username"
        placeholder="닉네임"
        v-on:input="handleChange"
        ref="usernameRef"
      />
      <p class="validate-message">{{ errorMessage }}</p>
      <div class="submit-container">
        <button-component :type="`submit`"> 회원 가입 </button-component>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import ButtonComponent from "@/components/ButtonComponent.vue";
import { ACTION } from "@/store/user/actions";
import { UserPayloadType } from "../db/createUser";

export default {
  components: { ButtonComponent },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      isValid: false,
      message: {
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
      },
    };
  },
  computed: {
    errorMessage() {
      const msg = Object.values(this.message).join("");

      return msg;
    },
  },
  methods: {
    handleSubmit() {
      this.isValid = this.validate();

      if (!this.isValid) return;

      const vm = this;

      this.$store
        .dispatch({
          type: ACTION.FETCH_SIGN_UP,
          user: {
            email: this.email,
            password: this.password,
            username: this.username,
          },
        })
        .then((res: any) => {
          debugger;

          // if (status !== 200) {
          //   vm.isValid = false;
          //   vm.message.email = "이미 존재하는 계정 입니다.";
          //   return;
          // }

          // this.$router.push("/login");
        });
    },
    handleChange(e: any) {
      this[e.target.name] = e.target.value;
      this.message[e.target.name] = "";
    },
    validate() {
      const {
        email,
        password,
        confirmPassword,
        username,
        $refs: { emailRef, passwordRef, usernameRef },
      } = this;

      const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

      if (!email || !emailRegex.test(email)) {
        emailRef.focus();
        this.message["email"] = "이메일을 다시 입력해주세요";
        return false;
      }

      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

      if (!password || !passwordRegex.test(password)) {
        passwordRef.focus();
        this.message["password"] = "비밀번호를 다시 입력해주세요";
        return false;
      }

      if (confirmPassword !== password) {
        confirmPassword.focus();
        this.message["confirmPassword"] = "비밀번호가 맞지 않습니다";
        return false;
      }

      if (!username || username.length <= 1) {
        usernameRef.focus();
        this.message["username"] = "이름을 다시 입력해주세요";
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: grid;
  grid-template-rows: 0.5fr 1fr 0.3fr;
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
  grid-template-rows: repeat(3, 3rem);
  width: 30rem;
  gap: 1rem;
  margin: 0 auto;
}

.form-container input {
  padding: 1rem;
  border: 1px solid #ccc;
}

.submit-container {
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
