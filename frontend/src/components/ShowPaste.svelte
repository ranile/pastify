<!--suppress HtmlUnknownTarget -->
<svelte:head>
    <script src='/prism/prism.js'></script>
    <link rel='stylesheet' href='/prism/prism.css'>
</svelte:head>

<script>
    import NavBar from './Navbar.svelte'
    import {onMount} from "svelte";

    let content = ''

    export let id;
    let isHighlighted = false

    onMount(async () => {
        const split = id.split('.')
        const lang = split[1]

        const resp = await fetch(`/api/${split[0]}`)
        const data = await resp.json()

        let config = []
        switch (lang) {
            case 'kt':
            case 'kotlin':
                config = [Prism.languages.kotlin, 'kotlin']
                break;

            case 'py':
            case 'python':
                config = [Prism.languages.python, 'python']
                break;

            case 'ts':
            case 'typescript':
                config = [Prism.languages.typescript, 'typescript']
                break;

            case 'js':
            case 'javascript':
                config = [Prism.languages.javascript, 'javascript']
                break;

            case 'yml':
            case 'yaml':
                config = [Prism.languages.yaml, 'yaml']
                break;

            case 'html':
                config = [Prism.languages.html, 'html']
                break;

            case 'xml':
                config = [Prism.languages.xml, 'xml']
                break;

            case 'java':
                config = [Prism.languages.java, 'java']
                break;

            case 'css':
                config = [Prism.languages.css, 'css']
                break;

            case 'json':
                config = [Prism.languages.json, 'json']
                break;

            case 'sql':
                config = [Prism.languages.sql, 'sql']
                break;
        }
        if (config.length === 2) {
            content = Prism.highlight(data['content'], config[0], config[1])
            isHighlighted = true
        } else {
            content = data['content']
        }
    });

</script>

<style type="text/scss">
    pre {
        padding: 1em;
        background-color: #121212;
        code {
            font-size: 1.2em;
        }
    }
</style>


<main class="show-paste">
    <nav class="navbar">
        <NavBar/>
    </nav>

    <pre><code>
        {#if isHighlighted}
            {@html content}
        {:else}
            {content}
        {/if}
    </code></pre>
</main>
