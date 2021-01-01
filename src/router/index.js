import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Config from '../views/Config.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/config',
    name: 'Config',
    component: Config
  },
  {
    path: '/yearbooks',
    name: 'Yearbooks',
    component: () => import(/* webpackChunkName: "yearbooks" */ '../views/Yearbooks.vue')
  },
  {
    path: '/yearbooks/:id',
    name: 'Yearbook',
    component: () => import(/* webpackChunkName: "yearbook" */ '../views/Yearbook.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue')
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    children: [
      // Users //
      {
        path: '',
        component:  () => import(/* webpackChunkName: "dashboard_mainmenu" */ '../views/Dashboard/MainMenu.vue')
      },
      {
        path: "uploads",
        component:  () => import(/* webpackChunkName: "dashboard_uploads" */ '../views/Dashboard/Uploads.vue')
      },
      {
        path: "gallery",
        component:  () => import(/* webpackChunkName: "dashboard_gallery" */ '../views/Dashboard/Gallery.vue')
      },
      // ADMINS //
      {
        path: "admin/uploads",
        component:  () => import(/* webpackChunkName: "dashboard_adminuploads" */ '../views/Dashboard/Admin/GroupUploads.vue')
      },
      {
        path: "admin/gallery",
        component:  () => import(/* webpackChunkName: "dashboard_admingallery" */ '../views/Dashboard/Admin/GalleryAdmin.vue')
      },
      {
        path: "admin/yearbook",
        component:  () => import(/* webpackChunkName: "dashboard_yearbook" */ '../views/Dashboard/Admin/Yearbook.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Avoid unauthorized users enter dashboard
router.beforeEach((to, from, next) => {
  switch (to.name) {
    case "Dashboard":
      if (!localStorage.loggedin) {
        next({name: "Home"})
      }
    break;
    case "Guardians":
      if (!localStorage.loggedin || localStorage.loggedin !== "guardians") {
        next({name: 'Login'})
      }
    break;
    case "Login":
      if(localStorage.loggedin) {
        next({name: "Home"})
      }
    break;
  }
  next()
})

export default router
