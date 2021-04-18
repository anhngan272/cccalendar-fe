<template>
  <a-modal
    :destroyOnClose="true"
    v-model="$parent.textEditorVisible"
    :title="$t('diary_page.diary_form.header')"
    :bodyStyle="modaleStyle"
    centered
    width="90vw"
    :maskClosable="false"
    :closable="false"
  >
    <a-form-model
      ref="form"
      labelAlign="left"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      style="width: 80vw"
    >
      <a-form-model-item
        :label="$t('diary_page.diary_form.title')"
        prop="title"
      >
        <a-input autoFocus v-model="form.title" ref="title" />
      </a-form-model-item>

      <a-form-model-item :label="$t('diary_page.diary_form.date')" prop="date">
        <a-date-picker
          inputReadOnly
          :allowClear="false"
          v-model="form.date"
          format="DD-MM-YYYY"
          :locale="this.$i18n.locale == 'vi' ? vi : en"
        />
      </a-form-model-item>
      <a-form-model-item :label="$t('diary_page.diary_form.tags')" prop="tags">
        <TagPicker
          ref="tagPicker"
          :eventTags="form.tags"
          @tagsPicked="setTags"
        />
      </a-form-model-item>

      <a-form-model-item
        style="height: 45vh"
        prop="content"
        :wrapper-col="{ span: 24, offset: 1 }"
      >
        <vue-editor
          style="height: 45vh"
          id="editor"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
          v-model="form.content"
        >
        </vue-editor>
      </a-form-model-item>
    </a-form-model>
    <div slot="footer">
      <div style="text-align: center">
        <a-button
          type="primary"
          @click="handleCreate"
          v-if="this.isUpdate != true"
        >
          {{ $t("diary_page.diary_form.create_btn") }}
        </a-button>
        <a-button type="primary" @click="handleUpdate" v-else>
          {{ $t("diary_page.diary_form.update_btn") }}
        </a-button>
        <a-button type="danger" @click="resetForm">
          {{ $t("diary_page.diary_form.reset_btn") }}
        </a-button>
        <a-popconfirm
          :title="$t('diary_page.diary_form.cancel_confirm')"
          placement="top"
          :ok-text="$t('diary_page.diary_form.ok_btn')"
          :cancel-text="$t('diary_page.diary_form.cancel_btn')"
          @confirm="handelCancel"
        >
          <a-button>
            {{ $t("diary_page.diary_form.cancel_btn") }}
          </a-button>
        </a-popconfirm>
      </div>
    </div>
    <a-modal
      :dialog-style="{ top: '20vh' }"
      :visible="submitModal"
      :closable="false"
      :maskClosable="false"
      @ok="hideSuccessAlert"
      :cancel-button-props="{ style: { display: 'none' } }"
    >
      <a-alert
        :message="$t('diary_page.diary_form.success_alert')"
        type="success"
        show-icon
      />
    </a-modal>
  </a-modal>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import moment from "moment";
import TagPicker from "../TagPicker.vue";
import { mapActions } from "vuex";
require("moment/locale/vi.js");
import vi from "ant-design-vue/es/date-picker/locale/vi_VN";
import en from "ant-design-vue/es/date-picker/locale/en_US";

export default {
  name: "TextEditor",
  props: {
    isUpdate: Boolean,
    diary: Object,
  },
  components: {
    VueEditor,
    TagPicker,
  },
  created() {
    this.setDiaryInfo();
  },
  computed: {},
  updated() {},

  data() {
    return {
      htmlForEditor: "",
      visible: false,
      isValidated: false,
      submitModal: false,
      form: {
        title: "",
        date: moment(new Date()),
        tags: [],
        content: "",
      },
      vi: vi,
      en: en,
      modaleStyle: {
        height: "80vh",
        width: "900px",
      },
      labelCol: { span: 2, offset: 2 },
      wrapperCol: { span: 20 },

      rules: {
        title: [
          {
            required: true,
            message: "Please input Diary Title",
            trigger: "submit",
          },
        ],
        date: [
          {
            required: true,
            message: "Please input Diary Title",
            trigger: "submit",
          },
        ],
      },
    };
  },
  beforeCreate() {
    moment.locale(this.$i18n.locale);
  },
  methods: {
    moment,
    ...mapActions(["createDiary", "updateDiary"]),
    hideSuccessAlert() {
      this.submitModal = false;
      // this.$emit("updated");
      this.$parent.textEditorVisible = false;
    },
    showSuccessAlert() {
      this.submitModal = true;
    },
    setDiaryInfo() {
      if (this.isUpdate == true) {
        this.form.title = this.diary.title;
        this.form.date = moment(this.diary.date, "DD-MM-YYYY");
        this.form.tags = this.diary.tags;
        this.form.content = this.diary.content;
        // console.log(this.diary)
      }
    },
    setTags(tags) {
      this.form = {
        ...this.form,
        tags: tags,
      };
    },
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isValidated = true;
        } else {
          console.log("error validate!!");
          this.isValidated = false;
        }
      });
    },
    handelCancel() {
      this.$parent.textEditorVisible = false;
      this.$parent.diary = null;
      this.resetForm();
    },
    handleUpdate() {
      this.validateForm();
      if (this.isValidated == true) {
        var diary = {
          // id: createEventId(),
          title: this.form.title,
          date: this.form.date,
          tags: this.form.tags,
          content: this.form.content,
        };
        if(this.updateDiary(diary)){
          this.$parent.textEditorVisible = false;
        }
      } else {
        console.log("error update");
      }
    },
    handleCreate() {
      this.validateForm();
      if (this.isValidated == true) {
        var diary = {
          // id: 100,
          title: this.form.title,
          // date: this.form.date,
          tags: this.form.tags,
          content: this.form.content,
        };
        // this.createDiary(diary)
        if (this.createDiary(diary)) {
          this.$parent.textEditorVisible = false;
        }
        // this.showSuccessAlert();
      } else {
        console.log("error create");
      }
    },
    resetForm() {
      if (this.isUpdate == true) {
        this.setDiaryInfo();
      } else {
        this.$refs.form.resetFields();
        this.$refs.tagPicker.resetForm();
      }
      // console.log("reset");
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData,
      })
        .then((result) => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.dateWrapper {
  margin-bottom: 10px;
}

#editor {
  height: 50vh;
}

.ant-form-item {
  margin-bottom: 5px;
}
</style>