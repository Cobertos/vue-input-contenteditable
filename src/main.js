import Vue from 'vue';
import main from './main.vue';

let c = new (Vue.extend(main))();
let e = document.createElement("div");
document.body.appendChild(e);
c.$mount(e);
