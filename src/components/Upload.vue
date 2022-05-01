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
      <el-form-item label="样本信息" prop="static_des">
        <el-input v-model="staticForm.static_des"></el-input>
      </el-form-item>
    </el-form>

    <div id="test" v-if="showChart"></div>

    <div class="footer">
      <el-button @click="reset">重置</el-button>
      <el-button type="primary" @click="submitForm">上传</el-button>
      <el-button type="primary" @click="beginTest">检测</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showChart: false,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10000,
      },
      // 芯片列表
      chipsList: [],
      option: {
        xAxis: {
          type: 'category',
          data: Array.from({ length: 50 }, (_, i) => 1 + i),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true,
          },
        ],
      },
      staticForm: {
        test_name: '',
        static_des: '',
        static_chip: '',
        static_number: '',
        static_XY: [],
      },
    }
  },
  created() {
    this.getChipsList()
  },
  async mounted() {},
  methods: {
    async showEchart() {
      var myChart = this.$echarts.init(document.getElementById('test'))
      const a = Math.random() + 25
      const b = Math.random()
      const k = Math.random() / 10
      const j = Math.random()
      let y = Array.from({ length: 50 }, (_, i) => 1 + i).map((v) => {
        return (
          ((2 * b) / (Math.exp(4 * k * (a - v)) + 1)) * 2000 + (1500 + j * 500)
        )
      })
      this.option.series[0].data = y

      this.staticForm.static_XY = []
      this.option.xAxis.data.map((v, index) => {
        this.staticForm.static_XY.push([v, y[index]])
      })

      myChart.setOption(this.option)
    },
    async submitForm() {
      if (!this.showChart) return this.$message.error('未检测到数据')
      const { data: res } = await this.$http.post('statics', this.staticForm)

      if (res.meta.status !== 201) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success('上传数据成功!')
    },
    reset() {
      this.$refs['staticFormRef'].resetFields()
      this.showChart = false
      this.staticForm.static_XY = []
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
      this.showChart = true
      this.$nextTick(this.showEchart)
      // this.showEchart()
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
#test {
  height: 300px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
</style>
