<template>
  <div class="layout-container">
    <Sidebar />
    <div class="layout-main">
      <Navbar />
      <div class="layout-content">
        <div id="app-demo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Sidebar from '@/components/Sidebar.vue'
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'App',

    components: {
      Sidebar,
      Navbar,
    },
  }
</script>
