import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import SupercarList from './components/SupercarList.vue'
import SupercarDetail from './components/SupercarDetail.vue'
import SupercarEdit from './components/SupercarEdit.vue'
import DesignerList from './components/DesignerList.vue'
import DesignerDetail from './components/DesignerDetail.vue'
import SupercarCreate from './components/SupercarCreate.vue'
import ManufactureList from './components/ManufactureList.vue'
import DesignerEdit from './components/DesignerEdit.vue'
import DesignerCreate from './components/DesignerCreate.vue'
import ManufactureDetail from './components/ManufactureDetail.vue'
import ManufactureEdit from './components/ManufactureEdit.vue'
import ManufactureCreate from './components/ManufactureCreate.vue'


const routes = [
  {
    path: '/',
    component: SupercarList,
    props: true
  },
  {
    path: '/supercar/:id',
    component: SupercarDetail,
    props: true
  },
  {
    path: '/designerList',
    component: DesignerList,
    props: true
  },
  {
    path: '/designer/:id',
    component: DesignerDetail,
    props: true
  },
  {
    path: '/designeredit/:id',
    component: DesignerEdit,
    props: true
  },
  {
    path: '/designercreate',
    component: DesignerCreate,
    props: true
  },

  {
    path: '/manufacturer/:id',
    component: ManufactureDetail,
    props: true
  },
  {
    path: '/manufactureredit/:id',
    component: ManufactureEdit,
    props: true
  },
  {
    path: '/manufacturercreate',
    component: ManufactureCreate,
    props: true
  },
  {
    path: '/supercaredit/:id',
    component: SupercarEdit,
    props: true
  },
  {
    path: '/supercarcreate',
    component: SupercarCreate,
    props: true
  },
  {
    path: '/manufacturelist',
    component: ManufactureList,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')



