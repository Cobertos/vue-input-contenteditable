<template>
  <p contenteditable
    :placeholder="placeholder"
    @input='onInput'
    ref='contenteditable'

    @keydown="$emit('keydown', $event)"
    @keyup="$emit('keyup', $event)"
    @keypress="$emit('keypress', $event)"></p>
</template>

<script>
export default {
  name: 'input-contenteditable',
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
      valueSetter: ''
    };
  },
  mounted () {
    this.$refs.contenteditable.textContent = this.value;
  },
  watch: {
    value () {
      if (this.value !== this.$refs.contenteditable.innerText) {
        //Will reset cursor position, so only do this when the external component
        //completely changes the value (so not something caused by emitting the input event
        //and the reactivity framework)
        //TODO: Get smarter about this?
        this.$refs.contenteditable.textContent = this.value;
      }
    }
  },
  methods: {
    onInput (e) {
      let text = this.$refs.contenteditable.textContent;

      //enforce a maxlength
      if (this.maxlength !== -1) {
        //I chose this instead of preventDefault on 'keydown', 'paste', 'drop' as if we preventDefault
        //we need to check a bunch of specific valid cases to pass through like backspace, delete
        //Ctrl+A, A Ctrl+V that makes the text shorter, arrow keys, etc. which may be impossible...
        //
        //Instead, retroactively trimming the string after 'input' and setting the cursor properly
        //(as changing the text string will change the cursor in some browsers... :( ) is a better bet
        //IMO. This worked fine on Chrome, FF, iOS, and Android in the original project but may break
        //_somewhere_

        let selection = window.getSelection();
        let { anchorNode, anchorOffset } = selection;
        anchorOffset = Math.min(anchorOffset, this.maxlength); //Make sure it is always in the range
        if (text.length > this.maxlength) {
          //We need to trim it down, so use the last valid text instead of trying to
          //figure out how to slice the current one
          text = this.lastText || text.slice(0,this.maxlength);
          this.$refs.contenteditable.textContent = text; //Will reset the cursor to the front
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

<style scoped="true">
  [contenteditable] {
    cursor: text;
  }

  [contenteditable]:empty:before {
    content: attr(placeholder);
    color: rgba(50,50,50,0.5);
  }
</style>
