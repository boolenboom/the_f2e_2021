<template>
    <div id='content'>
        <div class="detail-content d-grid container">
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
                    <div v-if="$route.params.category === 'Activity'" class="info-organizer"><img src="../assets/icon/inform/organizer-primary.png" alt="" srcset="">{{info.organizer}}</div>
                    <div v-if="$route.params.category !== 'Activity'" class="info-phone d-flex"><span class="phone-number"><img src="../assets/icon/inform/phone-primary.png" alt="" srcset="">{{info.phone}}</span><a class="phone-contact" :href="`tel:+${info.phone}`">致電</a></div>
                    <div v-if="$route.params.category !== 'Restaurant' && info.website != ''" class="info-site"><img src="../assets/icon/inform/web-primary.png" alt="" srcset=""><a :href="info.website">官方網站</a></div>
                    <div class="info-address">
                        <img src="../assets/icon/inform/location-primary.png" alt="" srcset="">
                        <template v-if="info.mapUrl===''">{{info.address}}</template>
                        <template v-if="info.mapUrl!==''"><a :href="info.mapUrl">{{info.address}}</a></template>
                    </div>
                    <div class="info-openTime"><img src="../assets/icon/inform/time-primary.png" alt="" srcset="">{{info.openTime}}</div>
                </div>
            </div>
            <div class="intro"><span>簡介: </span><p>{{info.intro}}</p></div>
        </div>
        <div class="other-option">
            <div class="container">
                <h2 class="carouselName">您可能喜歡</h2>
                <carousel :cardsData='optionJSON' indicatorType='next/prev'
                    :themeType='$route.params.category'>
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
    </div>
</template>
<script>
import carousel from '@/components/Carousel.vue';
import activitycard from "@/components/Activity_Card.vue";
import scenicspotcard from "@/components/Scenicspot_Card.vue";
import foodcard from "@/components/Food_Card.vue";
import fetcherConstructer from "@/assets/fetcherFactory.js";
let selectMatch = {
    ScenicSpot:"ScenicSpotID,ScenicSpotName,Class1,Class2,Class3,City,OpenTime,Picture,Address",
    Restaurant: "RestaurantID,RestaurantName,Class,City,Picture,Phone,Address",
    Activity: "ActivityID,ActivityName,StartTime,EndTime,Class1,Class2,Picture",
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
            detailJSON:[],
            optionJSON:[]
        }
    },
    computed:{
        imgData(){
            let ary = [];
            let srcAry = this.detailJSON.PictureUrl;
            let descrAry = this.detailJSON.PictureDescri;
            ary = srcAry.map((src,index)=>{
                return{
                    ID:this.detailJSON.ID + index + '',
                    img:src,
                    descr:descrAry[index]
                }
            });
            return ary;
        },
        info(){
            return{
                name: this.detailJSON.Name || '無名',
                classTags: this.detailJSON.ClassTags,
                organizer: this.detailJSON.Organizer || '',
                phone: this.detailJSON.Phone || '',
                website: this.detailJSON.WebsiteUrl || '',
                mapUrl: this.detailJSON.MapUrl || '',
                address: this.detailJSON.Address || '',
                openTime: this.detailJSON.OpenTime ||'',
                intro: this.detailJSON.Description || ''
            }
        }
    },
    methods:{
        runFetch(routeObj){
            let routeSet = routeObj || this.$route;
            let fetcher = fetcherConstructer("PTXData", "Tourism", routeSet.params.category);
            fetcher.setQuery({top:1,filter:`${routeSet.params.category}ID eq '${routeSet.params.id}'`});
            
            let vueObj = this;
            fetcher.getAPIData( 'content-detail', function ( data ) {
                vueObj.runOptionFetch(routeSet, data[0].Address, data[0].ID)
                vueObj.detailJSON = data[0];
                window.scrollTo(0,0);
            });
        },
        runOptionFetch( routeObj, address, currID ){
            let routeSet = routeObj || this.$route;
            console.log(routeSet);
            let fetcher = fetcherConstructer("PTXData", "Tourism", routeSet.params.category);
            fetcher.setQuery({
                top:10000,
                filter:`contains(Address,'${String(address).slice(0,3)}') or 
                    contains(${routeSet.params.category}ID,'${String(currID).slice(0,12)}')`,
                select:selectMatch[routeSet.params.category || "Activity"],
            });
            
            let vueObj = this;
            fetcher.getAPIData( 'content-option', function ( data ) {
                vueObj.optionJSON = data;
                window.scrollTo(0,0);
            });
        }
    },
    watch:{
        $route( to, from ) {
            if( to == from ) return;
            this.runFetch(to);
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
        padding-top: 80px;
        padding-bottom: 80px;
    }
    .detail-content{
        --custom-view:1;
        --custom-gap:0px;
        .content-carousel-overwrite{
            grid-column: 1 / span 8;
            @include phone-width{
                grid-column: 1 / span 4;
            }
            li{
                img{
                    height: 480px;
                    object-fit: cover;
                }
            }
            .controlButtons{
                z-index: 100;
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
            @include phone-width{
                margin-top: 40px;
                grid-row: 2 / span 1;
            }
            text-align: start;
            .info-text{
                margin-top: 32px;
                *{
                    color: #676767;
                }
                >* + *{
                    margin-top: 16px;
                }
                a{
                    color: #f65000;
                    text-decoration-color: #f65000;
                }
                .info-class{
                    justify-content: start;
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
            position: relative;
            top: -40px;
            @include phone-width{
                top: 40px;
                grid-column: 1 / span 4;
            }
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
        // justify-content: end;
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
        .controlButtons{
            top: -84px;
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
}
</style>