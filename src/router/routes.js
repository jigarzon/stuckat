
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'my-case', component: () => import('pages/EditCase.vue') },
      { path: 'my-case/saved', component: () => import('pages/CaseSaved.vue') },
      { path: 'privacy', component: () => import('pages/Privacy.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
