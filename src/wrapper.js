import InputContenteditable from './input-contenteditable.vue';

// Declare install function executed by Vue.use()
export function install (Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('InputContenteditable', InputContenteditable);
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use({
    install
  });
}

export default InputContenteditable;
