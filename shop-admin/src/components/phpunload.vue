<template>
    <el-upload
        class="upload-demo"
        action="http://localhost:3333/unload.php"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-progress = "handleProgress"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
export default {
    data() { 
        return {

        }
    },
    methods:{
        handleRemove(file, fileList){
            // 找要删除的索引
            // let index = this.addForm.pics.findIndex(item=>{
            //     return item.uid==file.uid
            // });
            // 根据索引删除
            // this.addForm.pics.splice(index,1);
        },
        // 上传成功时
        handleSuccess(response, file, fileList){
            console.log(response)
            console.log(file)
            console.log(fileList)
            // this.addForm.pics.push({pic:response.data.tmp_path,uid:file.uid})
        },

    }
}
</script>

<style lang="" scoped>
</style>