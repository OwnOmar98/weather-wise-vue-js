export const authEnumRoutes = {
  login: {
    path: '/auth/login',
    name: 'Login',
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
  },
  register: {
    path: '/auth/register',
    name: 'Register',
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
  },
}
