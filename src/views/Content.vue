<template>
    <div id='content' class="container">
        <div class="detail-content d-grid">
            <carousel :cardsData='imgData' class="content-carousel-overwrite" indicatorType='next/prev'>
                <template v-slot:items='props'>
                    <img :src="props.cardInfo.img" :alt="props.cardInfo.descr" srcset="">
                </template>
            </carousel>
            <div class="info">
                <h3>{{info.name}}</h3>
                <ul class="info-class d-flex">
                    <li v-for="classTag of info.classTags" :key='classTag' class="class-tag">{{classTag}}</li>
                </ul>
                <div class="info-text">
                    <div v-if="$route.params.category === 'Activity'" class="info-orangizer">主辦單位</div>
                    <div v-if="$route.params.category !== 'Activity'" class="info-phone d-flex"><span class="phone-number">電話</span><a class="phone-contact" href="tel:+">致電</a></div>
                    <div v-if="$route.params.category !== 'Restaurant'" class="info-site">網址</div>
                    <div class="info-address">地址</div>
                    <div class="info-openTime">開放時間</div>
                </div>
            </div>
            <div class="intro"><span>簡介：</span><p>{{info.intro}}</p></div>
        </div>
        <div class="other-option">
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
            let srcAry = [];
            let descrAry = [];
            let obj = this.JSONData.Picture;
            for (const key in obj) {
                console.log(key.includes('Url'));
                if (key.includes('Url')) {
                    srcAry.push(obj[key]);
                }
                if (key.includes('Description')) {
                    descrAry.push(obj[key]);
                }
            }
            ary = srcAry.map((src,index)=>{return{ID:this.JSONData.ID + index + '',img:src,descr:descrAry[index]}});
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
            fetcher.setQuery({top:1,filter:`ID eq '${routeSet.params.id}'`});
            let vueObj = this;
            fetch(fetcher.getUrl(), fetcher.getHeader())
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                vueObj.JSONData = data[0];
                vueObj.runOptionFetch(routeSet,data[0].Address)
                })
                .catch(function (error) {
                console.warn(error);
                });
                window.scrollTo(0,0);
        },
        runOptionFetch(routeObj,address){
            let routeSet = routeObj || this.$route;
            let fetcher = fetcherConstructer("Tourism", routeSet.params.category);
            fetcher.setQuery({top:10000
                ,filter:`contains(Address,'${String(address).slice(0,3)}')`
                ,select:selectMatch[routeSet.params.category || "Activity"]});
            let vueObj = this;
            fetch(fetcher.getUrl(), fetcher.getHeader())
                .then(function (response) {
                return response.json();
                })
                .then(function (data) {
                let filterData = Array.from(data).filter(
                    el => el.Picture?.PictureUrl1
                );
                let length = filterData.length;
                vueObj.optionJSON = filterData.splice(Math.floor(Math.random() * +(length - 15)),15);
                })
                .catch(function (error) {
                console.warn(error);
                });
        }
    },
    mounted(){
        this.runFetch();
    }
}
</script>
<style lang="scss">
#content{
    .detail-content,.other-option{
        padding: 80px 0px;
    }
    .detail-content{
        --custom-view:1;
        --custom-gap:0px;
        .content-carousel-overwrite{
            grid-column: 1 / 9;
            .controlButtons{
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
                justify-content: space-between;
                .button{
                    margin: 0 24px;
                }
            }
        }
        .info{
            grid-column: auto / span 4;
            text-align: start;
            .info-text{
                *{
                    color: #676767;
                }
                a{
                    color: #f65000;
                    text-decoration-color: #f65000;
                }
                .info-phone{
                    align-items: center;
                    .phone-number{
                        margin-right: auto;
                    }
                    .phone-contact{
                        background-color: #f65000;
                        color: #ffffff;
                        padding: 4px 12px;
                        border-radius: 50px;
                    }
                }
                
            }
        }
        .intro{
            span{
                display: block;
            }
            p{
                text-indent: 2em;
            }
            grid-column: 3 / span 6;
            background-color: #f1f1f1;
            padding: 32px 48px;
            border-radius: 16px;
            text-align: start;
        }
        .info-class{
        position: relative;
        top: 16px;
        right: 16px;
        margin-bottom: 16px;
        justify-content: end;
        .class-tag{
            padding: 4px 8px;
            background-color: #ffefe6;
            color: #f65000;
            margin-left: 16px;
            border-radius: 4px;
        }
    }
    }
    .other-option{
        background-color: #f6f6f6;
        --custom-view:3;
        --custom-gap:32px;
        @include phone-width{
            --custom-view:1;
            --custom-gap:8px;
        }
    }
}
</style>