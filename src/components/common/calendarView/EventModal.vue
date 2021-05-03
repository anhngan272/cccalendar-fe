 <template>
  <a-modal
    :keyboard="false"
    :destroyOnClose="true"
    class="eventModal"
    v-model="eventModal"
    :title="event.title"
    @ok="handleOk"
    width="80vw"
  >
    <div slot="footer">
      <div style="text-align: center">
        <a-button key="edit" type="primary" @click="showUpdateModal">
          {{ $t("calendar_page.event_form.edit_btn") }}
        </a-button>
        <a-popconfirm
          :title="$t('calendar_page.event_form.delete_confirm')"
          placement="top"
          :ok-text="$t('calendar_page.event_form.delete_btn')"
          :cancel-text="$t('calendar_page.event_form.cancel_btn')"
          @confirm="handleDelete"
        >
          <a-button key="delete" type="danger">
            {{ $t("calendar_page.event_form.delete_btn") }}
          </a-button>
        </a-popconfirm>
        <a-button key="ok" @click="handleOk">
          {{ $t("calendar_page.event_form.ok_btn") }}
        </a-button>
      </div>
    </div>
    <UpdateEventModal
      ref="updateEventModal"
      :updateEventModalExtend="eventModalExtend"
      :updateEvent="event"
      @updated="eventModal = false"
    />

    <div>
      <b>{{ $t("calendar_page.event_form.begin") }}: </b>
      {{
        moment(event.start)
          .locale(this.$i18n.locale)
          .format("dddd, DD-MM-yyyy - HH:mm")
      }}
    </div>
    <div>
      <b>{{ $t("calendar_page.event_form.end") }}: </b>
      {{
        moment(event.end)
          .locale(this.$i18n.locale)
          .format("dddd, DD-MM-yyyy - HH:mm")
      }}
    </div>
    <div>
      <b>{{ $t("calendar_page.event_form.description") }}: </b>
      <!-- {{ eventModalExtend.description }} -->
      <span v-html="eventModalExtend.description"></span>
    </div>
    <!-- <div>color: {{ eventModalExtend }}</div> -->
    <div>
      <b>{{ $t("calendar_page.event_form.creator") }}: </b>
      {{ eventModalExtend.creator }}
    </div>
    <div>
      <b>{{ $t("calendar_page.event_form.attendees") }}: </b>
      <div class="attendeeWrapper">
        <span v-for="(attendee, i) in eventModalExtend.attendees" :key="i"
          >{{ attendee }}
        </span>
      </div>
    </div>
    <div class="tags">
      <b>{{ $t("calendar_page.event_form.tags") }}: </b>
      <span v-for="(tag, i) in eventModalExtend.tags" :key="i">#{{ tag }}</span>
    </div>
    <div>
      <b>{{ $t("calendar_page.event_form.theme") }}: </b>
      <div
        :style="{ background: event.backgroundColor }"
        style="display: inline-block; margin-left: 5px"
      ></div>
    </div>
  </a-modal>
</template>

 <script>
import moment from "moment";
import { mapActions } from "vuex";
import UpdateEventModal from "./UpdateEventModal";
export default {
  name: "EventModal",
  props: {
    eventModalExtend: Object,
    event: Object,
  },
  data: function () {
    return {
      updateModal: false,
      eventModal: false,
    };
  },
  components: {
    UpdateEventModal,
  },
  methods: {
    moment,
    ...mapActions(["deleteEvent", "updateEvent"]),
    handleDelete() {
      this.deleteEvent(this.event.id);
      this.eventModal = false;
    },
    showUpdateModal() {
      this.$refs.updateEventModal.updateModal = true;
    },
    handleOk() {
      this.eventModal = false;
    },
  },
  computed: {},
};
</script>

 <style scoped>
.eventModal div {
  padding: 10px;
}
.attendeeWrapper {
  margin-left: 10px;
  vertical-align: top;
  display: inline-block;
  max-width: fit-content;
  min-width: 100px;
  max-height: 70px;
  overflow-y: scroll;
  padding: 0 5px 5px 5px !important;
}
.attendeeWrapper span {
  display: block;
}
.tags span {
  color: #1890ff;
  margin-right: 10px;
}
.updateBtn {
  background: #28a745;
  /* opacity: 0.35; */
}
.updateBtn:hover {
  background: #28a745;
  opacity: 0.8;
}
.updateBtn::after {
  background: #28a745;
  opacity: 0.8;
}
.updateBtn::selection {
  background: #28a745;
  opacity: 0.8;
}
</style>