import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);


import Home from '../components/Home/Home'
import Register from '../components/Account/Register'
import Login from '../components/Account/Login'
import Store from '../components/Store/Store'
import ProductLarge from '../components/Store/StoreComponents/ProductLarge'
import ShoppingCart from '../components/Store/ShoppingCart'
import Checkout from '../components/Store/Checkout'
import Logout from '../components/Account/Logout'
import Account from '../components/Account/Account'
import ThankYou from '../components/Store/ThankYou'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/products/:category',
    name: 'products-category',
    component: Store
  },
  {
    path: '/products/:category/:subcategory',
    name: 'products-subcategory',
    component: Store
  },
  {
    path: '/:id/:name',
    name: 'products-item',
    component: ProductLarge
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    component: ShoppingCart
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/checkout/:id/complete',
    name: 'thankyou',
    component: ThankYou
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/user/:id',
    name: 'account',
    component: Account
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
