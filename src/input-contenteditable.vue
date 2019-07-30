<template>
  <p contenteditable
    :placeholder="placeholder"
    @input='onInput'
    @keydown="$emit('keydown', $event)"
    @keyup="$emit('keyup', $event)"
    @keypress="$emit('keypress', $event)"
    ref="contenteditable"></p>
</template>

<script>
export default {
  name:'input-contenteditable',
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
      lastText: undefined,
      lastOffset: undefined,
      valueSetter: '',
    };
  },
  mounted(){
    this.$refs.contenteditable.innerText = this.value;
  },
  watch:{
    value(){
      if(this.value !== this.$refs.contenteditable.innerText) {
        //Will reset cursor position, so only do this when the external component
        //completely changes the value (so not something caused by emitting the input event
        //and the reactivity framework)
        //TODO: Get smarter about this?
        this.$refs.contenteditable.innerText = this.value;
      }
    }
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
