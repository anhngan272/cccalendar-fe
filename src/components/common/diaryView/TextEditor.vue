<template>
  <a-modal
    v-model="visible"
    title="Add Diary"
    @ok="handleOk"
    :bodyStyle="modaleStyle"
    :centered="true"
    width="90vw"
  >
    <a-form-model
      ref="form"
      labelAlign="left"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="Title" prop="title">
        <a-input v-model="form.title" ref="title" />
      </a-form-model-item>

      <a-form-model-item label="Date Time" prop="date">
        <a-date-picker
          inputReadOnly
          :allowClear="false"
          v-model="form.date"
          format="DD-MM-YYYY"
        />
        <a-time-picker
          inputReadOnly
          :allowClear="false"
          v-model="form.time"
          format="HH:mm"
          :default-value="moment('12:00', 'HH:mm')"
          style="margin-left: 15px"
        />
      </a-form-model-item>

      <a-form-model-item
        style="height:50vh"
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
      <a-form-model-item :wrapper-col="{ span: 14, offset: 12 }">
        <a-button type="danger" style="margin-left: 10px" @click="resetForm">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import moment from "moment";

export default {
  name: "TextEditor",
  components: {
    VueEditor,
  },

  data() {
    return {
      htmlForEditor: "",
      visible: false,
      form: {
        title: "",
        date: moment(new Date()),
        time: moment.utc("12:00", "HH:mm"),
        content: "",
      },
      modaleStyle: {
        height: "80vh",
        width: "900px",
      },
      labelCol: { span: 4 },
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

  methods: {
    moment,
    showModal() {
      // console.log(this.form.date);
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.visible = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.visible = false;
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.form.time=moment.utc("12:00", "HH:mm")
      console.log("reset");
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
</style>