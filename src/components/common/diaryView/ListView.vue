<template>
  <div class="wrapper">
    <a-list item-layout="horizontal" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
          <a slot="title" href="https://www.antdv.com/">{{ item.date }}</a>
          
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
const data = [ 
  {
    title: "Ant Design Title 1",
    date:' 6/4/2021'
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
    date:' 6/4/2021'
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
    date:' 6/4/2021'
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
export default {
  data() {
    return {
      data,
    };
  },
};
</script>
<style>
.wrapper {
  /* background: pink; */
  padding: 20px;
}
</style>
