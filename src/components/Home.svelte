<script>
    import {navigate} from "svelte-routing";
    import Navbar from "./Navbar.svelte";

    let content = '';

</script>

<style type="text/scss">
    main {
        display: flex;
        flex-direction: column;
    }
</style>

<main>
    <Navbar contentToSave={content}/>
    <textarea
            class="content-input"
            spellcheck="false"
            bind:value={content}
    ></textarea>
</main>
