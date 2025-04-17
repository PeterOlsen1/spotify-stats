<script lang="ts">
    let { data } = $props();

    //MAYBE DO THIS WITH JUST JS INSTEAD!!!!!!

    function getRandomStyle(index: number) {
		const angle = Math.random() * 360;
		let distance = 3 + Math.random() * 3; // between 5em and 8em
		const duration = 0 + Math.random() * 5; // seconds

		return `
			position: absolute;
            transform: rotate(${angle}deg);
            // left: ${distance}em;
            // top: ${distance}em;
            animation: rotate 20s linear infinite;
        `;

        // transform: rotate(${angle}deg) translate(${distance}em) rotate(-${angle}deg);
        // transform-origin: center;
        // animation: rotate ${duration}s linear infinite;
	}
</script>

<style>
    .gm-entry {
        display: flex;
        justify-content: center;
        position: relative;
    }

    .gm-center {
        background-color: var(--accent);
        height: 6em;
        width: 6em;
        padding: 0em;
        border-radius: 100%;
        display: grid;
        place-items: center;
        text-wrap: wrap;
        position: relative;

        box-shadow: 0px 0px 1em rgba(156, 156, 156, 0.2);
    }

    .gm-artist-image {
        width: 2em;
        height: 2em;
        border-radius: 2em;
        position: absolute;

        animation: rotate-reverse 20s linear infinite;
    }

    .gm-artist {
        position: absolute;
        top: 3em;
        /* animation: rotate 20s linear infinite; */
        width: 12.5em;
        border-radius: 100%;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes rotate-reverse {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
</style>

{#snippet genreMapEntry(key: any)}
    <div class="gm-entry">
        <div class="gm-center">
            {key}
        </div>

        {#each data[key] as artist, i}
            {@const image = artist.images.length ? artist.images[0].url : "/spotify-logo.png"}
            <div class="gm-artist" style={getRandomStyle(i)}>
                <img src={image} alt={artist.name} class="gm-artist-image"/>
            </div>
        {/each}
    </div>
{/snippet}

<div>
    {@render genreMapEntry("classical")}
    <!-- {#each Object.keys(data) as genre}
        {@render genreMapEntry(genre)}
    {/each} -->
</div>