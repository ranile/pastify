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
            src="https://canary.discordapp.com/assets/7f56a6932ada40d5b3562468de2b0cde.svg"
    />
    <h1 class="title">Pastify</h1>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/xyz"><span class="name">
            SHow
        </span></Link>
    </nav>
</nav>
