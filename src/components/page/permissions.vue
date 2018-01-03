<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box" v-show="show">
            <el-button type="primary" icon="plus" class="handle-del mr10" @click="add">新建</el-button>
        </div>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" v-show="show">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="account" label="用户名" width="200">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="200">
            </el-table-column>
            <el-table-column prop="permission" label="权限" width="200">
                <template slot scope="scope">
                    {{scope.row.permission == '1' ? '高级' : '普通'}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

        <!--添加list弹窗-->
        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="form.account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-select v-model="permission" placeholder="请选择类型" style="width: 100%;">
                        <el-option
                            v-for="item in key"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisibleYes()">确 定</el-button>
            </div>
        </el-dialog>

        <!--编辑list弹窗-->
        <el-dialog title="编辑管理员" :visible.sync="dialogFormEdit">
            <el-form :model="form">
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <el-select v-model="permission" placeholder="请选择类型" style="width: 100%;">
                        <el-option
                            v-for="item in key"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormEditYes()">确 定</el-button>
            </div>
        </el-dialog>

        <!--权限-->
        <div v-show="Permission">
            您暂时没有此权限
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                addData:[],
                cur_page: 1,
                del_list: [],
                is_search: false,
                dialogFormVisible: false,
                dialogFormEdit: false,
                key: [{
                    value: '1',
                    label: '高级'
                }, {
                    value: '2',
                    label: '普通'
                }],
                form: {
                    account: '',
                    password: '',
                },
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

            //获取数据
            getData(){
                let self = this;
                self.$axios.get("/permission/list").then((res) => {
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

            //添加管理员
            add(){
                this.dialogFormVisible = true;
            },
            dialogFormVisibleYes(){
                let _this = this;
                this.dialogFormVisible = false;
                let params = {
                    account:_this.form.account,
                    password:_this.form.password,
                    permission:_this.permission,
                    editor:localStorage.getItem("ms_username"),
                };
                this.$axios.post('/permission/save',params).then((res)=>{
                    console.log(res.data.data);
                    _this.addData = res.data.data;
                    _this.tableData.unshift(_this.addData);
//                    _this.getData();
                    _this.open6();
                },(err)=>{
                    console.log(err);
                })
            },
            //添加成功
            open6() {
                this.$message({
                    showClose: true,
                    message: '添加数据成功',
                    type: 'success'
                });
            },

            //编辑管理员
            handleEdit(index, row) {
                this.dialogFormEdit = true;
                this.row = row;
            },
            dialogFormEditYes(){
                let _this = this;
                this.dialogFormEdit = false;
                let params = {
                    id:_this.row._id,
                    password:_this.form.password,
                    permission:_this.permission,
                    editor:localStorage.getItem("ms_username"),
                };
                this.$axios.post('/permission/update',params).then((res)=>{
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
