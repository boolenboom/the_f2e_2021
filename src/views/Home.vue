<template>
  <div class="home">
    <hero />
    <activity />
    <scenicspot />
    <food />
  </div>
</template>
<style lang="scss">
.carouselName{
  text-align: start;
  margin-bottom: 40px;
}
</style>
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import hero from '@/components/Hero.vue';
import activity from '@/components/Activity.vue';
import scenicspot from '@/components/Scenicspot.vue';
import food from '@/components/Food.vue';
// import FetchResult from "@/components/API_Fetch.vue";
// import worldMap from "@/components/Map.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    hero,
    activity,
    scenicspot,
    food,
    // FetchResult,
    // worldMap
  },
};
</script>
