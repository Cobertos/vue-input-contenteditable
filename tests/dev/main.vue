<template>
  <div class="wrap">
    ajsiod
    <input-contenteditable v-model="test"
      :_is="tag"
      :placeholder="'asdasd'"
      :maxlength="25"/>
    <button
      @click="tag='a'">Test</button>
  </div>
</template>

<script>
import InputContenteditable from '@/input-contenteditable.vue';

export default {
  components: {
    [InputContenteditable.name]: InputContenteditable
  },
  data () {
    return {
      tag: 'p',
      test: 'aaa'
    };
  }
};
</script>
