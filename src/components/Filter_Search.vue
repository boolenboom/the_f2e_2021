<template>
    <form action="#" class="search-filter d-flex">
            <div class='filter-city'>
                <div class="text subt2">{{ citySelected || '選擇城市'}}</div>
                <img src="../assets/icon/tool/down.png" alt="" class="icon switch" @focus="switchOpts('city')" @blur="switchOpts('city')" tabindex="-1" srcset="">
                <div class="options" :class="{'show':listName['city']}">
                    <select name="filter-city" multiple id="filter-city" class="phone-device">
                        <optgroup label="北部">
                            <option value="taipei">臺北</option>
                            <option value="taichung">臺中</option>
                            <option value="newTaipei">新北</option>
                        </optgroup>
                        <optgroup label="中部">
                            <option value="宜蘭">宜蘭</option>
                            <option value="taichung">彰化</option>
                            <option value="newTaipei">苗栗</option>
                        </optgroup>
                    </select>
                    <div class="input-group pc-device d-flex">
                        <fieldset>
                            <legend>北部</legend>
                            <label class="b3"><input type="checkbox" name="taipei" hidden value="taipei" v-model="cities">臺北市</label>
                            <label class="b3"><input type="checkbox" name="newTaipei" hidden value="newTaipei" v-model="cities">新北市</label>
                            <label class="b3"><input type="checkbox" name="宜蘭" hidden value="宜蘭" v-model="cities">宜蘭縣</label>
                            <label class="b3"><input type="checkbox" name="機靈" hidden value="基隆" v-model="cities">基隆市</label>
                        </fieldset>
                        <fieldset>
                            <legend>中部</legend>
                            <label class="b3"><input type="checkbox" name="taichung" hidden value="taichung" v-model="cities">臺中市</label>
                            <label class="b3"><input type="checkbox" name="彰化" hidden value="彰化" v-model="cities">彰化縣</label>
                            <label class="b3"><input type="checkbox" name="苗栗" hidden value="苗栗" v-model="cities">苗栗縣</label>
                        </fieldset>
                        <fieldset>
                            <legend>南部</legend>
                            <label class="b3"><input type="checkbox" name="taichung" hidden value="taichung" v-model="cities">嘉義市</label>
                            <label class="b3"><input type="checkbox" name="彰化" hidden value="彰化" v-model="cities">嘉義縣</label>
                            <label class="b3"><input type="checkbox" name="苗栗" hidden value="苗栗" v-model="cities">臺南市</label>
                        </fieldset>
                        <fieldset>
                            <legend>東部</legend>
                            <label class="b3"><input type="checkbox" name="taichung" hidden value="taichung" v-model="cities">花蓮縣</label>
                            <label class="b3"><input type="checkbox" name="彰化" hidden value="彰化" v-model="cities">臺東縣</label>
                        </fieldset>
                        <fieldset>
                            <legend>離島</legend>
                            <label class="b3"><input type="checkbox" name="taichung" hidden value="taichung" v-model="cities">澎湖縣</label>
                            <label class="b3"><input type="checkbox" name="彰化" hidden value="彰化" v-model="cities">金門縣</label>
                            <label class="b3"><input type="checkbox" name="彰化" hidden value="彰化" v-model="cities">連江縣</label>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div class='filter-category'>
                <div class="text subt2">{{categorySelected || '分類'}}</div>
                <img src="../assets/icon/tool/down.png" alt="" class="icon switch" @focus="switchOpts('category')" @blur="switchOpts('category')" tabindex="-1" srcset="">
                <div class="options" :class="{'show':listName['category']}">
                    <label class="b3"><input type="radio" name="category" hidden value="activity" v-model="category">活動</label>
                    <label class="b3"><input type="radio" name="category" hidden value="senicspot" v-model="category">景點</label>
                    <label class="b3"><input type="radio" name="category" hidden value="food" v-model="category">美食</label>
                </div>
            </div>
            <input type="submit" value="搜尋">
        </form>
</template>
<script>
export default {
    name:'filterSearch',
    data(){
        return{
            uniqueID:Math.floor(Math.random()*100),
            category:null,
            cities:[],
            matchString:{
                activity:'活動',
                senicspot:'景點',
                food:'美食'
            },
            listName:{
                city:false,
                category:false
            }
        }
    },
    computed:{
        citySelected(){
            return this.cities.length > 0 ? '已選' + this.cities.length + '區' : false;
        },
        categorySelected(){
            return this.category ? this.matchString[this.category] : false;
        }
    },
    methods:{
        mountID(mountname){
            return mountname + this.uniqueID;
        },
        switchOpts(val){
            this.listName[val] = !this.listName[val];
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
}
.switch{
    cursor: pointer;
    
}
.search-filter{
    position: relative;
    border: 1px solid #ff5c00;
    border-radius: 50px;
    justify-content: space-evenly;
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
}
</style>