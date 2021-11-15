<template>
    <div id="leafletMap"></div>
</template>
<style lang="scss">
#leafletMap{
    height: 500px;
}
</style>
<script>
import L from 'leaflet';
export default {
    name:'leafletMap',
    mounted(){
        let mymap = L.map('leafletMap').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWxhbi1sZWUiLCJhIjoiY2t2bDR1NzduMGt4YTJwdWc1NW5yZnQxMSJ9.Ksx4S-kLIRWw_eFz6s9Ukw'
        }).addTo(mymap);
    }
}
</script>