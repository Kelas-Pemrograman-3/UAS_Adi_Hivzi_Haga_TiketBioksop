
const routes = [
  {
    path: '/',
    component: () => import('layouts/guest.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/input',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/InputData.vue') }
    ]
  },
  {
    path: '/insert',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/InputFilm.vue') }
    ]
  },
  {
    path: '/databioskop',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/databioskop.vue') }
    ]
  },
  {
    path: '/datafilm',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/datafilm.vue') }
    ]
  }
]
// Always leave this as last one

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '/inputdata',
    component: () => import('pages/Index.vue')
  })
}
export default routes
