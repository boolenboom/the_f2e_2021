<template>
    <section id='activity'>
        <div class="container">
            <h2 class="carouselName">最新活動</h2>
            <carousel :cardsData='JSONData' class="full-grid" indicatorType='next/prev'>
                <template v-slot:items='props'>
                    <activitycard :cardInfo='props.cardInfo'/>
                </template>
            </carousel>
        </div>
    </section>
</template>
<script>
import carousel from '@/components/Carousel.vue';
import activitycard from '@/components/Activity_Card.vue';
import fetcherConstructer from '@/assets/fetcherFactory.js';
let fetcher = fetcherConstructer('TDXapi');
export default {
    name:'activity',
    components:{
        carousel,
        activitycard
    },
    data(){
        return{
            JSONData:[]
        }
    },
    mounted(){
        let url = 'v2/Tourism/Activity?%24top=1000&%24format=JSON'

        let vueObj=this;
        fetcher.getData( url,{} , function ( data ) {
            let randomIndex = Math.floor(Math.random() * (data.length - 10));
            vueObj.JSONData = data.splice( randomIndex, 10 );
        });
    }
}
</script>
<style lang="scss">
.full-grid{
    grid-column: 1/-1;
}
#activity{
    --custom-view:1;
    --custom-gap:32px;
    @include phone-width{
        --custom-view:1;
        --custom-gap:8px;
        .controlButtons{
            top: -84px;
        }
    }
}
</style>