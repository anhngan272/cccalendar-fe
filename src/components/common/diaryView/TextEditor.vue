<template>
  <a-modal
    :keyboard="false"
    :destroyOnClose="true"
    v-model="showText"
    :title="$t('diary_page.diary_form.header')"
    :bodyStyle="modaleStyle"
    centered
    width="90vw"
    :maskClosable="false"
    :closable="false"
    :zIndex="1002"
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
        <div style="display: flex">
          <div>
            <a-date-picker
              inputReadOnly
              :allowClear="false"
              v-model="form.date"
              format="DD-MM-YYYY"
              :locale="this.$i18n.locale == 'vi' ? vi : en"
              style=""
            />
          </div>
        </div>
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
          style="height: 45vh; overflow: auto"
          id="editor"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
          v-model="form.content"
          :editorToolbar="customToolbar"
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
          ok-text="Ok"
          :cancel-text="$t('diary_page.diary_form.cancel_btn')"
          @confirm="handelCancel"
        >
          <a-button>
            {{ $t("diary_page.diary_form.cancel_btn") }}
          </a-button>
        </a-popconfirm>
      </div>
    </div>
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
    showText: Boolean,
  },
  components: {
    VueEditor,
    TagPicker,
  },
  created() {
    this.setDiaryInfo();
  },
  computed: {},
  data() {
    return {
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"], // toggled buttons
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ],
      textEditorVisible: false,
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
            message: this.$t("Please input Diary Title"),
            trigger: "submit",
          },
        ],
        date: [
          {
            required: true,
            message: this.$t("Please select Diary Date"),
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
    setDiaryInfo() {
      if (this.isUpdate == true) {
        this.form.title = this.diary.title;
        this.form.date = moment(this.diary.date);
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
      this.$refs.form.validate((valid,error) => {
        if (valid) {
          this.isValidated = true;
        } else {
          if (error.title[0].field == "title") {
            this.$refs.title.focus();
            this.isValidated = false;
          }
        }
      });
    },
    closeTextEditor() {
      this.$emit("closeTextEditor");
    },
    handelCancel() {
      this.resetForm();
      this.closeTextEditor();
      // this.textEditorVisible = false;
      // this.$parent.diary = null;
    },
    handleUpdate() {
      this.validateForm();
      if (this.isValidated == true) {
        var diary = {
          id: this.diary.id,
          title: this.form.title,
          date: this.form.date.clone().format("YYYY-MM-DD"),
          tags: this.form.tags,
          content: this.form.content,
        };
        if (this.updateDiary(diary)) {
          this.textEditorVisible = false;
          this.$emit("updateDiary", diary.id);
          this.closeTextEditor();
        }
      } else {
        return;
      }
    },
    handleCreate() {
      this.validateForm();
      if (this.isValidated == true) {
        var diary = {
          // id: 100,
          title: this.form.title,
          date: this.form.date.clone().format("YYYY-MM-DD"),
          tags: this.form.tags,
          content: this.form.content,
        };
        // this.createDiary(diary)
        if (this.createDiary(diary)) {
          this.$refs.form.resetFields();
          this.$emit("createDiary");
          this.closeTextEditor();
        }
        // this.showSuccessAlert();
      } else {
        return;
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