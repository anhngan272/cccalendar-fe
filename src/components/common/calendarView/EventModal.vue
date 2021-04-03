 <template>
  <a-modal v-model="$parent.modal2" :title="event.title" @ok="handleOk">
    <div>Start: {{ event.start }}</div>
    <div>End: {{ event.end }}</div>
    <div>Description: {{ eventModalExtend.description }}</div>
    <div>Attendees: {{ eventModalExtend.attendees }}</div>
    <div>Tags : {{ event.tags }}</div>
  </a-modal>
</template>
 
 <script>
export default {
  name: "EventModal",
  props: {
    eventModalExtend: Object,
    event: Object,
  },
  data() {
    return {
      modal2: false,
    };
  },
  methods: {
    handleOk() {
      this.$parent.modal2 = false;
    },
  },
  computed: {
    
  },
};
</script>
 
 <style>
</style>