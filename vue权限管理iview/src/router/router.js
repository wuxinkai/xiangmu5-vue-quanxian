/**
 * 此文件配置路由信息
 */

const userRule = {
  path: '/users',
  component: () => import("@/views/users/Users.vue")
}
const roleRule ={
  path: '/roles',
  component: () => import("@/views/roles/Roles.vue")
}
const goodsRule = {
  path: '/goods',
  component: () => import("@/views/goods/GoodsList.vue")
}
const categoryRule = {
  path: '/categories',
  component: () => import("@/views/goods/GoodsCate.vue")
}

const ruleMapping = {
  'users': userRule,
  'roles': roleRule,
  'goods': goodsRule,
  'categories': categoryRule
  }

const routes =  [ 
  { 
    path: '/', 
    redirect: '/home' 
  },
  { 
    path: '/login', 
    component: () => import("@/views/Login.vue")
  },
  {
    path: '/home',
    component: () => import("@/views/Home.vue"),
    redirect: '/goods',
    children: [
      {
        path: '/welcome',
        component: () => import("@/views/Welcome.vue")
      },
    ]
  },
  {
    path: '*', //匹配不到上面的路径，就匹配，这界面
    component: () => import("@/views/NotFound.vue")
  }
];

export  {
  routes,
  ruleMapping
};
