<script lang="ts">
    import User from "$lib/classes/user";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let user: User | null = $state(null);
    let tracks = $state(1);
    let loading = $state(true);
    let trackData: any = $state([]);

    async function refreshTracks(timeframe: any, tracks: number) {
        if (!user) {
            console.log("User is not initialized");
            return;
        }

        loading = true;
        trackData = [];
        for await (const track of user.generateUserTopTracks(timeframe, tracks)) {
            loading = false;
            trackData = [...trackData, track];
        }
    }

    onMount(async () => {
        user = new User();
        console.log(user);

        trackData = await user.getUserTopTracks("long_term", 1);
        loading = false;
        console.log(trackData);
    })
</script>

<style>
    .track-container {
        width: 90%;
        text-align: left;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 0.25em;
    }

    .track {
        padding: 0.5em;
        border-radius: 0.5em;
        background-color: var(--background-light);
        color: var(--text);
        display: flex;
        align-items: center;
        gap: 1em;
    }

    .track-image {
        width: 2.5em;
        height: 2.5em;
        border-radius: 0.5em;
    }

    .count {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 0.3em;
        small {
            font-size: 0.8em;
        }
    }

    input[type="number"] {
        width: 3em;
        padding: 0.2em;
        border-radius: 0.5em;
        border: none;
        background-color: var(--background-light);
        color: var(--text);
    }
</style>

<svelte:head>
    <title>Top Tracks</title>
</svelte:head>

<main>
    <h1>
        Your top tracks
    </h1>
    <div class="buttons">
        <button onclick={() => refreshTracks("long_term", tracks)}>Last Year</button>
        <button onclick={() => refreshTracks("medium_term", tracks)}>Last 6 Months</button>
        <button onclick={() => refreshTracks("short_term", tracks)}>Last 4 Weeks</button>
    </div>
    <div class="count">
        <div>tracks: <input type="number" bind:value={tracks} min="1" max="10" /></div>
        <small>each "page" is 20 tracks, increasing pages increases load time</small>
    </div>

    <br>
    {#if loading}
        <div class="loader"></div>
    {:else}
        <div class="track-container">
            {#each trackData as track, i (track.id)}
                <div in:fade|global={{ delay: i * 50, duration: 500 }} class="track">
                    <b style="color: var(--accent)">{i + 1}:</b> 
                    <img src={track.album.images[0].url} alt="album cover" class="track-image">
                    <div>
                        {track.name} - {track.artists.map((artist: any) => " " + artist.name)}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</main>