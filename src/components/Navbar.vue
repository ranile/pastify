<template>
    <div class="nav">
        <img
            class="logo"
            alt="Logo"
            src="https://discordapp.com/assets/ebff6c97250daa98236fb09f024cb6a2.svg"
        />
        <h1 class="title">Pastify</h1>
    </div>
</template>

<style lang="scss">
.nav {
    display: flex;
    align-items: center;
    margin: 0.5rem;

    .logo {
        width: 2em;
        height: 2em;
        vertical-align: middle;
    }

    .title {
        margin-left: 0.5rem;
        font-size: 1.6em;
        font-weight: bold;
        vertical-align: middle;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NavBar extends Vue {}
</script>
