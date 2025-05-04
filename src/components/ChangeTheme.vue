<template>
  <div class="theme-container">
    <v-switch
      :model-value="theme.global.name.value === 'darkTheme'"
      hide-details
      inset
      @update:model-value="toggleTheme"
    />
    <span>
      {{ isDark ? 'Dark Mode' : 'Light Mode' }}
    </span>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const toggleTheme = () => {
    const newTheme = theme.global.name.value === 'darkTheme' ? 'lightTheme' : 'darkTheme'
    theme.global.name.value = newTheme
    localStorage.setItem('theme', newTheme)
  }
  const isDark = computed(() => theme.global.name.value === 'darkTheme')
</script>
