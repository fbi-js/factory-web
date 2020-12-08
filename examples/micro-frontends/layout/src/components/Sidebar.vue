<template>
  <ul class="layout-sidebar">
    <li>
      <a
        href="javascript:;"
        @click.prevent="navigateTo('/')"
      >Home</a>
    </li>
    <li>
      <a
        href="javascript:;"
        @click.prevent="navigateTo('/app-vue')"
      >App Vue</a>
    </li>
    <li>
      <a
        href="javascript:;"
        @click.prevent="navigateTo('/app-react')"
      >App React</a>
    </li>
  </ul>
</template>

<script lang="ts">
  export default {
    name: 'Sidebar',

    data() {
      return {}
    },

    methods: {
      navigateTo(url) {
        window.history.pushState(null, '', url)
      },
    },
  }
</script>

<style>
  $text-color: hsla(0, 0%, 100%, 0.7);

  .layout-sidebar {
    padding: 2em;
    color: $text-color;

    a {
      color: $text-color;
    }
  }
</style>
