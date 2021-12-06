<template>
    <div id="hero">
        <carousel :cardsData='heroJSON' indicatorType='point'>
            <template v-slot:items='props'>
                <card :cardInfo='props.cardInfo'/>
            </template>
        </carousel>
    </div>
</template>
<style lang="scss">
#hero{
    --custom-view:1;
    --custom-gap:32px;
    @include phone-width{
        --custom-view:1;
        --custom-gap:8px;
    }
}
</style>
<script>
import carousel from '@/components/Carousel.vue';
import card from '@/components/Hero_Card.vue';
import heroCardsJSON from '@/assets/JSON/hero.json';
import { heroImgs as hashImgs } from '@/assets/filenameHashList.js';
let imgArr = Array.from(hashImgs);
Array.from(heroCardsJSON).forEach(card=>{
    let index = +card.imgIndex;//string to unmber
    card.imgSrc = imgArr[index];
})//import的物件被汙染了，得回來處理
export default {
    name:'hero',
    components:{
        carousel,
        card
    },
    data(){
        return{
            heroJSON:heroCardsJSON,
        }
    }
}
</script>