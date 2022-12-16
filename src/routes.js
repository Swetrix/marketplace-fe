const routes = Object.freeze({
  signin: '/login',
  signup: '/signup',
  main: '/',
  dashboard: '/dashboard',
  user_settings: '/settings',
  extension: '/extensions/:id',
  new_extension: '/extensions/new',
  extension_settings: '/extensions/settings/:id',
  installed_extension_settings: '/extensions/installed/settings/:id',
  docs: '/docs',
  checklist: '/checklist',
  privacy: '/privacy',
  terms: '/terms',
  contact: '/contact',
  search: '/search',
  view_extensions: '/extensions/:id',
})

export default routes
