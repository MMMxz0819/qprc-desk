<template>
  <div id="Upload">
    <h3 class="title">
      上传数据
      <el-button
        type="info"
        style="float: right; top: -5px; position: relative"
        @click="logOut"
        >退出</el-button
      >
    </h3>
    <el-form
      class="form"
      :model="staticForm"
      ref="staticFormRef"
      label-width="100px"
    >
      <el-form-item label="检测芯片" prop="static_chip">
        <el-select
          style="width: 100%"
          v-model="staticForm.static_chip"
          placeholder="请选择检测芯片"
        >
          <div style="width: 100%">
            <el-option
              style="width: 100%"
              v-for="item in chipsList"
              :key="item.chip_id"
              :label="item.chip_name"
              :value="item.chip_id"
            >
            </el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="检测人员" prop="test_name">
        <el-input v-model="staticForm.test_name"></el-input>
      </el-form-item>
      <el-form-item label="设备号" prop="static_number">
        <el-input v-model="staticForm.static_number"></el-input>
      </el-form-item>
      <el-form-item label="样本信息" prop="staticColor">
        <el-input v-model="staticForm.staticColor"></el-input>
      </el-form-item>
    </el-form>

    <span class="footer">
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" @click="submitForm">上传</el-button>
      <el-button type="primary" @click="beginTest">检测</el-button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10000,
      },
      // 芯片列表
      chipsList: [],
      // 芯片总数
      total: 0,
      staticForm: {
        test_name: '',
        static_chip: '',
        static_number: '',
        staticColor: '',
      },
    }
  },
  created() {
    this.getChipsList()
  },
  methods: {
    async submitForm() {
      const { data: res } = await this.$http.post('statics', this.staticForm)

      if (res.meta.status !== 201) {
        return this.$message.error('上传数据失败！')
      }
      this.$message.success('上传数据成功!')
    },
    reset() {
      this.$refs['staticFormRef'].resetFields()
    },
    logOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getChipsList() {
      const { data: res } = await this.$http.get('chips', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取芯片列表失败！')
      }
      this.chipsList = res.data.chips
    },
    beginTest() {
      console.log('aaa')
    },
  },
}
</script>

<style scoped>
#Upload {
  height: 100%;
  width: 100%;
  background-color: #d0e1eb;
}
.title {
  background-color: #317cd1;
  padding: 20px 0;
}
.form {
  padding-right: 30px;
}
</style>
