<template>
  <a-card title="Events" style="border: 1px solid black">
    <a-list
      :locale="locale"
      item-layout="horizontal"
      :data-source="getEvents"
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
        {{ item.title }}
        <!-- <a-list-item-meta>
                  <div slot="title">{{ item.title }}</div>
                </a-list-item-meta> -->
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EventsCard",
  data() {
    return {
      locale: {
        emptyText: this.$t("diary_page.diary_list.no_data"),
      },
    };
  },
  created() {
    this.fetchEvents();
  },
  computed: {
    ...mapGetters(["getEvents"]),
  },
  methods: {
    ...mapActions(["fetchEvents", "deleteEvent", "updateEvent"]),
  },
};
</script>

<style>
</style>