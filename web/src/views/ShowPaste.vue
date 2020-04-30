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

        <pre class="content"><code>{{paste.content}}</code></pre>
    </div>
</template>

<script>
import { fetchPaste } from '../services/PastesService'
import Navbar from '../components/Navbar'

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
    padding-left: 0.5rem;
    font-family: JetBrainsMono, monospace;
}
</style>
