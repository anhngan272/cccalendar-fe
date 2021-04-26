<template>
  <div class="copyright-text">
    <p class="">
      {{ $t("common.copyrights") }}
      <a :href="$router.resolve({ name: 'About' }).href"
        >{{ $t("common.author") }}.</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* .copyright-text a {
  color: #3366cc;
} */
.copyright-text a:hover {
  color: #3366cc;
  text-decoration: underline;
}

.copyright-text {
  color: #808080;
}
</style>