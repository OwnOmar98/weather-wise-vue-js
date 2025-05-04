import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const storedTheme = localStorage.getItem('theme') || 'lightTheme'

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: storedTheme,
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          background: '#F5F5F5',
          surface: '#FFFFFF',
          primary: '#00416b',
          secondary: '#424242',
        },
      },
      darkTheme: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#4e98bf',
          secondary: '#B0BEC5',
        },
      },
    },
  },
})
