<template>
    <div class="card">
        <ul class="info-class d-flex">
            <li v-for="classTag of info.classTags" :key='classTag' class="class-tag">{{classTag}}</li>
        </ul>
        <div class="pic">
            <img :src="info.imgSrc" alt="food spot image" srcset="">
        </div>
        <div class="textInfo d-flex" draggable="false">
            <h5  class="info-name">{{info.cardName}}</h5>
            <div class="info-city b2 d-flex">
                <img src="@/assets/icon/inform/location.png" alt="location icon" srcset="" class="d-block">
                <span class="d-block">{{info.city}}</span>
            </div>
            <div class="info-phone b2 d-flex">
                <img src="@/assets/icon/inform/phone.png" alt="phone icon" srcset="" class="d-block">
                <span class="d-block">+{{info.phone}}</span>
            </div>
            <a :href="`tel:+${info.phone}`" class="phone-contact d-flex">
                <img src="@/assets/icon/inform/phone.png" alt="phone icon" srcset="" class="d-block">
                <span class="d-block">致電</span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name:'card',
    props:{
        cardInfo:{
            type:Object,
        }
    },
    computed:{
        info(){
            return {
                classTags: this.cardInfo.ClassTags,
                imgSrc: this.cardInfo.PictureUrl[0]||'',
                cardName: this.cardInfo.Name || '無名稱',
                city: this.cardInfo.Address,
                phone: this.cardInfo.Phone
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.info-class{
    position: absolute;
    top: 16px;
    right: 16px;
    margin-bottom: 16px;
    justify-content: end;
    .class-tag{
        padding: 4px 8px;
        background-color: #ffffff;
        color: #f65000;
        margin-left: 16px;
        border-radius: 4px;
    }
}
.card{
    width: 100%;
    margin-right: 32px;
    position: relative;
    bottom: 0;
    align-items: end;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
}
.pic{
    height: 312px;
    img{
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
.textInfo{
    width: 100%;
    padding: 16px 24px;
    background-color: #ffffff;
    text-align: start;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .info-name{
        margin-bottom: 8px;
    }
    .info-city,.info-phone{
        color: #676767;
        img{
            margin-right: 8px;
        }
    }
    .info-name{
        width: 100%;
        flex: 0 0 100%;
    }
    .phone-contact{
        background-color: #f65000;
        color: #ffffff;
        padding: 4px 12px;
        border-radius: 50px;
    }
}
</style>