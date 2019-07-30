<template>
  <p contenteditable
    :placeholder="placeholder"
    @input='onInput'
    @keydown="$emit('keydown', $event)"
    @keyup="$emit('keyup', $event)"
    @keypress="$emit('keypress', $event)"
    ref="contenteditable"
    v-text="value"></p>
</template>

<script>
export default {
  props: {
    placeholder: String,
    value: String,
    maxlength: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      lastValue: undefined,
      lastOffset: undefined
    };
  },
  methods: {
    onInput (e) {
      let text = this.$refs.contenteditable.innerText;

      //enforce a maxlength
      if (this.maxlength !== -1) {
        let selection = window.getSelection();
        let { anchorNode, anchorOffset } = selection;
        anchorOffset = Math.min(anchorOffset, this.maxlength); //Make sure it is always in the range
        if (text.length > this.maxlength) {
          //We need to trim it down, so use the last valid text instead of trying to
          //figure out how to slice the current one
          text = this.lastText || text.slice(0,this.maxlength);
          this.$refs.contenteditable.innerText = text; //Will reset the cursor to the front
          selection.collapse(anchorNode, this.lastOffset); //Use the last valid offset too
          return;
        }
        this.lastText = text;
        this.lastOffset = anchorOffset;
      }

      this.$emit('input', text);
    }
  }
};
</script>

<style>

</style>
