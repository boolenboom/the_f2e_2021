<template>
    <div class="theme-list">
        <ul class="d-grid container">
            <li v-for="cardData of cardsData" :key='cardData.ID'>
                <router-link :to="`/content/${cardData.category}/${cardData.ID}`">
                    <scenicspotcard
                    v-if="cardData.Category === 'ScenicSpot'"
                    :cardInfo="cardData"
                    />
                    <activitycard
                    v-if="cardData.Category === 'Activity'"
                    :cardInfo="cardData"
                    />
                    <foodcard
                    v-if="cardData.Category === 'Restaurant'"
                    :cardInfo="cardData"
                    />
                </router-link>
            </li>
        </ul>
        <div v-if="cardsData.length === 0" class="noResult">
            <img src="../assets/bg/img_no result.png" alt="no result" srcset="">
            <h2>搜尋不到資料</h2>
            <h5>請改用其他關鍵字試試</h5>
        </div>
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
    .noResult{
        h2{
            color: #ff6000;
        }
        h5{
            color: #a5a5a5;
        }
    }
}
</style>
<script>
import activitycard from "@/components/Activity_Card.vue";
import scenicspotcard from "@/components/Scenicspot_Card.vue";
import foodcard from "@/components/Food_Card.vue";
export default {
    name:'List',
    components:{
        activitycard,
        scenicspotcard,
        foodcard,
    },
    props:{
        cardsData:{type:Array}
    }
}
</script>