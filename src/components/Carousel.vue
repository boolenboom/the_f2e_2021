<template>
    <div class="carousel">
        <div v-if="indicatorType === 'next/prev'" class="controlButtons d-flex">
            <button :disabled="currentIndex <= 0" 
                class="button d-block" 
                @click='buttonClickHandler(-1)'>
                <img src="@/assets/icon/tool/arrow-left.png" class='d-block' alt="" srcset="">
            </button>
            <button :disabled="currentIndex >= cardsData.length - 1" 
                class="button d-block" 
                @click='buttonClickHandler(1)'>
                <img src="@/assets/icon/tool/arrow-right.png" class="d-block" alt="" srcset="">
            </button>
        </div>
        <div class="list d-flex" :class='{"sliding":isSliding}'
        @pointerdown.prevent='slideHandler' 
        @pointermove.prevent='slideHandler' 
        @pointerup.prevent='slideHandler'
        @touchmove='slideHandler'
        @touchend='slideHandler'>
            <template v-if="themeType!==''">
                <li v-for="cardData of cardsData" :key='cardData.ID' :style="`--current-index:${currentIndex}`" >
                    <router-link :to="`/content/${themeType}/${cardData.ID}`">
                        <slot name='items' :cardInfo='cardData'></slot>
                    </router-link>
                </li>
            </template>
            <template v-if="themeType===''">
                <li v-for="cardData of cardsData" :key='cardData.ID' :style="`--current-index:${currentIndex}`" >
                    <slot name='items' :cardInfo='cardData'></slot>
                </li>
            </template>
        </div>
        <ul v-if="indicatorType === 'point'" class="indicators d-flex">
            <li v-for="item,index of cardsData" :key='item.id' class="indicator">
                <label :class='{"active": index===currentIndex}'><input type="radio" name="indicator" id="" :value="index" hidden v-model="currentIndex"></label>
            </li>
        </ul>
    </div>
</template>
<style lang="scss">
.controlButtons{
    position: absolute;
    right: 0px;
    text-align: end;
    justify-content: end;
    .button{
        width: 48px;
        height: 48px;
        margin-left: 24px;
        border-radius: 50px;
        border: none;
        background-color: #f1f1f1;
        &:hover{
            cursor: pointer;
        }
        &:disabled{
            opacity: .5;
            cursor: not-allowed;
        }
        &:active{
            background-color:#ff5c00;
        }
        img{
            margin: auto;
            transform: scale(1.25);
        }
    }
}
.carousel{
    width: 100%;
    position: relative;
    .list{
        height: 100%;
        overflow-x: hidden;
        --view-amount: var(--custom-view);
        --gap: var(--custom-gap);
        &:active{
            cursor: pointer;
        }
        > li{
            width: calc((100% / var(--view-amount)) - (32px * (var(--view-amount) - 1)) / var(--view-amount));
            flex: 0 0 calc((100% / var(--view-amount)) - (32px * (var(--view-amount) - 1)) / var(--view-amount));
            margin-right: var(--gap);
            transform: translateX(calc((100% * var(--current-index) + var(--gap) * var(--current-index)) * -1));
            transition: transform .2s linear;
            a{
                text-decoration: none;
            }
        }
    }
    .sliding{
        li{
            pointer-events: none;
        }
    }
}
.indicators{
    position: absolute;
    left: 50%;
    bottom: 36px;
    transform: translateX(-50%);
    z-index: 3;
    label{
        display: block;
        height: 8px;
        width: 80px;
        margin: 0px 16px;
        background-color: #ffffff;
        &.active{
            background-color: #ff5c00;
        }
    }
}
</style>
<script>
import handlerConstructer from '@/assets/carouselInteractive.js';
let indicatorTypeMatch=['point','next/prev'];

export default {
    name:'carousel',
    props:{
        themeType:{type:String,default:''},
        cardsData:{
            type:Array,
            dafault:[]
        },
        indicatorType:{
            type:String,
            default:'point',
            validator:function(typeValue){
                return indicatorTypeMatch.indexOf(typeValue) !== -1;
            }
        }
    },
    data(){
        return{
            currentIndex:0,
            isSliding:false,
            carouselHandler:handlerConstructer()
        }
    },
    methods:{
        slideHandler(e){
            let vueObj = this;
            window.requestAnimationFrame(function(){
                let result = vueObj.carouselHandler[e.type](e.x || e.changedTouches[0].clientX, vueObj.currentIndex);
                vueObj.isSliding = vueObj.carouselHandler.checkIsSliding();
                if(result >= 1) vueObj.currentIndex = result - 1;
            })
        },
        buttonClickHandler(stepNum){
            this.currentIndex += stepNum;
        }
    },
    watch:{
        cardsData(newArr){
            console.log('watch upadte');
            this.carouselHandler.setClampOption( true, 0, newArr.length - 1 );
        }
    },
    mounted(){
        console.log('mounted upadte',this.indicatorType);
        this.carouselHandler.setClampOption( true, 0, this.cardsData.length - 1 );
    }
}
</script>