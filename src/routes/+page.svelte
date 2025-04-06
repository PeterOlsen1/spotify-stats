<script>
    const clientID = import.meta.env.VITE_API_KEY;

    async function login() {
        const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=http://localhost:5173/home&scope=user-top-read%20user-read-email`;
        window.location.href = url;
    }
</script>

<svelte:head>
    <script
    src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
    type="module"
  ></script>
  <link rel="stylesheet" href="/style/index.css">
</svelte:head>

<main class="split-container">
    <div class="left">
        <div class="left-top">
            <button onclick={login}>
                login
            </button>
        </div>
        <div class="left-bottom">

        </div>
        
    </div>

    <div class="right">
        <dotlottie-player
            src="https://lottie.host/9a8d7c98-9c0f-40d1-8ebd-60e0dbe3f95c/M3SCyw299P.lottie"
            background="transparent"
            speed="1"
            style="width: 50vw; height: 60vh"
            loop
            autoplay
        ></dotlottie-player>
    </div>
</main>