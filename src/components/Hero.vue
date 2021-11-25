<template>
    <div id="hero">
        <carousel :cardsData='heroJSON' :viewAmount='amount' indicatorType='point'>
            <template v-slot:items='props'>
                <card :cardInfo='props.cardInfo'/>
            </template>
        </carousel>
    </div>
</template>
<script>
import carousel from '@/components/Carousel.vue';
import card from '@/components/Hero_Card.vue';
import heroCardsJSON from '@/assets/JSON/hero.json';
import hashImgs from '@/assets/filenameHashList.js';
let imgArr = Array.from(hashImgs.heroImgs);
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
            amount:1
        }
    }
}
</script>