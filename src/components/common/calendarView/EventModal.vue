 <template>
  <a-modal v-model="$parent.modal2" :title="event.title" @ok="handleOk">
    <div>{{ description }}</div>
  </a-modal>
</template>
 
 <script>
// import { mapGetters } from "vuex";
export default {
  name: "EventModal",
  props: {
    description: String,
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
    // ...mapGetters(["getEvents"]),
  },
};
</script>
 
 <style>
</style>