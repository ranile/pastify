<script>
    import { Router, Link, Route } from "svelte-routing";
    import Home from "./components/Home.svelte";
    import ShowPaste from "./components/ShowPaste.svelte";

    export let url = "";
</script>

<style type="text/scss">
    :global(body) {
        color: rgb(215, 215, 215);
        background: #0b0b0b;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :global(*) {
        margin: 0;
        padding: 0;
    }

    :global(.navbar) {
        display: flex;

        :global(.buttons) {
            display: flex;
            gap: 1rem;
            align-self: center;
            margin-right: 1rem;
        }

        :global(.separator) {
            flex: 1 1 auto;
        }

        :global(.button) {
            background: transparent;
            /*box-shadow: 0 0 0 1.5pt #226699;*/
            color: #d7d7d7;
            font-size: 1rem;
            border: 3px solid #226699;
            border-radius: 5pt;
            padding: 0.3em 1em 0.3em 1em;
            width: 100%;
            height: 70%;
        }
    }
</style>

<Router url="{url}">
    <div>
        <Route path="/show/:id" component="{ShowPaste}"/>
        <Route path="/">
            <Home/>
        </Route>
    </div>
</Router>
