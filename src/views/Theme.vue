<template>
  <div id='theme' class="theme">
    <herocard :cardInfo="heroData" />
    <div class="d-grid container filter">
      <advancefilter
        class="col-4"
        :themeType="$route.params.category || 'Activity'"
      />
    </div>
    <list :cardsData="pageData">
    </list>
    <pagination :dataAmount="dataLength" />
  </div>
</template>
<script>
import heroJSON from "@/assets/JSON/subhero.json";
import herocard from "@/components/Hero_Card.vue";
import list from "@/components/List.vue";
import pagination from "@/components/Pagination.vue";
import advancefilter from "@/components/Advanced_Filter.vue";
import { subHeroImgs as hashImgs } from "@/assets/filenameHashList.js";
import fetcherConstructer from "@/assets/fetcherFactory.js";

function queryFilter(element = {}, factor_city = [], factor_class = []) {
  if (factor_city.length == 0 && factor_class.length == 0) return true;

  let address = String(element.Address);
  let classStr = String(element.ClassTags);
  let judge = [false,false];

  if(factor_city.length == 0) judge[0] = true;
  if(factor_class.length == 0) judge[1] = true;

  factor_city.forEach((fact) => {
    if (address.includes(fact)) judge[0] = true;
  });
  factor_class.forEach((fact) => {
    if (classStr.includes(fact)) judge[1] = true;
  });

  return judge[0] && judge[1];
};

export default {
  name: "theme",
  components: {
    herocard,
    advancefilter,
    list,
    pagination,
  },
  data() {
    return {
      JSONData: [],
      dataLength: 0,
    };
  },
  computed: {
    heroData() {
      let obj = heroJSON[this.$route.params.category];
      return { ...obj, imgSrc: hashImgs[+obj.imgIndex] };
    },
    pageData(){
      let page = this.$route.params.page;
      let currPageData = this.dataLength > 15 ? Array.from(this.JSONData).splice(15*page,15) : this.JSONData;
      return currPageData;
    }
  },
  methods: {
    runFetch(routeObj) {
      let routeSet = routeObj || this.$route;
      let cities = routeSet.query.cities != undefined ? String(routeSet.query.cities).split(",") : [];
      let tagClass = routeSet.query.class != undefined ? String(routeSet.query.class).split(",") : [];
      let fetcher = fetcherConstructer('TDXapi'); //抓資料

      let vueObj = this;
      fetcher.getData( 'v2/Tourism/{category}?%24top=10000&%24format=JSON',
      {
        category: routeSet.params.category,
      }, 
      function (data) {
          console.log("原始獲取資料長度:" + data.length);
          let filterData = Array.from(data).filter(
            (el) => (queryFilter(el, cities, tagClass))
          );
          console.log("過濾獲取資料長度:" + filterData.length);
          vueObj.dataLength = filterData.length;
          vueObj.JSONData = filterData;
          window.scrollTo(0,0);
      });
    },
  },
  watch: {
    $route( to, from ) {
      if( to == from ) return;
      this.runFetch(to);
    },
  },
  mounted() {
    this.runFetch();
  },
};
</script>
<style lang="scss">
.col-4 {
  grid-column: 5 / -5;
}
.theme {
  --hero-card-height: 450px;
  --hero-text-pos-y: 122px;
  //重寫advanced filter樣式
  .filter {
    margin: 40px auto;
  }
  .card {
    .bg-black {
      display: flex;
      flex-direction: column-reverse;
    }
  }
  .overwrite {
    width: 100%;
    position: relative;
    bottom: 0;
    align-items: end;
    border-radius: 8px;
    overflow: hidden;
    .pic {
      height: 312px;
    }
    .pic,
    .textInfo {
      grid-column: 1/-1;
      grid-row: 1/1;
    }
    .info-class {
      position: absolute;
      top: 16px;
      right: 16px;
      margin-bottom: 16px;
      justify-content: end;
      .class-tag {
        padding: 4px 8px;
        background-color: #ffffff;
        color: #f65000;
        margin-left: 16px;
        border-radius: 4px;
      }
    }
    .textInfo {
      width: 100%;
      padding: 16px 24px;
      border-radius: 0;
      background-color: #ff5c00;
      text-align: start;
      .info-name,
      .info-duration,
      .info-organizer {
        margin-bottom: 8px;
      }
      .info-organizer,
      .info-intro,
      .info-detail {
        display: none;
      }
    }
  }
}
</style>
