<template>
  <div class="wrap">
    <a-alert
      :message="`You selected date: ${
        selectedValue && selectedValue.format('DD-MM-YYYY')
      }`"
    />

    <div
      :style="{
        display: 'inline-block',
        width: '100%',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
      }"
    >
      <a-calendar
        :value="value"
        @select="onSelect"
        @panelChange="onPanelChange"
      >
        <ul slot="dateCellRender" slot-scope="value" class="events">
          <li v-for="item in getListData(value)" :key="item.content">
            <a-badge :color="item.color" :text="item.content" />
          </li>
        </ul>
        <!-- <template slot="monthCellRender" slot-scope="value">
          <div v-if="getMonthData(value)" class="notes-month">
            <section>{{ getMonthData(value) }}</section>
            <span>Backlog number</span>
          </div>
        </template> -->
      </a-calendar>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Calendar",
  data() {
    return {
      value: moment(new Date()),
      selectedValue: moment(new Date()),
      // value1: moment("2017-01-25"),
      badgeColor: {
        red: "#ff3e30",
        blue: "#176bef",
        yellow: "#f7b529",
        green: "#179b52",
      },
    };
  },
  methods: {
    test() {
      alert("ok");
    },
    onSelect(value) {
      this.value = value;
      this.selectedValue = value;
      // console.log(value)
      this.test();
    },
    onPanelChange(value) {
      this.value = value;
      console.log(value);
      //  alert("ok")
    },
    getListData(value) {
      let listData;
      switch (value.date()) {
        case 25:
          listData = [
            { color: this.badgeColor.red, content: "This is warning event." },
            { color: this.badgeColor.green, content: "This is usual event." },
          ];
          break;
        case 10:
          listData = [
            { color: this.badgeColor.blue, content: "This is warning event." },
            { color: this.badgeColor.yellow, content: "This is usual event." },
            { color: this.badgeColor.yellow, content: "This is error event." },
          ];
          break;
        case 15:
          listData = [
            { color: this.badgeColor.blue, content: "This is warning event" },
            {
              color: this.badgeColor.red,
              content: "This is very long usual event。。....",
            },
          ];
          break;
        default:
      }
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
  },
};
</script>

<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>