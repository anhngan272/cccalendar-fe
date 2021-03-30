<template>
  <div>
    <div class="diary">
      <DiaryEntries />
    </div>
  </div>
</template>

<script>
import DiaryEntries from "@/components/common/diaryView/DiaryEntries";
export default {
  name: "DiaryView",
  components: {
    DiaryEntries,
  },
};
</script>

<style scoped>
.diary {
  height: 88vh;
  background: white;
  overflow: scroll;
}

.editor {
  height: 42vh;
  width: 100%;
  background: pink;
}
</style>