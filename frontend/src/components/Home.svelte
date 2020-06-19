<script>
    import Navbar from "./Navbar.svelte";
    import { navigate } from "svelte-routing";

    let content = 'content'

    const save = async (content) => {
        const resp = await fetch(' https://us-central1-pastify-app.cloudfunctions.net/api', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: content })
        });

        const json = await resp.json()
        navigate(`/show/${json.id}`, { replace: true })

    }

    const reset = () => {
        content = '';
    }

</script>

<style type="text/scss">
    .home {
        display: flex;
        flex-direction: column;

        .paste-input {
            background-color: #121212;
            font-family: 'JetBrainsMono', monospace;
            color: white;
            height: 90vh;
            padding: 0.5em;
            border: none;
        }

    }
</style>

<main class="home">
    <nav class="navbar">
        <Navbar/>
        <span class="separator"></span>
        <div class="buttons">
            <button class="button" on:click="{save(content)}">Save</button>
            <button class="button" on:click="{reset()}">Reset</button>
        </div>
    </nav>

    <textarea
            class="paste-input"
            spellcheck="false"
            bind:value={content}
    ></textarea>
</main>
