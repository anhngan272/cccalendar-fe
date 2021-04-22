<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "@/components/common/calendarView/EventModal";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
require("moment/locale/vi.js");
import vi from "ant-design-vue/es/date-picker/locale/vi_VN";
import en from "ant-design-vue/es/date-picker/locale/en_US";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    EventModal,
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
              this.fetchEvents();
            },
          },
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
        editable: false,
        // selectable: true,
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
        //  timeFormat: 'h:mm',
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  beforeCreate() {
    moment.locale(this.$i18n.locale);
  },
  created() {
    this.fetchEvents();
  },
  computed: {
    ...mapGetters({
      getEvents: "getEvents",
    }),
  },
  methods: {
    ...mapActions(["fetchEvents"]),
    moment,
    showModal() {
      this.modal1 = true;
    },
    today() {
      this.date = moment(new Date());
      this.handleOk();
    },
    handleOk() {
      var date = this.date.toISOString().replace(/T.*$/, "");
      console.log(date)
      this.$refs.calendar.getApi().changeView("dayGridMonth", date);
      this.modal1 = false;
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      console.log(selectInfo);
    },

    handleEventClick(clickInfo) {
      this.eventModal = clickInfo.event;
      console.log(this.eventModal)
      this.eventModalExtend = clickInfo.event.extendedProps;
      this.$refs.eventModal.eventModal = true;
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
  },
};
</script>

<template>
  <div class="demo-app">
    <div class=""></div>
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
      <a-modal :cancel-text="$t('calendar_page.event_form.cancel_btn')" v-model="modal1" :title="$t('calendar_page.calendar.select_month')" @ok="handleOk">
        <div style="margin-bottom: 10px">
          {{ $t("calendar_page.calendar.select_month") }}
        </div>
        <a-month-picker inputReadOnly :allowClear="false" :placeholder="$t('calendar_page.calendar.select_month')" v-model="date"/>
        <!-- <a-date-picker
          inputReadOnly
          :allowClear="false"
          placeholder="select"
          v-model="date"
          format="DD-MM-YYYY"
          :locale="this.$i18n.locale == 'vi' ? vi : en"
        /> -->
        <a-button style="margin-left: 10px" type="primary" @click="today()"
          >{{$t('calendar_page.calendar.current_month')}}</a-button
        >
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
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 0 1em;
}

.fc {
  /* the calendar root */
  margin: 0 auto;
}
.fc-icon::before {
  font-family: "FontAwesome" !important;
  padding: 0 !important;
}
</style>
