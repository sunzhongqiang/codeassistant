export default `
<template>
  <div class="app-container">
  <el-form ref="form" :model="formData" :rules="rules" class="form" size="normal" label-width="120px">

  <!--当前form field type {{=it.formType}}-->
  <el-form-item label="{{=it.field['comment']}}" prop="{{=it.field['name']}}">
   {{?it.formType==='textarea'}}
   <el-input type="textarea" :rows="3" placeholder="请输入内容"   v-model="formData.{{=it.field['name']}}" {{?it.config['max']}}maxlength="{{=it.config['max']}}" show-word-limit{{?}} />
   {{??it.formType==='password'}}
   <el-input type="password"  placeholder="请输入内容"   v-model="formData.{{=it.field['name']}}"  />
   {{??it.formType==='search'}}
   <el-input placeholder="请输入内容" v-model="formData.{{=it.field['name']}}" class="input-with-select">
    <el-select v-model="formData.{{=it.field['name']}}" slot="prepend" placeholder="请选择">
      <el-option label="参数1" value="1"></el-option>
      <el-option label="参数2" value="2"></el-option>
      <el-option label="参数3" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" />
  </el-input>
  {{??it.formType==='inputnumber'}}
  <el-input-number v-model="formData.{{=it.field['name']}}"  {{?it.config['min']}}:min="{{=it.config['min']}}"{{?}} {{?it.config['max']}}:max="{{=it.config['max']}}"{{?}} placeholder="请输入{{=it.field['comment']}}" />
  {{??it.formType==='date'}}
  <el-date-picker
      v-model="formData.{{=it.field['name']}}"
      type="date"
      placeholder="选择日期" />
    {{??it.formType==='slider'}}
    <el-slider v-model="formData.{{=it.field['name']}}"  {{?it.config['min']}}:min="{{=it.config['min']}}"{{?}} {{?it.config['max']}}:max="{{=it.config['max']}}"{{?}}></el-slider>
  {{??it.formType==='select'}}
  <el-select v-model="formData.{{=it.field['name']}}" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  {{??it.formType==='checkbox'}}
  <el-checkbox-group v-model="formData.{{=it.field['name']}}" >
    <el-checkbox v-for="item in dataSource" :label="item.label" :key="item.value" />
  </el-checkbox-group>
  {{??it.formType==='radio'}}
  <el-radio-group v-model="formData.{{=it.field['name']}}">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
  {{??it.formType==='cascader'}}
  <el-cascader
  v-model="formData.{{=it.field['name']}}" />
  {{??it.formType==='switch'}}
  <el-switch
    v-model="formData.{{=it.field['name']}}"
    active-value="true"
    inactive-value="false" />
  {{??it.formType==='upload'}}
  <el-upload
  class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
    {{??}}
   <el-input v-model="formData.{{=it.field['name']}}" placeholder="{{=it.field['comment']}}" {{?it.config['max']}}maxlength="{{=it.config['max']}}" show-word-limit{{?}}/>
   {{?}}
  </el-form-item>



  </el-form>
  </div>
</template>
<script>

export default {
  data(){
    return {
      rules: {
        {{=it.field['name']}}:[
          {{?it.config.required}}
            { required: true, trigger: '{{?it.config.trigger}}blur{{??}}change{{?}}', message: '请填写{{=it.field['comment']}}' },
          {{?}}
          {{?it.validation.type}}
            { type : '{{=it.validation.type}}', trigger: '{{?it.config.trigger}}blur{{??}}change{{?}}', message: '请检查数据类型是否为{{=it.validation.type}}' },
          {{?}}
          {{?it.config.range}}
            { min:'{{=it.config['min']}}',max:'{{=it.config['max']}}' trigger: '{{?it.config.trigger}}blur{{??}}change{{?}}', message: '请控制在{{=it.config['min']}}到{{=it.config['max']}}范围之内' },
          {{?}}
        ]
      }
    }
  }
}
</script>
`