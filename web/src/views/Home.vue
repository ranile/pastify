<!--suppress HtmlFormInputWithoutLabel -->
<template>
    <div class="home">
        <nav class="navbar">
            <NavBar />
            <span class="separator"></span>
            <div class="buttons">
                <button class="button" v-on:click="save(content)">Save</button>
                <button class="button" v-on:click="reset">Reset</button>
            </div>
        </nav>

        <textarea
            class="paste-input"
            v-model="content"
            spellcheck="false"
        ></textarea>
    </div>
</template>

<style lang="scss">
.home {
    display: flex;
    flex-direction: column;

    .paste-input {
        background-color: #252525;
        font-family: 'JetBrainsMono', monospace;
        color: white;
        height: 90vh;
        padding: 0.5em;
    }
}
</style>

<script>
import { createPaste } from '@/services/PastesService'
import NavBar from '@/components/Navbar.vue'

const INITIAL_DATA_KEY = 'initialContent'

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'Home',
    data: function() {
        const initialData = localStorage.getItem(INITIAL_DATA_KEY)
        return {
            content: initialData ? initialData : '',
        }
    },
    methods: {
        save: function(paste) {
            createPaste(paste).then(it => {
                this.$router.push({
                    path: `show/${it}`,
                })
                localStorage.removeItem(INITIAL_DATA_KEY)
            })
        },
        reset: function() {
            this.content = ''
            localStorage.removeItem(INITIAL_DATA_KEY)
        },
    },
    components: {
        NavBar,
    },
}
</script>
