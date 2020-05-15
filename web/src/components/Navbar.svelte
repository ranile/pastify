<script>
    import { Router, Link, Route } from "svelte-routing"
</script>

<style type="text/scss">
    nav {
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

<nav>
    <img
            class="logo"
            alt="Logo"
            src="/icon.svg"
    />
    <h1 class="title">Pastify</h1>
</nav>
