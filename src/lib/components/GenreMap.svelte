<script lang="ts">
    import { onMount } from 'svelte';
    let { data } = $props();

    const intervals: number[] = [];

    // start the animation of an image element
    function startAnimation(e: any): any {
        const ele = e.target;
        const numChildren = ele.parentElement.children.length - 1;
        const radius = '5em';

        //get the angle of the image element and make it a little random
        let angle = 360 / numChildren * (Array.from(ele.parentElement.children).indexOf(ele) - 1);
        angle += Math.random() > 0.5 ? Math.random() * 30 : Math.random() * -30;

        ele.style.transform = `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`;

        intervals.push(setInterval(() => {
            angle += 2;
            ele.style.transform = `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`;
        }, 2000 / 60 * 2));
    }


    const positions: {top: number, left: number}[] = []
    function getPosition() {
        let top = Math.random() * 100;
        let left = Math.random() * 96;
        let goodPosition = false;

        while (!goodPosition) {
            let loopFlag = true;
            for (let pos of positions) {
                if (Math.abs(pos.top - top) < 10 && Math.abs(pos.left - left) < 10) {
                    top = Math.random() * 100;
                    left = Math.random() * 96;
                    loopFlag = false;
                }
            }

            if (loopFlag) {
                goodPosition = true;
            }
        }

        positions.push({top, left});
        return {top, left};
    }

    function getRandomPositionStyle() {
        const {top, left} = getPosition();
        // const top = Math.random() * 80;
        // const left = Math.random() * 80;
        return `position: absolute; top: ${top}vh; left: ${left}vw;`;
    }

    // mount a function to clear intervals on destroy
    onMount(() => {
        return () => {
            intervals.forEach((interval) => {
                clearInterval(interval);
            });
        }
    })
</script>

<style>
    body {
        padding-bottom: 4em;
    }
    .gm-container {
        width: 100%;
        display: flex;
        /* justify-content: space-between; */
        flex-wrap: wrap;
        /* gap: 4em; */
        position: relative;
        /* padding-bottom: 4em; */
    }

    .gm-entry {
        display: flex;
        justify-content: center;
        position: absolute;
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
        text-align: center;

        box-shadow: 0px 0px 1em rgba(156, 156, 156, 0.2);
    }

    .gm-artist-image {
        width: 2em;
        height: 2em;
        border-radius: 2em;
        position: absolute;
        top: 2.5em;

        transition: transform 0.2s linear;
    }
</style>

{#snippet genreMapEntry(key: any)}
    <div class="gm-entry" style="${getRandomPositionStyle()}">
        <div class="gm-center">
            {key}
        </div>

        {#each data[key] as artist, i}
            {@const image = artist.images.length ? artist.images[0].url : "/spotify-logo.png"}
            <img src={image} alt={artist.name} class="gm-artist-image" onload={startAnimation}/>
        {/each}
    </div>
{/snippet}

<!-- {@render genreMapEntry("classical")} -->
<div class="gm-container">
    {#each Object.keys(data) as genre}
        {@render genreMapEntry(genre)}
    {/each}
</div>