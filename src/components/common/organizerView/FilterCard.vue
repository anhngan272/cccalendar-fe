<template>
  <a-card :title="$t('organizer_page.title')">
    <a-button
      style="margin-right: 10px"
      slot="extra"
      type="primary"
      @click="kmeanModal = true"
    >
      <i class="fa fa-list-ul"></i>
    </a-button>
    <!---Kmean Modal-->
    <a-modal
      :keyboard="true"
      :destroyOnClose="true"
      v-model="kmeanModal"
      :title="$t('organizer_page.filter.kmean')"
      :maskClosable="false"
      :closable="true"
    >
      <div>
        <p>
          {{
            $t("This feature will automatically group events/diaries based on title similarity, then will tag 1 common tag for these event/diary groups.")
          }}
        </p>
        <p class="text-danger">
          {{
            $t("This feature is in beta, tag name will be generate randomly.")
          }}
        </p>
        <p>
          {{ $t("Please select which you want to categorize and tag.") }}
        </p>
        <a-checkbox v-model="kmeanEvent">
          {{ $t("organizer_page.filter.event") }}
        </a-checkbox>
        <div style="padding: 5px"></div>
        <a-checkbox v-model="kmeanDiary">
          {{ $t("organizer_page.filter.diary") }}
        </a-checkbox>
      </div>
      <div slot="footer">
        <div style="text-align: right">
          <a-button key="update" type="primary" @click="performKmean">
            Ok
          </a-button>
        </div>
      </div>
    </a-modal>
    <!---End of Kmean Modal-->
    <a-button slot="extra" type="primary" @click="performEmptySearch">
      <a-icon type="reload" />
    </a-button>
    <a-divider orientation="left">{{
      $t("organizer_page.filter.date_filter")
    }}</a-divider>
    <div class="date-filter">
      <a-date-picker
        inputReadOnly
        :allowClear="true"
        v-model="form.fromDate"
        format="DD-MM-YYYY"
        :placeholder="$t('organizer_page.filter.start_date')"
        style="width: 150px"
        :locale="this.$i18n.locale == 'vi' ? vi : en"
      />
      -
      <a-date-picker
        inputReadOnly
        :allowClear="true"
        v-model="form.toDate"
        format="DD-MM-YYYY"
        :placeholder="$t('organizer_page.filter.end_date')"
        style="width: 150px"
        :locale="this.$i18n.locale == 'vi' ? vi : en"
      />
    </div>

    <a-divider orientation="left">{{
      $t("organizer_page.filter.tag_filter")
    }}</a-divider>
    <div>
      <a-input-search
        class="search-box"
        :placeholder="$t('organizer_page.filter.searchPlaceholder')"
        @change="onSearch"
        v-model="searchKey"
      />
    </div>
      <a-checkbox style="margin:10px 24px 0px " @change="checkAll" :checked="isCheckAll">
        {{ $t("organizer_page.filter.all_tag") }}
      </a-checkbox>
    <div class="tags-filter">
      <a-list
        :locale="locale"
        item-layout="horizontal"
        :data-source="searching == true ? tagsData : getTags"
        :bordered="true"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a class="edit" slot="actions" @click="showUpdateModal(item)">
            <a-button type="primary"> <a-icon type="edit" /></a-button>
          </a>

          <a slot="actions" class="delete">
            <a-popconfirm
              :title="$t('organizer_page.filter.delete_confirm')"
              placement="top"
              :ok-text="$t('organizer_page.filter.delete_btn')"
              :cancel-text="$t('organizer_page.filter.cancel_btn')"
              @confirm="handelDelete(item)"
            >
              <a>
                <a-button type="danger"><a-icon type="delete" /></a-button>
              </a>
            </a-popconfirm>
          </a>
          <a-checkbox
            :value="item"
            @change="onChange(item.name)"
            :checked="isCheckAll == true ? true : check(item.name)"
          >
            <a-tooltip placement="top">
              <template slot="title">
                <span>{{ item.name }}</span>
              </template>
              {{ shortTag(item.name) }}
            </a-tooltip>
          </a-checkbox>
        </a-list-item>
      </a-list>
    </div>
    <hr />
    <div>
      <!-- <a-checkbox @change="checkAll" :checked="isCheckAll">
        {{ $t("organizer_page.filter.all_tag") }}
      </a-checkbox> -->
      <a-divider type="vertical" />
      <a-checkbox v-model="form.containAllTag"
        >{{ $t("organizer_page.filter.contain_all_tag") }}
      </a-checkbox>
      <a-divider type="vertical" />
      <a-button style="float: right" type="primary" @click="performSearch"
        ><a-icon type="arrow-right"
      /></a-button>
    </div>
    <a-modal
      :keyboard="false"
      :destroyOnClose="true"
      v-model="tagUpdateModal"
      :title="$t('organizer_page.filter.edit_tag')"
      :maskClosable="false"
      :closable="false"
    >
      <div>
        <a-form-item :validate-status="status" :help="help">
          <a-input
            :addonBefore="$t('organizer_page.filter.new_name')"
            autoFocus
            v-model="updatedTag"
            ref="editTag"
          />
        </a-form-item>
        <div class="warning" style="color: #fd7e14; padding: 5px">
          {{ $t("organizer_page.filter.new_name_warning") }}
        </div>
      </div>
      <div slot="footer">
        <div style="text-align: center">
          <a-button key="update" type="primary" @click="handleOk">
            Ok
          </a-button>
          <a-popconfirm
            :title="$t('diary_page.diary_form.cancel_confirm')"
            placement="top"
            :ok-text="$t('diary_page.diary_form.ok_btn')"
            :cancel-text="$t('diary_page.diary_form.cancel_btn')"
            @confirm="handleCancel"
          >
            <a-button>
              {{ $t("diary_page.diary_form.cancel_btn") }}
            </a-button>
          </a-popconfirm>
        </div>
      </div>
    </a-modal>
  </a-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import moment from "moment";
