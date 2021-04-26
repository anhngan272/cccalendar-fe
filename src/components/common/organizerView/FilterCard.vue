<template>
  <a-card :title="$t('organizer_page.title')">
    <a-divider orientation="left">{{
      $t("organizer_page.filter.date_filter")
    }}</a-divider>
    <div class="date-filter">
      <a-date-picker
        inputReadOnly
        :allowClear="true"
        v-model="startDate"
        format="DD-MM-YYYY"
        :placeholder="$t('organizer_page.filter.start_date')"
        style="width: 150px"
        @change="selectDate"
        :locale="this.$i18n.locale == 'vi' ? vi : en"
      />
      -
      <a-date-picker
        inputReadOnly
        :allowClear="true"
        v-model="endDate"
        format="DD-MM-YYYY"
        :placeholder="$t('organizer_page.filter.end_date')"
        style="width: 150px"
        @change="selectDate"
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
        enter-button
        @search="onSearch"
      />
    </div>
    <div class="tags-filter">
      <a-list
        :locale="locale"
        item-layout="horizontal"
        :data-source="getTags"
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
              @confirm="handelDelete(item.id)"
            >
              <a
                ><span><a-icon type="delete" /></span
                >{{ $t("diary_page.diary_form.delete_btn") }}</a
              >
            </a-popconfirm>
          </a>
          <a-checkbox :value="item" @change="onChange(item.name)">
            {{ item.name }}
          </a-checkbox>
        </a-list-item>
      </a-list>
    </div>
    <hr />
    <div style="text-align: right">
      <a-button type="primary"><a-icon type="arrow-right" /></a-button>
    </div>
    <a-modal
      :keyboard="false"
      :destroyOnClose="true"
      v-model="tagUpdateModal"
      :title="$t('calendar_page.calendar.select_month')"
      :maskClosable="false"
      :closable="false"
    >
      <div>
        New Tag's Name:
        <a-input autoFocus v-model="updatedTag" placeholder="New Tag's Name" />
      </div>
      <div slot="footer">
        <div style="text-align: center">
          <a-button key="update" type="primary" @click="handleOk">
            {{ $t("calendar_page.event_form.ok_btn") }}
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
export default {
  name: "FilterCard",
  data() {
    return {
      startDate: null,
      endDate: null,
      vi: vi,
      en: en,
      locale: {
        emptyText: this.$t("diary_page.diary_list.no_data"),
      },
      tags: [],
      tagUpdateModal: false,
      updatedTag: "",
      updatedTagId: "",
    };
  },
  created() {
    this.fetchTags();
  },
  computed: {
    ...mapGetters(["getTags"]),
  },
  methods: {
    moment,
    ...mapActions(["fetchTags", "deleteTag", "updateTag"]),

    handleOk() {
      let updateTag = {
        id: this.updatedTagId,
        name: this.updatedTag,
      };
      this.tagUpdateModal = false;
      this.updateTag(updateTag);
    },

    showUpdateModal(tag) {
      this.updatedTag = tag.name;
      this.updatedTagId = tag.id;
      this.tagUpdateModal = true;
    },

    handelDelete(tagId) {
      this.deleteTag(tagId);
    },

    selectDate(value) {
      console.log(value);
    },
    onSearch(value) {
      console.log(value);
    },
    onChange(checkedValues) {
      console.log("checked = ", checkedValues);
      let index = this.tags.indexOf(checkedValues);
      if (index == -1) {
        this.tags.push(checkedValues);
      } else {
        this.tags.splice(index, 1);
      }
      console.log(this.tags);
    },
  },
};
</script>

<style scoped>
.date-filter {
  text-align: center;
}
.search-box {
  /* float: right;
  width: 70%; */
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