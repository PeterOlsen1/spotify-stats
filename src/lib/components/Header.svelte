<script lang="ts">
    import { goto } from "$app/navigation";
    import getUserState, { awaitUserState } from "$lib/state/userState.svelte";
    import { onMount } from "svelte";

    let userState: any = $state(null);
    let userInitialized = $state(false);

    onMount(async () => {
        userState = await awaitUserState();
        userInitialized = true;
        // console.log(userState.userData.images);
    });
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
        font-size: 2rem;
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
    <button onclick={() => console.log(getUserState())}>
        cliock me
    </button>
    <div>
        {#if userInitialized}
            <img src="{userState.userData.images[0]}" alt="user">
        {:else}
            <img src="/blank-user.webp" alt="blank user" style="filter: invert(1);">
        {/if}
    </div>
</header>