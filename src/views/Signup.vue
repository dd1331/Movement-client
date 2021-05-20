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
        dense
        required
        @keyup.enter="signup"
      ></v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        :counter="11"
        :rules="passwordRules"
        label="Password"
        solo
        dense
        required
        @keyup.enter="signup"
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        color="success"
        class="pa-2 my-5"
        @click="signup"
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
      <a href="${VUE_APP_SERVER_HOST}/auth/google">google</a> -->
  </div>
</template>
<script>
import VUE_APP_SERVER_HOST from '@/../env-config';

export default {
  data: () => ({
    valid: true,
    phone: '',
    password: '',
    phoneRules: [
      (v) => !!v || '휴대폰 번호를 입력해주세요',
      (v) => (v && v.length >= 11) || '휴대폰 번호를 확인해주세요',
    ],
    passwordRules: [
      (v) => !!v || '비밀번호를 입력해주세요',
      (v) => (v && v.length >= 4) || '비밀번호를 확인해주세요',
    ],
    naverLogin: null,
  }),

  methods: {
    async signup() {
      this.validate();
      const payload = {
        phone: this.phone,
        password: this.password,
      };
      const { data } = await this.$axios.post(`${VUE_APP_SERVER_HOST}/users/signup`, payload);
      if (data && data.phone === this.phone) {
        const loggedIn = this.$store.dispatch('auth/loginWithJwt', payload);
        if (loggedIn) this.$router.push('/');
      }
    },
    async test() {
      // const { data } = await this.$axios.get('http://192.168.35.123:3000/auth/naver');
      // const { data } = await this.$axios.get('http://192.168.35.21:3000/auth/naver');
      const { data } = await this.$axios.post(`${VUE_APP_SERVER_HOST}/auth/naver`);
      console.log(data);
    },
    async test2() {
      // const { data } = await this.$axios.get('http://192.168.35.123:3000/auth/google');
      const { data } = await this.$axios.get(`${VUE_APP_SERVER_HOST}/auth/google`);
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
