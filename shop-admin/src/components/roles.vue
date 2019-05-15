<template>
    <div>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="add">添加角色</el-button>
        <el-table
        :data="roleList"
        style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="role">
                <el-row v-for="level0 in role.row.children" :key="level0.id">
                    <el-col :span="3"><el-tag  @close="delAuth(role.row,level0.id)" closable type="danger">{{level0.authName}}</el-tag></el-col>
                    <el-col :span="21">
                        <el-row v-for="level1 in level0.children" :key="level1.id">
                            <el-col :span="3">
                                <el-tag @close="delAuth(role.row,level1.id)" closable type="warning">{{level1.authName}}</el-tag>
                            </el-col>
                            <el-col :span="21">
                               <el-tag  @close="delAuth(role.row,level2.id)" closable v-for="level2 in level1.children" :key="level2.id" >{{level2.authName}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </template>
            </el-table-column>
            <el-table-column
            label="ID"
            prop="id">
            </el-table-column>
            <el-table-column
            label="角色名称"
            prop="roleName">
            </el-table-column>
            <el-table-column
            label="角色描述"
            prop="roleDesc">
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="role">
                <el-button type="primary" icon="el-icon-edit" @click="edit(role.row)"></el-button>
                <el-button type="primary" icon="el-icon-setting" @click="setAuth(role)"></el-button>
                <el-button type="primary" icon="el-icon-delete" @click="del(role.row.id)"></el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分配权限弹窗 -->
        <el-dialog title="角色权限" :visible.sync="roleDialog" width="30%">
            <el-form :model="roleForm">
                <el-form-item label="角色名称" label-width="80px">
                    <el-input v-model="roleForm.roleName" :disabled="true" autoComplete="off"></el-input>
                </el-form-item>
                <!-- 下拉菜单 -->
                <el-form-item label="权　　限" label-width="80px">
                    <el-tree
                        :data="authList"
                        :default-checked-keys="defaultId"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps">
                    </el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialog = false">取 消</el-button>
                <el-button type="primary" @click="roleSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加弹窗 -->
        <el-dialog title="添加角色" :visible.sync="addDialog" width="30%">
            <el-form :model="addForm">
                <el-form-item label="角色名称" label-width="80px">
                <el-input v-model="addForm.roleName" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="80px">
                <el-input v-model="addForm.roleDesc" autoComplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑弹窗 -->
        <el-dialog title="编辑角色" :visible.sync="editDialog" width="30%">
            <el-form :model="editForm">
                <el-form-item label="角色名称" label-width="80px">
                <el-input v-model="editForm.roleName" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="80px">
                <el-input v-model="editForm.roleDesc" autoComplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getRoleList,delRoleAuth,getAuthList,roleAuth,delRole,addRole,editRole} from '@/api'


