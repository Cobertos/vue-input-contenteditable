<template>
  <div class="wrap">
    ajsiod
    <input-contenteditable v-model="test"
      :placeholder="'asdasd'"/>
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
