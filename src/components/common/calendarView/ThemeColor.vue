<template>
  <div class="colors">
    <label>
      <input type="radio" name="color" :value="red" checked />
      <span class="swatch" :style="{ 'background-color': red }"></span>
    </label>
    <label>
      <input type="radio" name="color" :value="blue" />
      <span class="swatch" :style="{ 'background-color': blue }"></span>
    </label>
    <label>
      <input type="radio" name="color" :value="yellow" />
      <span class="swatch" :style="{ 'background-color': yellow }"></span>
    </label>
    <label>
      <input type="radio" name="color" :value="green" />
      <span class="swatch" :style="{ 'background-color': green }"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "ThemeColor",
  data() {
    return {
      red: "#ff3e30",
      blue: "#176bef",
      yellow: "#f7b529",
      green: "#179b52",
    };
  },
};
</script>

<style scoped>
.colors label {
  cursor: pointer;
}

.colors input {
  display: none;
}

.colors input[type="radio"]:checked + .swatch {
  box-shadow: inset 0 0 0 2px black;
}

.swatch {
  display: inline-block;
  /* vertical-align: middle; */
  height: 30px;
  width: 30px;
  margin: 0 5px 0 0;
  border: 1px solid #d4d4d4;
  border-radius: 50%;
}
</style>