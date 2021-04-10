 <template>
  <a-modal
    :destroyOnClose="true"
    class="eventModal"
    v-model="$parent.modal2"
    :title="event.title"
    @ok="handleOk"
    width="30vw"
  >
    <div slot="footer" style="text-align: left">
      <div style="text-align: left">
        <a-popconfirm
          title="Are you sure delete this task?"
          placement="top"
          ok-text="Yes"
          cancel-text="Cancel"
          @confirm="handleDelete"
        >
          <a-button key="delete" type="danger"> Delete </a-button>
        </a-popconfirm>
        <a-button
          key="delete"
          type="primary"
          class="updateBtn"
          @click="showUpdateModal"
        >
          Update
        </a-button>
      </div>
      <a-button key="ok" type="primary" @click="handleOk"> Ok </a-button>
    </div>
    <UpdateEventModal
      ref="updateEventModal"
      :updateEventModalExtend="eventModalExtend"
      :updateEvent="event"
      @updated="$parent.modal2 = false"
    />

    <div>
      Start:
      {{
        moment(event.start)
          .locale(this.$i18n.locale)
          .format("HH:mm a dddd DD-MM-yyyy")
      }}
    </div>
    <div>
      End:
      {{
        moment(event.end)
          .locale(this.$i18n.locale)
          .format("HH:mm a dddd DD-MM-yyyy")
      }}
    </div>
    <div>Description: {{ eventModalExtend.description }}</div>
    <div>color: {{ event.backgroundColor }}</div>
    <div>
      Attendees:
      <div class="attendeeWrapper">
        <span v-for="(attendee, i) in eventModalExtend.attendees" :key="i"
          >{{ attendee }}
        </span>
      </div>
    </div>
    <div class="tags">
      Tags:
      <span v-for="(tag, i) in eventModalExtend.tags" :key="i">#{{ tag }}</span>
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
      this.$parent.modal2 = false;
    },
    showUpdateModal() {
      this.$refs.updateEventModal.updateModal = true;
    },
    handleOk() {
      this.$parent.modal2 = false;
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
</style>