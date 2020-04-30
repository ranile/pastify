<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #d7d7d7;
}

body {
    background: #191919;
}

* {
    padding: 0;
    margin: 0;
    border: none;
}

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

@font-face {
    font-family: 'JetBrainsMono', monospace;
    src: url('assets/fonts/JetBrainsMono-Regular.woff');
}
</style>

<script>
// @ is an alias to /src

export default {}
</script>
