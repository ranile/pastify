<template>
    <div class="nav">
        <img class="logo" alt="Logo" src="../assets/logo.png" />
        <h1 class="title">Pastes</h1>
    </div>
</template>

<style lang="scss">
.nav {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-start;
    height: 5vh;

    .logo {
        width: 3vh;
        height: 3vh;
        align-self: center;
    }

    .title {
        margin-left: 0.5rem;
        font-size: 1.6em;
        align-self: center;
        font-weight: bold;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {}
</script>
