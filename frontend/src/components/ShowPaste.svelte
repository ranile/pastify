<script>
    import {Doc} from 'sveltefire';
    import {navigate} from 'svelte-routing'

    import hljs from 'highlight.js/lib/core';
    import javascript from 'highlight.js/lib/languages/javascript';
    import kotlin from 'highlight.js/lib/languages/kotlin';
    import python from 'highlight.js/lib/languages/python';
    import rust from 'highlight.js/lib/languages/rust';
    import java from 'highlight.js/lib/languages/java';
    import json from 'highlight.js/lib/languages/json';
    import yaml from 'highlight.js/lib/languages/yaml';
    import markdown from 'highlight.js/lib/languages/markdown';
    import htmlbars from 'highlight.js/lib/languages/htmlbars';
    import css from 'highlight.js/lib/languages/css';
    import scss from 'highlight.js/lib/languages/scss';
    import typescript from 'highlight.js/lib/languages/typescript';
    import sql from 'highlight.js/lib/languages/sql';

    // import 'highlight.js/styles/atom-one-dark-reasonable.css';
    import 'highlight.js/styles/ir-black.css';
    import Navbar from "./Navbar.svelte";
    // import 'highlight.js/styles/github.css';

    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('kotlin', kotlin);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('yaml', yaml);
    hljs.registerLanguage('markdown', markdown);
    hljs.registerLanguage('sql', sql);
    hljs.registerLanguage('htmlbars', htmlbars);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('scss', scss);
    hljs.registerLanguage('typescript', typescript);

    export let id;
    export let location;
    let line = location.href.split('#L')[1]
    let selectedLine = line && parseInt(line)
    console.log('selected', line, selectedLine)

    const formatIndex = (index, total) => {
        let amountToAppend = total - index.toString().length;
        console.log(amountToAppend)
        return '&nbsp;'.repeat(amountToAppend) + index.toString()
    }

    const highlight = (code) => {
        const hl = hljs.highlightAuto(code)
        console.log(hl)
        const html = hl.value
        const split = html.split('\n')
        const total = split.length.toString().length

        return split.map((line, index) => {
            return {total, line, index}
        })
    }

    const selectLine = (lineNumber) => {
        selectedLine = parseInt(lineNumber)
        navigate(`/show/${id}#L${selectedLine}`)
    }
</script>

<style type="text/scss">

    pre {
        padding: 1em;
        background-color: #121212;
        overflow-y: auto;

        code {
            font-family: 'JetBrainsMono', monospace;

            span {
                padding-right: 0.5em;
            }
        }
    }

    .selected-line {
        background-color: #4D3B24;
    }
</style>


<main class="show-paste">
    <Doc path={`pastes/${id}`} let:data={paste} let:ref={ref}>
        <Navbar currentPaste="{{id: ref.id, ...paste}}"/>

        <!-- Default Slot -->
        <pre>
            {#each highlight(paste.content) as data}
                <code class="{selectedLine === data.index + 1 ? 'selected-line' : ''}"><span class="unselectable clickable" on:click={() => selectLine(data.index + 1)}>{@html formatIndex(data.index + 1, data.total)} </span>{@html data.line}<br/></code>
            {/each}
        </pre>

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
