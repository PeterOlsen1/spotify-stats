<script lang="ts">
    import User from "$lib/classes/user";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let user: User | null = $state(null);
    let numArtists = $state(20);
    let loading = $state(true);
    let artistData: any = $state([]);
    let genreData: any = {};

    async function refreshArtists(timeframe: any, numArtists: number) {
        if (!user) {
            console.log("User is not initialized");
            return;
        }

        loading = true;
        artistData = [];
        for await (const artist of user.generateUserTopArtists(timeframe, numArtists)) {
            loading = false;
            artistData = [...artistData, artist];
        }

        constructGenereData();
    }

    function constructGenereData() {
        for (const artist of artistData) {
            for (const g of artist.genres) {
                if (genreData[g]) {
                    genreData[g].push(artist);
                } else {
                    genreData[g] = [artist];
                }
            }
        }
    }

    function sortPopulariuty() {
        artistData.sort((a: any, b: any) => {
            return b.popularity - a.popularity;
        });
    }

    onMount(async () => {
        user = new User();

        artistData = await user.getUserTopArtists("long_term", numArtists);
        constructGenereData();
        loading = false;
        console.log(genreData);
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

<svelte:head>
    <title>Top Artists</title>
</svelte:head>

<main>
    <h1>
        Your top artists
    </h1>
    <div class="buttons">
        <button onclick={() => refreshArtists("long_term", numArtists)}>Last Year</button>
        <button onclick={() => refreshArtists("medium_term", numArtists)}>Last 6 Months</button>
        <button onclick={() => refreshArtists("short_term", numArtists)}>Last 4 Weeks</button>
    </div>
    <!-- <div class="buttons">
        <button onclick={() => sortPopulariuty()}>
            Sort by popularity
        </button>
    </div> -->
    <div class="count">
        <div>Artists: <input type="number" bind:value={numArtists} min="1" max="10" /></div>
    </div>

    <br>
    {#if loading}
        <div class="loader"></div>
    {:else}
        <div class="artist-container">
            {#each artistData as artist, i (artist.id)}
                <div in:fade|global={{ delay: i * 50, duration: 500 }} class="artist">
                    <b style="color: var(--accent)">{i + 1}:</b> 
                    <img src={artist.images.length ? artist.images[0].url: ""} alt="Artist" class="artist-image">
                    <div>
                        {artist.name}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</main>