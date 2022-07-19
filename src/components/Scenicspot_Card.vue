<template>
    <div class="card">
        <ul class="info-class d-flex">
            <li v-for="classTag of info.classTags" :key='classTag' class="class-tag">{{classTag}}</li>
        </ul>
        <div class="pic">
            <img v-show="imgShow" :src="info.imgSrc" :alt="info.imgDesc" @error="elementHide">
        </div>
        <div class="textInfo" draggable="false">
            <h5  class="info-name">{{info.cardName}}</h5>
            <div class="info-city subt1 d-flex">
                <img src="@/assets/icon/inform/location.png" alt="location icon" srcset="" class="d-block">
                <span class="d-block">{{info.city}}</span>
            </div>
            <div class="info-openTime d-flex">
                <img src="@/assets/icon/inform/time.png" alt="time icon" srcset="" class="d-block">
                <span class="d-block">{{info.openTime}}</span>
            </div>
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
    data(){
        return{
            imgShow:true
        }
    },
    methods:{
        elementHide:function(){
            console.log('image load error');
            this.imgShow = false;
        }
    },
    computed:{
        info(){
            return {
                classTags: this.cardInfo.ClassTags,
                imgSrc: this.cardInfo.PictureUrl[0],
                imgDesc: this.cardInfo.PictureDescri[0],
                cardName: this.cardInfo.Name || '無活動名稱',
                city: this.cardInfo.Address,
                openTime: this.cardInfo.OpenTime,
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
    background-image: url('../assets/bg/No_image_0.5x.png');
    background-repeat: no-repeat;
    background-size: cover;
}
.textInfo{
    width: 100%;
    padding: 16px 24px;
    background-color: #ffffff;
    text-align: start;
    .info-name,.info-city,.info-openTime{
        margin-bottom: 8px;
    }
    .info-city,.info-openTime{
        color: #676767;
        img{
            margin-right: 8px;
        }
    }
    .info-name{
        height: calc(2em * 1.25);
    }
    .info-openTime{
        width: 100%;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>