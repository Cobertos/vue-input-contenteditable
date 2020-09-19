<p align="center">
    <a href="https://github.com/Cobertos/vue-input-contenteditable/actions" target="_blank"><img alt="build status" src="https://github.com/Cobertos/vue-input-contenteditable/workflows/Package%20Tests/badge.svg"></a>
    <a href="https://www.npmjs.com/package/vue-input-contenteditable" target="_blank"><img alt="twitter" src="https://img.shields.io/npm/v/vue-input-contenteditable.svg"></a>
    <a href="https://twitter.com/cobertos" target="_blank"><img alt="twitter" src="https://img.shields.io/badge/twitter-%40cobertos-0084b4.svg"></a>
    <a href="https://cobertos.com" target="_blank"><img alt="twitter" src="https://img.shields.io/badge/website-cobertos.com-888888.svg"></a>
    <a href="https://tidelift.com/subscription/pkg/npm-vue-input-contenteditable?utm_source=npm-vue-input-contenteditable&utm_medium=referral&utm_campaign=readme" target="_blank"><img alt="Tidelift - For Enterprise" src="https://img.shields.io/static/v1?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACjSURBVChTrZAxDoJAEEV3oNGCQk6ihYXH8hhehmt4DCoaGwsrE+L4f/LByboQC1/ymM2fmYRdc/chpbSDOSfVq2rkXuHTwG1Bk6Vew8UWboL8gxxmcaatzGyEz0mEDslLEo8zcFT+AXfu4RnyTHnu1V4GQwdVPhzvOGerYKiGF7iXPNdqL4OhDpJpkXRqz/BVc46qka+stPgTf128wUcms0BKbwwmZGRFmSUVAAAAAElFTkSuQmCC&message=For%20Enterprise&color=F6914D&label=%7F"></a>
</p>

# vue-input-contenteditable

<p align="center">
    <img src="https://github.com/Cobertos/vue-input-contenteditable/blob/master/media/vue-input-contenteditable.gif?raw=true">
</p>

Make beautiful inputs without the restrictions of `input[type='text']`. A Vue component wrapper for `contenteditable` with all the features you expect:

 * v-model
 * placeholder
 * maxlength


## Installation

`npm i vue-input-contenteditable`

## Usage

Below is an example of the component in use in a Single File Component. After importing it, make sure to add it to your components property and then it will be available in your template.

```
<template>
    <input-contenteditable
        v-model="myModel"
        _is="p"
        :placeholder="myPlaceHolder"
        :maxlength="25" />
</template>

<script>
import InputContenteditable from 'vue-input-contenteditable';

export default {
    components: {
        'input-contenteditable': InputContenteditable
    },
    data: {
        myModel: '',
        myPlaceholder: 'Type your data here...'
    }
};
</script>
```

This uses the [standard `@vue/cli` export recommendations](https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html). You can import the source `.vue` component directly by importing `vue-input-contenteditable/sfc` or use the component from a script tag with unpkg. 

## For Enterprise

The maintainers of thousands of packages (including me! :3) are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-vue-input-contenteditable?utm_source=npm-vue-input-contenteditable&utm_medium=referral&utm_campaign=readme)
