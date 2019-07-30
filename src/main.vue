<template>
    <input-contenteditable v-model="test" />
</template>

<script>
import InputContentEditable from './input-contenteditable.vue';

export default {
    components: {
        [InputContentEditable.name]: InputContentEditable
    },
    data(){
        return {
            test: 'aaa'
        };
    }
};
</script>