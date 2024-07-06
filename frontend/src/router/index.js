import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SignupView from '../views/Signup.vue'
import LoginView from '../views/LoginView.vue'
import MyAccount from '../views/dashboard/MyAccount.vue'
import CoursesView from '../views/CoursesView.vue'
import CourseView from '../views/CourseView.vue'
import AuthorView from '../views/AuthorView.vue'
import CreateCourseView from '../views/dashboard/CreateCourseView.vue'

//CARP
import CARPView from '../views/CARPView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard/profile',
    name: 'dashboard',
    component: MyAccount
  },
  {
    path: '/courses',
    name: 'courses',
    component: CoursesView
  },
  {
    path: '/course/:slug',
    name: 'course',
    component: CourseView
  },
  {
    path: '/authors/:id',
    name: 'author',
    component: AuthorView
  },
  {
    path: '/dashboard/create-course',
    name: 'create-course',
    component: CreateCourseView
  },//CARP VIEW
  {
    path: '/carp',
    name: 'carp',
    component: CARPView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
