<script>
    import { goto } from "$app/navigation";
    import getUserState from "$lib/state/userState.svelte";

    const userState = getUserState();
    console.log(userState);
    // const userData = $derived(userState ? userState.userData : null);
    // $inspect(userData);
    
</script>

<style>
    header {
        width: 100%;
        display: flex;
        align-items: center;
        background-color: var(--background-light);
        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    header .title {
        font-family: "Spotify Mix Medium";
        font-size: 2.5rem;
        color: var(--text);
        margin: 0;
        padding-left: 0.5em;
        letter-spacing: 0.001em;
        cursor: pointer;
    }

    header img {
        width: 2.5em;
        height: 2.5em;
        margin-left: 1em;
    }
</style>

<header>
    <img src="/spotify-logo.png" alt="spotify logo">
    <div class="title" onclick={() => goto("/")}>
        statify.
    </div>
    <div style="flex-grow: 1"></div>
    <button onclick={() => console.log(userState)}>
        cliock me
    </button>
    <div>
        <!-- <img src="{userState ? userState.userData.images[0] : '/blank-user.webp'}" alt=""> -->
    </div>
</header>