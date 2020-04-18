<template>
    <div id="app">
        <NavBar />
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
</style>

<script>
// @ is an alias to /src
import NavBar from '@/components/Navbar.vue'
export default {
    components: {
        NavBar,
    },
}
</script>
