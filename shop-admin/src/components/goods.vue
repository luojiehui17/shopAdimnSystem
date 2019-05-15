<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ paht: '/goods'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加商品按钮 -->
        <el-button type="primary" @click="$router.push('/goodAdd')">添加商品</el-button>
        <!-- 商品列表 -->
         <el-table
            :data="goodsList"
            style="width: 100%">
            <el-table-column
                prop="goods_id"
                label="ID"
                width="80">
            </el-table-column>
            <el-table-column
                prop="goods_name"
                label="商品名称">
            </el-table-column>
            <el-table-column
                label="操作"
                width="220">
                <template slot-scope="goods">
                    <el-button type="primary" icon="el-icon-delete" @click="del(goods)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[10, 20, 100, 200]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

    </div>
</template>

<script>
import {getGoodsList,delGoods} from "@/api"
export default {
    data() { 
        return {
            // 商品列表
            goodsList:[],
            // ////分页数据////
            // 总条数
            total:0,
            // 页码
            pagenum: 1,
            // 每页条数
            pagesize: 10

        }
    },
    methods:{
        // 刷新商品列表
        initList(){
            getGoodsList(this.pagenum,this.pagesize).then(res=>{
                // console.log(res)
                this.goodsList = res.data.goods
                this.total = res.data.total
                // this.pagenum = res.data.pagenum
            })
        },
        // 每页显示数量大小改变
        handleSizeChange(size){
            this.pagesize = size;
            // 刷新列表
            this.initList();
        },
        //页码大小改变
         handleCurrentChange(num){
            this.pagenum = num;
            // 刷新列表
            this.initList();
         },
        //  商品删除
        del(good){
            // console.log(good)
            delGoods(good.row.goods_id).then(res=>{
                // console.log(res)
                if(res.meta.status==200){
                    // 提示信息
                    this.$message({
                        message: res.meta.msg,
                        type: 'success'
                    });
                    // 刷新列表
                    this.initList()
                }else{
                    // 提示信息
                    this.$message.error(res.meta.msg);
                }
            })
        }
    },
    created(){
        this.initList()
    }
}
</script>

<style lang="scss" scoped>
.el-pagination{
    background-color: #d3dce6
}
</style>