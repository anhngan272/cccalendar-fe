<template>
  <div>
    <div class="diary">
      <DiaryEntries/>
    </div>
    <div class="editor">
      <TextEditor/>
    </div>
  </div>
</template>

<script>
import DiaryEntries from '@/components/common/diaryView/DiaryEntries'
import TextEditor from '@/components/common/diaryView/TextEditor'
export default {
name:'DiaryView',
components:{
    DiaryEntries,
    TextEditor,
}
}
</script>

<style scoped>
.diary{
height: 45vh;
background: blueviolet;
}

.editor{
height: 42vh;
background: pink;
}

</style>