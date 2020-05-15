<script>
    import NavBar from './Navbar.svelte'
    import {onMount} from "svelte";

    // language=kotlin
    let content = `
    fun main() {
        println("Hello world")
    }
    `

    export let id;
    let data;
    onMount(async () => {
        console.log(id)
        const resp = await fetch(`https://us-central1-pastify-app.cloudfunctions.net/api/${id}`)
        data = await resp.json()
        console.log(data)
        content = data['content']
    });

</script>

<main class="show-paste">
    <nav class="navbar">
        <NavBar/>
        <span class="separator"></span>
        <div class="buttons">
            <button class="button">Copy and edit</button>
        </div>
    </nav>
    <pre><code>{content}</code></pre>
</main>


<style>

</style>
