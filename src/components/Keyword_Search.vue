<template>
    <form action="#" method="get" class="search-keyword" :class="{'focus':isFocus}">
                <input type="search" name="keywordSearch" :id="uniqueID" 
                placeholder="請輸入關鍵字" 
                aria-label="需要搜尋請輸入關鍵字"
                required
                @focus="isFocus=true"
                @blur="isFocus=false">
                <label :for="uniqueID"><i class="gg-search"></i></label>
    </form>
</template>
<script>
export default {
    name:'keywordSearch',
    data(){
        return{
            uniqueID:'keywordSearch'+ Math.floor(Math.random()*100),
            isFocus:false
        }
    },
}
</script>
<style lang="scss" scoped>
.search-keyword{
    width: 100%;
    position: relative;
    &.focus{
        z-index: 10;
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
        box-shadow: 0px 0px 10px
            rgba($color: #000000, $alpha: 0.12);
        &:focus-visible{
            border: 1px solid #ffffff;
            background-color: #ffe2d1;
            outline: none;
        }
        &:focus-visible + label{
            right: calc(100% - 45px);
            background-color: transparent;
            i{
                color: #000000;
            }
        }
    }
}
</style>