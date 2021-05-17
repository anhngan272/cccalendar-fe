<template>
  <a-card :title="title" :bodyStyle="{ height: '77vh', overflow: 'auto' }">
    <a-input-search
      slot="extra"
      :placeholder="$t(`organizer_page.${type}.searchPlaceholder`)"
      class="search-box"
      v-model="searchKey"
      @change="onChange"
    />
    <a-list
      :pagination="pagination"
      :locale="{
        emptyText: this.$t('diary_page.diary_list.no_data'),
      }"
      item-layout="horizontal"
      :data-source="type == 'events' ? getFilterEvents : getFilterDiaries"
      :bordered="true"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a class="edit" slot="actions" @click="showUpdateModal(item)"
          ><a-button type="primary"> <a-icon type="edit" /></a-button
        ></a>
        <a slot="actions" class="delete">
          <a-popconfirm
            :title="
              type == 'events'
                ? $t('calendar_page.event_form.delete_confirm')
                : $t('diary_page.diary_form.delete_confirm')
            "
            placement="top"
            :ok-text="$t('diary_page.diary_form.delete_btn')"
            :cancel-text="$t('diary_page.diary_form.cancel_btn')"
            @confirm="handelDelete(item)"
          >
            <a-button type="danger"><a-icon type="delete" /></a-button>
          </a-popconfirm>
        </a>
        <a-list-item-meta>
          <div class="title" @click="showModal(item)" slot="title">
            <a-tooltip v-if="item.title.length >= 70" placement="top">
              <template slot="title">
                <span>{{ item.title }}</span>
              </template>
              <b>{{ shortTitle(item.title) }}</b>
            </a-tooltip>
            <b v-else>{{ item.title }}</b>
          </div>
          <div class="tag-wrap" slot="description">
            <a
              class="tag"
              v-for="tag in item.tags"
              :key="tag"
              @click="clickTag(tag)"
              >#{{ tag }}</a
            >
          </div>
        </a-list-item-meta>
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
      searchKey: "",
      pagination: {
        pageSize: 8,
      },
    };
  },
  mounted() {},
  created() {
    if (this.type == "events") {
      this.fetchEvents();
      this.title = this.$t(`organizer_page.${this.type}.title`);
    } else if (this.type == "diaries") {
      let searchTerm = {
        all: true,
      };
      this.fetchDiaries(searchTerm);
      this.title = this.$t(`organizer_page.${this.type}.title`);
    }
  },
  computed: {
    ...mapGetters([
      "getEvents",
      "getDiaries",
      "getFilterEvents",
      "getFilterDiaries",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchEvents",
      "fetchDiaries",
      "deleteEvent",
      "deleteDiary",
      "filterEvents",
      "filterDiaries",
    ]),
    shortTitle(content) {
      let contentToRender = "";
      if (content) {
        contentToRender = content + " ";
        if (content.length >= 70) {
          contentToRender = content.substring(0, 65) + ". . .";
        }
      }
      return contentToRender;
    },
    onChange() {
      if (this.type == "events") {
        this.filterEvents(this.searchKey);
      } else {
        this.filterDiaries(this.searchKey);
      }
    },
    closeTextEditor() {
      this.showText = false;
      this.$refs.diaryModal.diaryModal = false;
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
/** For webkit support */
::-webkit-scrollbar {
  /* width: 1px; */
  height: 5px;
}

.tag-wrap {
  width: 15vw;
  overflow-y: scroll;
}

.tag {
  color: #1890ff !important;
  background: #e6e6e6;
  padding: 0px 5px;
  border-radius: 0.3em;
  margin-left: 3px;
}

.title:hover {
  color: #1890ff;
  cursor: pointer;
}
</style>