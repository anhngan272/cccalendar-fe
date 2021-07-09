import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initialize } from "@/helpers";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import i18n from './lang/i18n.js';

// Ant Design
import { Upload, Row, Col, Divider, Pagination, Tooltip, Popconfirm, Dropdown, Modal, List, Badge, Layout, Button, Input, FormModel, Radio, Select, Switch, Checkbox, DatePicker, Tabs, LocaleProvider, TimePicker, Icon, Form, Calendar, Alert, Card, Spin } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const useArray = [Upload, Row, Col, Divider, Pagination, Tooltip, Popconfirm, Dropdown, Modal, List, Badge, Layout, Button, Input, FormModel, Radio, Select, Switch, Checkbox, DatePicker, Tabs, LocaleProvider, TimePicker, Icon, Form, Calendar, Alert, Card, Spin];
useArray.forEach((item) => {
    Vue.use(item)
})

/* axios-progress-bar */
const config = { showSpinner: false };
loadProgressBar(config);

initialize(store, router);

// Vue.prototype.$message = message;

Vue.config.productionTip = false

const app = new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default app