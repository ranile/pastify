<template>
    <div class="show-paste">
        <nav class="navbar">
            <Navbar />
            <span class="separator"></span>
            <div class="buttons">
                <button class="button" v-on:click="copyAndEdit">
                    Copy and edit
                </button>
            </div>
        </nav>

        <pre>
            <code class="content">{{ paste.content }}</code>
        </pre>
    </div>
</template>

<script>
import { fetchPaste } from '../services/PastesService'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import Navbar from '../components/Navbar'

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
    components: { Navbar },
    data() {
        return {
            paste: null,
        }
    },
    async created() {
        const id = this.$route.params.id
        this.paste = await fetchPaste(id)
        console.log(this.paste)
    },
    methods: {
        copyAndEdit: function() {
            localStorage.setItem('initialContent', this.paste.content)
            this.$router.push('/')
        },
    },
}
</script>

<style lang="scss">
.content {
    padding: 0.5rem;
}
</style>
