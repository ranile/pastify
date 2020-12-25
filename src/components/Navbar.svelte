<script>
    import {navigate} from "svelte-routing"
    import {User} from 'sveltefire';
    import {getContext} from "svelte";
    import firebase from "firebase/app";


    export let contentToSave = undefined;
    export let currentPaste = undefined;

    const app = getContext('firebase').getFirebase();
    const db = app.firestore();
    const auth = app.auth()

    const saveOrUpdate = async () => {
        if (currentPaste === undefined) {
            console.log('saving', contentToSave);
            const ref = await db.collection('pastes').add({
                content: contentToSave,
                createdAt: firebase.firestore.Timestamp.now(),
                createdBy: (auth.currentUser && auth.currentUser.uid) || null,
            })
            navigate(`/show/${ref.id}`)
        } else {
            console.log('updating id', currentPaste.id, ' with ', contentToSave);
            await db.collection('pastes').doc(currentPaste.id).update({
                content: contentToSave
            })
            navigate(`/show/${currentPaste.id}`)
        }
    }

    const deletePaste = async () => {
        await db.collection('pastes').doc(currentPaste.id).delete()
        navigate('/')
        console.log(currentPaste, currentPaste.delete)
    }
</script>

<style type="text/scss">
    nav {
        margin: 0.5rem 1em;
        display: flex;
        align-items: center;
        gap: 1em;

        .logo {
            display: flex;
            align-items: center;
            cursor: pointer;

            img {
                width: 2em;
                height: 2em;
                vertical-align: middle;
            }

            h1 {
                margin-left: 0.5rem;
                font-size: 1.6em;
                font-weight: bold;
                vertical-align: middle;
            }
        }

        .buttons {
            display: flex;
            gap: 1rem;
            align-self: center;
        }
    }

    .dropdown {
        position: relative;

        button {
            border: none;

        }

        .dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            background-color: var(--code-background-color);
            min-width: 8em;
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
            z-index: 1;

            button {
                color: var(--text-color);
                text-decoration: none;
                display: block;
                border: none;
                width: 100%;
                padding: 0.5em 0;
                margin: 0.25em 0;
            }

            button:hover {
                background-color: var(--text-color);
                color: var(--background-color);
            }
        }

    }

    /* No idea why i can't nest these but it won't work if i try*/
    .dropdown:hover {
        .dropdown-content {
            display: block;
        }

        button {
            background-color: var(--background-color-secondary);
        }
    }

    .icon {
        font-size: 1.8em !important;
    }

    .icon-container {
        display: flex;
        align-items: center;
        gap: 0.5em;

        :last-child {
            font-size: 1.3em !important;
        }
    }
</style>

<nav class="unselectable">
    <section class="logo" on:click={() => navigate("/")}>
        <img
                class="logo"
                alt="Logo"
                src="/icon.svg"
        />
        <h1 class="title">Pastify</h1>
    </section>

    {#if contentToSave !== undefined}
        <section class="buttons">
            <span title="Save" class="material-icons clickable icon" on:click={saveOrUpdate}>save</span>
        </section>
    {/if}

    <User persist={sessionStorage} let:user={user} let:auth={auth} on:user>
        {#if currentPaste !== undefined && currentPaste.createdBy === user.uid} <!--maybe show buttons buttons but grayed out-->
            {#if contentToSave === undefined}
                <span title="Edit" class="material-icons clickable icon"
                      on:click={() => navigate(`/edit/${currentPaste.id}`)}>create</span>
            {/if}
            <span title="Delete" class="material-icons clickable icon" on:click={deletePaste}>delete</span>
        {/if}

        <div class="dropdown left">
            <button class="icon-container">
                <span class="material-icons icon">person</span>
                <span>{user.displayName}</span>
            </button>
            <div class="dropdown-content">
                <button class="clickable">Modify profile</button>
                <button class="clickable" on:click={() => auth.signOut()}>Logout</button>
            </div>
        </div>

        <div class="buttons left" slot="signed-out">
            <span on:click={() => navigate('/login')} title="Login" class="clickable icon-container">
                <span class="material-icons icon">person</span>
                Login
            </span>

        </div>
    </User>

</nav>
