<!--suppress HtmlFormInputWithoutLabel -->
<template>
    <div class="home">
        <!--    <span>{{paste.author}}</span>-->
        <textarea class="paste-input" v-model="content"></textarea>
        <div class="preview">
            <h3 class="preview-title">Preview:</h3>
            <vue-markdown :source="content"></vue-markdown>
        </div>

        <div class="buttons">
            <button class="button" v-on:click="save(content)">Save</button>
            <button class="button">Reset</button>
        </div>
    </div>
</template>

<style lang="scss">
.home {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;

    .paste-input {
        background-color: #252525;
        font-family: Monospaced, monospace;
        color: white;
        height: 50vh;
    }

    .preview {
        padding: 0.5em;
        margin-top: 0.5em;
    }

    .separator {
        flex: 1 1 auto;
    }

    .buttons {
        display: flex;
        gap: 0.5rem;
        font-size: 1.5em;
        align-self: flex-end;
    }

    .button {
        background: #00000e;
        border-radius: 10pt;

        :focus {
            outline: orange !important; /*TODO: This doesn't work, fix it*/
        }
    }
}
</style>

<script>
import VueMarkdown from 'vue-markdown'
import { createPaste } from '@/services/PastesService'

function save(paste) {
    console.log(paste)
    localStorage.setItem('paste', JSON.stringify(paste))
    createPaste(paste).then(it => console.log(it))
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
        save: save,
    },
    components: {
        VueMarkdown,
    },
}
</script>
