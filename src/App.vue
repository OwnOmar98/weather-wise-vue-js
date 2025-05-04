<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth.store'
  import { storeToRefs } from 'pinia'
  import ChangeTheme from './components/ChangeTheme.vue'
  const authStore = useAuthStore()
  const { logout } = authStore
  const { user } = storeToRefs(authStore)
</script>

<template>
  <v-app class="w-100 min-h-screen app-container">
    <v-layout>
      <v-main>
        <div
          class="d-flex align-center w-100"
          :class="user ? 'justify-space-between' : 'justify-center'"
        >
          <ChangeTheme />
          <v-btn v-if="user" color="primary" @click="logout"> Logout </v-btn>
        </div>
        <v-container class="d-flex align-center justify-center" fluid>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>
<style lang="scss">
  .app-container {
    padding: 63px 78px;
    background: linear-gradient(to bottom right, #ffffff, rgba(70, 97, 115, 0));
    @media only screen and (max-width: 600px) {
      padding: 32px;
    }
  }
</style>
