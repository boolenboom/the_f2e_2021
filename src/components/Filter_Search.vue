<template>
    <form action="#" class="search-filter d-flex">
        <div class='filter-option' @blur="controlMenu('option',false)" tabindex="-1">
            <div class="text subt2">{{ optionSelected || '選擇城市'}}</div>
            <img src="../assets/icon/tool/down.png" class="icon switch" :class="{ 'turnUp' : listMenu['option'] }"
                alt="縣市搜尋選單" @click="switchMenu('option')" srcset="">
            <div class="options" :class="{ 'show': listMenu['option'] }">
                <div class="input-group d-flex">
                    <fieldset v-for="subGroup of optionGroup" :key='subGroup[subStructName]'>
                        <legend>{{subGroup[subStructName]}}</legend>
                        <label v-for="option of subGroup.options" :key="option.name" class="b3 d-block"
                            :class="{'selected':selectedOptions.indexOf(option.value)>-1}">
                            <input type="checkbox" hidden :value="option.value" v-model="selectedOptions">
                            {{option.name}}
                        </label>
                    </fieldset>
                </div>
            </div>
        </div>
        <div class='filter-category' @blur="controlMenu('category',false)" tabindex="-1">
            <div class="text subt2">{{categorySelected || '分類'}}</div>
            <img src="../assets/icon/tool/down.png" class="icon switch" :class="{ 'turnUp' : listMenu['category'] }"
                alt="類型搜尋選單" @click="switchMenu('category')" srcset="">
            <div class="options" :class="{ 'show' : listMenu['category'] }">
                <label v-for="classTag of categoryList" class="b3 d-block"
                    :class="{ 'selected': selectedCategory.indexOf( classTag ) > -1 }" :key="classTag">
                    <input :type="categoryInputType" name="category" hidden :value="classTag"
                        v-model="selectedCategory">
                    {{matchString[classTag] || classTag}}
                </label>
            </div>
        </div>
        <input type="submit" value="搜尋" @click.prevent="pageChange">
    </form>
</template>
<script>
export default {
    name:'filterSearch',
    data(){
        return{
            uniqueID:Math.floor(Math.random()*100),
            selectedCategory:[],
            selectedOptions:[],
            matchString:{
                Activity:'活動',
                ScenicSpot:'景點',
                Restaurant:'美食'
            },
            listMenu:{
                option:false,
                category:false
            }
        }
    },
    props:{
        optionGroup:{type:Array,default(){
            return [{
                subgroupname:'No subgroup',
                options:[{name:'no option',value:''}]
            }];
        }},
        subStructName:{type:String,default:'subgroupname'},
        categoryList:{type:Array,default(){return ['No category']}},
        componentType:{type:String,default:'naviSearch'}
    },
    computed:{
        optionSelected(){
            return this.selectedOptions.length > 0 ? '已選' + this.selectedOptions.length + '種' : false;
        },
        categorySelected(){
            return this.componentType == 'naviSearch' && this.selectedCategory.length > 0 ? this.matchString[this.selectedCategory]  
            : this.selectedCategory.length > 0 ? '已選' + this.selectedCategory.length + '種' : false ;
        },
        categoryInputType(){
            return this.componentType == 'naviSearch' ? 'radio' : 'checkbox';
        }
    },
    methods:{
        mountID(mountname){
            return mountname + this.uniqueID;
        },
        switchMenu(type){
            this.listMenu[type] = !this.listMenu[type];
        },
        controlMenu(type, val){
            this.listMenu[type] = val;
        },
        pageChange() {
            if (!(this.selectedCategory.length > 0) && !(this.selectedOptions.length > 0)) return;
            this.listMenu.option = false;
            this.listMenu.category = false;
            let query ={
                    naviSearch:{
                        cities: '' + this.selectedOptions
                    },
                    themeAdvancedSearch:{
                        class: '' + this.selectedCategory, cities: '' + this.selectedOptions
                    }
                };
            let routeSet = { 
                name: 'theme',
                params: this.componentType == 'naviSearch' ? { category: this.selectedCategory, page: '1' } : this.$route.params, 
                query: query[this.componentType] };
            this.$router.push(routeSet);
        }
    }
}
</script>
<style lang="scss" scoped>
input[type='submit']{
    background-color: #ff5c00;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border: none;
}
.ver-center{
    align-items: center;
}
.text{
    display: inline-block;
}
.icon{
    width: 44px;
    height: fit-content;
    padding: 8px;
    transition: transform .3s ease;
    &.turnUp{
        transform: rotateX(180deg);
    }
}
.switch{
    cursor: pointer;
    
}
.search-filter{
    position: relative;
    border: 1px solid #ff5c00;
    border-radius: 50px;
    justify-content: space-evenly;
    background-color: #ffffff;
    > *{
        flex: 1 1 auto;
    }
}
[class*='filter-']{
    display: flex;
    align-items: center;
}
.filter-option{
    justify-content: flex-end;
}
.filter-category{
    position: relative;
    justify-content: space-evenly;
    .options{
        width: 100%;
        overflow-y: hidden;
        label{
            padding: 8px 0;
        }
        label+label{
            border-top: 1px solid #ff5c00;
        }
    }
}
.options{
    opacity: 0;
    pointer-events: none;
    &.show{
        opacity: 1;
        pointer-events: all;
    }
    position: absolute;
    top: 64px;
    right: 0;
    background-color: #ffffff;
    border: 1px solid #ff5c00;
    border-radius: 8px;
}
.input-group{
    width: 714px;
    flex-wrap: wrap;
    padding: 24px;
}
fieldset{
    border: none;
    flex: 0 0 33.3%;
    text-align: start;
    padding: 12px;
    padding-top: 16px;
    display: flex;
    flex-wrap: wrap;
    label{
        flex: 0 0 calc(33.3% - 8px);
        border: 1px solid #ff5c00;
        border-radius: 4px;
        margin: 4px;
    }
}
label{
    display: block;
    text-align: center;
    padding: 4px 0;
    height: fit-content;
            &:hover{
                background-color: #ffefe6;
            }
            &:active{
                background-color: #ff5c00;
            }
        &.selected {
            background-color: #ff5c00;
        }
}
</style>