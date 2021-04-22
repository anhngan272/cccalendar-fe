<template>
  <a-card :title="title" style="border: 1px solid black">
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
          ><span><a-icon type="edit" theme="twoTone" /></span
          >{{ $t("diary_page.diary_form.edit_btn") }}</a
        >
        <a slot="actions" class="delete">
          <a-popconfirm
            :title="$t('diary_page.diary_form.delete_confirm')"
            placement="top"
            :ok-text="$t('diary_page.diary_form.ok_btn')"
            :cancel-text="$t('diary_page.diary_form.cancel_btn')"
            @confirm="handelDelete(item)"
          >
            <a
              ><span><a-icon type="delete" /></span
              >{{ $t("diary_page.diary_form.delete_btn") }}</a
            >
          </a-popconfirm>
        </a>
        <div @click="showModal(item)">
          {{ item.title }}
        </div>

        <!-- <a-list-item-meta>
                  <div slot="title">{{ item.title }}</div>
                </a-list-item-meta> -->
      </a-list-item>
    </a-list>
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
.delete {
  color: #dc3545 !important;
}

.delete span,
.edit span {
  margin-right: 5px;
}

.edit {
  color: #1890ff !important;
}
.edit:hover,
.delete:hover {
  text-shadow: 1px 1px 3px #808080;
  /* text-decoration: underline !important; */
}
</style>