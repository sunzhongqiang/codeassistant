const vueTemplate = `
<template>
  <div class="app-container">
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
    </el-table>

  </div>
</template>

<script>
import {{=it.modelVar}}Api from '@/api/{{=it.modelVar}}'
export default {
  data() {
    return {
      tableData:null,
      {{=it.modelVar}}:{}
    }
  },
  mounted() {
    this.loadData(0);
  },
  methods:{
    async loadData(page) {
      const result = await {{=it.modelVar}}Api.loadData(page);
      this.tableData = result.data.content.content;
    },
    async edit(id) {
      const data = await {{=it.modelVar}}Api.find(id);
      this.{{=it.modelVar}} = data;
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
    }
  }
}
</script>

<style scoped>

</style>
`

export default vueTemplate
