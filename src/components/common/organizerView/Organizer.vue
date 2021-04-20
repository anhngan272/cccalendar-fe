<template>
  <div class="wrapper">
    <a-row type="flex">
      <a-col :flex="1" style="margin-right: 10px"> 
          <FilterCard/>
      </a-col>
      <a-col :flex="18" style="border: 1px solid black">
          <a-row type="flex">
              <a-col :span="12"><EventsCard/></a-col>
              <a-col :span="12"><DiariesCard/></a-col>
          </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import FilterCard from "./FilterCard";
import EventsCard from "./EventsCard";
import DiariesCard from "./DiariesCard";

export default {
  components: {
    FilterCard,
    EventsCard,
    DiariesCard
  },
  name: "Organizer",
  data() {
    return {
     
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>

</style>