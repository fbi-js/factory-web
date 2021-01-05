<template>
  <div class="page-home">
    <Header></Header>
    <h2>Home</h2>
    <img src="@/assets/img/logo.png" />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    name: 'Home',

    components: {
      Header
    }
  }
</script>

<style scoped>
  .page-home {
    text-align: center;
  }
</style>
