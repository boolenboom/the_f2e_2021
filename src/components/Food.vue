<template>
    <section id="food">
        <div class="container">
            <h2 class="carouselName">美食推薦</h2>
            <carousel :cardsData='JSONData' class="full-grid" indicatorType='next/prev'>
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
import fetcherConstructer from '@/assets/APIFetcher.js';
let fetcher = fetcherConstructer('Tourism','Restaurant');
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
        fetcher.setQuery({top:15,skip:50,select:'ID,Name,RestaurantName,Class,City,Picture,Phone'});
        fetcher.setOtherParam('NewTaipei');
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