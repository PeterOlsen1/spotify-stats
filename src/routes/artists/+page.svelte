<script lang="ts">
    import User from "$lib/classes/user";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let user: User | null = $state(null);
    let pages = $state(1);
    let loading = $state(true);
    let artistData: any = $state([]);

    async function refreshArtists(timeframe: any, pages: number) {
        if (!user) {
            console.log("User is not initialized");
            return;
        }

        loading = true;
        artistData = [];
        for await (const artist of user.generateUserTopArtists(timeframe, pages)) {
            loading = false;
            artistData = [...artistData, artist];
        }
        console.log(artistData);
    }

    function sortPopulariuty() {
        artistData.sort((a: any, b: any) => {
            return b.popularity - a.popularity;
        });
    }

    onMount(async () => {
        user = new User();
        console.log(user);

        artistData = await user.getUserTopArtists("long_term", 1);
        loading = false;
        console.log(artistData);
    })
</script>

<style>
    .artist-container {
        width: 90%;
        text-align: left;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 0.25em;
    }

    .artist {
        padding: 0.5em;
        border-radius: 0.5em;
        background-color: var(--background-light);
        color: var(--text);
        display: flex;
        align-items: center;
        gap: 1em;
    }

    .artist-image {
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

    .buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
    }
</style>

<main>
    <h1>
        Your top artists
    </h1>
    <div class="buttons">
        <button onclick={() => refreshArtists("long_term", pages)}>Last Year</button>
        <button onclick={() => refreshArtists("medium_term", pages)}>Last 6 Months</button>
        <button onclick={() => refreshArtists("short_term", pages)}>Last 4 Weeks</button>
    </div>
    <!-- <div class="buttons">
        <button onclick={() => sortPopulariuty()}>
            Sort by popularity
        </button>
    </div> -->
    <div class="count">
        <div>Pages: <input type="number" bind:value={pages} min="1" max="10" /></div>
        <!-- <br> -->
        <small>each "page" is 20 artists, increasing pages increases load time</small>
    </div>

    <br>
    {#if loading}
        <div class="loader"></div>
    {:else}
        <div class="artist-container">
            {#each artistData as artist, i (artist.id)}
                <div in:fade|global={{ delay: i * 50, duration: 500 }} class="artist">
                    <b style="color: var(--accent)">{i + 1}:</b> 
                    <img src={artist.images[0].url} alt="album cover" class="artist-image">
                    <div>
                        {artist.name}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</main>