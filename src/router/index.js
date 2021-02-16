import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Config from '../views/Config.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Profile from '../views/Profile.vue'
import Yearbooks from '../views/Yearbooks.vue'
import Yearbook from '../views/Yearbook.vue'

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
    path: '/setup',
    name: 'Setup',
    component: () => import(/* webpackChunkName: "setup" */ '../views/Setup.vue')
  },
  {
    path: '/yearbooks',
    name: 'Yearbooks',
    component: Yearbooks
  },
  {
    path: '/yearbooks/:id',
    name: 'Yearbook',
    component: Yearbook,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    children: [
      // Users //
      {
        path: '',
        component: () => import(/* webpackChunkName: "dashboard_mainmenu" */ '../views/Dashboard/MainMenu.vue')
      },
      {
        path: "uploads",
        component: () => import(/* webpackChunkName: "dashboard_uploads" */ '../views/Dashboard/Uploads.vue')
      },
      {
        path: "gallery",
        component: () => import(/* webpackChunkName: "dashboard_gallery" */ '../views/Dashboard/Gallery.vue')
      },
      // ADMINS //
      {
        path: "admin/uploads",
        component: () => import(/* webpackChunkName: "dashboard_adminuploads" */ '../views/Dashboard/Admin/GroupUploads.vue')
      },
      {
        path: "admin/gallery",
        component: () => import(/* webpackChunkName: "dashboard_admingallery" */ '../views/Dashboard/Admin/GalleryAdmin.vue')
      },
      {
        path: "admin/yearbook",
        component: () => import(/* webpackChunkName: "dashboard_yearbook" */ '../views/Dashboard/Admin/Yearbook.vue')
      },
    ]
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import(/* webpackChunkName: "messages" */ '../views/Messages.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: "/",
  routes
})

// Avoid unauthorized users enter dashboard
router.beforeEach((to, from, next) => {
  switch (to.name) {
    case "Dashboard":
    case "Profile":
    case "Messages":
      if (!localStorage.loggedin) {
        next({name: "Home"})
      }
    break;
    case "Login":
      if(localStorage.loggedin) {
        next({name: "Dashboard"})
      }
    break;
  }
  next()
})

export default router
