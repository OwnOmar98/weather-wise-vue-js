<template>
  <v-card
    max-width="600"
    class="border ma-auto w-100"
    rounded="lg"
    variant="elevated"
    elevation="2"
  >
    <v-card-title class="border-b auth-header text-center">
      <slot name="title"></slot>
    </v-card-title>
    <v-card-text class="py-sm-7 px-sm-13 py-4 px-4 d-flex flex-column align-stretch ga-7">
      <slot name="content"></slot>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
  .auth-header {
    font-size: 1.125rem;
  }
</style>
