<template>
  <div id="app">
    <dk-header></dk-header>
    <router-view></router-view>	
  </div>
</template>

<script>
import DkHeader from './components/layout/Header.vue'

export default {
  name: 'App',
  components: { DkHeader }
}
</script>

<style>
  body, html{
    overflow: hidden !important;
    font-family: Open Sans,Arial,sans-serif !important;
  }

  input {
    outline: none;
  }

</style>