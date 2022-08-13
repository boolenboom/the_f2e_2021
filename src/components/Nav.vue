<template>
    <div id="nav" class="nav-default" :class="{'slide-down-show':navShow}">
        <div class="d-grid container align-center">
            <div class="search phone-device">
                <button class="button-switch" @click="SwitchHandler('searchFullpage')"><img
                        src="../assets/icon/tool/search-primary.png" alt="" srcset=""></button>
                <div class="search-fullpage container" :class="{'fullpage-default':!switchName.searchFullpage}">
                    <button class="button-cancel" @click="SwitchHandler('searchFullpage',false)"><img
                            src="../assets/icon/tool/close-white.png" alt="" srcset=""></button>
                    <div class="keyword-layout">
                        <keyword-search />
                    </div>
                    <div class="condition-layout">
                        <div class="title">篩選</div>
                        <filter-search :optionGroup="region" subStructName="zone" :categoryList="['Activity','ScenicSpot','Restaurant']" />
                    </div>
                </div>
            </div>
            <div class="logo">
                <router-link to="/"><img src="../assets/logo/logo_black.png" alt="官網logo" srcset=""></router-link>
            </div>

            <div class="menu d-flex" :class="{'menu-default':!switchName.menuFullpage}">
                <button class="button-cancel" @click="SwitchHandler('menuFullpage',false)"><img
                        src="../assets/icon/tool/close-white.png" alt="" srcset=""></button>
                <ul class="pages d-flex">
                    <li class="pageOption" @click="SwitchHandler('menuFullpage',false)">
                        <router-link to="/theme/Activity/1">活動介紹</router-link>
                    </li>
                    <li class="pageOption" @click="SwitchHandler('menuFullpage',false)">
                        <router-link to="/theme/ScenicSpot/1">旅遊景點</router-link>
                    </li>
                    <li class="pageOption" @click="SwitchHandler('menuFullpage',false)">
                        <router-link to="/theme/Restaurant/1">特色美食</router-link>
                    </li>
                </ul>
                <div class="condition-layout pc-device">
                    <keyword-search />
                </div>
            </div>
            <button class="button-switch phone-device" @click="SwitchHandler('menuFullpage')"><img
                    src="../assets/icon/tool/menu.png" alt="" srcset=""></button>
            <div class="advance pc-device">
                <filter-search :optionGroup="region" subStructName="zone" :categoryList="['Activity','ScenicSpot','Restaurant']" />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
li{
    list-style-type: none;
}
#nav{
    width: 100%;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.06);
    position: fixed;
    transition: top .3s ease;
    background-color: #ffffff;
    z-index: 500;
    .container{
        padding-top: 16px;
        padding-bottom: 16px;
    }
}
.nav-default{
    top: -100px;
}
.slide-down-show{
    top: 0px;
}
.button-cancel,.button-switch{
    display: block;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.search{
    grid-column: 1/span 1;
    .button-switch{
        text-align: start;
    }
    .search-fullpage{
        position: absolute;
        transition: transform .3s ease;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        background-color: #262626;
        &.fullpage-default{
            transform: translateX(-100%);
        }
        .button-cancel{
            margin-bottom: 28px;
        }
        .keyword-layout{
            margin-bottom: 40px;
        }
        .condition-layout{
            .title{
                margin-bottom: 8px;
                color: #ffffff;
                text-align: start;
            }
        }
    }
}
.logo{
    grid-column: 1/span 1;
    @include phone-width{
        grid-column: 2/span 2;
    }
}
.menu{
    grid-column: 3/ span 5;
    position: relative;
    transition: transform .3s ease;
    @include phone-width{
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        height: 100vh;
        width: 72.53%;
        padding: 16px 15px;
        background-color: #262626;
        &.menu-default{
            transform: translateX(100%);
        }
    }
    .button-cancel{
        align-self: flex-end;
    }
    .pages{
        position: relative;
        flex-direction: column;
        margin-top: 88px;
        @include pc-width{
            margin-top: 0;
            flex-direction:row;
            position: absolute;
            top:5px;
            left: 25px;
            justify-content: space-evenly;
            align-items: center;
            z-index: 2;
            width: calc(100% - 65px);
            height: 40px;
            border-radius: 20px;
            padding: 0 20px;
            background-color: #ffffff;
            .pageOption{
                margin-top: 0;
                a{
                    color: #262626;
                }
            }
        }
        @include phone-width{
            .pageOption{
                a{
                    color: #ffffff;
                }
            }
            .pageOption+.pageOption{
                margin-top: 24px;
            }
        }
    }
    .condition-layout{
        width: 100%;
    }
}
.button-switch{
    text-align: end;
}
.advance{
    grid-column: -1 / -4;
}
</style>
<script>
import keywordSearch from '@/components/Keyword_Search.vue';
import filterSearch from '@/components/Filter_Search.vue';
export default {
    name:'navi',
    components:{
        keywordSearch,
        filterSearch
    },
    data(){
        return{
            pageTop:0,
            navShow:true,
            switchName:{
                searchFullpage:false,
                menuFullpage:false
            },
            region: [{
                    zone: '北部',
                    options: [
                        { name: '臺北市', value: '臺北市' },
                        { name: '新北市', value: '新北市' }, { name: '桃園市', value: '桃園市' },
                        { name: '宜蘭縣', value: '宜蘭縣' }, { name: '基隆市', value: '基隆市' },
                        { name: '新竹市', value: '新竹市' }, { name: '新竹縣', value: '新竹縣' }
                    ]
                },
                {
                    zone: '中部',
                    options: [
                        { name: '臺中市', value: '臺中市' },
                        { name: '彰化縣', value: '彰化縣' }, { name: '苗栗縣', value: '苗栗縣' },
                        { name: '南投縣', value: '南投縣' }, { name: '雲林縣', value: '雲林縣' }
                    ]
                },
                {
                    zone: '南部',
                    options: [
                        { name: '嘉義市', value: '嘉義市' },
                        { name: '嘉義縣', value: '嘉義縣' },
                        { name: '臺南市', value: '臺南市' }, { name: '高雄市', value: '高雄市' }, { name: '屏東縣', value: '屏東縣' }
                    ]
                },
                {
                    zone: '東部',
                    options: [
                        { name: '花蓮縣', value: '花蓮縣' }, { name: '臺東縣', value: '臺東縣' }
                    ]
                },
                {
                    zone: '離島',
                    options: [
                        { name: '澎湖縣', value: '澎湖縣' }, { name: '金門縣', value: '金門縣' }, { name: '連江縣', value: '連江縣' }
                    ]
                }]
        }
    },
    methods:{
        navScrollUpDisplay(){
            let vueObj = this;
            requestAnimationFrame(function(){
                vueObj.pageTop = visualViewport.pageTop;
            })
        },
        SwitchHandler(nameValue,boolenVal){
            this.switchName[nameValue] = boolenVal || !this.switchName[nameValue];
        },
        collapseMenu(){
            this.switchName.searchFullpage = false;
            this.switchName.menuFullpage = false;
        }
    },
    watch:{
        pageTop(newVal, oldVal){
            this.navShow = newVal - oldVal < 0 ? true : false;
        },
        $route(){
            this.collapseMenu();
        }
    },
    mounted(){
        window.addEventListener('scroll',this.navScrollUpDisplay);
    },
    beforeDestory(){
        window.removeEventListener('scroll',this.navScrollUpDisplay);
    }
}
</script>