<script>
    async function login() {
        window.location.href = '/api/login';
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
        <div>
            <div class="title">
                <span style="position: relative; z-index: 4">Statify.</span>
            </div>
            <div class="subtitle">
                your Spotify stats, reimagined.
            </div> 
        </div>
        <div class="left-bottom">
            <div onclick={login} class="login-button">
                login with Spotify
            </div>
        </div>
    </div>

    <div class="right">
        <dotlottie-player
            src="https://lottie.host/9a8d7c98-9c0f-40d1-8ebd-60e0dbe3f95c/M3SCyw299P.lottie"
            background="transparent"
            speed="1"
            style="width: auto; height: 60vh"
            loop
            autoplay
        ></dotlottie-player>
    </div>
</main>