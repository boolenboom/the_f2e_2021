<template>
    <section id="scenicspot">
        <div class="container">
            <h2 class="carouselName">熱門景點</h2>
            <carousel :cardsData='JSONData' :viewAmount='amount' class="full-grid" indicatorType='next/prev'>
                <template v-slot:items='props'>
                    <scenicspotcard :cardInfo='props.cardInfo'/>
                </template>
            </carousel>
        </div>
        <img src="@/assets/bg/bg_view_taiwan.png" alt="" class="bg-img">
    </section>
</template>
<style lang="scss">
#scenicspot{
    background-color: #f6f6f6;
    position: relative;
    z-index: 1;
    .container{
        z-index: 10;
        .controlButtons{
            top: -84px;
        }
    }
    // background-image: require('@/assets/bg/bg_view_taiwan.png');
}
.bg-img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>
<script>
import carousel from '@/components/Carousel.vue';
import scenicspotcard from '@/components/Scenicspot_Card.vue';
import fetcherConstructer from '@/assets/APIFetcher.js';
let fetcher = fetcherConstructer('Tourism','ScenicSpot');
export default {
    name:'scenicspot',
    components:{
        carousel,
        scenicspotcard
    },
    data(){
        return{
            amount:3,
            JSONData:[]
        }
    },
    mounted(){
        let vueObj=this;
        fetcher.setQuery({top:15,select:'ID,Name,ScenicSpotName,Class1,Class2,Class3,City,OpenTime,Picture'});
        fetch(fetcher.getUrl(),fetcher.getHeader())
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data.length);
            vueObj.JSONData = data;
            // isLoaded=false;
        })
        .catch(function (error) {
            console.warn(error);
        });
    }
}
</script>