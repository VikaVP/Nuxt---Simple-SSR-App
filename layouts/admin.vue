<template>
  <div>
    <TheHeader @sidenavToggle="showSideNav = !showSideNav"/>
    <TheSidenav :show="showSideNav" @close="showSideNav = false"/>
    <nuxt/>
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader.vue'
import TheSidenav from '@/components/Navigation/TheSidenav.vue'
export default {
  components: {TheHeader, TheSidenav },
  data(){
    return {
      showSideNav: false
    }
  }
}

</script>


<style>

</style>
