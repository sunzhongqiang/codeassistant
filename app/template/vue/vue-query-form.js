const vueTemplate = `
<template>
  <div class="app-container">
  <el-form :inline="true" class="demo-form-inline" size="mini">
      {{~it.fields: field:index}}
      <el-form-item label="{{=field['comment']}}">
        <el-input v-model="queryData.{{=field['name']}}" placeholder="{{=field['comment']}}" />
      </el-form-item>
      {{~}}
      <el-form-item name="button">
        <el-button type="primary">查询</el-button>
      </el-form-item>

    </el-form>
  </div>
  </template>
  `

export default vueTemplate