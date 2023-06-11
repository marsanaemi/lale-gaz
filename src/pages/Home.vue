<template>
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <div class="login">
          <div v-if="firstStep" class="login__field">
            <div class="form-group col-md-12">
              <input
                  v-model="phone"
                  type="text"
                  class="login__input form-control"
                  placeholder="تلفن همراه"
              />
            </div>
          </div>
          <div v-if="secondStep" class="login__field">
            <div class="form-group col-md-12">
              <input
                  type="text"
                  placeholder="کد ورود"
                  v-model="otp"
                  class="form-control login__input"
              />
            </div>
          </div>
          <button
              type="submit"
              :disabled="loading1"
              @click="login"
              v-if="firstStep"
              class="button login__submit">
            {{ loading1 ? ' درحال ارسال کد' : 'تایید' }}
          </button>
          <button v-if="secondStep" type="submit"
                  :disabled="loading2" class="button login__submit" @click="verify">
            <span class="button__text">
              {{ loading2 ? ' در حال ورود' : 'ورود کد' }}
            </span>
          </button>
        </div>
        <div v-if="!firstStep && !secondStep">
          <p>اطلاعات شما با موفقیت ذخیره شد</p>
        </div>
      </div>
      <div class="screen__background">
        <span class="screen__background__shape screen__background__shape4"></span>
        <span class="screen__background__shape screen__background__shape3"></span>
        <span class="screen__background__shape screen__background__shape2"></span>
        <span class="screen__background__shape screen__background__shape1"></span>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from "@/services/Auth.js";
import {mapState, mapMutations} from 'vuex';

export default {
  data() {
    return {
      firstStep: true,
      secondStep: false,
      phone: '',
      otp: '',
      loading1: false,
      loading2: false
    };
  },
  computed: {
    ...mapState(['apiData']),
  },
  methods: {
    login() {
      this.loading1 = true;
      localStorage.removeItem('token')
      AuthService.login({phone: this.phone})
          .then(response => {
            this.$noty.success(response.data.message);
            this.loading1 = false;
            this.firstStep = false
            this.secondStep = true
          })
          .catch(error => {
            this.$noty.error(error)
            this.loading1 = false
          })
    },
    verify() {
      this.loading2 = true;
      AuthService.verify({phone: this.phone, code: this.otp})
          .then(response => {
            this.$noty.success(response.data.message);
            localStorage.setItem('token', response.data.token)
            this.loading2 = false;
            this.getUser()
          })
          .catch(error => {
            this.$noty.error(error)
            this.loading2 = false
          })
    },
    ...mapMutations(['setApiData']),
    getUser() {
      AuthService.getUser()
          .then(response => {
            this.setApiData(response.data.user);
            this.$noty.success(response.data.message);
            this.secondStep = false
          })
          .catch(error => {
            this.$noty.error(error)
          })
    }
  },
};
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Raleway, sans-serif;
}

body {
  background: linear-gradient(90deg, #C7C5F4, #776BCC);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.screen {
  background: linear-gradient(90deg, #5D54A4, #7C78B8);
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px #5C5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #FFF;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6C63AC;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5D54A4, #6A679E);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7E7BB9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875B5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  transition: .2s;
  direction: rtl;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #6A679E;
}

.login__submit {
  text-align: center;
  background: #fff;
  font-size: 18px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  /*display: flex;*/
  align-items: center;
  width: 100%;
  color: #4C489D;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #6A679E;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875B5;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  padding: 20px 10px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0px 0px 8px #7875B5;
}

.social-login__icon:hover {
  transform: scale(1.5);
}
</style>