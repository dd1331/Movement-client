<template>
  <div>
    <h1 class="mb-6">Signup</h1>
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
        signup
      </v-btn>
      <v-btn
        color="warning"
        class="pa-2"
        min-width="100%"
        @click="$router.push('/')"
      >
        cancel
      </v-btn>
    </v-form>
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
      (v) => (v && v.length > 10) || 'Phone must be more than 11 characters',
    ],
    passwordRules: [
      (v) => !!v || 'Phone is required',
      (v) => (v && v.length > 4) || 'Phone must be more than 11 characters',
    ],
  }),

  methods: {
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
};
</script>
