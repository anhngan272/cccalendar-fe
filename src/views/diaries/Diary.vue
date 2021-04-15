S<template>
  <div>
    <div class="diary">
      <Diary />
    </div>
  </div>
</template>

<script>
import Diary from "@/components/common/diaryView/Diary";
export default {
  name: "DiaryView",
  components: {
    Diary,
  },
};
</script>

<style scoped>
.diary {
  background: white;
}

.editor {
  height: 42vh;
  width: 100%;
  background: pink;
}
</style>