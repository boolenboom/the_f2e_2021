<template>
    <section id="scenicspot">
        <div class="container">
            <h2 class="carouselName">熱門景點</h2>
            <carousel :cardsData='JSONData' class="full-grid" indicatorType='next/prev' themeType='ScenicSpot'>
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
    --custom-view:3;
    --custom-gap:32px;
    @include phone-width{
        --custom-view:1;
        --custom-gap:8px;
    }
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
import fetcherConstructer from '@/assets/fetcherFactory.js';
let fetcher = fetcherConstructer( 'PTXData', 'Tourism', 'ScenicSpot' );
export default {
    name:'scenicspot',
    components:{
        carousel,
        scenicspotcard
    },
    data(){
        return{
            JSONData:[]
        }
    },
    mounted(){
        let vueObj=this;
        fetcher.setQuery({top:5000});

        fetcher.getAPIData( 'home-ScenicSpot', function ( data ) {
            let randomIndex = Math.random * ( data.length - 14 );
            vueObj.JSONData = data.splice( randomIndex, 14 );
        } );
    }
}
</script>