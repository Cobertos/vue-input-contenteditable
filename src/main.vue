<template>
    <input-contenteditable v-model="test"
        :placeholder="'asdasd'"/>
</template>

<script>
import InputContentEditable from './input-contenteditable.vue';

export default {
    components: {
        [InputContentEditable.name]: InputContentEditable
    },
    data(){
        return {
            test: 'aaa',
        };
    }
};
</script>