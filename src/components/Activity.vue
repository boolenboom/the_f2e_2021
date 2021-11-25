<template>
    <section id='activity'>
        <div class="container">
            <h2 class="carouselName">最新活動</h2>
            <carousel :cardsData='JSONData' :viewAmount='amount' class="full-grid" indicatorType='next/prev'>
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
import fetcherConstructer from '@/assets/APIFetcher.js';
let fetcher = fetcherConstructer('Tourism','Activity');
export default {
    name:'activity',
    components:{
        carousel,
        activitycard
    },
    data(){
        return{
            amount:1,
            JSONData:[]
        }
    },
    mounted(){
        let vueObj=this;
        fetcher.setQuery({top:5});
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
<style lang="scss">
.full-grid{
    grid-column: 1/-1;
}
</style>