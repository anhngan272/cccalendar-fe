<template>
  <div class="wrapper">
    <a-row type="flex">
      <a-col :flex="1" style="margin-right: 10px">
        <div class="myCard">
          <FilterCard />
        </div>
      </a-col>
      <a-col :flex="18">
        <a-row type="flex">
          <div class="myCard">
            <a-col :span="12"><Card :type="'events'" /></a-col>
            <a-col :span="12"><Card :type="'diaries'" /></a-col>
          </div>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Card from "./Card";
import FilterCard from "./FilterCard";

export default {
  components: {
    Card,
    FilterCard,
  },
  name: "Organizer",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.myCard {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>