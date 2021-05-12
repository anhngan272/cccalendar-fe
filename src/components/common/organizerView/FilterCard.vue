<template>
  <a-card :title="$t('organizer_page.title')">
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
            <!-- <span><a-icon type="edit" theme="twoTone" /></span
            >{{ $t("diary_page.diary_form.edit_btn") }} -->
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
                <!-- <span><a-icon type="delete" /></span
                >{{ $t("diary_page.diary_form.delete_btn") }} -->
              </a>
            </a-popconfirm>
          </a>
          <a-checkbox
            :value="item"
            @change="onChange(item.name)"
            :checked="isCheckAll == true ? true : check(item.name)"
          >
            {{ item.name }}
          </a-checkbox>
        </a-list-item>
      </a-list>
    </div>
    <hr />
    <div>
      <a-checkbox @change="checkAll" :checked="isCheckAll">
        {{ $t("organizer_page.filter.all_tag") }}
      </a-checkbox>
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
        <a-input
          :addonBefore="$t('organizer_page.filter.new_name')"
          autoFocus
          v-model="updatedTag"
        />
        <div class="warning" style="color: #fd7e14; padding: 5px">
          {{ $t("organizer_page.filter.new_name_warning") }}
        </div>
      </div>
      <div slot="footer">
        <div style="text-align: center">
          <a-button key="update" type="primary" @click="handleOk">
            <!-- {{ $t("calendar_page.event_form.ok_btn") }} -->
            Ok
          </a-button>
          <a-popconfirm
            :title="$t('diary_page.diary_form.cancel_confirm')"
            placement="top"
            :ok-text="$t('diary_page.diary_form.ok_btn')"
            :cancel-text="$t('diary_page.diary_form.cancel_btn')"
            @confirm="tagUpdateModal = false"
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
    };
  },
  created() {
    this.fetchTags();
  },
  computed: {
    ...mapGetters(["getTags"]),
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
    ]),

    checkAll() {
      if (this.isCheckAll == true) {
        this.isCheckAll = false;
        this.form.tags = [];
      } else {
        this.isCheckAll = true;
        let tags = [];
        let tagsLength = this.getTags.length;
        for (let i = 0; i < tagsLength; i++) {
          tags.push(this.getTags[i].name);
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
      };
      this.fetchTags();
      this.fetchEvents(null);
      this.fetchDiaries(null);
    },

    check(value) {
      return this.form.tags.includes(value);
    },

    handleOk() {
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
        showMessage(this.$t("organizer_page.filter.tag_already_exist"));
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
        return tag.name.toLowerCase().includes(this.searchKey);
      });
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
  height: 40vh;
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