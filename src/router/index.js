import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/baseTable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/orderList',
                    component: resolve => require(['../components/page/orderList.vue'], resolve)
                },
                {
                    path: '/awards',
                    component: resolve => require(['../components/page/awards.vue'], resolve)
                },
                {
                    path: '/fives',
                    component: resolve => require(['../components/page/fives.vue'], resolve)
                },
                {
                    path: '/ship',
                    component: resolve => require(['../components/page/ship.vue'], resolve)
                },
                {
                    path: '/whitelist',
                    component: resolve => require(['../components/page/whitelist.vue'], resolve)
                },
                {
                    path: '/permissions',
                    component: resolve => require(['../components/page/permissions.vue'], resolve)
                },
                {
                    path: '/log',
                    component: resolve => require(['../components/page/log.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
