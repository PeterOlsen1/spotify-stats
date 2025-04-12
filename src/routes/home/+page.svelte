<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import User from "$lib/classes/user";
    import { onMount } from "svelte";

    let userState: User;

    const hash = page.url.hash.slice(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token") || "";

    // state / function for top tracks
    let topTrackData: any = $state([]);
    async function topTracks() {
        if (!userState) {
            console.error("User state is not initialized");
            return;
        }

        topTrackData = await userState.getUserPlaylists();
    }

    onMount(() => {
        //need to set the user state here (should be the only time)
        userState = new User(token);
    })
</script>

<svelte:head>
    <title>Home</title>
    <link rel="stylesheet" href="/style/home.css">
</svelte:head>

<main>
    <h1 style="margin-bottom: 0">Welcome to Statify</h1>
    <p>explore any of the buttons below to get started</p>
    <br>
    <div class="body">
        <div class="card" onclick={() => goto("/tracks")}>
            <div class="card-title">Top Tracks</div>
            <p>Get your top tracks of all time</p>
        </div>
        <div class="card" onclick={() => goto("/artists")}>
            <div class="card-title">Top Artists</div>
            <p>Get your top artists of all time</p>
        </div>
    </div>

    <button onclick={topTracks}>
        click here to get your data
    </button>

    <br>
    {#each topTrackData as track, i}
        <div>
            <b style="color: var(--accent-color)">{i + 1}:</b> {track.name} - {track.artists.map((artist: any) => artist.name + ", ")}
        </div>
    {/each}
</main>