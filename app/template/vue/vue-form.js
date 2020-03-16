const vueTemplate = `
<template>
  <div class="app-container">
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
  </div>
</template>
<script>
import {{=it.modelVar}}Api from '@/api/{{=it.modelVar}}'
export default {
  data() {
    return {
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
    };
  },
  mounted() {
  },
  methods: {
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
    async saveData(){
      const result = {{=it.modelVar}}Api.save(this.formData);
      if (result.success) {
        this.$alert('数据保存成功');
      }else{
        this.$alert(result.msg,'数据保存失败');
      }
    }
  }
}
</script>
<style scoped>
.form{
  margin: 12px;
}
</style>
`

export default vueTemplate
