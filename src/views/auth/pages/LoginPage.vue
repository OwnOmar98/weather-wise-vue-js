<script setup lang="ts">
  import { nextTick, reactive, ref } from 'vue'

  import { AuthErrorCodesEnum } from '@/helpers/const/authError.const'
  import { LoginSchema, type LoginDto } from '@/helpers/interface/login.interface'
  import { authEnumRoutes } from '@/router/auth/auth.enum.routes'
  import { useAuthStore } from '@/stores/auth.store'
  import { useRouter } from 'vue-router'
  import BaseAuthCard from '../components/BaseAuthCard.vue'
  import { weatherEnumRoutes } from '../../../router/weather/weather.enum.routes'

  const authStore = useAuthStore()

  const formData: LoginDto = reactive({
    email: '',
    password: '',
  })
  const showPassword = ref(false)
  const emailError = ref('')
  const passwordError = ref('')

  const isLoading = ref(false)
  const resetError = () => {
    emailError.value = ''
    passwordError.value = ''
  }
  const router = useRouter()
  const loginHandler = async () => {
    resetError()
    await nextTick()
    const result = LoginSchema.safeParse(formData)
    if (result.success) {
      isLoading.value = true
      const { error, data } = await authStore.login(formData)
      if (error?.response?.data.errorCode) {
        switch (error.response?.data.errorCode) {
          case AuthErrorCodesEnum.InvalidCredentials:
            passwordError.value = 'The password or email you entered is incorrect'
            break
          default:
            passwordError.value = 'Something wrong please try again later'
        }
      }
      await nextTick()
      console.log(data)
      if (data?.access_token)
        router.push({
          name: weatherEnumRoutes.dashboard.name,
        })
      isLoading.value = false
    } else {
      emailError.value = result.error.errors.find((e) => e.path[0] === 'email')?.message ?? ''
      passwordError.value = result.error.errors.find((e) => e.path[0] === 'password')?.message ?? ''
    }
  }
</script>

<template>
  <BaseAuthCard>
    <template #title> Log into your account </template>
    <template #content>
      <v-form class="d-flex flex-column align-stretch ga-7" @submit.prevent="loginHandler">
        <v-text-field
          density="compact"
          v-model="formData.email"
          hide-details="auto"
          :error-messages="emailError"
          variant="outlined"
          label="Email"
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="formData.password"
          hide-details="auto"
          variant="outlined"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          autocomplete="password"
          :error-messages="passwordError"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <v-btn
          type="submit"
          color="primary text-uppercase"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Continue
        </v-btn>
      </v-form>
      <div class="text-gray-1 text-subtitle-2 align-self-center font-weight-regular">
        Don't have an account?
        <v-hover>
          <template #default="{ isHovering, props }">
            <router-link
              v-bind="props"
              :to="{ name: authEnumRoutes.register.name }"
              class="text-primary cursor-pointer text-subtitle-2 text-uppercase font-weight-medium"
              :class="isHovering ? 'text-decoration-underline' : ''"
            >
              Sign up
            </router-link>
          </template>
        </v-hover>
      </div>
    </template>
  </BaseAuthCard>
</template>
