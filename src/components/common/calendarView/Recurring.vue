<template>
  <div>
    <a-select :value="recurrent"  @change="handleChange">
      <a-select-option value="never"> Never </a-select-option>
      <a-select-option value="daily"> Daily </a-select-option>
      <a-select-option value="weekly"> Weekly </a-select-option>
      <a-select-option value="monthly"> Monthly </a-select-option>
      <a-select-option value="yearly"> Yearly </a-select-option>
      <a-select-option value="custom"> Custom... </a-select-option>
      <a-select-option v-if="isCustom == true" :value="customString">
        {{ custom }}
      </a-select-option>
    </a-select>
    <!-- <a-button type="primary" @click="customMdal = true"> Custom </a-button> -->
    <a-modal
      title="Custom"
      v-model="customMdal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div>
        Repeat every
        <a-input
          v-model="form.interval"
          @keypress="isNumber"
          :style="{ width: '50px', marginLeft: 10 }"
        />

        <a-select
          v-model="form.freq"
          style="width: 80px"
          @change="handleChange"
        >
          <a-select-option
            v-for="(freq, i) in freqType"
            :key="i"
            :value="freq.value"
          >
            {{ freq.name }}
          </a-select-option>
        </a-select>
      </div>
      <div v-if="form.freq == 'WEEKLY'">
        Repeat on
        <div>
          <span v-for="(day, i) in dayOfWeek" :key="i">
            <input
              @change="onDateClick"
              :value="day.value"
              type="checkbox"
              name="repeatOn"
              v-model="form.date"
              :id="i"
            />
            <label :for="i" class="label"> {{ day.day }} </label>
          </span>
        </div>
      </div>
      <div>
        Until <br />
        <a-radio-group v-model="form.endType" @change="onChange">
          <a-radio class="end" value="never"> Never </a-radio>
          <br />
          <a-radio class="end" value="until"> Until </a-radio>
          <a-date-picker
            v-if="form.endType == 'until'"
            inputReadOnly
            :allowClear="false"
            v-model="form.until"
            format="DD-MM-YYYY"
          />
          <br /><a-radio class="end" value="count"> After </a-radio>
          <!-- <input id="intLimitTextBox" /> -->
          <!-- <input @keypress="isNumber(event)" /> -->
          <span v-if="form.endType == 'count'">
            <a-input
              v-model="form.count"
              @keypress="isNumber"
              :style="{ width: '50px', marginLeft: 10 }"
            />
            Occurrences
          </span>
        </a-radio-group>
      </div>
      <a-button @click="clickMe">click</a-button>
      <code>{{ customString }}</code
      ><br />
      <code>{{ custom }}</code>
    </a-modal>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Recurring",
  data() {
    return {
        recurrent:"never",
      dayOfWeek: [
        {
          day: "Sun",
          name: "Sunday",
          value: "SU",
        },
        {
          day: "Mon",
          name: "Monday",
          value: "MO",
        },
        {
          day: "Tue",
          name: "Tuesday",
          value: "TU",
        },
        {
          day: "Wed",
          name: "Wednesday",
          value: "WE",
        },
        {
          day: "Thu",
          name: "Thursday",
          value: "TH",
        },
        {
          day: "Fri",
          name: "Friday",
          value: "FR",
        },
        {
          day: "Sat",
          name: "Saturday",
          value: "SA",
        },
      ],
      freqType: [
        {
          name: "day",
          value: "DAILY",
        },
        {
          name: "week",
          value: "WEEKLY",
        },
        {
          name: "month",
          value: "MONTHLY",
        },
        {
          name: "year",
          value: "YEARLY",
        },
      ],
      customMdal: false,
      isCustom: false,
      customString: "",
      custom: "",
      form: {
        freq: "WEEKLY",
        interval: "1",
        date: [],
        endType: "never",
        until: moment(new Date()).utc("vi_VN").add(3, "months"),
        count: 1,
      },
    };
  },
  created() {
    let day = new Date().getDay();
    this.form.date.push(this.dayOfWeek[day].value);
  },
  methods: {
    moment,
    clickMe() {
      let until = this.form.until.format("YYYYMMDDT125900") + "Z";
      let freqIndex = this.freqType.findIndex(
        (freq) => freq.value == this.form.freq
      );
      let freqName = this.freqType[freqIndex].name;
      let dayName = [];
      let dayIndex = "";
      for (let i = 0; i < this.form.date.length; i++) {
        dayIndex = this.dayOfWeek.findIndex(
          (day) => day.value == this.form.date[i]
        );
        dayName.push(" " + this.dayOfWeek[dayIndex].day);
      }

      switch (this.form.endType) {
        case "never":
          switch (this.form.freq) {
            case "WEEKLY":
              this.customString =
                "RRULE:FREQ=" +
                this.form.freq +
                ";INTERVAL=" +
                this.form.interval +
                ";BYDAY=" +
                this.form.date;
              this.custom =
                "Every " +
                this.form.interval +
                " " +
                freqName +
                " on" +
                dayName;
              break;
            default:
              this.customString =
                "RRULE:FREQ=" +
                this.form.freq +
                ";INTERVAL=" +
                this.form.interval;
              this.custom = "Every " + this.form.interval + " " + freqName;
              break;
          }
          break;
        case "until":
          switch (this.form.freq) {
            case "WEEKLY":
              this.customString =
                "RRULE:FREQ=" +
                this.form.freq +
                ";INTERVAL=" +
                this.form.interval +
                ";UNTIL=" +
                until +
                ";BYDAY=" +
                this.form.date;
              this.custom =
                "Every " +
                this.form.interval +
                " " +
                freqName +
                " on" +
                dayName +
                " until " +
                this.form.until.format("YYYY-MM-DD");
              break;
            default:
              this.customString =
                "RRULE:FREQ=" +
                this.form.freq +
                ";INTERVAL=" +
                this.form.interval +
                ";UNTIL=" +
                until;
              this.custom =
                "Every " +
                this.form.interval +
                " " +
                freqName +
                " until " +
                this.form.until.format("YYYY-MM-DD");
              break;
          }
          break;
        case "count":
          switch (this.form.freq) {
            case "WEEKLY":
              this.customString =
                "RRULE:FREQ=" +
                this.form.freq +
                ";INTERVAL=" +
                this.form.interval +
                ";COUNT=" +
                this.form.count +
                ";BYDAY=" +
                this.form.date;
              this.custom =
                "Every " +
                this.form.interval +
                " " +
                freqName +
                " on" +
                dayName +
                " after " +
                this.form.count +
                " times";
              break;
            default:
              this.customString =
                "RRULE:FREQ=" +
                this.form.freq +
                ";INTERVAL=" +
                this.form.interval +
                ";COUNT=" +
                this.form.count;
              this.custom =
                "Every " +
                this.form.interval +
                " " +
                freqName +
                " after " +
                this.form.count +
                " times";
              break;
          }
      }
    },
    handleChange(value) {
        if(value=="custom"){
            this.customMdal = true
        }
    //   console.log(`selected ${value}`);
    },
    handleCancel() {
      this.customMdal = false;
    },
    handleOk() {
    //   console.log("ok");
    this.clickMe()
    this.recurrent= this.customString
    this.customMdal = false;
    this.isCustom=true
    },
    onDateClick() {
      let day = new Date().getDay();
      if (this.form.date.length === 0) {
        document.getElementById(day).checked = true;
        this.form.date.push(document.getElementById(day).value);
      }
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>
<style scoped>
.end {
  /* display: inline-block; */
  height: 30px;
  line-height: 30px;
  margin: 2px;
}

.label {
  background: #fff;
  width: 40px;
  text-align: center;
  margin-right: 5px;
  border: 1px solid #2196f3;
  padding: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  color: #444;
  transition: box-shadow 400ms ease;
}

input[type="checkbox"] {
  display: none;
}
input[type="checkbox"]:checked + .label {
  background: #2196f3;
  color: #fff;
  border-color: #2196f3;
}
</style>