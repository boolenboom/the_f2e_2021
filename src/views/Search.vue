<template>
  <div id="search">
    <herocard :cardInfo="heroData" />
    <div class="container">
      <ul class="search-class d-flex">
        <h4>搜尋結果: </h4>
        <li v-for="classTag of searchFactor" :key='classTag' class="class-tag">{{ classTag }}</li>
      </ul>
      <list :cardsData="pageData" :isLoading="isLoading">
      </list>
      <pagination :dataAmount="dataLength" viewType='search' />
    </div>
  </div>
</template>
<script>
import heroJSON from "@/assets/JSON/subhero.json";
import herocard from "@/components/Hero_Card.vue";
import list from "@/components/List.vue";
import pagination from "@/components/Pagination.vue";
import { subHeroImgs as hashImgs } from "@/assets/filenameHashList.js";
import fetcherConstructer from "@/assets/fetcherFactory.js";

function combineKeywordToFilter(keywordString, category) {
  let keywordAry = String(keywordString).split(' ');
  let filterString = keywordAry.reduce((acc, curr, index) => {
    return acc +
      (index == 0 ? '' : ' or ') +
      `contains(${category}Name, '${curr}') or contains(Address, '${curr}')`
  }, '');
  return filterString;
}

export default {
  name: 'search',
  components: {
    herocard,
    list,
    pagination,
  },
  data() {
    return {
      JSONData: [],
      dataLength: 0,
      isLoading: false
    };
  },
  computed: {
    heroData() {
      let obj = heroJSON['Search'];
      return { ...obj, imgSrc: hashImgs[+obj.imgIndex] };
    },
    searchFactor() {
      let ary = String(this.$route.query.keywordSearch).trim().split(' ');
      console.log(ary);
      return ary;
    },
    pageData() {
      let page = this.$route.params.page;
      let currPageData = Array.from(this.JSONData).splice(15 * (page - 1), 15);
      return currPageData;
    }
  },
  methods: {
    runFetch(routeObj) {
      this.JSONData = [];
      this.dataLength = 0;

      let routeSet = routeObj || this.$route;

      let vueObj = this;
      let url = 'v2/Tourism/{category}?%24top=3000&%24filter={filter}&%24format=JSON';
      let fetcher = new fetcherConstructer('TDXapi');
      this.isLoading = true;
      fetcher.getData( url,
        {
          category: 'Activity',
          filter: combineKeywordToFilter(routeSet.query.keywordSearch, 'Activity')
        },
        function (data) {
          vueObj.dataLength += data.length;
          vueObj.JSONData.push(...data);
          vueObj.isLoading = false;
        })
      fetcher.getData( url,
        {
          category: 'ScenicSpot',
          filter: combineKeywordToFilter(routeSet.query.keywordSearch, 'ScenicSpot')
        },
        function (data) {
          vueObj.dataLength += data.length;
          vueObj.JSONData.push(...data);
          vueObj.isLoading = false;
        })
      fetcher.getData( url,
        {
          category: 'Restaurant',
          filter: combineKeywordToFilter(routeSet.query.keywordSearch, 'Restaurant')
        },
        function (data) {
          vueObj.dataLength += data.length;
          vueObj.JSONData.push(...data);
          vueObj.isLoading = false;
        })
      window.scrollTo(0, 0);
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.keywordSearch === from.query.keywordSearch) return;
      this.runFetch(to);
    },
  },
  mounted() {
    this.runFetch();
  },
}
</script>
<style lang="scss">
#search {
  --hero-card-height: 450px;
  --hero-text-pos-y: 122px;

  //重寫advanced filter樣式
  .search-class {
    margin: 40px 0px;
    padding: 0px 16px;

    .class-tag {
      padding: 4px 8px;
      background-color: #ffefe6;
      color: #f65000;
      margin-left: 16px;
      border-radius: 4px;
    }
  }

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