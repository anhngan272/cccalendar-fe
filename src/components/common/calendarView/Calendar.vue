<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "@/components/common/calendarView/EventModal";
import RecurringOption from "@/components/common/calendarView/RecurringOption";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import vi from "ant-design-vue/es/date-picker/locale/vi_VN";
import en from "ant-design-vue/es/date-picker/locale/en_US";

require("moment/locale/vi.js");

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    EventModal,
    RecurringOption,
  },

  data: function () {
    return {
      vi: vi,
      en: en,
      date: moment(new Date()),
      modal1: false,
      eventModal: {},
      eventModalExtend: {},
      calendarOptions: {
        eventColor: "#039BE5", // Pacific Blue
        height: "80vh",
        expandRows: true,
        firstDay: 1,
        validRange: {
          start: "1970-01-01",
          end: "2099-12-31",
        },
        customButtons: {
          datepicker: {
            text: "Pick a date",
            icon: "fa fa-calendar",
            click: () => {
              this.showModal();
            },
          },
          reload: {
            text: "Reload",
            icon: "fa fa-refresh",
            click: () => {
              // let date = this.$refs.calendar.getApi().currentData.currentDate;
              // this.fetchCurrentEvents(date);
              this.fetchEvents();
            },
          },
          // prev: {
          //   click: () => {
          //     this.$refs.calendar.getApi().prev();
          //     let date = this.$refs.calendar.getApi().currentData.currentDate;
          //     this.fetchCurrentEvents(date);
          //   },
          // },
          // next: {
          //   click: () => {
          //     this.$refs.calendar.getApi().next();
          //     let date = this.$refs.calendar.getApi().currentData.currentDate;
          //     this.fetchCurrentEvents(date);
          //   },
          // },
        },
        buttonIcons: {
          prev: "fas fa-angle-left",
          next: "fas fa-angle-right",
        },
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          listPlugin,
          bootstrapPlugin,
        ],
        headerToolbar: {
          left: "prev,next datepicker reload",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listMonth",
        },
        initialView: "dayGridMonth",
        editable: true,
        eventDrop: this.eventDrop,
        // eventChange: this.eventChange,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventDisplay: "block",
        showNonCurrentDates: false,
        fixedWeekCount: false,
        themeSystem: "bootstrap",
        eventBorderColor: "rgb(0,0,0,0)",
        nowIndicator: true, 
        //  timeFormat: 'h:mm',
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      currentEvent: {
        recurringOption: "this",
        data: "",
      },
      optionModal: false,
    };
  },
  beforeCreate() {
    moment.locale(this.$i18n.locale);
  },
  created() {
    // this.fetchCurrentEvents(new Date());
    this.fetchEvents();
  },
  computed: {
    ...mapGetters({
      getEvents: "getEvents",
    }),
  },
  methods: {
    ...mapActions({
      fetchEvents: "fetchEvents",
      updateEventDate: "updateEvent",
    }),
    moment,

    fetchCurrentEvents(date) {
      let start = new Date(date.getFullYear(), date.getMonth(), 1);
      let end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let searchTerm = {
        start: moment(start),
        end: moment(end),
      };
      this.fetchEvents(searchTerm);
    },
    eventChange(changeInfo) {
      let start = moment(changeInfo.event.start);
      let end = moment(changeInfo.event.end);
      var event = {
        id: changeInfo.oldEvent.id,
        title: changeInfo.oldEvent.title,
        start: start.format("YYYY-MM-DD") + " " + start.format("HH:mm"),
        end: end.format("YYYY-MM-DD") + " " + end.format("HH:mm"),
        description: changeInfo.oldEvent.extendedProps.description,
        backgroundColor: changeInfo.oldEvent.backgroundColor,
        colorId: changeInfo.oldEvent.extendedProps.colorId,
        borderColor: changeInfo.oldEvent.backgroundColor,
        textColor: "#000",
        allDay: false,
        attendees: changeInfo.oldEvent.extendedProps.attendees,
        tags: changeInfo.oldEvent.extendedProps.tags,
      };
      this.updateEventDate(event);
    },

    eventDrop(info) {
      // if (!confirm(this.$t("calendar_page.confirm"))) {
      //   info.revert();
      // } else {
      // this.$refs.recurringOption.optionModal = true;
      // this.currentEvent.data = info;
      this.eventChange(info);
      // }
    },

    showModal() {
      this.modal1 = true;
    },
    today() {
      this.date = moment(new Date());
      this.handleOk();
    },
    handleOk() {
      let date = this.date.toISOString().replace(/T.*$/, "");
      // console.log(date);
      this.$refs.calendar.getApi().changeView("dayGridMonth", date);
      // this.fetchCurrentEvents(new Date(date));
      this.modal1 = false;
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      let date = {
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        type: selectInfo.view.type,
      };
      // console.log(selectInfo.view.type);
      this.$emit("onDateSelect", date);
    },

    handleEventClick(clickInfo) {
      this.eventModal = clickInfo.event;
      this.eventModalExtend = clickInfo.event.extendedProps;
      this.$refs.eventModal.eventModal = true;
      // console.log(clickInfo);
    },
    updateEvent() {
      const updatedEvent = this.$refs.calendar
        .getApi()
        .getEventById(this.eventModal.id);
      updatedEvent.setProp("title", "haha");
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    optionOk(option) {
      //   console.log("ok");
      if (option == "this") {
        this.eventChange(this.currentEvent.data);
      }
      console.log(option);
      // this.optionModal = false;
    },
    optionCancel() {
      this.currentEvent.data.revert();
    },
  },
};
</script>

<template>
  <div class="demo-app">
    <div class="">
      <RecurringOption
        ref="recurringOption"
        @ok="optionOk"
        @cancel="optionCancel"
      />
    </div>
    <div class="demo-app-main">
      <FullCalendar
        ref="calendar"
        class="demo-app-calendar"
        :options="{
          ...calendarOptions,
          events: getEvents,
          locale: this.$i18n.locale,
          buttonText: {
            month: this.$i18n.t('calendar_page.calendar.month'),
            week: this.$i18n.t('calendar_page.calendar.week'),
            listMonth: this.$i18n.t('calendar_page.calendar.list'),
          },
        }"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <b
            ><i>{{ arg.event.title }}</i></b
          >
        </template>
      </FullCalendar>
      <a-modal
        :cancel-text="$t('calendar_page.event_form.cancel_btn')"
        v-model="modal1"
        :title="$t('calendar_page.calendar.select_month')"
        @ok="handleOk"
      >
        <div style="margin-bottom: 10px">
          {{ $t("calendar_page.calendar.select_month") }}
        </div>
        <a-month-picker
          inputReadOnly
          :allowClear="false"
          :placeholder="$t('calendar_page.calendar.select_month')"
          v-model="date"
        />
        <a-button style="margin-left: 10px" type="primary" @click="today()">{{
          $t("calendar_page.calendar.this_month")
        }}</a-button>
      </a-modal>
      <EventModal
        ref="eventModal"
        @update="updateEvent"
        :eventModalExtend="eventModalExtend"
        :event="eventModal"
      />
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  /* display: flex; */
  /* min-height: 100%; */
  /* font-family: Arial, Helvetica Neue, Helvetica, sans-serif; */
  font-family: "Fira Sans";
  font-size: 14px;
}

.demo-app-sidebar {
  /* width: 300px; */
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  /* flex-grow: 1; */
  padding: 0 1em;
}

.fc {
  /* the calendar root */
  margin: 0 auto;
}
</style>
