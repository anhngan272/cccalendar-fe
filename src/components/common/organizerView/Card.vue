<template>
  <a-card :title="title" style="border: 1px solid black">
    <a-input-search
      slot="extra"
      :placeholder="$t('diary_page.searchPlaceholder')"
      enter-button
      @search="onSearch"
    />
    <a-list
      :locale="locale"
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
          <EventModal ref="eventModal" :event="item" :eventModalExtend="item" />
          <DiaryDetail ref="diaryModal" :diary="item" />
        </div>
        <!-- <a-list-item-meta>
                  <div slot="title">{{ item.title }}</div>
                </a-list-item-meta> -->
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EventModal from "../calendarView/EventModal";
import DiaryDetail from "../diaryView/DiaryDetail";
export default {
  props: {
    type: String,
  },
  name: "EventsCard",
  components: {
    EventModal,
    DiaryDetail,
  },
  data() {
    return {
      //   data: [],
      diaryModal: false,
      title: "",
      locale: {
        emptyText: this.$t("diary_page.diary_list.no_data"),
      },
    };
  },
  created() {
    if (this.type == "events") {
      this.fetchEvents();
      //   this.data = this.getEvents;
      this.title = "Events";
      console.log(this.data);
    } else if (this.type == "diaries") {
      this.fetchDiaries();
      //   this.data = this.getDiaries;
      this.title = "Diaries";
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
      "updateEvent",
    ]),
    onSearch(value) {
      console.log(value);
    },
    showModal(item) {
      if (this.type == "events") {
        this.$refs.eventModal.eventModal = true;
      } else {
        this.$refs.diaryModal.diaryModal = true;
      }
      console.log(this.modal2);
      console.log(item);
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