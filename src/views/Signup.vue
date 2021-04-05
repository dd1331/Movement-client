<template>
  <div>
    <h1 class="mb-6">회원가입</h1>
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
        @click="validate"
        min-width="100%"
      >
        가입
      </v-btn>
      <v-btn
        color="warning"
        class="pa-2"
        min-width="100%"
        @click="$router.push('/')"
      >
        취소
      </v-btn>
    </v-form>
      <!-- <div id="naverIdLogin">
      </div>
      <v-btn @click="test">teset</v-btn>
      <v-btn @click="test2">google</v-btn>
      <a href="http://localhost:3000/auth/google">google</a> -->
  </div>
</template>
<script>

export default {
  data: () => ({
    valid: true,
    phone: '',
    password: '',
    phoneRules: [
      (v) => !!v || 'Phone is required',
      (v) => (v && v.length >= 11) || 'Phone must be more than 11 characters',
    ],
    passwordRules: [
      (v) => !!v || 'Phone is required',
      // (v) => (v && v.length > 4) || 'Phone must be more than 11 characters',
    ],
    naverLogin: null,
  }),

  methods: {
    async test() {
      // const { data } = await this.$axios.get('http://192.168.35.123:3000/auth/naver');
      // const { data } = await this.$axios.get('http://192.168.35.21:3000/auth/naver');
      const { data } = await this.$axios.post('http://localhost:3000/auth/naver');
      console.log(data);
    },
    async test2() {
      // const { data } = await this.$axios.get('http://192.168.35.123:3000/auth/google');
      const { data } = await this.$axios.get('http://localhost:3000/auth/google');
      console.log(data);
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
    //     callbackUrl: 'http://192.168.35.102:8080/auth/naver',
    //     isPopup: false, /* 팝업을 통한 연동처리 여부 */
    //     callbackHandle: false,
    //     loginButton: { color: 'green', type: 3, height: 60 }, /* 로그인 버튼의 타입을 지정 */
    //   },
    // );
    // console.log('this.naverLogin', this.naverLogin);
    // this.naverLogin.init();
  },
};
</script>
