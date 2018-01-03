<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>奖项管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="leavel" label="等级" width="100">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="100">
            </el-table-column>
            <el-table-column prop="oads" label="中奖几率" width="150">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100">
                <template slot scope="scope">
                    {{scope.row.type == '1' ? '实物' : (scope.row.type == '2' ? '虚拟' : '电子卡')}}
                </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="100">
            </el-table-column>
            <el-table-column prop="reviseAt" label="编辑时间" width="250">
            </el-table-column>
            <el-table-column prop="editor" label="编辑人" width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="primary"
                        v-if="scope.row.type == 1 ? btn_show : btn_hide"
                        @click="handleEdit1(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="primary"
                        v-if="scope.row.type == 2 ? btn_show : btn_hide"
                        @click="handleEdit2(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="primary"
                        v-if="scope.row.type == 3 ? btn_show : btn_hide"
                        @click="handleEdit3(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small"
                        v-if="scope.row.type == 3 ? btn_show : btn_hide"
                        @click="handleRouter(scope.$index, scope.row)">查看</el-button>
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
        <el-dialog title="编辑次数" :visible.sync="dialogFormEdit1" width="300px">
            <el-form>
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="row.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中奖几率" :label-width="formLabelWidth">
                    <el-input v-model="row.oads" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                    <el-input v-model="row.num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="row.type" placeholder="请选择类型" style="width: 100%;">
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
                <el-button @click="dialogFormEdit1 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormEditYes1()">确 定</el-button>
            </div>
        </el-dialog>

        <!--编辑list虚拟物品弹窗-->
        <el-dialog title="编辑次数" :visible.sync="dialogFormEdit2" width="300px">
            <el-form>
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="row.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中奖几率" :label-width="formLabelWidth">
                    <el-input v-model="row.oads" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                    <el-input v-model="row.num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网址" :label-width="formLabelWidth">
                    <el-input v-model="row.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="row.type" placeholder="请选择类型" style="width: 100%;">
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
                <el-button @click="dialogFormEdit2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormEditYes2()">确 定</el-button>
            </div>
        </el-dialog>

        <!--编辑list电子卡物品弹窗-->
        <el-dialog title="编辑次数" :visible.sync="dialogFormEdit3" width="300px">
            <el-form>
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="row.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中奖几率" :label-width="formLabelWidth">
                    <el-input v-model="row.oads" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth">
                    <el-input v-model="row.num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="row.type" placeholder="请选择类型" style="width: 100%;">
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
                <el-button @click="dialogFormEdit3 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormEditYes3()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                tableData: [],
                dialogFormEdit1: false,
                dialogFormEdit2: false,
                dialogFormEdit3: false,
                key: [{
                    value: '1',
                    label: '实物'
                }, {
                    value: '2',
                    label: '虚拟'
                }, {
                    value: '3',
                    label: '电子卡'
                }],
                formLabelWidth: '70px',
                index:'',
                row:[],
                pageSize:10,
                currentPage:1,
                btn_show:true,
                btn_hide:false,
                filename:'',
                type:'',
                name: '',
                num:'',
                oads:'',
                url:'',
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
                self.$axios.get("/prize/list").then((res) => {
                    self.tableData = res.data.data;
                    console.log(self.tableData);
                })
            },

            //编辑实体物品
            handleEdit1(index, row) {
                this.dialogFormEdit1 = true;
                this.index = index;
                this.row = row;
            },
            dialogFormEditYes1(){
                let _this = this;
                this.dialogFormEdit1 = false;
                let params = {
                    id:this.row._id,
                    name:this.row.name,
                    num:this.row.num,
                    editor:localStorage.getItem("ms_username"),
                    oads:this.row.oads,
                    type:this.row.type,
                };
                this.$axios.post('/prize/update',params).then((res)=>{
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
            //编辑虚拟物品
            handleEdit2(index, row) {
                this.dialogFormEdit2 = true;
                this.index = index;
                this.row = row;
            },
            dialogFormEditYes2(){
                let _this = this;
                this.dialogFormEdit2 = false;
                let params = {
                    id:this.row._id,
                    name:this.row.name,
                    num:this.row.num,
                    editor:localStorage.getItem("ms_username"),
                    oads:this.row.oads,
                    type:this.row.type,
                    url:this.row.url,
                };
                this.$axios.post('/prize/update',params).then((res)=>{
                    console.log(res.data.data);
                    _this.getData();
                    _this.open12();
                },(err)=>{
                    console.log(err);
                })
            },
            //编辑电子卡物品
            handleEdit3(index, row) {
                this.dialogFormEdit3 = true;
                this.index = index;
                this.row = row;
            },
            dialogFormEditYes3(){
                let _this = this;
                this.dialogFormEdit3 = false;
                let params = {
                    id:this.row._id,
                    name:this.row.name,
                    num:this.row.num,
                    editor:localStorage.getItem("ms_username"),
                    oads:this.row.oads,
                    type:this.row.type,
                };
                this.$axios.post('/prize/update',params).then((res)=>{
                    console.log(res.data.data);
                    _this.getData();
                    _this.open12();
                },(err)=>{
                    console.log(err);
                })
            },

            //查看跳转
            handleRouter(index, row){
                this.index = index;
                this.row = row;
                this.$router.push('/fives');
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
