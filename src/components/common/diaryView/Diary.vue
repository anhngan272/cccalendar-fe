<template>
  <div class="container">
    <div class="header">
      <div class="row">
        <div class="col-sm-8">
          <a-input
            class="search-box"
            :addonBefore="$t('diary_page.searchPlaceholder')"
            v-model="form.title"
          />
        </div>
        <div class="col-sm-4">
          <div>
            <div style="display: inline">
              <a-tooltip placement="right">
                <template slot="title">
                  <span>{{ $t("diary_page.diary_list.sort_by") }}</span>
                </template>

                <a-select
                  default-value="newest"
                  style="min-width: fit-content; width: 140px"
                  @change="performSearch"
                  v-model="form.sort"
                >
                  <a-icon
                    slot="suffixIcon"
                    style="color: #808080"
                    type="filter"
                  />
                  <a-select-option value="newest">
                    {{ $t("diary_page.diary_list.newest_date") }}
                  </a-select-option>
                  <a-select-option value="oldest">
                    {{ $t("diary_page.diary_list.oldest_date") }}
                  </a-select-option>
                  <a-select-option value="a-to-z">
                    <a-icon type="sort-ascending" />
                    {{ $t("diary_page.diary_form.title") }} A - Z
                  </a-select-option>
                  <a-select-option value="z-to-a">
                    <a-icon type="sort-descending" />
                    {{ $t("diary_page.diary_form.title") }} Z - A
                  </a-select-option>
                </a-select>
              </a-tooltip>
            </div>
            <a-button
              style="width: 50px; margin-left: 20px"
              @click="performEmptySearch"
              ><a-icon type="reload"
            /></a-button>
          </div>
        </div>
      </div>

      <div class="sort-header">
        <div class="datePickerWrapper">
          <a-date-picker
            inputReadOnly
            :allowClear="true"
            v-model="form.fromDate"
            format="DD-MM-YYYY"
            :placeholder="$t('diary_page.diary_list.start_date')"
            class="datePicker"
            :locale="this.$i18n.locale == 'vi' ? vi : en"
          />
          -
          <a-date-picker
            inputReadOnly
            :allowClear="true"
            v-model="form.toDate"
            format="DD-MM-YYYY"
            :placeholder="$t('diary_page.diary_list.end_date')"
            class="datePicker"
            :locale="this.$i18n.locale == 'vi' ? vi : en"
          />
        </div>

        <div class="tag-picker">
          <TagPicker
            ref="tagPicker"
            @tagsPicked="setTags"
            @changeFilterTags="changeFilterTags"
            type="filter"
          />
        </div>

        <div>
          <a-checkbox
            v-model="form.containAllTag"
            style="margin-right: 15px"
            >{{ $t("diary_page.diary_list.contain_all_tag") }}</a-checkbox
          >
          <a-button style="width: 60px" type="primary" @click="performSearch"
            ><a-icon type="search"
          /></a-button>
        </div>

        <div class="pagination">
          <a-pagination
            simple
            :total="pagination.totalPage"
            :current="pagination.currentPage"
            @change="moveToPage"
          />
        </div>
      </div>
    </div>
    <div>
      <DiaryList ref="diaryList" @clickTag="clickTag" @diaryDeleted="performSearch"/>
    </div>
    <div class="addBtn">
      <TextEditor
        ref="textEditor"
        :isUpdate="false"
        :showText="showText"
        @closeTextEditor="showText = false"
        @createDiary="$refs.diaryList.createDiary()"
      />
      <a role="button" @click="addDiary" class="float">
        <i style="color: #fff" class="fa fa-plus my-float"></i>
      </a>
      <div class="label-container">
        <div class="label-text">{{ $t("diary_page.addDiaryBtn") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DiaryList from "./DiaryList";
import TextEditor from "./TextEditor";
import TagPicker from "../TagPicker";
import moment from "moment";
require("moment/locale/vi.js");
import vi from "ant-design-vue/es/date-picker/locale/vi_VN";
import en from "ant-design-vue/es/date-picker/locale/en_US";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Diary",
  data() {
    return {
      showText: false,
      selectedDate: moment(new Date()),
      vi: vi,
      en: en,
      form: {
        title: "",
        fromDate: null,
        toDate: null,
        sort: "newest", // ["newest", "oldest", "a-to-z", "z-to-a"]
        tags: [],
        page: 1,
        containAllTag: false,
      },
    };
  },
  components: {
    DiaryList,
    TextEditor,
    TagPicker,
  },
  beforeCreate() {
    moment.locale(this.$i18n.locale);
  },
  computed: {
    ...mapGetters({
      pagination: "getPagination",
      getFilterTags: "getFilterTags",
    }),
  },
  methods: {
    moment,
    ...mapActions(["fetchDiaries", "setFilterTags"]),

    changeFilterTags(tags) {
      this.form.tags = tags;
    },

    clickTag(tag) {
      let tags = this.getFilterTags;
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
      this.setFilterTags(tags);
      this.$refs.tagPicker.setFilterTagPicker();
      this.form.tags = tags;
    },

    setTags(tags) {
      this.form = {
        ...this.form,
        tags: tags,
      };
    },

    performSearch() {
      this.fetchDiaries(this.form);
    },
    performEmptySearch() {
      this.form = {
        title: "",
        fromDate: null,
        toDate: null,
        sort: "newest", // ["newest", "oldest", "a-to-z", "z-to-a"]
        // tags: [],
        containAllTag: false,
      };
      this.$refs.tagPicker.resetForm();
      this.$refs.diaryList.resetFields();

      this.fetchDiaries(null);
    },
    addDiary() {
      this.showText = true;
      this.$refs.textEditor.textEditorVisible = true;
    },
    moveToPage(page) {
      this.fetchDiaries({ ...this.form, page: page });
    },
  },
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0px;
  padding: 10px 20px;
  z-index: 1;
  background: white;
}

body {
  /* font-family: Verdana, Geneva, sans-serif; */
  font-family: 'Fira Sans';
  background-color: #ccc;
  font-size: 12px;
}

.datePickerWrapper {
  /* min-width: 30%; */
  width: fit-content;
  margin-right: 15px;
}

.datePicker {
  /* min-width: 45%; */
  width: 120px;
}

.pagination {
  /* background: pink; */
  flex-grow: 1;
  min-width: 25%;
  margin-left: 20px;
  display: inline-block;
  text-align: right;
}

.tag-picker {
  width: 20%;
  min-width: 100px;
  height: 40px;
  margin-right: 15px;
}

.sort-header {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  vertical-align: middle;
  min-height: 45px;
}

.sort {
  z-index: 2;
  line-height: 25px;
  font-size: 15px;
  color: #808080;
}

.sort div {
  padding: 5px;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  display: flex;
}

.fa-sort {
  font-size: 20px;
  margin-right: 5px;
}

.label-container {
  position: fixed;
  bottom: 58px;
  right: 205px;
  display: table;
  visibility: hidden;
}

.label-text {
  color: #fff;
  background: #7e7e7e;
  display: table-cell;
  vertical-align: middle;
  padding: 10px;
  border-radius: 7px;
}

.label-text::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent #7e7e7e;
}

.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 50px;
  right: 140px;
  background-color: #06c;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}

.my-float {
  font-size: 24px;
  margin-top: 18px;
}

a.float + div.label-container {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s ease;
}

a.float:hover + div.label-container {
  visibility: visible;
  opacity: 1;
}
.sort-header {
  border-bottom: 1px solid #e6e6e6;
}

.search-box {
  box-shadow: 0px 0px 20px #e6e6e6;
}
</style>