export default {
    data() { 
        return {
            // 角色数据
            roleList:[],
            //
            roleForm:{
                roleName:'',
                roleId:'',
                rids:''
            },
            // 弹窗开关
            roleDialog:false,
            // 树形控件数据
            defaultProps:{
                drendren:'children',
                label:'authName'
            },
            // 权限列表数据
            authList:[],
            // 默认勾选的权限ID
            defaultId:[],
            //添加角色表单数据
            addForm:{
                roleName:'',
                roleDesc:''
            },
            // 弹窗变量控制开关
            addDialog:false,
            // 编辑角色表单数据
            editForm:{
                id:'',
                roleName:'',
                roleDesc:''
            },
            // 弹窗变量控制开关
            editDialog:false,



        }
    },
    methods:{
        // 刷新列表
        initList(){
            getRoleList().then(res=>{
                // console.log(res)

                this.roleList = res.data
                // console.log(test)
            })
        },
        // 删除角色权限
        delAuth(row,rightId){
            // console.log(row,rightId)
            delRoleAuth(row.id,rightId).then(res=>{
                // console.log(res)
                if(res.meta.status == 200){
                    row.children=res.data
                }else{
                    this.$message.error(res.meta.msg)
                }
            })
        },
        // 角色权限提交
        roleSubmit(){
            // console.log(this.$refs.tree.getCheckedKeys())
            // console.log(this.$refs.tree.getHalfCheckedKeys())
            let arrId1 = this.$refs.tree.getHalfCheckedKeys()
            let arrId2 = this.$refs.tree.getCheckedKeys(); 
            // 数组合并
            this.roleForm.rids = arrId1.concat(arrId2)
            // 数组去重
            this.roleForm.rids = Array.from(new Set(this.roleForm.rids))
            // console.log(this.roleForm.rids)

            // console.log(this.roleForm.roleId,this.roleForm.rids)
            roleAuth(this.roleForm.roleId,this.roleForm.rids.join(',')).then(res=>{
                // console.log(res)
                if(res.meta.status==200){
                    this.roleDialog = false;
                    this.initList()
                }else{
                    this.$message.error(res.meta.msg)
                }
            })

        },
        // 设置权限 提交权限准备工作
        setAuth(role){
            // 打开窗口
            this.roleDialog = true;
            // 显示当前角色名
            this.roleForm.roleName = role.row.roleName
            this.roleForm.roleId = role.row.id
            // 查询所有权限，产生树状控件选项
            getAuthList('tree').then(res=>{
                // console.log(res)
                this.authList = res.data
            })
            // 默认勾选已有权限

            // 清空
            this.defaultId=[]
            // 遍历当前行找出id 
            role.row.children.forEach(level0=>{
                // this.defaultId.push(level0.id);
                level0.children.forEach(level1=>{
                    // this.defaultId.push(level1.id);
                    level1.children.forEach(level2=>{
                        this.defaultId.push(level2.id)
                    })
                })
            })
        },
        // 删除角色
        del(id){
            // console.log(id)
            delRole(id).then(res=>{
                // console.log(res)
                // 判断响应码
                if(res.meta.status==200){
                    // 提示信息
                    this.$message({
                        type:'success',
                        message:res.meta.msg
                    })
                    // 刷新列表
                    this.initList()
                }else{
                    this.$message.error(res.meta.msg)
                }
            })
        },
        // 添加角色表单提交
        addSubmit(){
            if(this.addForm.roleName){
                addRole(this.addForm).then(res=>{
                    // console.log(res)
                    if(res.meta.status==201){
                        // 提示信息
                        this.$message({
                            type:'success',
                            message:res.meta.msg
                        })
                        // 清空信息
                        this.addForm={
                            roleName:'',
                            roleDesc:''
                        }
                        // 关闭弹窗
                        this.addDialog = false
                        // 刷新
                        this.initList()
                        
                    }else{
                        this.$message.error(res.meta.msg)
                    }
                })
            }
        },
        // 提交前准备工作
        add(){
            // 打开弹窗
            this.addDialog = true
        },
        // 编辑角色表单提交
        editSubmit(){
            editRole(this.editForm).then(res=>{
                // console.log(res)
                if(res.meta.status==200){
                    // 提示信息
                    this.$message({
                            type:'success',
                            message:res.meta.msg
                    })
                    // 关闭窗口
                    this.editDialog = false;
                    // 清空填写的信息
                    this.editForm = {
                        id:'',
                        roleName:'',
                        roleDesc:''
                    }
                    // 刷新
                    this.initList()
                }
            })
        },
        // 提交前准备工作
        edit(row){
            // 打开弹窗
            this.editDialog = true
            // 显示旧数据
            this.editForm.roleName = row.roleName;
            this.editForm.roleDesc = row.roleDesc;
            // console.log(row)
            this.editForm.id = row.id;
        },
    },
    created(){
        this.initList()
        // console.log(this.roleList)
    }
}
</script>

<style lang="scss" scoped>
.el-tag{
    margin: 5px;
}
</style>