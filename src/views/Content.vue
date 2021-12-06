<template>
    <div class="d-grid container">
        <div class="detail-content">
            <carousel :cardsData='imgData' class="detail-overwrite" indicatorType='next/prev'>
                <template v-slot:items='props'>
                    <img :src="props.img" alt="" srcset="">
                </template>
            </carousel>
            <div class="info">
                <h3>{{info.name}}</h3>
                <ul class="info-class d-flex">
                    <li v-for="classTag of info.classTags" :key='classTag' class="class-tag">{{classTag}}</li>
                </ul>
                <div class="info-text">
                </div>
            </div>
            <p class="intro"><span>簡介：</span>{{info.intro}}</p>
        </div>
        <carousel :cardsData='optionJSON' indicatorType='next/prev'>
            <template v-slot:items='props'>
                <scenicspotcard
                v-if="$route.params.category === 'ScenicSpot'"
                :cardInfo="props.cardInfo"
                />
                <activitycard
                v-if="$route.params.category === 'Activity'"
                :cardInfo="props.cardInfo"
                />
                <foodcard
                v-if="$route.params.category === 'Restaurant'"
                :cardInfo="props.cardInfo"
                />
            </template>
        </carousel>
    </div>
</template>
<script>
import carousel from '@/components/Carousel.vue';
import activitycard from "@/components/Activity_Card.vue";
import scenicspotcard from "@/components/Scenicspot_Card.vue";
import foodcard from "@/components/Food_Card.vue";
import fetcherConstructer from "@/assets/APIFetcher.js";
let selectMatch = {
    ScenicSpot:"ID,Name,ScenicSpotName,Class1,Class2,Class3,City,OpenTime,Picture,Address",
    Restaurant: "ID,Name,RestaurantName,Class,City,Picture,Phone,Address",
    Activity: "ID,Name,StartTime,EndTime,Class1,Class2,Picture",
};
export default {
    name:'content',
    components:{
        carousel,
        activitycard,
        scenicspotcard,
        foodcard,
    },
    data(){
        return{
            JSONData:[],
            optionJSON:[]
        }
    },
    computed:{
        imgData(){
            let ary = [];
            let obj = this.JSONData.Picture;
            for (const key in obj) {
                if (key.includes('Url')) {
                    ary.push(obj[key]);
                }
            }
            return ary;
        },
        info(){
            let classArr = [];
            let obj = this.JSONData;
            for (const key in obj) {
                if (key.includes('Class')) {
                    classArr.push(obj[key]);
                }
            };
            return{
                name:this.JSONData.Name || '無名',
                classTags:classArr,
                intro:this.JSONData.DescriptionDetail || this.JSONData.Description
            }
        }
    },
    methods:{
        runFetch(routeObj){
            let routeSet = routeObj || this.$route;
            let fetcher = fetcherConstructer("Tourism", routeSet.params.category);
            fetcher.setQuery({top:1,filter:`contains(ID,"${routeSet.params.id}")`});
            let vueObj = this;
            fetch(fetcher.getUrl(), fetcher.getHeader())
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                vueObj.JSONData = data;
                })
                .catch(function (error) {
                console.warn(error);
                });
                window.scrollTo(0,0);
        },
        runOoptionFetch(routeObj){
            let routeSet = routeObj || this.$route;
            let fetcher = fetcherConstructer("Tourism", routeSet.params.category);
            fetcher.setQuery({top:1000
                ,filter:`contains(Address,"${String(this.JSONData.Address).slice(0,3)}")`
                ,select:selectMatch[routeSet.params.category || "Activity"]});
            let vueObj = this;
            fetch(fetcher.getUrl(), fetcher.getHeader())
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                let filterData = Array.from(data).filter(
                    el => el.Picture?.PictureUrl1
                )
                vueObj.optionJSON = filterData.splice(0,15);
                })
                .catch(function (error) {
                console.warn(error);
                });
                window.scrollTo(0,0);
        }
    },
    mounted(){
        this.runFetch();
    }
}
</script>