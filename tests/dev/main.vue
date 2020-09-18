<template>
  <div class="wrap">
    ajsiod
    <input-contenteditable v-model="test"
      :placeholder="'asdasd'"
      :maxlength="25"/>
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
      test: 'aaa'
    };
  }
};
</script>
