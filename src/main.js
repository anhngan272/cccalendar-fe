import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initialize } from "@/helpers";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import i18n from './lang/i18n.js'

// Ant Design
import { Pagination,Tooltip,Popconfirm, Dropdown, Modal, List, Badge, Layout, Button, Input, FormModel, Radio, Select, Switch, Checkbox, DatePicker, Tabs, LocaleProvider, TimePicker, Icon, Form, Calendar, Alert, Card } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(FormModel);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(DatePicker);
Vue.use(Tabs);
Vue.use(LocaleProvider)
Vue.use(TimePicker)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Calendar)
Vue.use(Alert)
Vue.use(Card)
Vue.use(Layout)
Vue.use(Badge)
Vue.use(List)
Vue.use(Modal)
Vue.use(Dropdown)
Vue.use(Popconfirm)
Vue.use(Tooltip)
Vue.use(Pagination)

/* axios-progress-bar */
const config = { showSpinner: false };
loadProgressBar(config);

initialize(store, router);

Vue.config.productionTip = false

const app = new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default app