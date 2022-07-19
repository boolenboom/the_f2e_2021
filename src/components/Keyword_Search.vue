<template>
    <form class="search-keyword" 
        :class="{'focus':isFocus}" 
        @focus="isFocus=true" 
        @blur="isFocus=false">
            <input type="search" name="keywordSearch" :id="uniqueID" 
                placeholder="請輸入關鍵字" 
                aria-label="需要搜尋請輸入關鍵字"
                required
                v-model="searchString"
                @change="trim">
                
            <label :for="uniqueID"><i class="gg-search"></i></label>
            <button @click.prevent="routerChange" >搜尋</button>
    </form>
</template>
<script>
export default {
    name:'keywordSearch',
    data(){
        return{
            uniqueID:'keywordSearch'+ Math.floor(Math.random()*100),
            isFocus:false,
            searchString:''
        }
    },
    methods:{
        trim(){
            this.searchString = String(this.searchString).trim();
        },
        routerChange(){
            this.trim();
            let KS = this.searchString;
            this.$router.push({name:'search',params:{page:1},query:{keywordSearch:KS}});
        }
    },
    watch:{
        $route(){
            this.searchString = ''
            this.isFocus = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.search-keyword{
    width: 100%;
    position: relative;
    &:focus-within{
        z-index: 10;
        button{
            display: block;
        }
        input{
            border: 1px solid #ffffff;
            background-color: #ffe2d1;
            outline: none;
        }
        label{
            right: calc(100% - 45px);
            background-color: transparent;
            i{
                color: #000000;
            }
        }
    }
    button{
        z-index: 11;
        display: none;
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 14px;
        height: 50px;
        color: #ffffff;
        background-color: #ff5c00;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border: none;
        cursor: pointer;
    }
    label{
        z-index: 5;
        display: block;
        position: absolute;
        right: 5px;
        top: 5px;
        padding: 14px;
        background-color: #ff5c00;
        border-radius: 32px;
        cursor: pointer;
        transition: right .5s ease,background-color .5s ease;
        i{
            color: #ffffff;
            --ggs:1.25;
        }
    }
    input{
        width: 100%;
        height: 50px;
        padding: 0px 24px;
        padding-left: 45px;
        border: 1px solid transparent;
        border-radius: 50px;
        background-color: #ffffff !important;
        box-shadow: 0px 0px 10px rgba($color: #000000, $alpha: 0.12);
    }
}
</style>