<script lang="ts">
    import { goto } from "$app/navigation";
    import User from "$lib/classes/user";
    import { onMount } from "svelte";

    let user: any = $state(null);
    let userInitialized = $state(false);

    onMount(async () => {
        user = new User();
        await user.awaitUserState();
        userInitialized = true;
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

    .user-image {
        width: 2.5em;
        height: 2.5em;
        border-radius: 50%;
        margin-right: 1em;
    }

    .image-container {
        align-items: center;
        display: flex;
        justify-content: center;
    }
</style>

<header>
    <img src="/spotify-logo.png" alt="spotify logo">
    <div class="title" onclick={() => goto("/home")}>
        statify.
    </div>
    <div style="flex-grow: 1"></div>
    <div class="image-container">
        {#if userInitialized}
            <img src="{user.userData.images[0].url}" alt="user" class="user-image">
        {:else}
            <img src="/blank-user.webp" alt="blank user" style="filter: invert(1);">
        {/if}
    </div>
</header>