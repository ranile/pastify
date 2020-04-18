<template>
    <vue-markdown>{{paste}}</vue-markdown>
</template>

<script>
    import {Paste} from "../models/Paste";
    import VueMarkdown from 'vue-markdown'

    export default {
        name: "ShowPaste",
        data() {
            const paste = JSON.parse(localStorage.getItem('paste'));
            console.log(paste)
            return {paste: paste.content}
        },
        components: {
            VueMarkdown
        }
    }
</script>

<style scoped lang="scss">

</style>