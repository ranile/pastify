<script>
    import NavBar from './Navbar.svelte'
    import {onMount} from "svelte";

    let content = ''

    export let id;
    onMount(async () => {
        const resp = await fetch(`https://us-central1-pastify-app.cloudfunctions.net/api/${id}`)
        const data = await resp.json()
        content = data['content']
    });

</script>

<main class="show-paste">
    <nav class="navbar">
        <NavBar/>
    </nav>
    <pre><code>{content}</code></pre>
</main>


<style type="text/scss">
    pre {
        padding: 1em;

        code {
            font-size: 1.2em;
        }
    }
</style>
