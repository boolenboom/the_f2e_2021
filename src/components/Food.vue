<template>
    <section id="food">
        <div class="container">
            <h2 class="carouselName">美食推薦</h2>
            <carousel :cardsData='JSONData' class="full-grid" indicatorType='next/prev' themeType='Restaurant'>
                <template v-slot:items='props'>
                    <foodcard :cardInfo='props.cardInfo'/>
                </template>
            </carousel>
        </div>
    </section>
</template>
<style lang="scss">
#food{
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
}
</style>
<script>
import carousel from '@/components/Carousel.vue';
import foodcard from '@/components/Food_Card.vue';
import fetcherConstructer from '@/assets/fetcherFactory.js';
let fetcher = fetcherConstructer('TDXapi');
export default {
    name:'food',
    components:{
        carousel,
        foodcard
    },
    data(){
        return{
            JSONData:[]
        }
    },
    mounted(){
        let vueObj=this;
        fetcher.getData( 'v2/Tourism/Restaurant?%24top=3000&%24format=JSON', 
        {}, 
        function ( data ) {
            let randomIndex = Math.random() * (data.length - 14);
            vueObj.JSONData = data.splice( randomIndex, 14 );
        });
    }
}
</script>