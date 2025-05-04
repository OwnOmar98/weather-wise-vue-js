# Vue 3 Authentication App

This project is a Vue 3 application with user authentication (login/register), light/dark theme toggling, and basic protected routing. It uses the following technologies:

- **Vue 3** with `<script setup lang=ts>`
- **TypeScript**
- **Pinia** for state management
- **Vue Router** for routing
- **Vuetify** as the UI framework
- **Axios** for HTTP requests
- **Zod** for form validation
- **JWT**-based authentication (via localStorage)

## 📁 Project Structure

```bash
.
├── assets/ # Global CSS and styles
├── components/ # Shared UI components (e.g., ChangeTheme)
├── helpers/ # Interfaces, enums, constants
├── plugins/ # Axios, Vuetify, Pinia configuration
├── router/ # Vue Router definitions
├── stores/ # Pinia stores (e.g., auth)
├── views/ # Page components (Login, Register)
├── App.vue # Root component
└── main.ts # App entry point
```

## 🚀 Features

- JWT Authentication (login/register)
- Auto logout on 401 errors
- Vuetify-based theme switcher (light/dark mode)
- Route protection and redirection
- Centralized Axios config with interceptors
- Zod validation for forms
- Clean and responsive design

## 🛠️ Setup Instructions

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file with:

```bash
VITE_BASE_URL=http://localhost:5000/api/
```

### Running the App

```bash
pnpm dev
```
