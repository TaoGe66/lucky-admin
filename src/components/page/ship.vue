<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>待发货</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="orderId" label="订单编号" width="150">
            </el-table-column>
            <el-table-column prop="consignee" label="收货人" width="150">
            </el-table-column>
            <el-table-column prop="tel" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="postalCode" label="邮政编码" width="150">
            </el-table-column>
            <el-table-column prop="address" label="收货地址" width="150">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="primary"
                        @click="handleEdit(scope.$index, scope.row)">录入物流</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="block pages">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="tableData.length">
            </el-pagination>
        </div>

        <!--编辑list实体物品弹窗-->
        <el-dialog title="编辑次数" :visible.sync="dialogFormEdit" width="300px">
            <el-form :model="form">
                <el-form-item label="物流名称" :label-width="formLabelWidth">
                    <el-input v-model="form.logistics" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="物流单号" :label-width="formLabelWidth">
                    <el-input v-model="form.odd" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormEditYes()">发 货</el-button>
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
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                dialogFormEdit: false,
                form: {
                    logistics: '',
                    odd:'',
                },
                formLabelWidth: '70px',
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
                self.$axios.get("/order/sendlist").then((res) => {
                    self.tableData = res.data.data;
                    console.log(self.tableData);
                })
            },

            //发货
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
                    logistics:this.form.logistics,
                    odd:this.form.odd,
                    editor:localStorage.getItem("ms_username"),
                };
                this.$axios.post('/order/send',params).then((res)=>{
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
                    message: '发货成功',
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
                return row.name;
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

