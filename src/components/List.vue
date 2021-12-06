<template>
    <div class="theme-list">
        <ul class="d-grid container">
            <li v-for="cardData of cardsData" :key='cardData.id'>
                <slot name='items' :cardInfo='cardData'></slot>
            </li>
        </ul>
    </div>
</template>
<style lang="scss">
.theme-list{
    ul{
        row-gap: 48px;
    }
    li{
        grid-column: auto/span 4;
    }
}
</style>
<script>
export default {
    name:'List',
    props:{
        cardsData:{type:Array}
    }
}
</script>