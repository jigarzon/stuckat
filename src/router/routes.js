
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'my-case', component: () => import('pages/EditCase.vue') },
      { path: 'my-case/saved', component: () => import('pages/CaseSaved.vue') },
      { path: 'nearby', component: () => import('pages/NearCases.vue') },
      { path: 'privacy', component: () => import('pages/Privacy.vue') },
      { path: 'terms', component: () => import('pages/Terms.vue') },
      { path: 'contact', component: () => import('pages/Contact.vue') },
      { path: 'faq', component: () => import('pages/FAQ.vue') },
      { path: 'admin/cases', component: () => import('pages/admin/Cases.vue') },
      { path: 'admin/contact-messages', component: () => import('pages/admin/ContactMessages.vue') },
      { path: 'admin/cases/:id', component: () => import('pages/admin/Case.vue') }
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
