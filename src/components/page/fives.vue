<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>五等奖列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload" v-model="filename">导出excel</el-button>
        </div>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="card" label="电子卡号" width="100">
            </el-table-column>
            <el-table-column prop="consignee" label="领卡人" width="100">
            </el-table-column>
            <el-table-column prop="idNumber" label="身份证号" width="150">
            </el-table-column>
            <el-table-column prop="tel" label="手机号" width="100">
            </el-table-column>
            <el-table-column prop="getAt" label="领取时间">
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
            //导出
            handleDownload() {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel');
                    const tHeader = ['电子卡号', '领卡人', '身份证', '手机号', '领取时间'];
                    const filterVal = ['card', 'consignee', 'idNumber', 'tel', 'getAt'];
                    const list = this.tableData;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, this.filename);
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },

            //分页显示
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },

            getData(){
                let self = this;
                self.$axios.get("/order/fivelist").then((res) => {
                    self.tableData = res.data.data;
                    console.log(self.tableData);
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
