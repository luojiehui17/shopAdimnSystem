<template>
    <div>
        <!-- 订单列表 -->
        <el-table
            :border="true"
            :data="ordersList"
            style="width: 100%">
            <el-table-column
                prop="order_id"
                label="订单ID"
                width="80">
            </el-table-column>
            <el-table-column
                prop="is_send"
                label="是否发货"
                width="80">
            </el-table-column>
            <el-table-column
                prop="user_id"
                label="用户ID"
                width="80">
            </el-table-column>
            <el-table-column
                prop="pay_status"
                label="支付状态"
                width="80">
            </el-table-column>
            <el-table-column
                prop="consignee_addr"
                label="发货地址">
            </el-table-column>
            <el-table-column
                label="操作"
                width="220">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 20, 200, 200]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
import {getOrdersList} from "@/api"
export default {
    data() { 
        return {
            // 订单列表
            ordersList:[],
            /////////分页/////////
            // 页码
            pagenum:1,
            //每页数量
            pagesize: 10,
            // 总条数
            total:0
        }
    },
    methods:{
        // 刷新列表
        initList(){
            getOrdersList(this.pagenum,this.pagesize).then(res=>{
                // console.log(res)
                this.ordersList = res.data.goods
                this.total = res.data.total
                
            })
        },
        // 每页是显示数量改变
        handleSizeChange(size){
            this.pagesize = size;
            // 刷新
            this.initList()
        },
        // 页码改变
        handleCurrentChange(num){
            this.pagenum = num;
            // 刷新
            this.initList()
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