<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: 'goods/' }">商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 步骤条 -->
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
        </el-steps>
        <!-- tab标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
            <el-tab-pane label="基本信息" name="first">
                <!-- 基本信息表单 -->
                <el-form  :model="addForm" label-width="80px">
                    <el-form-item label="商品名称">
                        <el-input v-model="addForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="addForm.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="addForm.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="addForm.goods_weight"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品分类" name="second">
                <!-- 商品分类 -->
                <el-cascader
                    size="medium"
                    :options="options"
                    v-model="selectedOptions"
                    :props="props"
                    @change="handleChange">
                </el-cascader>
            </el-tab-pane>
            <el-tab-pane label="图片上传" name="third">
                <!-- 图片上传 -->
                <el-upload
                    class="upload-demo"
                    action="http://localhost:8888/api/private/v1/upload"
                    :headers='header'
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品介绍" name="fourth">
                <!-- 商品介绍 -->
                <!-- 定义ueditor挂载点 -->
                <div id="editor">

                </div>
                <!-- 提交按钮 -->
                <el-button type="primary" @click="submit">提交</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {getCategoriesList,addGoods} from "@/api"
export default {
    data() { 
        return {
            // 步骤条状态
            active:0,
            // tab便签页刷新时显示第一页
            activeName:'first',
            // 商品基本信息
            addForm:{
                goods_name:'',
                goods_price:'',
                goods_number:'',
                goods_weight:'',
                // 商品分类列表
                goods_cat:'',
                // 上传图片临时路径
                pics:[

                ],
                // 商品介绍
                goods_introduce:''
            },
            // 商品分类数据
            options:[],
            // 当前选择商品分类父级id
            selectedOptions:[],
            // 联级字段
            props:{
                value:'cat_id',
                label:'cat_name'
            },
            /////图片上传//////
            // 请求头
            header:{Authorization : localStorage.getItem('token')},
            /////////////富文本编辑器////////////////
            //注册一个数据用于存放富文本编辑器实例的内容
            editor:null,

        }
    },
    methods:{
        // 刷新列表
        initList(){
            getCategoriesList(3).then(res=>{
                this.options = res.data
            })
        },
        // tab改变事件
        handleClick(tab){
            // console.log(tab)
            this.active = tab.index*1
        },
        // 分类改变时
        handleChange(id){
            // console.log(id)
            this.addForm.goods_cat = id.join(',');
        },
        // ////上传图片///////
        // 删除图片时
        handleRemove(file, fileList){
            // 找要删除的索引
            let index = this.addForm.pics.findIndex(item=>{
                return item.uid==file.uid
            });
            // 根据索引删除
            this.addForm.pics.splice(index,1);
        },
        // 上传成功时
        handleSuccess(response, file, fileList){
            // console.log(response)
            // console.log(file)
            // console.log(fileList)
            this.addForm.pics.push({pic:response.data.tmp_path,uid:file.uid})
        },
        // 提交
        submit(){
            // 提交时获取富文本编辑器的内容
            // 富文本编辑器的内容获取方法   富文本实例.getContent()
            this.addForm.goods_introduce = this.editor.getContent()
            // 发送请求
            addGoods(this.addForm).then(res=>{
                // console.log(res)
                if(res.meta.status==201){
                    // 跳转商品列表
                    this.$router.push('/goods');
                    // 提示信息
                    this.$message({
                        message: res.meta.msg,
                        type: 'success'
                    });
                }else{
                    // 提示信息
                    this.$message.error(res.meta.msg)

                }
            });

        }

    },
    created(){
        this.initList()
    },
    mounted(){
        // 实例一个富文本编辑器
        this.editor=UE.getEditor('editor')
        // console.log(this.editor)
    }
}
</script>

<style lang="scss" scoped>
.el-tabs{
    margin-top: 30px;
}
</style>