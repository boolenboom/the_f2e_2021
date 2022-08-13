<template>
  <div id="app">
    <header>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossorigin=""/>
    </header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <navi />
    <router-view />
    <pagefooter />
  </div>
</template>
<script>
import navi from '@/components/Nav.vue';
import pagefooter from '@/components/Footer.vue';
function deleteLocalStorage(){
  localStorage.clear();
}
export default {
  name:'app',
  components:{
    navi,
    pagefooter
  },
  mounted(){
    window.addEventListener('beforeunload',deleteLocalStorage);
  },
  unmounted(){
    console.log('data delete');
    window.removeEventListener('beforeunload',deleteLocalStorage);
  }
}
</script>

<style lang="scss">

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Noto Sans,Noto serif TC;
}
body{
  overflow-x: hidden;
}
h1,h2,h3,h4,h5,caption,.h1,.h2,.h3,.h4,.h5,title,.title,.subt1,.subt2,.b1,.b2,.b3,.caption{
  font-style: normal;
  font-weight: bold;
  color: #000000;
}
h1,h2,h3,h4,h5,.h1,.h2,.h3,.h4,.h5{
  line-height: 1.25;
}
title,.title,.subt1,.subt2{
  line-height: 1.5;
}
.b1,.b2,.b3,.caption{
  font-weight: normal;
  line-height: 1.5;
}
h1,.h1{
  font-size: 40px;
  @include phone-width{
    font-size: calc(28px + 2.3vw);
  }
}
h2,.h2{
  font-size: 32px;
}
h3,.h3{
  font-size: 28px;
  @include phone-width{
    font-size: calc(12px + 2.1vw);
  }
}
h4,.h4{
  font-size: 24px;
  @include phone-width{
    font-size: calc(12px + 2vw);
  }
}
h5,.h5{
  font-size: 20px;
}
title,.title{
  font-size: 18px;
}
.subt1{
  font-size: 16px;
}
.subt2{
  font-size: 14px;
}
.b1{
  font-size: 16px;
}
.b2{
  font-size: 14px;
}
.b3{
  font-size: 12px;
}
caption,.caption{
  font-size: 11px;
}
section{
  padding: 80px 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  overflow-x: hidden;
  padding-top: 84px;
}
.phone-device{
  display: none;
  @include phone-width{
    display: initial;
  }
}
.pc-device{
  @include phone-width{
    display: none;
  }
}
.container{
  width: 1344px;
  padding: 0px 16px;
  margin: auto;
  @include phone-width{
    width: 100%;
    padding: 0px 15px;
  }
}
.d-grid{
  display: grid;
  grid-template-columns: repeat(12, 2.5fr);
  column-gap: 32px;
  @include phone-width{
    grid-template-columns: repeat(4, 23.26%);
    column-gap: 2.33%;
  }
  &.align-center{
    align-items: center;
  }
}
.d-flex{
  display: flex;
}
.d-block{
  display: block;
}
.gg-search {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 16px;
    height: 16px;
    border: 2px solid;
    border-radius: 100%;
    margin-left: -4px;
    margin-top: -4px
}
.gg-search::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    border-radius: 3px;
    width: 2px;
    height: 8px;
    background: currentColor;
    transform: rotate(-45deg);
    top: 10px;
    left: 12px
}
</style>
