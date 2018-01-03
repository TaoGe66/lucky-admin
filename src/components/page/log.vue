<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>操作日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="editor" label="账号" width="120">
            </el-table-column>
            <el-table-column prop="createdAt" label="操作日期" width="250">
            </el-table-column>
            <el-table-column prop="IP" label="IP地址" width="250">
            </el-table-column>
            <el-table-column prop="handle" label="操作记录">
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

<script>
    export default {
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                pageSize:10,
                currentPage:1,
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
                self.$axios.get("/log/list").then((res) => {
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
