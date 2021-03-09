<template>
  <div class="copyright-text">
    <p class="">{{ $t('common.copyrights') }}
      <a :href="$router.resolve({name:'About'}).href" >{{ $t("common.author") }}</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
a {
  color: #3366cc;
}

a:hover {
  color: #58b1ec;
  text-decoration: none;
}
.copyright-text {
  margin-top: 10px;
  bottom: 0;
  position: absolute;
  text-align: center;
  width: 100%;
  color: #808080;
}
</style>