<template>
  <div>
    <h1 class="mb-6">로그인</h1>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="phone"
        :counter="11"
        :rules="phoneRules"
        label="Phone"
        solo
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :counter="11"
        :rules="passwordRules"
        label="Password"
        solo
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        color="success"
        class="pa-2 my-5"
        @click="login"
        min-width="100%"
      >
        로그인
      </v-btn>
      <v-btn
        color="warning"
        class="pa-2"
        min-width="100%"
        @click="$router.push('/signup')"
      >
        회원가입
      </v-btn>
    </v-form>
      <!-- <div id="naverIdLogin">
      </div> -->
  </div>
</template>
<script>

export default {
  data: () => ({
    valid: true,
    phone: '01000000000',
    password: '123123',
    phoneRules: [
      (v) => !!v || 'Phone is required',
      (v) => (v && v.length >= 11) || 'Phone must be more than 11 characters',
    ],
    passwordRules: [
      (v) => !!v || 'Phone is required',
      (v) => (v && v.length > 4) || 'Phone must be more than 11 characters',
    ],
    naverLogin: null,
  }),

  methods: {
    async login() {
      this.validate();
      const payload = {
        phone: this.phone,
        password: this.password,
      };
      const loggedIn = await this.$store.dispatch('auth/loginWithJwt', payload);
      if (loggedIn) this.$router.push('/');
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  mounted() {
    // eslint-disable-next-line no-undef
    // this.naverLogin = new naver.LoginWithNaverId(
    //   {
    //     clientId: 'ag_B0_vLXpvrgG1J5Upp',
    //     callbackUrl: 'http://localhost:8080/auth/naver',
    //     // callbackUrl: 'http://localhost:3000/auth/naver',
    //     // callbackUrl: 'http://localhost:8080/naver/callback',
    //     isPopup: false, /* 팝업을 통한 연동처리 여부 */
    //     loginButton: { color: 'green', type: 3, height: 60 }, /* 로그인 버튼의 타입을 지정 */
    //   },
    // );
    // console.log('this.naverLogin', this.naverLogin);
    // this.naverLogin.init();
  },
};
</script>
