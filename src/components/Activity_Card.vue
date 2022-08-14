<template>
    <div class="card d-grid overwrite">
        <div class="pic">
            <img :src="info.imgSrc" alt="activity image" srcset="">
        </div>
        <div class="textInfo" draggable="false">
            <h3 class="info-name">{{info.cardName}}</h3>
            <h3 class="info-duration">{{info.duration}}</h3>
            <ul class="info-class d-flex">
                <li v-for="(classTag,index) of info.classTags" :key='classTag + index + info.id' class="class-tag">
                    {{classTag}}
                </li>
            </ul>
            <div class="info-organizer subt1">主辦單位：{{info.organizer}}</div>
            <p class="info-intro b1 pc-device" :class="{'text-overflow':info.desc.length > 100}">{{info.desc}}</p>
            <div class="info-detail title"><router-link :to="`/content/Activity/${info.id}`">詳細介紹</router-link></div>
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
                id: this.cardInfo.ID,
                imgSrc: this.cardInfo.PictureUrl[0] || '',
                cardName: this.cardInfo.Name || '無活動名稱',
                duration: this.cardInfo.OpenTime,
                classTags: this.cardInfo.ClassTags,
                organizer: this.cardInfo.Organizer,
                desc: this.cardInfo.Description || ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>

.card{
    width: 100%;
    position: relative;
    bottom: 0;
    align-items: end;
    @include phone-width{
        border-radius: 8px;
        overflow: hidden;
        .pic,.textInfo{
            grid-column: 1/-1;
            grid-row: 1/1;
        }
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
        .textInfo{
            width: 100%;
            padding: 16px 24px;
            border-radius: 0;
            background-color: #ff5c00;
            text-align: end;
            gap: 12px;
            .info-organizer{
                width: 100%;
                overflow-x: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
                        .info-detail {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
            
                            a {
                                color: transparent;
                                display: block;
                                height: 100%;
                                content: "";
                            }
                        }
        }
    }
}
.pic{
    border-radius: 20px;
    grid-column: 1/ span 7;
    grid-row: 1/1;
    z-index: -1;
    height: 538px;
    position: relative;
    top: -32px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    background-image: url('../assets/bg/no_image.png');
    background-repeat: no-repeat;
    background-size: cover;
}
.textInfo{
    grid-column: 7/ -1;
    grid-row: 1/1;
    height: fit-content;
    background-color: #ff5c00;
    border-radius: 200px 24px 24px 24px;
    padding: 56px 80px 40px 64px;
    text-align: end;
    > *{
        color: #ffffff;
    }
    .info-name,.info-duration,.info-organizer{
        margin-bottom: 8px;
    }
    .info-class{
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
    .info-intro{
        text-align: start;
        position: relative;
        height: 72px;
        width: 100%;
        overflow-y: hidden;
        margin-bottom: 58px;
        &.text-overflow::after{
            content: "...";
            font-weight: bold;
            position: absolute;
            bottom: 0;
            right: 0;
            padding-left: 4px;
            background-color: #ff5c00;
            /*為了展示更好的效果*/
            // background: -webkit-gradient(linear,left top,right   top,from(rgba(255,255,255,0)),to(white),color-stop(50%,white));
            // background: -moz-linear-gradient(to right,rgba(255,255,255,0),white 50%,white);
            // background: -o-linear-gradient(to right,rgba(255,255,255,0),white 50%,white);
            // background: -ms-linear-gradient(to right,rgba(255,255,255,0),white 50%,white);
            background: linear-gradient(to right,rgba($color: #ff5c00, $alpha: 0),#ff5c00 50%,#ff5c00);
        }
    }
    .info-detail{
        z-index: 60;
        a{
            color: #ffffff;
        }
    }
}
</style>