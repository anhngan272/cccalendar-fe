 <template>
  <a-modal
    :keyboard="false"
    :destroyOnClose="true"
    class="diaryModal"
    v-model="diaryModal"
    :title="title"
    @ok="handleOk"
    width="30vw"
  >
    <div slot="footer">
      <div style="text-align: center">
        <a-button key="edit" type="primary" @click="showUpdateModal">
          <span style="margin-right: 5px"><a-icon type="edit" /></span>
          {{ $t("diary_page.diary_form.edit_btn") }}
        </a-button>
        <a-popconfirm
          :title="$t('diary_page.diary_form.delete_confirm')"
          placement="top"
          :ok-text="$t('diary_page.diary_form.delete_btn')"
          :cancel-text="$t('diary_page.diary_form.cancel_btn')"
          @confirm="handleDelete"
        >
          <a-button key="delete" type="danger">
            <span style="margin-right: 5px"><a-icon type="delete" /></span>
            {{ $t("diary_page.diary_form.delete_btn") }}
          </a-button>
        </a-popconfirm>
        <a-button key="ok" type="primary" @click="handleOk">
          {{ $t("diary_page.diary_form.ok_btn") }}
        </a-button>
      </div>
    </div>

    <div>
      <b>{{ $t("diary_page.diary_form.date") }}: </b>
      <!-- {{
        moment(diary.date)
          .locale(this.$i18n.locale)
          .format("HH:mm a dddd DD-MM-yyyy")
      }} -->
      {{ date }}
    </div>

    <div class="tags">
      <b>{{ $t("diary_page.diary_form.tags") }}: </b>
      <span v-for="(tag, i) in tags" :key="i">#{{ tag }}</span>
    </div>

    <div>
      <b>{{ $t("diary_page.diary_form.content") }}: </b>
      <span v-html="content"></span>
    </div>
  </a-modal>
</template>
 
 <script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "DiaryDetail",
  props: {
    diary: Object,
  },
  data: function () {
    return {
      updateModal: false,
      diaryModal: false,
      title: "",
      date: "",
      tags: [],
      content: "",
    };
  },
  components: {},
  updated() {
    if (this.diary != null) {
      this.setDiaryInfo(this.diary);
    }
  },
  methods: {
    moment,
    ...mapActions(["deleteDiary"]),
    setDiaryInfo(diary) {
      this.title = diary.title;
      this.date = diary.date;
      this.tags = diary.tags;
      this.content = diary.content;
    },
    handleDelete() {
      this.deleteDiary(this.diary.id);
      this.diaryModal = false;
    },
    showUpdateModal() {
      // this.$parent.textEditorVisible = true;
      this.$emit("showUpdateModal", this.diary);
    },
    handleOk() {
      this.diaryModal = false;
    },
  },
  computed: {},
};
</script>
 
 <style scoped>
.diaryModal div {
  padding: 10px;
}
.attendeeWrapper {
  margin-left: 10px;
  vertical-align: top;
  display: inline-block;
  max-width: fit-content;
  min-width: 100px;
  max-height: 70px;
  overflow-y: scroll;
  padding: 0 5px 5px 5px !important;
}
.attendeeWrapper span {
  display: block;
}
.tags span {
  color: #1890ff;
  margin-right: 10px;
}
</style>