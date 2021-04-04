<template>
<div></div>
</template>
<script>
export default {
  mounted() {
    // eslint-disable-next-line no-undef
    const naverLogin = new naver.LoginWithNaverId(
      {
        clientId: 'ag_B0_vLXpvrgG1J5Upp',
        callbackUrl: 'http://192.168.35.219:3000/auth/naver',
        isPopup: false,
        callbackHandle: false,
        /* callback 페이지가 분리되었을 경우에 callback 페이지에서는 callback처리를 해줄수 있도록 설정합니다. */
      },
    );

    /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
    naverLogin.init();

    /* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup close) */
    window.addEventListener('load', () => {
      naverLogin.getLoginStatus(async (status) => {
        if (status) {
          const { user, accessToken } = naverLogin;
          const payload = {
            naverId: user.id,
            accessToken: accessToken.accessToken,
          };

          await this.$store.dispatch('auth/loginWithNaver', payload);
          this.$router.push('/');
        } else {
          console.log('callback 처리에 실패하였습니다.');
        }
      });
    });
  },
};
</script>
