<template>
    <div id="nav">
        <div class="grid-container">
            <div class="search phone-device">
            <div class="switch"><img src="#" alt="" srcset=""></div>
            <div class="searchPage hide-slide">
                <keyword-search/>
                <filter-search/>
            </div>
        </div>
        <div class="logo"><router-link to="/"><img src="../assets/logo/logo_black.png" alt="官網logo" srcset=""></router-link></div>
        
        <div class="menu">
            <ul class="pages">
                <li class="pageOption"><router-link to="/">活動介紹</router-link></li>
                <li class="pageOption"><router-link to="/">旅遊景點</router-link></li>
                <li class="pageOption"><router-link to="/about">特色美食</router-link></li>
            </ul>
            <keyword-search/>
        </div>
        <filter-search class="advance"/>
        </div>
        
    </div>
</template>
<script>
import keywordSearch from '@/components/Keyword_Search.vue';
import filterSearch from '@/components/Filter_Search.vue';
export default {
    name:'nav',
    components:{
        keywordSearch,
        filterSearch
    }
}
</script>
<style lang="scss">
li{
    list-style-type: none;
}
#nav{
    width: 100%;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.06);
}
.search{
    grid-column: 1/span 1;
}
.phone-device{
    display: none;
}
.logo{
    grid-column: 1/span 1;
}
.menu{
    grid-column: 3/ span 5;
    position: relative;
    display: flex;
    .pages{
        position: absolute;
        top:5px;
        left: 25px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        z-index: 2;
        width: calc(100% - 65px);
        height: 40px;
        border-radius: 20px;
        padding: 0 20px;
        background-color: #ffffff;
    }
}
.advance{
    grid-column: -1 / -4;
}
</style>