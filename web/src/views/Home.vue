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

    .navbar {
        display: flex;

        .buttons {
            display: flex;
            gap: 1rem;
            align-self: center;
            margin-right: 1rem;
        }

        .separator {
            flex: 1 1 auto;
        }

        .button {
            background: transparent;
            box-shadow: 0 0 0 1.5pt #226699;
            color: #d7d7d7;
            font-size: 1rem;
            border-radius: 5pt;
            padding: 0.3em 1em 0.3em 1em;
            width: 100%;
            height: 70%;
            :focus {
                outline: orange !important; /*TODO: This doesn't work, fix it*/
            }
        }
    }

    .paste-input {
        background-color: #252525;
        font-family: Monospaced, monospace;
        color: white;
        height: 90vh;
        padding: 0.5em;
    }
}
</style>

<script>
import MarkdownIt from 'markdown-it'
import { createPaste } from '@/services/PastesService'
import NavBar from '@/components/Navbar.vue'

const mdit = MarkdownIt()
function renderMd(text) {
    return mdit.render(text)
}

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'Home',
    data: function() {
        return {
            content: '',
        }
    },
    methods: {
        save: function(paste) {
            createPaste(paste).then(it => {
                this.$router.push({
                    path: `show/${it}`,
                })
            })
        },
        reset: function() {
            this.content = ''
        },
        renderMd,
    },
    components: {
        NavBar,
    },
}
</script>
