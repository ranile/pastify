<script>
    import Navbar from "./Navbar.svelte";
    import {Doc} from 'sveltefire';

    let contentToSave = '';
    export let id;

</script>

<style type="text/scss">
    main {
        display: flex;
        flex-direction: column;
    }
</style>

<main>
    <Doc path={`pastes/${id}`} let:data={paste} let:ref={ref} on:data={(e) => contentToSave = e.detail.data.content}>
        <Navbar contentToSave="{contentToSave}" currentPaste="{{id: ref.id, ...paste}}"/>

        <!-- Default Slot -->
        <textarea
                class="content-input"
                spellcheck="false"
                bind:value={contentToSave}
        ></textarea>

        <!-- Only shown when loading -->
        <div slot="loading">
            Loading...
        </div>

        <!-- Shown on error or if nothing loads after maxWait time-->
        <div slot="fallback">
            Fuck!! Some shit went down
        </div>
    </Doc>
</main>
