<template>
    <div>
        <el-table
            :border="true"
            :data="authList"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                width="80">
            </el-table-column>
            <el-table-column
                prop="authName"
                label="权限名称">
                <template slot-scope="auth">
                    {{auth.row | levelTab}}
                </template>
            </el-table-column>
            <el-table-column
                prop="level"
                label="权限层次">
            </el-table-column>
            <el-table-column
                prop="path"
                label="权限路径">
            </el-table-column>
            <el-table-column
                label="操作">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {getAuthList} from '@/api'
export default {
    data() { 
        return {
            // 权限列表数据
            authList:[],

        }
    },
    methods:{
        
    },
    created(){
        //发起获取权限列表请求
        getAuthList('list').then(res=>{
            // console.log(res)
            // 将响应的数据存放
            this.authList = res.data;
            
            
            // 用于存放排序的层次权限
            var result = [];
            // 使用递归进行无限级分类
            // params1 arr arr 需要排序的数组
            // params2 id 权限id 需要通过这个id找子权限
            function levelSort(arr,id){
                // 遍历数组
                arr.forEach(item=>{
                    // 判断当前项的pid是否等于id
                    if(item.pid == id){
                        // 将相等的项追加到result数组中
                        result.push(item)
                        // 根据当前项的id找子权限
                        levelSort(arr,item.id)
                    }
                })
            }
            levelSort(this.authList,0)
            this.authList = result
        })
    },
    filters:{
        levelTab(row){
            return '　　'.repeat(row.level)+row.authName
        }
    }
}
</script>

<style lang="" scoped>
</style>