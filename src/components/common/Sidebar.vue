<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <!--<template v-if="item.subs">-->
                <!--<el-submenu :index="item.index">-->
                <!--<template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>-->
                <!--<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}-->
                <!--</el-menu-item>-->
                <!--</el-submenu>-->
                <!--</template>-->
                <!--<template v-else>-->
                <el-menu-item :index="item.index">
                    <i :class="item.icon"></i>{{ item.title }}
                </el-menu-item>
                <!--</template>-->
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'baseTable',
                        title: '用户管理',
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'orderList',
                        title: '订单列表',
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'awards',
                        title: '奖项管理',
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'whitelist',
                        title: '白名单管理',
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'permissions',
                        title: '权限管理',
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'log',
                        title: '操作日志',
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
