<template>
    <div>
        <span v-if="!loading" v-html="renderMd(paste.content)"></span>
    </div>
</template>

<script>
import { fetchPaste } from '../services/PastesService'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

function renderMd(text) {
    return MarkdownIt({
        highlight: function(str, lang) {
            if (lang) {
                try {
                    return hljs.highlight(lang, str).value
                } catch (e) {
                    console.log(e)
                }
            }
            return '' // use external default escaping
        },
    }).render(text)
}

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
    methods: {
        renderMd,
    },
}
</script>

<style scoped lang="scss"></style>
