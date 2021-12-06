<template>
    <div class="card">
        <div class="pic">
            <img :src="cardInfo.imgSrc" alt="BG img" srcset="">
        </div>
        <div class="d-grid container pos-ab">
            <div class="text">
                <div class="bg-black">
                    <h3>{{cardInfo.subtitle}}</h3>
                    <h1 class="theme-name">{{cardInfo.title}}</h1>
                </div>
                <h4>{{cardInfo.para}}</h4>
            </div>
        </div>
        
    </div>
</template>
<style lang="scss" scoped>
.card{
    width: 100%;
    position: relative;
    --card-height:var(--hero-card-height,756px);
    --text-posY:var(--hero-text-pos-y,,227px);
}
.pic{
    width: 100%;
    height: var(--card-height);
    z-index: -1;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.pos-ab{
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}
.text{
    grid-column: 4/-4;
    @include phone-width{
        grid-column: 1/-2;
        transform: translateX(16.67%);
    }
    position: relative;
    top: var(--text-posY);
    h3,h1,h4{
        letter-spacing: .5em;
        color: #ffffff;
    }
    h3{
        margin-bottom: 16px;
    }
    h1{
        font-size: 64px;
        font-style: normal;
    }
    h4{
        margin-top: 32px;
    }
}
.bg-black{
    background-color: rgba(38, 38, 38, 0.65);
    border-radius: 16px;
    padding: 32px 0px;
}
</style>
<script>
export default {
    name:'card',
    props:{
        cardInfo:{
            type:Object,
        }
    }
}
</script>