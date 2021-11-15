<template>
    <div class="api">{{result}}</div>
</template>
<script>
import jsSHA from "jssha";
function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    // let AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    // let AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    let AppID = 'eb78cef36689451a8aab0db192c90462';
    let AppKey = 'BcSgzENVt1N5FxsK0SOjFiAU3eA';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
    return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}
export default {
    data(){
        return {
            result:{}
        }
    },
    mounted(){
        let type = 'Tourism';
        let foo = 'ScenicSpot';
        let bar = 'Taipei';
        let query = '$top=10&$filter=contains(Name%2C\'士\')&$format=JSON';
        let vueObj = this;

        fetch(
        `https://ptx.transportdata.tw/MOTC/v2/${type}/${foo}/${bar}?${query}`,
        {
            headers: getAuthorizationHeader(),
            method:'GET'
        }
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data);
            vueObj.result=JSON.stringify(data);
        })
        .catch(function (error) {
        console.log(error);
        }); 
    }
}
</script>