<template>
  <div class="drug-guide-page">
    <div v-if="!errorText">
      <div id="drug-guide"></div>
      <div class="button-wraper">
        <div v-if="!addDrugGuide" class="button" @click="goDrugReming('add')">
          添加用药提醒
        </div>
        <div v-else class="button" @click="goDrugReming">查看用药提醒</div>
      </div>
      <img
        src="https://kano.guahao.cn/mG5466017116"
        class="ask-pharmacist"
        @click="goAsk"
      />
    </div>
    <div v-else class="error">
      <img alt="error-img" src="https://kano.guahao.cn/4xQ122719109" />
      <p class="error-text">{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
import {
  apiIsvisible,
  apiAddMedication,
  apiMedicationUsage,
  apiPrescriptionTag,
} from "~api/drug.js";
import config from "@/config";

export default {
  components: {},
  data() {
    return {
      addDrugGuide: false,
      errorText: "",
      tag: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      import("@weiyi/ai-guidelines-h5").then((res) => {
        const Guidelines = res.default;
        const options = {
          element: "#drug-guide",
          sdkTokenRefresh: (res) => {
            return "";
          },
          getData: this.getData,
          mode: config.isPreAndLine ? "" : "test",
        };
        new Guidelines(options);
      });
    });
  },
  methods: {
    async getData() {
      const { patientId, prescriptionId } = this.$route.query;
      const res = await apiMedicationUsage(null, {
        prescriptionId: prescriptionId,
        patientId: patientId,
      });
      return res;
    },
    goAsk() {
      location.href = `${config.wyServer}/aiassistant?mode=AiAssistant_yyzd`;
    },
    // 查看用药提醒
    goDrugReming(flag) {
      const { patientId, prescriptionId } = this.$route.query;
      const tag = this.tag;
      const params = {
        tag,
        bizId: prescriptionId,
        isEncrypt: 1,
        patientId,
      };
      if (flag === "add") {
        apiAddMedication(null, params)
          .then((res) => {
            this.$router.push({
              path: `/diabetes/drugremind?accessId=1299513388&tag=${tag}`,
              query: {
                patientId: patientId,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.push({
          path: `/diabetes/drugremind?accessId=1299513388&tag=${tag}`,
          query: {
            patientId: patientId,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/variables.less";
.drug-guide-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  .ask-pharmacist {
    width: 132 * @ratio;
    height: 140 * @ratio;
    position: fixed;
    right: 12 * @ratio;
    bottom: 276 * @ratio;
  }
  .button-wraper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 32 * @ratio 92 * @ratio;
    .button {
      height: 88 * @ratio;
      background: #3f86ff;
      border-radius: 200 * @ratio;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-size: 32 * @ratio;
      font-weight: bold;
      color: #fff;
    }
  }
  .error {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 36 * @ratio;
    line-height: 36 * @ratio;
    padding-top: 200 * @ratio;
    img {
      width: 244 * @ratio;
      margin-bottom: 32 * @ratio;
    }

    .error-text {
      font-size: 28 * @ratio;
      color: #83889a;
      line-height: 28 * @ratio;
      text-align: center;
    }

    .reload-btn {
      margin-top: 32 * @ratio;
    }
  }
}
</style>
