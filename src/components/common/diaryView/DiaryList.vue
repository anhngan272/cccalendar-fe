<template>
  <div class="wrapper">
    <a-list
      :locale="locale"
      item-layout="horizontal"
      :data-source="getDiaries"
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
        <a-list-item-meta style="color: pink">
          <a slot="description" style="margin-right: 10px">{{ item.date }}</a>
          <a
            slot="description"
            style="display: block"
            @click="showDiaryModal(item)"
          >
            <span v-html="shortDiaryContent(item.content)"></span>
            <span style="color: #1890ff">{{
              $t("diary_page.diary_list.show_detail")
            }}</span>
          </a>
          <a slot="description" class="diary-tag">{{ getTags(item) }}</a>
          <a slot="title" class="diary-title" @click="showDiaryModal(item)"
            ><h4 class="font-weight-bold">{{ item.title }}</h4></a
          >
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

export default {
  name: "DiaryList",
  components: {
    TextEditor,
    DiaryDetail,
  },
  data() {
    return {
      diary: null,
      textEditorVisible: false,
      diaryModal: false,
      locale: {
        emptyText: this.$t("diary_page.diary_list.no_data"),
      },
    };
  },
  methods: {
    ...mapActions(["fetchDiaries", "deleteDiary"]),
    shortDiaryContent(content) {
      let contentToRender = content ? content.substring(0, 20) + "... " : "";
      return contentToRender;
    },
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

a h4:hover {
  color: #1890ff;
  text-decoration: none;
}

.diary-tag {
  color: #1890ff !important;
  background: #e6e6e6;
  padding: 0px 5px;
  border-radius: 0.3em;
}

.diary-tag:hover {
  text-decoration: none;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.28);
}
</style>
