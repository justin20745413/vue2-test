<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/" exact>Home</v-btn>
      <v-btn text to="/LinkedInApi">LinkedInApi</v-btn>
      <template v-if="!isAuthenticated">
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </template>
      <v-btn v-else text @click="handleLogout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  get isAuthenticated() {
    return this.$store.state.isAuthenticated;
  }

  async handleLogout() {
    await this.$store.dispatch('logout');
    this.$router.push('/login');
  }
}
</script>
