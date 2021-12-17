<template>
    <div class="pagination d-flex">
        <button class="button-prev" @click="pageChange($route.params.page -1)"><img src="../assets/icon/tool/arrow-left.png" class="d-block" alt="" srcset=""></button>
        <ul class="page-list d-flex" :data-Amount='dataAmount'>
            <li @click="pageChange(1)" :class='{"active":isActive(1)}'>1</li>
            <li v-if="$route.params.page > 5">...</li>
            <li v-for="index in pageNumber" :key="`page` + index" 
                :class='{"active":isActive(relatePage(+index + 1))}'
                @click="pageChange(relatePage(+index + 1))">
                {{relatePage(+index + 1)}}
            </li>
            <li v-if="+$route.params.page + 5 < +lastPageNumber">...</li>
            <li v-if="lastPageNumber !== 0" @click="pageChange(lastPageNumber)" :class='{"active":isActive(lastPageNumber)}'>
                {{lastPageNumber}}
            </li>
        </ul>
        <button class="button-next" @click="pageChange($route.params.page +1)"><img src="../assets/icon/tool/arrow-right.png" class="d-block" alt="" srcset=""></button>
    </div>
</template>
<script>
export default {
    name:'pagination',
    props:{
        dataAmount:{type:Number,default:149},
        viewType:{type:String,default:'theme'}
    },
    computed:{
        pageNumber(){
            console.log(typeof this.dataAmount === 'number');
            return (Math.floor(this.dataAmount / 15) > 10) ? 8 :  Math.max((Math.floor(this.dataAmount / 15) - 2),0);
        },
        lastPageNumber(){
            return Math.floor(this.dataAmount / 15);
        }
    },
    methods:{
        isActive(index){
            return +this.$route.params.page === +index;
        },
        relatePage(index){
            let last = Math.floor(this.dataAmount / 15);
            let page = 
            (this.$route.params.page < 5) ? index : 
            (this.$route.params.page + 5 < last) ? this.$route.params.page - (5 - index) :
                this.$route.params.page - ((10 - (last - this.$route.params.page)) - index);
            return page;
        },
        pageChange(index){
            let customparams =JSON.parse(JSON.stringify(this.$route.params));
            customparams.page = index;
            console.log(customparams,this.$route);
            let type = this.viewType;
            this.$router.push({name:type,params:customparams,query:this.$route?.query});
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