const vueTemplate = `
<template>
  <div class="app-container">
  <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addModel">添加{{=it.comment}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tableData"
    border
    >
      {{~it.fields: field:index}}
      <el-table-column
        prop="{{=field['name']}}"
        label="{{=field['comment']}}"
      />{{~}}

      <el-table-column
        label="管理"
      >
        <template v-slot="scop">
          <el-button type="primary" @click="edit(scop.row.id)">编辑</el-button>
          <el-button :disabled="scop.row.isDefault" @click="toggle(scop.row.id)">状态变更</el-button>
          <el-button :disabled="scop.row.isDefault" type="danger" @click="delete{{=it.model}}(scop.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <template v-slot:append>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="20"
            @current-change="loadPage"
          />
        </div>
      </template>
    </el-table>

    <el-drawer
    title="添加"
    :visible.sync="drawer"
    :with-header="false"
    size="600px"
  >
  <el-form ref="form" :model="formData" :rules="rules" class="form" size="normal" label-width="120px">
  {{~it.fields: field:index}}
  <el-form-item label="{{=field['comment']}}" prop="{{=field['name']}}">
    <el-input v-model="formData.{{=field['name']}}" placeholder="{{=field['comment']}}" />
  </el-form-item>
  {{~}}
  <el-form-item>
    <el-button type="primary" @click="submitData('form')">保存</el-button>
  </el-form-item>
</el-form>
  </el-drawer>

  </div>
</template>

<script>
import {{=it.modelVar}}Api from '@/api/{{=it.model}}Api'
import formatterUtils from '@/mixins/fomatter'
export default {
  mixins: [formatterUtils],
  data() {
    return {
      tableData:null,
      drawer:false,
      {{=it.modelVar}}:{},
      formData: {
        {{~it.fields: field:index}}{{=field['name']}}:'',
        {{~}}
      },
      rules: {
        {{~it.fields: field:index}}
        {{=field['name']}}:[
          { required: true, trigger: 'blur', message: '请填写{{=field['comment']}}' }
        ],{{~}}
      }
    }
  },
  mounted() {
    this.loadData(0);
  },
  methods:{

    addModel() {
      this.drawer = true;
    },

    async loadData(page) {
      const result = await {{=it.modelVar}}Api.loadData(page);
      this.tableData = result.data.page.content;
    },
    loadPage(page) {
      this.loadData(page - 1);
    },
    async edit(id) {
      const data = await {{=it.modelVar}}Api.find(id);
      this.formData = data;
      this.drawer = true;
    },
    async delete{{=it.model}}(id) {
      const result = await {{=it.modelVar}}Api.delete(id);
      if (result.success) {
        this.loadData();
      }
    },
    async toggle(id) {
      const result = await {{=it.modelVar}}Api.toggle(id);
      if (result.success) {
        this.loadData();
      }
    },
    submitData(formName) {
      console.log(this.formData);
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.saveData();
        } else {
          this.$alert('表单中含有错误信息，请检查', '警告');
        }
      });
    },
    async saveData() {
      const result = await {{=it.modelVar}}Api.save(this.formData);
      if (result.success) {
        this.drawer = false
        this.loadData();
      } else {
        this.$alert(result.msg, '数据保存失败');
      }
    }
  }
}
</script>

<style scoped>
.form{
  margin: 12px;
  padding: 12px;
}
.pagination{
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}
</style>
`

export default vueTemplate
