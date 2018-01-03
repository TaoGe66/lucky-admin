<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>白名单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" v-show="show">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="account" label="地区" width="150">
            </el-table-column>
            <el-table-column prop="password" label="用户ID" width="150">
            </el-table-column>
            <el-table-column prop="account" label="微信账号" width="150">
            </el-table-column>
            <el-table-column prop="password" label="微信昵称" width="150">
            </el-table-column>
            <el-table-column prop="account" label="注册时间" width="250">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="danger"
                         @click="handleDelete(scope.$index, scope.row)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block pages" v-show="show">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="tableData.length">
            </el-pagination>
        </div>

        <!--移除白名单弹窗提示-->
        <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>确定移除白名单吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogShow()">确 定</el-button>
            </span>
        </el-dialog>

        <div v-show="Permission">
            您暂时没有此权限
        </div>
    </div>
</template>

<script>
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
                dialogFormVisible: false,
                dialogFormEdit: false,
                formLabelWidth: '70px',
                index:'',
                permission:'',
                row:[],
                pageSize:10,
                currentPage:1,
                show:true,
                Permission:false,
            }
        },
        created(){
            this.getData();
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
                self.$axios.get("/user/whitelist").then((res) => {
                    self.tableData = res.data.data;
                    console.log(self.tableData);
                    if(localStorage.getItem('Permissions') == 1){
                        self.show = true;
                        self.Permission = false;
                    }
                    if(localStorage.getItem('Permissions') == 2){
                        self.show = false;
                        self.Permission = true;
                    }
                })
            },

            //删除
            handleDelete(index, row) {
                this.index = index;
                this.row = row;
                this.centerDialogVisible = true;
            },
            centerDialogShow(){
                console.log(this.index);
                console.log(this.row);
                this.centerDialogVisible = false;
                this.tableData.splice(this.index, 1);
                let params = {
                    id:this.row._id,
                    editor:localStorage.getItem("ms_username"),
                };
                this.$axios.post('/user/deletewhitelist',params).then((res)=>{
                    console.log(res.data.data);
                },(err)=>{
                    console.log(err);
                })
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
