<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="select_cate" class="handle-select mr10">
                <el-option key="0" label="全部" value=""></el-option>
                <el-option key="1" label="未领取" value="1"></el-option>
                <el-option key="2" label="待发货" value="2"></el-option>
                <el-option key="3" label="已完成" value="3"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选订单编号" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-button type="primary" @click="Router()">发货</el-button>
        </div>
        <el-table :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="region" label="地区" width="100" :formatter="formatter">
            </el-table-column>
            <el-table-column prop="account" label="微信账号" width="250">
            </el-table-column>
            <el-table-column prop="orderId" label="订单编号" width="150" :formatter="formatter2">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100">
                <template slot scope="scope">
                    {{scope.row.type == '1' ? '实物' : (scope.row.type == '2' ? '虚拟' : '电子卡')}}
                </template>
            </el-table-column>
            <el-table-column prop="prize" label="奖项" width="150">
            </el-table-column>
            <el-table-column prop="createdAt" label="中奖时间" width="250">
            </el-table-column>
            <el-table-column prop="state" label="订单状态" :formatter="formatter3">
                <template slot scope="scope">
                    {{scope.row.state == '1' ? '未领取' : (scope.row.state == '2' ? '待发货' : '已发货')}}
                </template>
            </el-table-column>
        </el-table>
        <div class="block pages">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                centerDialogVisible:false,
                tableData: [],
                addData:[],
                cur_page: 1,
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                index:'',
                permission:'',
                row:[],
                pageSize:10,
                currentPage:1,
                btn_show:true,
                btn_hide:false,
                filename:'',
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.state.indexOf(self.select_cate) > -1 &&
                            (d.orderId.indexOf(self.select_word) > -1 ||
                            d.region.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                });
            }
        },
        methods: {

            //分页显示
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },

            //获取数据
            getData(){
                let self = this;
                self.$axios.get("/order/list").then((res) => {
                    self.tableData = res.data.data;
                    console.log(self.tableData);
                })
            },

            //发货跳转
            Router(){
                this.$router.push('/ship');
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.region;
            },
            formatter2(row, column) {
                return row.orderId;
            },
            formatter3(row, column) {
                return row.state;
            },
        }
    }
</script>

<style scoped>
    .handle-box{
        margin-bottom: 20px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
    .pages{
        margin-top: 20px;
        text-align: right;
    }
</style>

