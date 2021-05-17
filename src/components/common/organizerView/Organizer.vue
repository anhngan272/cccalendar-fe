<template>
  <a-spin :spinning="this.spinning">
  <div class="wrapper">
    <!-- <a-row type="flex">
      <a-col :flex="1" style="margin-right: 10px">
        <div class="myCard">
          <FilterCard />
        </div>
      </a-col>
      <a-col :flex="18">
        <a-row type="flex">
          <div class="myCard">
            <a-col :flex="1"><Card :type="'events'" /></a-col>
            <a-col :span="12" ><Card :type="'diaries'" /></a-col>
          </div>
        </a-row>
      </a-col>
    </a-row> -->

      <div class="row">
        <div class="col-md-auto tagCard"><FilterCard /></div>
        <div class="col myCard">
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12" ><Card :type="'events'" /></div>
            <div class="col-lg-6 col-md-12 col-sm-12"><Card :type="'diaries'" /></div>
          </div>
        </div>
      </div>
  </div>
  </a-spin>
</template>

<script>
import Card from "./Card";
import FilterCard from "./FilterCard";
import { mapGetters } from "vuex";

export default {
  components: {
    Card,
    FilterCard,
  },
  name: "Organizer",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      spinning: "getSpinning",
    }),
  },
  methods: {},
};
</script>

<style scoped>
* {
  scrollbar-width: thin;
  scrollbar-color: #6da3e0 #f1f1f1;
}

/** For webkit support */
>>>::-webkit-scrollbar {
  width: 5px;
  /* height: 5px; */
}
>>>::-webkit-scrollbar-track {
  /* background: #f1f1f1; */
}
/* Handle */
>>>::-webkit-scrollbar-thumb {
  background: #c8dbf1;
  border-radius: 10px;
}
>>>::-webkit-scrollbar-thumb:hover {
  background: #6da3e0;
}

.myCard, .tagCard {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding-top: 5px !important;
}

>>>.search-box {
  box-shadow: 0px 0px 20px #e6e6e6;
}

.col{
  padding-right: 10px !important;
  padding-left: 10px !important;
  /* padding-top: 5px !important; */
}

.col-md-auto{
  padding-right: 5px !important;
  padding-left: 5px !important;
  padding-top: 5px !important;
  margin-right: 20px;
}

>>> .tagCard .ant-card-body {
  padding-top: 0px !important;
}
</style>