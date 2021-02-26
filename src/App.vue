<template>
  <div id="app">
    <main class="main-content">
      <div class="container-fluid photos">
        <div class="my-content">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
a {
  outline: none;
}
</style>