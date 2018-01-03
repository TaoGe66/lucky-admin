<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>白名单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="重庆市" value="重庆市"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选微信账号" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="region" label="地区" width="100" :formatter="formatter">
            </el-table-column>
            <el-table-column prop="account" label="微信账号" width="150" :formatter="formatter2">
            </el-table-column>
            <el-table-column prop="name" label="微信昵称" width="150">
            </el-table-column>
            <el-table-column prop="createdAt" label="注册时间" width="250">
            </el-table-column>
            <el-table-column prop="allNum" label="登录次数" width="100">
            </el-table-column>
            <el-table-column prop="remainNum" label="剩余次数" width="100">
            </el-table-column>
            <el-table-column prop="whiteList" label="白名单" width="80">
                <template scope="scope">
                    <el-button size="small" v-show="show" v-if="scope.row.whiteList == false ? btn_show : btn_hide"
                        @click="add(scope.$index, scope.row)">加入
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="primary"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

        <!--加入白名单弹窗提示-->
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>确定加入白名单吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogShow()">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑list弹窗-->
        <el-dialog title="编辑次数" :visible.sync="dialogFormEdit" width="300px">
            <el-form :model="form">
                <el-form-item label="剩余次数" :label-width="formLabelWidth">
                    <el-input v-model="form.remainNum" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormEditYes()">确 定</el-button>
            </div>
        </el-dialog>
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
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogFormEdit: false,
                form: {
                    account: '',
                    remainNum:'',
                    region:'',
                },
                formLabelWidth: '70px',
                index:'',
                permission:'',
                row:[],
                pageSize:10,
                currentPage:1,
                btn_show:true,
                btn_hide:false,
                show:false,
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
                        if(d.region.indexOf(self.select_cate) > -1 &&
                          (d.account.indexOf(self.select_word) > -1 ||
                           d.region.indexOf(self.select_word) > -1)
                        ){
                           return d;
                        }
                    }
                })
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

            getData(){
                let self = this;
                self.$axios.get("/user/list").then((res) => {
                    self.tableData = res.data.data;
//                    console.log(localStorage.getItem('Permissions'));
                    if(localStorage.getItem('Permissions') == 1){
                        self.show = true;
                    }
                })
            },

            //加入白名单
            add(index, row) {
                this.index = index;
                this.row = row;
                this.centerDialogVisible = true;
            },
            centerDialogShow(){
                let _this = this;
                console.log(this.index);
                console.log(this.row);
                this.centerDialogVisible = false;
                let params = {
                    id:this.row._id,
                    editor:localStorage.getItem("ms_username"),
                };
                this.$axios.post('/user/savewhitelist',params).then((res)=>{
                    console.log(res.data.data);
                    _this.getData();
                },(err)=>{
                    console.log(err);
                })
            },

            //编辑次数
            handleEdit(index, row) {
                this.dialogFormEdit = true;
                this.index = index;
                this.row = row;
            },
            dialogFormEditYes(){
                let _this = this;
                this.dialogFormEdit = false;
                let params = {
                    id:this.row._id,
                    remainNum:this.form.remainNum,
                    editor:localStorage.getItem("ms_username"),
                };
                this.$axios.post('/user/update',params).then((res)=>{
                    console.log(res.data.data);
                    _this.getData();
                    _this.open12();
                },(err)=>{
                    console.log(err);
                })
            },
            //添加成功
            open12() {
                this.$message({
                    showClose: true,
                    message: '修改数据成功',
                    type: 'success'
                });
            },

            search(){
                this.is_search = true;
            },
            formatter(row, column) {
             return row.region;
            },
            formatter2(row, column) {
                return row.account;
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
