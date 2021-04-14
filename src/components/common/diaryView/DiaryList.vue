<template>
  <div class="wrapper">
    <a-list item-layout="horizontal" :data-source="getDiaries" :bordered="true">
      <a-list-item slot="renderItem" slot-scope="item">
        <a class="action" slot="actions" @click="showUpdateModal(item)">{{
          $t("diary_page.diary_form.edit_btn")
        }}</a>

        <a slot="actions" class="action">
          <a-popconfirm
            :title="$t('diary_page.diary_form.delete_confirm')"
            placement="top"
            :ok-text="$t('diary_page.diary_form.ok_btn')"
            :cancel-text="$t('diary_page.diary_form.cancel_btn')"
            @confirm="handelDelete(item)"
          >
            <a>{{ $t("diary_page.diary_form.delete_btn") }}</a>
          </a-popconfirm>
        </a>
        <a-list-item-meta style="color: pink">
          <a slot="description" style="margin-right: 10px">{{ item.date }}</a>
          <a slot="description" style="color: #1890ff">{{ getTags(item) }}</a>
          <a slot="title" @click="showDiaryModal(item)">{{ item.title }}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <div v-if="diary != null">
      <TextEditor :isUpdate="true" :diary="diary" ref="textEditor" />
    </div>
    <div v-if="diary != null">
      <DiaryDetail :diary="diary" ref="diaryDetail" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TextEditor from "./TextEditor";
import DiaryDetail from "./DiaryDetail";
// const data = getDiaries

export default {
  name: "DiaryList",
  components: {
    TextEditor,
    DiaryDetail
  },
  data() {
    return {
      diary: null,
      textEditorVisible: false,
      diaryModal:false,
    };
  },
  methods: {
    ...mapActions(["fetchDiaries", "deleteDiary"]),
    getTags(diary) {
      let tags = "";
      for (let i = 0; i < diary.tags.length; i++) {
        tags += "#" + diary.tags[i] + " ";
      }
      return tags;
    },
    handelDelete(diary) {
      this.deleteDiary(diary.id);
    },
    showUpdateModal(diary) {
      this.diary = diary;
      this.textEditorVisible = true;
    },
    showDiaryModal(diary) {
      this.diary = diary;
      this.diaryModal = true;
    },
  },
  created() {
    this.fetchDiaries();
  },
  computed: {
    ...mapGetters(["getDiaries"]),
  },
};
</script>
<style scoped>
.wrapper {
  /* background: pink; */
  padding: 20px;
}

.action{
  color: #1890ff !important;

}
</style>