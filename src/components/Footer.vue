<template>
    <div id="footer">
        <div class="container d-grid">
            <div class="logo"><router-link to="/"><img src="../assets/logo/logo_white.png" alt="offical logo" srcset=""></router-link></div>
            <h3 class="website-name">台灣旅遊網</h3>
            <div class="contact b1">
                <div class="address">地址: 106台北市大安區忠孝東路四段290號</div>
                <div class="phone">電話: (02) - 2349 - 1500</div>
                <div class="serviceTime">服務時間：週一至週日 8:30~18:30</div>
            </div>
            <div class="other b1">
                <div class="privacy">隱私權條款</div>
                <div class="infomationSecurity">資訊安全</div>
                <div class="copyright">版權宣告</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'pagefooter',
}
</script>
<style lang="scss">
#footer{
    height: 192px;
    padding: 48px 0px;
    background-color: #262626;
    *{
        color: #ffffff;
    }
    .container{
        height: 100%;
    }
    .logo{
        grid-column: auto / span 2;
        img{
            height: 96px;
        }
    }
}
.website-name{
    grid-column: auto / span 2;
}
.website-name,.contact,.other{
    text-align: start;
}
.contact,.other{
    > *+*{
        // margin-bottom: 8px;
        margin-block-start: 8px;
    }
}
.contact{
    grid-column: auto / span 3;
}
.other{
    grid-column: auto / -2;
}
</style>