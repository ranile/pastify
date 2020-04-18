<template>
    <div>
        <vue-markdown v-if="!loading">{{ paste.content }}</vue-markdown>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { fetchPaste } from '../services/PastesService'

export default {
    name: 'ShowPaste',
    data() {
        return {
            loading: true,
            paste: null,
        }
    },
    async created() {
        const id = this.$route.params.id
        this.paste = await fetchPaste(id)
        console.log(this.paste)
        this.loading = false
    },
    components: {
        VueMarkdown,
    },
}
</script>

<style scoped lang="scss"></style>
