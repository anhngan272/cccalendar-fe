<template>
  <div class="wrapper">
    <a-list
      :locale="{
        emptyText: this.$t('diary_page.diary_list.no_data'),
      }"
      item-layout="horizontal"
      :data-source="getDiaries"
      :bordered="true"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a class="edit" slot="actions" @click="showUpdateModal(item)"
          ><a-button type="primary"><a-icon type="edit" />
          {{ $t("diary_page.diary_form.edit_btn") }}</a-button></a
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
              ><a-button type="danger"><a-icon type="delete" />{{ $t("diary_page.diary_form.delete_btn") }}</a-button></a
            >
          </a-popconfirm>
        </a>

        <a-list-item-meta>
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
        <a-badge
          :count="index == createDiaryId ? 'New' : ''"
          title="New Diary"
          :number-style="{ backgroundColor: '#007bff' }"
        >
        </a-badge>
        <a-badge
          :count="item.id == updateDiaryId ? 'Updated' : ''"
          title="Updated Diary"
          :number-style="{ backgroundColor: '#52c41a' }"
        >
        </a-badge>
      </a-list-item>
    </a-list>
    <div v-if="showText == true">
      <TextEditor
        ref="textEditor"
        :isUpdate="true"
        :diary="diary"
        :showText="showText"
        @closeTextEditor="showText = false"
        @updateDiary="updateDiary"
      />
    </div>
    <DiaryDetail
      :diary="diary"
      ref="diaryDetail"
      @showUpdateModal="showUpdateModal"
    />
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
      showText: false,
      diary: {},
      diaryModal: false,
      createDiaryId: -1,
      updateDiaryId: "",
    };
  },
  methods: {
    ...mapActions(["fetchDiaries", "deleteDiary"]),
    createDiary() {
      this.updateDiaryId = '';
      this.createDiaryId = 0;
    },
    updateDiary(diaryId) {
      this.updateDiaryId = diaryId;
      this.createDiaryId = -1;
    },
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
      this.showText = true;
    },
    showDiaryModal(diary) {
      this.diary = diary;
      this.$refs.diaryDetail.diaryModal = true;
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

.delete span,
.edit span {
  margin-right: 5px;
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

.diaryFocus {
  color: red;
}
.diaryNotFocus {
  display: none;
}
</style>
