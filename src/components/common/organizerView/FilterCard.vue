<template>
  <a-card title="Organizer" style="border: 1px solid black">
    <a-divider orientation="left">Date Filter</a-divider>
    <div class="date-filter">
      <a-date-picker
        inputReadOnly
        :allowClear="true"
        v-model="startDate"
        format="DD-MM-YYYY"
        placeholder="from date"
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
        placeholder="To date"
        style="width: 150px"
        @change="selectDate"
        :locale="this.$i18n.locale == 'vi' ? vi : en"
      />
    </div>
    <a-divider orientation="left">Tags Filter</a-divider>
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
              @confirm="handelDelete(item)"
            >
              <a
                ><span><a-icon type="delete" /></span
                >{{ $t("diary_page.diary_form.delete_btn") }}</a
              >
            </a-popconfirm>
          </a>
          <a-checkbox :value="item.value" @change="onChange(item)">
            {{ item.value }}
          </a-checkbox>
        </a-list-item>
      </a-list>
    </div>
    <a-divider orientation="left"></a-divider>
    <div style="text-align: right">
      <a-button type="primary">go</a-button>
    </div>
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
    ...mapActions(["fetchTags", "deleteTags", "updateTags"]),
    selectDate(value) {
      console.log(value);
    },
    onChange(checkedValues) {
      console.log("checked = ", checkedValues.value);
      let index = this.tags.indexOf(checkedValues.value);
      if (index == -1) {
        this.tags.push(checkedValues.value);
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
.tags-filter {
  /* text-align: center; */
  height: 40vh;
  overflow-y: auto;
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