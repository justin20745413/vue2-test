<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleRegister" ref="form">
              <v-text-field
                v-model="username"
                label="Username"
                required
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                :rules="[rules.required, rules.min]"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                required
                :rules="[rules.required, rules.passwordMatch]"
              ></v-text-field>
              <v-btn type="submit" color="primary" block :loading="loading"> Register </v-btn>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <div class="text-center">
              <router-link to="/login">Already have an account? Login here</router-link>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Register extends Vue {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;

  rules = {
    required: (v: string) => !!v || 'Field is required',
    email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    min: (v: string) => v.length >= 6 || 'Min 6 characters',
    passwordMatch: (v: string) => v === this.password || 'Passwords must match',
  };

  async handleRegister() {
    if (!(this.$refs.form as any).validate()) return;

    this.loading = true;
    try {
      // Simulated registration with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.$router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
