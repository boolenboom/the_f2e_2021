<template>
    <div class="pagination d-flex">
        <button class="button-prev" @click="pageChange($route.params.page -1)"><img src="../assets/icon/tool/arrow-left.png" class="d-block" alt="" srcset=""></button>
        <ul class="page-list d-flex" :data-Amount='dataAmount'>
            <li v-if="$route.params.page > 5" @click="pageChange(1)">1</li>
            <li v-if="$route.params.page > 5">...</li>
            <li v-for="index in 4" :key="`before` + index" 
            :class='{"active":+$route.params.page===+index}'
            @click="pageChange(+relatePage(index))">
                {{+relatePage(index)}}
            </li>
            <li :class="{'active':$route.params.page > 4}"
                @click="pageChange($route.params.page > 4 ? $route.params.page : 5)">
                {{$route.params.page > 4 ? $route.params.page : 5}}
            </li>
            <li v-for="index in 4" :key="`after` + index"
            @click="pageChange($route.params.page > 4 ? +$route.params.page + +index : 5 + +index)">
                {{$route.params.page > 4 ? +$route.params.page + +index : 5 + +index}}
            </li>
            <li v-if="$route.params.page + 5 < lastPageNumber">...</li>
            <li>{{lastPageNumber}}</li>
        </ul>
        <button class="button-next" @click="pageChange($route.params.page +1)"><img src="../assets/icon/tool/arrow-right.png" class="d-block" alt="" srcset=""></button>
    </div>
</template>
<script>
export default {
    name:'pagination',
    props:{
        dataAmount:{type:Number,default:149}
    },
    computed:{
        lastPageNumber(){
            return Math.ceil(this.dataAmount / 15);
        }
    },
    methods:{
        relatePage(index){
            let page = this.$route.params.page < 5 ? index : this.$route.params.page - (5 - index);
            return page;
        },
        pageChange(index){
            let customparams =JSON.parse(JSON.stringify(this.$route.params));
            customparams.page = index;
            console.log(customparams,this.$route);
            this.$router.push({name:'theme',params:customparams,query:this.$route?.query});
        }
    }
}
</script>
<style lang="scss" scoped>
.pagination{
    position: relative;
    justify-content: center;
    align-items: center;
    margin: 80px auto;
    .button-prev,.button-next{
        background-color: transparent;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        padding: 4px 2px;
        margin: 0px 8px;
    }
    .page-list{
        border-radius: 4px;
        border: 1px solid #e5e5e5;
        // flex-direction: row-reverse;
        li{
            padding: 8px;
            cursor: pointer;
            &.active{
                color: #ffffff;
                background-color: #ff5c00;
            }
        }
        li+li{
            border-left: 1px solid #e5e5e5;
        }
    }
}
</style>