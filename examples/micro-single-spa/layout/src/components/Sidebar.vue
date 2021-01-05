<template>
  <div class="layout-sidebar">
    <h1 class="sidebar-title">
      <a href="javascript:;" @click.prevent="navigateTo('/')">Site Name</a>
    </h1>
    <ul class="sidebar-menu">
      <li>
        <a href="javascript:;" @click.prevent="navigateTo('/app-vue')"
          >App Vue</a
        >
      </li>
      <li>
        <a href="javascript:;" @click.prevent="navigateTo('/app-react')"
          >App React</a
        >
      </li>
    </ul>
  </div>
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
      }
    }
  }
</script>

<style>
  $text-color: hsla(0, 0%, 100%, 0.7);

  .layout-sidebar {
    padding: 2em;
    color: $text-color;

    .sidebar-title {
      height: 64px;
      line-height: 64px;
      text-align: center;

      a {
        color: $text-color;
      }
    }

    .sidebar-menu {
      li {
        a {
          display: block;
          padding: 0.5em 1em;
          color: $text-color;
        }
      }
    }
  }
</style>
