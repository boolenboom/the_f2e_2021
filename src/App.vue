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
  </div>
</template>
<script>
import navi from '@/components/Nav.vue';
export default {
  name:'app',
  components:{
    navi,
  }
}
</script>

<style lang="scss">

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Noto Sans;
}
img{
  max-width: 100%;
  height: auto;
}
.h1,.h2,.h3,.h4,.h5,.title,.subt1,.subt2,.b1,.b2,.b3,.cap{
  font-style: normal;
  font-weight: bold;
  color: #000000;
}
.h1,.h2,.h3,.h4,.h5{
  line-height: 1.25;
}
.title,.subt1,.subt2{
  line-height: 1.5;
}
.b1,.b2,.b3,.cap{
  font-weight: normal;
  line-height: 1.5;
}
.h1{
  font-size: 40px;
}
.h2{
  font-size: 32px;
}
.h3{
  font-size: 28px;
}
.h4{
  font-size: 24px;
}
.h5{
  font-size: 20px;
}
.title{
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
.cap{
  font-size: 11px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.grid-container{
  width: 1344px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(12, 2.5fr);
  column-gap: 32px;
  padding: 16px;//11:16
}
.d-flex{
  display: flex;
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

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ff5c00;
    }
  }
}
</style>
