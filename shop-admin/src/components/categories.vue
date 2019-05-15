<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 新增分类按钮 -->
        <el-button type="primary" @click="add">添加分类</el-button>
        <!-- 使用组件TreeGrid -->
        <TreeGrid
        :treeStructure="true"
        :columns="columns"
        :data-source="cateList">
        </TreeGrid>
        <!-- 新增分类弹窗 -->
        <el-dialog title="新增商品分类" :visible.sync="addDialog" width="30%">
            <el-form :model="addForm" :rules="rules" ref="addForm">
                <el-form-item label="分类名称" label-width="80px" prop="cat_name">
                <el-input v-model="addForm.cat_name" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属父级" label-width="80px" >
                    <!-- 联级显示 -->
                    <el-cascader
                        :change-on-select="true"
                        :props="props"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {getCategoriesList,addCategories} from '@/api';
import TreeGrid from '@/components/TreeGrid'
export default {
    data() { 
        return {
            // 商品分类列表
            cateList : [],
            // 组件字段
            columns : [{
                text: '分类名称',
                dataIndex: 'cat_name',
                width: ''
                }, {
                text: '是否有效',
                dataIndex: 'cat_deleted',
                width: ''
                }, {
                text: '排序',
                dataIndex: 'cat_level',
                width: ''
            }],
            // 添加商品分类表单数据
            addForm:{
                // 父级id
                cat_pid:'',
                // 分类名称
                cat_name:'',
                // 分类层级
                cat_level:''
            },
            // 表单检验规则
            rules:{
                cat_name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
            },
            // 添加分类弹窗控制变量开关
            addDialog : false,
            // 联级显示层级数据
            options:[],
            // 联级字段你
            props:{
                value:'cat_id',
                label:'cat_name'
            },
            // 联级当前选中级
            selectedOptions:[],
            

        }
    },
    methods:{
        // 刷新列表
        initList(){
            getCategoriesList(3).then(res=>{
                // console.log(res)
                this.cateList = res.data
            })
        },
        // 新增商品分类表单提交
        addSubmit(){
            // 检验分类名不为空
            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    addCategories(this.addForm).then(res=>{
                        // console.log(res)
                        if(res.meta.status==201){
                            // 关闭窗口
                            this.addDialog = false;
                            // 提示信息
                            this.$message({
                                message: res.meta.msg,
                                type: 'success'
                            });
                            // 清空对话框
                            this.addForm = {
                                    // 父级id
                                    cat_pid:'',
                                    // 分类名称
                                    cat_name:'',
                                    // 分类层级
                                    cat_level:''}
                            this.selectedOptions = []
                            // 刷新列表
                            this.initList()
                        }else{
                            this.$message.error(res.meta.msg)
                        }
                    })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        // 提交前准备
        add(){
            // 打开弹窗
            this.addDialog = true;
            // 查询前两级商品分类列表，联级显示
            getCategoriesList(2).then(res=>{
                // console.log(res)
                this.options = res.data
                // 为了用户能够创建新顶级分类，手动添加一个对象
                this.options.push({cat_name:"创建新顶级",cat_id:0})
            });
            
        },
        // 层级改变时
        handleChange(id){
            // console.log(id)
            // 将联级选中的第二个值赋值给表单
            this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length-1];
            // 根据联级下拉捕获的值来判断新增分类的层级
            if(this.selectedOptions.length==1){
                // 顶级或者一级
                if(this.selectedOptions[0]==0){
                    // 顶级
                    this.addForm.cat_level=0;
                }else{
                    // 一级
                    this.addForm.cat_level=1;
                }
            }else{
                // 两级
                this.addForm.cat_level=2;
            }

        }
    },
    created(){
        this.initList()
    },
    components:{
        TreeGrid
    }
}
</script>

<style lang="" scoped>
</style>