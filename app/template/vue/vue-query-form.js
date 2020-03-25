const vueTemplate = `
<template>
  <div class="app-container">
  <el-form :inline="true" class="demo-form-inline" size="mini">
      {{~it.fields: field:index}}
      <el-form-item label="{{=field['comment']}}">
        <el-input v-model="queryParams.{{=field['name']}}" placeholder="{{=field['comment']}}" />
      </el-form-item>
      {{~}}
      <el-form-item name="button">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>

    </el-form>
  </div>
  </template>
  <script>
import {{=it.modelVar}}Api from '@/api/{{=it.modelVar}}'
export default {
  data() {
    return {
      queryParams: {
        {{~it.fields: field:index}}{{=field['name']}}:'',
        {{~}}
      }
    };
  },
  mounted() {
  },
  methods: {
    
    async query(page){
      if(!page){
        page = 0;
      }
      this.queryParams.page = page;
      const result = await {{=it.modelVar}}Api.query(this.queryParams);
      this.tableData = result.data.content.content;
    }
  }
}
</script>
  `

export default vueTemplate