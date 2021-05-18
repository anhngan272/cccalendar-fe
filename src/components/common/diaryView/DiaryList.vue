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
          ><a-button type="primary"
            ><a-icon type="edit" />
            {{ $t("diary_page.diary_form.edit_btn") }}</a-button
          ></a
        >

        <a slot="actions" class="delete">
          <a-popconfirm
            :title="$t('diary_page.diary_form.delete_confirm')"
            placement="top"
            :ok-text="$t('diary_page.diary_form.delete_btn')"
            :cancel-text="$t('diary_page.diary_form.cancel_btn')"
            @confirm="handelDelete(item)"
          >
            <a
              ><a-button type="danger"
                ><a-icon type="delete" />{{
                  $t("diary_page.diary_form.delete_btn")
                }}</a-button
              ></a
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
          <!-- <a slot="description" class="diary-tag">{{ item.tags }}</a> -->
          <div slot="description" class="tag-wrap">
            <a
              class="diary-tag"
              v-for="tag in item.tags"
              :key="tag"
              @click="clickTag(tag)"
              >#{{ tag }}</a
            >
          </div>
          <a-tooltip slot="title" placement="top">
            <template slot="title">
              <span>{{ item.title }}</span>
            </template>
            <a @click="showDiaryModal(item)">
              <h5 class="title-wrap font-weight-bold">{{ item.title }}</h5>
            </a>
          </a-tooltip>
        </a-list-item-meta>
        <a-badge
          :count="index == createDiaryId ? $t('diary_page.diary_list.new') : ''"
          :title="$t('diary_page.diary_list.new_diary')"
          :number-style="{ backgroundColor: '#007bff' }"
        >
        </a-badge>
        <a-badge
          :count="
            item.id == updateDiaryId ? $t('diary_page.diary_list.updated') : ''
          "
          :title="$t('diary_page.diary_list.updated_diary')"
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
        @closeTextEditor="closeTextEditor"
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
      updateDiaryId: -1,
    };
  },
  methods: {
    ...mapActions(["fetchDiaries", "deleteDiary"]),

    closeTextEditor() {
      this.showText = false;
      this.$refs.diaryDetail.diaryModal = false;
    },

    resetFields() {
      this.createDiaryId = -1;
      this.updateDiaryId = -1;
    },

    clickTag(tag) {
      this.$emit("clickTag", tag);
    },
    createDiary() {
      this.updateDiaryId = "";
      this.createDiaryId = 0;
    },
    updateDiary(diaryId) {
      this.updateDiaryId = diaryId;
      this.createDiaryId = -1;
    },
    shortDiaryContent(content) {
      let contentToRender = "";
      if (content) {
        contentToRender = content + " ";
        if (content.length > 40) {
          contentToRender = content.substring(0, 40) + "... ";
        }
      }
      return contentToRender;
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
  /* width: 70vw; */
}

.delete span,
.edit span {
  margin-right: 5px;
}

a h5:hover {
  color: #1890ff;
  text-decoration: none;
}

/**  For All Browsers */
* {
  scrollbar-width: thin;
  scrollbar-color: #6da3e0 #f1f1f1;
}

/** For webkit support */
::-webkit-scrollbar {
  width: 1px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #c8dbf1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #6da3e0;
}

.tag-wrap {
  width: 44vw;
  overflow-y: scroll;
}

.title-wrap {
  white-space: nowrap;
  max-width: 44vw;
  overflow: hidden;
  text-overflow: ellipsis;
}

.diary-tag {
  color: #1890ff !important;
  background: #e6e6e6;
  padding: 0px 5px;
  border-radius: 0.3em;
  margin-left: 3px;
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
