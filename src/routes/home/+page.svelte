<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import { page } from "$app/state";
    import User from "$lib/classes/user";
    import getUserState, { setUserState } from "$lib/state/userState.svelte";

    const hash = page.url.hash.slice(1);
    const params = new URLSearchParams(hash);

    const token = params.get("access_token") || "";
    if (!token) {
        console.error("No access token found in URL");
    }
    const userState =  getUserState() ?? setUserState(new User(token));

    let topTrackData: any = $state([]);
    async function topTracks() {
        if (!userState) {
            console.error("User state is not initialized");
            return;
        }

        topTrackData = await userState.getUserTopTracks();
        console.log(topTrackData);
    }

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
        <div class="card">
            <div class="card-title">Top Tracks</div>
            <p>Get your top tracks of all time</p>
        </div>
        <div class="card">
            <div class="card-title">Top Artists</div>
            <p>Get your top artists of all time</p>
        </div>
        <div class="card">
            <div class="card-title">Top Genres</div>
            <p>Get your top genres of all time</p>
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