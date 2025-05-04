<script setup lang="ts">
  import { nextTick, reactive, ref } from 'vue'

  import { AuthErrorCodesEnum } from '@/helpers/const/authError.const'
  import { RegisterSchema, type RegisterDto } from '@/helpers/interface/register.interface'
  import { authEnumRoutes } from '@/router/auth/auth.enum.routes'
  import { weatherEnumRoutes } from '@/router/weather/weather.enum.routes'
  import { useAuthStore } from '@/stores/auth.store'
  import { useRouter } from 'vue-router'
  import BaseAuthCard from '../components/BaseAuthCard.vue'

  const authStore = useAuthStore()

  const formData: RegisterDto = reactive({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
  })
  const showPassword = ref(false)
  const errors = reactive({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
  })

  const isLoading = ref(false)
  const resetError = () => {
    errors.email = ''
    errors.firstName = ''
    errors.middleName = ''
    errors.lastName = ''
    errors.password = ''
  }
  const router = useRouter()
  const registerHandler = async () => {
    resetError()
    await nextTick()
    const result = RegisterSchema.safeParse(formData)
    if (result.success) {
      isLoading.value = true
      const { error, data } = await authStore.register(formData)
      if (error?.response?.data.errorCode) {
        switch (error.response?.data.errorCode) {
          case AuthErrorCodesEnum.EmailInUse:
            errors.email = 'Email is already used'
            break
          default:
            errors.password = 'Something wrong please try again later'
        }
      }
      isLoading.value = false
      await nextTick()
      if (data?.access_token)
        router.push({
          name: weatherEnumRoutes.dashboard.name,
        })
    } else {
      errors.email = result.error.errors.find((e) => e.path[0] === 'email')?.message ?? ''
      errors.password = result.error.errors.find((e) => e.path[0] === 'password')?.message ?? ''
      errors.firstName = result.error.errors.find((e) => e.path[0] === 'firstName')?.message ?? ''
      errors.middleName = result.error.errors.find((e) => e.path[0] === 'middleName')?.message ?? ''
      errors.lastName = result.error.errors.find((e) => e.path[0] === 'lastName')?.message ?? ''
    }
  }
</script>

<template>
  <BaseAuthCard>
    <template #title> Create New Account </template>
    <template #content>
      <v-form class="d-flex flex-column align-stretch ga-7" @submit.prevent="registerHandler">
        <v-text-field
          density="compact"
          v-model="formData.email"
          hide-details="auto"
          :error-messages="errors.email"
          variant="outlined"
          label="Email"
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="formData.firstName"
          hide-details="auto"
          :error-messages="errors.firstName"
          variant="outlined"
          label="First Name"
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="formData.middleName"
          hide-details="auto"
          :error-messages="errors.middleName"
          variant="outlined"
          label="Middle Name"
        ></v-text-field>
        <v-text-field
          density="compact"
          v-model="formData.lastName"
          hide-details="auto"
          :error-messages="errors.lastName"
          variant="outlined"
          label="Last Name"
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
          :error-messages="errors.password"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <v-btn
          type="submit"
          color="primary text-uppercase"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Sign up
        </v-btn>
      </v-form>
      <div class="text-gray-1 text-subtitle-2 align-self-center font-weight-regular">
        Already have an account?
        <v-hover>
          <template #default="{ isHovering, props }">
            <router-link
              v-bind="props"
              :to="{ name: authEnumRoutes.login.name }"
              class="text-primary cursor-pointer text-subtitle-2 text-uppercase font-weight-medium"
              :class="isHovering ? 'text-decoration-underline' : ''"
            >
              Log In
            </router-link>
          </template>
        </v-hover>
      </div>
    </template>
  </BaseAuthCard>
</template>
