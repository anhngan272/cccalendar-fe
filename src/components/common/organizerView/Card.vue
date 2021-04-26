<template>
  <a-card :title="title">
    <a-input-search
      slot="extra"
      :placeholder="$t(`organizer_page.${type}.searchPlaceholder`)"
      enter-button
      @search="onSearch"
    />
    <a-list
      :locale="{
        emptyText: this.$t('diary_page.diary_list.no_data'),
      }"
      item-layout="horizontal"
      :data-source="type == 'events' ? getEvents : getDiaries"
      :bordered="true"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a class="edit" slot="actions" @click="showUpdateModal(item)"
          ><a-button type="primary"> <a-icon style="color:white" type="edit" /></a-button></a
        >
        <a slot="actions" class="delete">
          <a-popconfirm
            :title="$t('diary_page.diary_form.delete_confirm')"
            placement="top"
            :ok-text="$t('diary_page.diary_form.ok_btn')"
            :cancel-text="$t('diary_page.diary_form.cancel_btn')"
            @confirm="handelDelete(item)"
          >
            <a-button type="danger"><a-icon style="color:white" type="delete" /></a-button>
          </a-popconfirm>
        </a>
        <div class="title" @click="showModal(item)">
          {{ item.title }}
        </div>

        <!-- <a-list-item-meta>
                  <div slot="title">{{ item.title }}</div>
                </a-list-item-meta> -->
      </a-list-item>
    </a-list>
    <div v-show="type == 'events'">

    <EventModal
      ref="eventModal"
      :event="currentItem"
      :eventModalExtend="currentItem"
    />
    <UpdateEventModal
      ref="updateEventModal"
      :updateEventModalExtend="currentItem"
      :updateEvent="currentItem"
      @updated="eventModal = false"
    />
    </div>

    <div v-show="type == 'diaries'">
    <DiaryDetail
      ref="diaryModal"
      :diary="currentItem"
      @showUpdateModal="showUpdateModal"
    />
    <div v-if="showText == true">
      <TextEditor
        ref="textEditor"
        :isUpdate="true"
        :diary="currentItem"
        :showText="showText"
        @closeTextEditor="closeTextEditor"
      />
    </div>
    </div>
  </a-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EventModal from "../calendarView/EventModal";
import UpdateEventModal from "../calendarView/UpdateEventModal";
import DiaryDetail from "../diaryView/DiaryDetail";
import TextEditor from "../diaryView/TextEditor";
export default {
  props: {
    type: String,
  },
  name: "EventsCard",
  components: {
    EventModal,
    UpdateEventModal,
    DiaryDetail,
    TextEditor,
  },
  data() {
    return {
      showText: false,
      currentItem: {},
      diaryModal: false,
      title: "",
      textEditorVisible: false,
    };
  },
  created() {
    if (this.type == "events") {
      this.fetchEvents();
      this.title = this.$t(`organizer_page.${this.type}.title`);
    } else if (this.type == "diaries") {
      this.fetchDiaries();
      this.title = this.$t(`organizer_page.${this.type}.title`);
    }
  },
  computed: {
    ...mapGetters(["getEvents", "getDiaries"]),
  },
  methods: {
    ...mapActions([
      "fetchEvents",
      "fetchDiaries",
      "deleteEvent",
      "deleteDiary",
    ]),
    closeTextEditor() {
      this.showText = false;
      this.showText == false;
    },
    onSearch(value) {
      console.log(value);
    },
    handelDelete(item) {
      if (this.type == "events") {
        this.deleteEvent(item.id);
      } else {
        this.deleteDiary(item.id);
      }
    },
    showUpdateModal(item) {
      this.currentItem = item;
      if (this.type == "events") {
        this.$refs.updateEventModal.updateModal = true;
      } else {
        this.showText = true;
      }
    },
    showModal(item) {
      this.currentItem = item;
      if (this.type == "events") {
        this.$refs.eventModal.eventModal = true;
      } else {
        this.$refs.diaryModal.diaryModal = true;
      }
    },
  },
};
</script>

<style scoped>

.title:hover{
  color:#1890ff;
  cursor: pointer;
}

</style>