<template>
  <div class="pageCont">
    <div class="pageWrap">
      <div class="wrap">
        <div class="item">
          <!-- 次数 -->
          <div class="noteTitle">电柜投放总量：</div>
          <div class="noteCont">
            <div v-for="(item, index) in cabinetNumList" :key="index">
              <numberScroll class="num odometer" :datanum="item" />
              <img
                style="width:5px;height:5px;margin-left:2px;margin-right:2px;"
                v-if="index == 1 || index == 4"
                src="../../assets/img/dot@2x.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="item">
          <!-- 次数 -->
          <div class="noteTitle">服务网点总量：</div>
          <div class="noteCont">
            <div v-for="(item, index) in netPortNumList" :key="index">
              <numberScroll class="num odometer" :datanum="item" />
              <img
                style="width:5px;height:5px;margin-left:2px;margin-right:2px;"
                v-if="index == 1 || index == 4"
                src="../../assets/img/dot@2x.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numberScroll from "../../components/NumberGrow";
export default {
  name: "LeftPutIn",
  data() {
    return {
      loading: true,
      cabinetNumList: [0, 0, 0, 0, 0, 0, 0, 0],
      netPortNumList: [0, 0, 0, 0, 0, 0, 0, 0],
    };
  },
  created() {
    this.$Event.$on("getMaterialCenterTop", (res) => {
      if (res) {
        let objData = {
          cabinetNum: res.cabinetTotalDelivery,
          netPortNum: res.totalServiceOutlets,
        };
        this.getData(objData);
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getMaterialCenterTop"); //销毁
  },
  components: {
    numberScroll,
  },
  methods: {
    getData(objData) {
      let chargingBatteryNumList = (objData.cabinetNum + "")
        .split("")
        .map(Number);
      let splitC = 8 - chargingBatteryNumList.length;
      let arrC = new Array(splitC).fill(0);
      chargingBatteryNumList = arrC.concat(chargingBatteryNumList);

      let exchangeBatteryNumList = (objData.netPortNum + "")
        .split("")
        .map(Number);
      let splitE = 8 - exchangeBatteryNumList.length;
      let arrE = new Array(splitE).fill(0);
      exchangeBatteryNumList = arrE.concat(exchangeBatteryNumList);

      this.cabinetNumList = chargingBatteryNumList;
      this.netPortNumList = exchangeBatteryNumList;
    },
  },
};
</script>

<style lang="less" scoped>
.pageCont {
  width: 100%;
  height: 99%;
  margin: auto;
  overflow: hidden;
  background: #000317;
  border: 0.005208rem solid #1a66ff;
  border-radius: 6px;
  margin-top: 10px;
  .pageWrap {
    width: 100%;
    height: 100%;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-left: 24px;
        .noteTitle {
          color: #fff;
          font: 500 18px "PingFang SC Medium";
          margin-bottom: 10px;
        }
        .noteCont {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .odometer {
            margin-right: 3px;
            display: inline-block;
            width: 40px;
            height: 48px;
            border-radius: 2px;
            color: #000;
            text-align: center;
            line-height: 48px;
            font: 500 32px "PingFang SC Semibold";
            font-weight: bold;
            background: rgba(102, 250, 255, 1);
          }
        }
      }
    }
  }
}
</style>