require("moment/locale/vi.js");
import vi from "ant-design-vue/es/date-picker/locale/vi_VN";
import en from "ant-design-vue/es/date-picker/locale/en_US";
import { showMessage } from "@/helpers/index";

export default {
  name: "FilterCard",
  data() {
    return {
      form: {
        fromDate: null,
        toDate: null,
        tags: [],
        containAllTag: false,
        all: true,
      },
      vi: vi,
      en: en,
      locale: {
        emptyText: this.$t("diary_page.diary_list.no_data"),
      },
      tagUpdateModal: false,
      updatedTag: "",
      updatedTagId: "",
      searchKey: "",
      tagsData: [],
      searching: false,
      isCheckAll: false,
      kmeanModal: false,
      kmeanEvent: false,
      kmeanDiary: false,
      status: "",
      help: "",
    };
  },
  created() {
    this.fetchTags();
  },
  computed: {
    ...mapGetters(["getTags", "getSpinning"]),
  },
  mounted() {
    this.tagsData = this.getTags;
  },
  methods: {
    moment,
    ...mapActions([
      "fetchTags",
      "deleteTag",
      "updateTag",
      "fetchDiaries",
      "fetchEvents",
      "clustering",
    ]),

    shortTag(content) {
      let contentToRender = "";
      if (content) {
        contentToRender = content + " ";
        if (content.length > 20) {
          contentToRender = content.substring(0, 15) + ". . .";
        }
      }
      return contentToRender;
    },

    performKmean() {
      this.clustering({
        isClusteringEvent: this.kmeanEvent,
        isClusteringDiary: this.kmeanDiary,
      });

      // close modal
      this.kmeanModal = false;

      // clear checkbox
      this.kmeanEvent = false;
      this.kmeanDiary = false;
    },
    checkAll() {
      // console.log(this.tagsData)
      if (this.isCheckAll == true) {
        this.isCheckAll = false;
        this.form.tags = [];
      } else {
        this.isCheckAll = true;
        let tags = [];
        let tagsLength = this.tagsData.length;
        for (let i = 0; i < tagsLength; i++) {
          tags.push(this.tagsData[i].name);
        }
        this.form.tags = tags;
      }
      // console.log(this.form.tags);
    },

    performSearch() {
      let eventSearchTerm = {
        start: this.form.fromDate,
        end: this.form.toDate,
        tags: this.form.tags,
        containAllTag: this.form.containAllTag,
        all: true,
      };
      this.fetchEvents(eventSearchTerm);
      this.fetchDiaries(this.form);
    },

    performEmptySearch() {
      this.form = {
        fromDate: null,
        toDate: null,
        tags: [],
        containAllTag: false,
        all: true,
      };
      this.fetchTags();
      this.fetchEvents(null);
      this.fetchDiaries({ ...this.form });
    },

    check(value) {
      return this.form.tags.includes(value);
    },

    handleCancel() {
      this.tagUpdateModal = false;
      this.status = "";
      this.help = "";
    },

    handleOk() {
      if (this.updatedTag == "") {
        this.status = "error";
        this.help = this.$i18n.t("organizer_page.filter.tag_empty");
        this.$refs.editTag.focus();
        return false;
      }
      this.status = "";
      this.help = "";
      let tagIndex = this.getTags.findIndex(
        (tags) => tags.name === this.updatedTag
      );
      if (tagIndex == -1) {
        let updateTag = {
          id: this.updatedTagId,
          name: this.updatedTag,
        };
        this.tagUpdateModal = false;
        this.updateTag(updateTag);
        this.performEmptySearch();
      } else {
        showMessage(
          "error",
          this.$t("organizer_page.filter.tag_already_exist")
        );
      }
    },

    showUpdateModal(tag) {
      this.updatedTag = tag.name;
      this.updatedTagId = tag.id;
      this.tagUpdateModal = true;
    },

    handelDelete(tag) {
      this.deleteTag(tag.id);
      this.performEmptySearch();
    },

    deleteTagInArray(tag) {
      this.form.tags = this.form.tags.filter((t) => t !== tag.name);
      this.performSearch();
    },

    onSearch() {
      this.searching = true;
      this.tagsData = this.getTags;
      this.tagsData = this.tagsData.filter((tag) => {
        return tag.name.includes(this.searchKey);
      });
      if(this.isCheckAll){
        let tags = [];
        for (let i = 0; i < this.tagsData.length; i++) {
          tags.push(this.tagsData[i].name);
        }
        this.form.tags = tags;
      }
      // console.log(this.form.tags);
    },
    onChange(checkedValues) {
      // console.log("checked = ", checkedValues);
      let index = this.form.tags.indexOf(checkedValues);
      if (index == -1) {
        this.form.tags.push(checkedValues);
      } else {
        this.form.tags.splice(index, 1);
      }
      // console.log(this.form.tags);
    },
  },
};
</script>

<style scoped>
.date-filter {
  text-align: center;
}
.tags-filter {
  /* text-align: center; */
  height: 38vh;
  overflow-y: auto;
  margin-top: 10px;
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
</style>