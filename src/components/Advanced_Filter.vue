<template>
    <form class="search-filter d-flex">
            <div class='filter-city' @blur="switchOpts('city',false)" tabindex="-1">
                <div class="text subt2">{{ citySelected || '選擇城市'}}</div>
                <img src="../assets/icon/tool/down.png" alt="" class="icon switch" 
                    @click="switchOpts('city')" srcset="">
                <div class="options" :class="{'show':listName['city']}">
                    <div class="input-group d-flex">
                        <fieldset v-for="area of region" :key='area.zoneName'>
                            <legend>{{area.zoneName}}</legend>
                            <label v-for="city of area.cities" :key="city.name" 
                            class="b3 d-block" 
                            :class="{'selected':cities.indexOf(city.value)>-1}">
                                <input type="checkbox" hidden :value="city.value" v-model="cities">
                                {{city.name}}
                            </label>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div class='filter-category' @blur="switchOpts('category',false)" tabindex="-1">
                <div class="text subt2">{{categorySelected || '分類'}}</div>
                <img src="../assets/icon/tool/down.png" alt="" class="icon switch" 
                    @click="switchOpts('category')" srcset="">
                <div class="options" :class="{'show':listName['category']}">
                    <label v-for="classTag of classTags" class="b3 d-block" 
                    :class="{'selected':category.indexOf(classTag)>-1}" :key="classTag">
                        <input type="checkbox" name="category" hidden :value="classTag" v-model="category">
                        {{classTag}}
                    </label>
                </div>
            </div>
            <input type="submit" value="搜尋" @click.prevent="pageChange">
        </form>
</template>
<script>
import fetcherConstructer from '@/assets/APIFetcher.js';
export default {
    name:'filterSearch',
    data(){
        return{
            category:[],
            cities:[],
            listName:{
                city:false,
                category:false
            },
            tagArr:[],
            themeMatch:{
                ScenicSpot:'Class1,Class2,Class3',
                Activity:'Class1,Class2',
                Restaurant:'Class'
            }
        }
    },
    props:{
        region:{type:Array,default(){return [
            {zoneName:'北部',
            cities:[
                {name:'臺北市',value:'臺北市'},
                {name:'新北市',value:'新北市'},{name:'桃園市',value:'桃園市'},
                {name:'宜蘭縣',value:'宜蘭縣'},{name:'基隆市',value:'基隆市'},
                {name:'新竹市',value:'新竹市'},{name:'新竹縣',value:'新竹縣'}
                ]
            },
            {zoneName:'中部',
            cities:[
                {name:'臺中市',value:'臺中市'},
                {name:'彰化縣',value:'彰化縣'},{name:'苗栗縣',value:'苗栗縣'},
                {name:'南投縣',value:'南投縣'},{name:'雲林縣',value:'雲林縣'}
                ]
            },
            {zoneName:'南部',
            cities:[
                {name:'嘉義市',value:'嘉義市'},
                {name:'嘉義縣',value:'嘉義縣'},
                {name:'臺南市',value:'臺南市'},{name:'高雄市',value:'高雄市'},{name:'屏東縣',value:'屏東縣'}
                ]
            },
            {zoneName:'東部',
            cities:[
                {name:'花蓮縣',value:'花蓮縣'},{name:'臺東縣',value:'臺東縣'}
                ]
            },
            {zoneName:'離島',
            cities:[
                {name:'澎湖縣',value:'澎湖縣'},{name:'金門縣',value:'金門縣'},{name:'連江縣',value:'連江縣'}
                ]
            }
            ];}
        },
        themeType:{
            type:String,
        }
    },
    computed:{
        citySelected(){
            return this.cities.length > 0 ? '已選' + this.cities.length + '區' : false;
        },
        categorySelected(){
            return this.category.length > 0 ? '已選' + this.category.length + '種' : false;
        },
        classTags(){
            let matchList = this.themeMatch[this.themeType].split(',');
            let tagNameList = [];
            console.log(matchList);
            let foo = Array.from(this.tagArr).filter(obj=>'Class' in obj||'Class1' in obj||'Class2' in obj||'Class3' in obj);
            foo.forEach(el=>{
                matchList.forEach(matchName=>{
                    if(el[matchName] != undefined && tagNameList.indexOf(el[matchName]) === -1)tagNameList.push(el[matchName]);
                });
            });
            console.log('computed');
            return tagNameList;
        }
    },
    methods:{
        runFetch(url,header){
            let vueObj=this;
            fetch(url,header)
            .then(function (response) {
                return response.json();
            })
            .then(function (data){
                vueObj.tagArr = Array.from(data);
                // isLoaded=false;
            })
            .catch(function (error) {
                console.warn(error);
            });
        },
        switchOpts(val,setBoolen){
            if(setBoolen!==undefined){
                this.listName[val] = setBoolen;
                return;
            }
            this.listName[val] = !this.listName[val];
        },
        pageChange(){
            if(!(this.category.length>0) && !(this.cities.length>0)) return;
            let query = {class:''+this.category,cities:''+this.cities};
            let routeSet = {name:this.$route.name,params:this.$route.params,query:query};
            console.log(routeSet);
            console.log(this);
            this.$router.push(routeSet);
        }
    },
    watch:{
        themeType(newVal){
            let fetcher = fetcherConstructer('Tourism',newVal);
            fetcher.setQuery({top:10000,select:this.themeMatch[newVal]});
            this.runFetch(fetcher.getUrl(),fetcher.getHeader());
        }
    },
    mounted(){
        let fetcher = fetcherConstructer('Tourism',this.themeType);
        fetcher.setQuery({top:10000,select:this.themeMatch[this.themeType]});
        this.runFetch(fetcher.getUrl(),fetcher.getHeader());
    }
}
</script>
<style lang="scss" scoped>
input[type='submit']{
    background-color: #ff5c00;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border: none;
    cursor: pointer;
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
}
.switch{
    cursor: pointer;
}
.search-filter{
    position: relative;
    border: 1px solid #ff5c00;
    border-radius: 50px;
    justify-content: space-evenly;
    z-index: 100;
    > *{
        flex: 1 1 auto;
    }
}
[class*='filter-']{
    display: flex;
    align-items: center;
}
.filter-city{
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
    display: none;
    &.show{
        display: block;
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
        text-align: center;
    }
}
label{
    position: relative;
    padding: 4px 0;
    height: fit-content;
            &:hover{
                background-color: #ffefe6;
            }
            &:active{
                background-color: #ff5c00;
            }
    &.selected{
        background-color: #ff5c00;
    }
}
</style>