<template>
    <div class="theme-list">
        <ul class="d-grid container">
            <li v-for="cardData of cardsData" :key='cardData.ID'>
                <router-link :to="`/content/${$route.params.category}/${cardData.ID}`">
                    <slot name='items' :cardInfo='cardData'></slot>
                </router-link>
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
        a{
            text-decoration: none;
        }
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