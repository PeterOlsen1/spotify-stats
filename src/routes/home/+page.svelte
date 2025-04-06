<script lang="ts">
    import { page } from "$app/state";
    import User from "$lib/functions/userStats";

    const hash = page.url.hash.slice(1);
    const params = new URLSearchParams(hash);

    const token = params.get("access_token") || "";
    const userImpl = new User(token);

    let topTrackData: any = $state([]);
    async function topTracks() {
        topTrackData = await userImpl.getUserTopTracks();
        console.log(topTrackData);
    }
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main>
    you logged in!
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