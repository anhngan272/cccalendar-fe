<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "@/components/common/calendarView/EventModal";
import vi from "@fullcalendar/core/locales/vi";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    EventModal,
  },

  data: function () {
    return {
      date: moment(new Date()).add(7, "hours"),
      modal1: false,
      modal2: false,
      eventModal: {},
      eventModalExtend: {},
      calendarOptions: {
        eventColor: "#039BE5", // Pacific Blue
        customButtons: {
          datepicker: {
            text: "select a date",
            click: () => {
              this.showModal();
            },
          },
        },
        locale: vi,
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next datepicker",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        },
        initialView: "dayGridMonth",
        editable: true,
        // selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventDisplay: "block",
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
  created() {
    this.fetchEvents();
  },
  computed: {
    ...mapGetters(["getEvents"]),
  },
  methods: {
    ...mapActions(["fetchEvents"]),
    moment,
    showModal() {
      this.modal1 = true;
    },
    handleOk() {
      var date = this.date.toISOString().replace(/T.*$/, "");
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
      this.modal2 = true;
      this.eventModal = clickInfo.event;
      this.eventModalExtend = clickInfo.event.extendedProps;
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
        :options="{ ...calendarOptions, events: getEvents }"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <b
            ><i>{{ arg.event.title }}</i></b
          >
        </template>
      </FullCalendar>
      <a-modal v-model="modal1" title="Select a date" @ok="handleOk">
        <a-date-picker
          inputReadOnly
          placeholder="select"
          v-model="date"
          format="DD-MM-YYYY"
        />
      </a-modal>
      <EventModal :eventModalExtend="eventModalExtend" :event="eventModal" />
    </div>
  </div>
</template>

<style lang='css'>
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
  padding: 2em;
}

.fc {
  /* the calendar root */
  margin: 0 auto;
}
</style>
