<template>
  <div>
    <div class="header">
      <a-input-search
        placeholder="input search text"
        style="width: 40%"
        @search="onSearch"
      />
    </div>
    <div>

    <ListView />
    </div>
    <div class="addBtn">
      <TextEditor ref="textEditor"/>
      <a role="button" @click="addDiary" href="#" class="float">
        <i class="fa fa-plus my-float"></i>
      </a>
      <div class="label-container">
        <div class="label-text">Add Diary</div>
      </div>
    </div>
  </div>
</template>

<script>
import ListView from "./ListView";
import TextEditor from "./TextEditor";
export default {
  name: "DiaryEntries",
  data() {
    return {};
  },
  components: {
    ListView,
    TextEditor
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    addDiary() {
      this.$refs.textEditor.showModal()
      // alert("add diary");
    },
  },
};
</script>

<style>
.header {
  background-color: #333;
  position: sticky;
  top: 0;
  padding: 20px;
  z-index: 1;

}

body {
  font-family: Verdana, Geneva, sans-serif;
  background-color: #ccc;
  font-size: 12px;
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
</style>