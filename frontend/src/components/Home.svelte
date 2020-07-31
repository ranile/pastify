<script>
    import {navigate} from "svelte-routing";
    import Navbar from "./Navbar.svelte";

    let content = '';

</script>

<style type="text/scss">
    main {
        display: flex;
        flex-direction: column;

        textarea {
            background-color: var(--code-background-color);
            font-family: 'JetBrainsMono', monospace;
            height: 90vh;
            padding: 0.5em 1em;
            border: none;
            color: var(--text-color);
        }

    }
</style>

<main>
    <Navbar contentToSave={content}/>
    <textarea
            spellcheck="false"
            bind:value={content}
    ></textarea>
</main>
