<script>
    import { page } from "$app/state";
    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/Header.svelte";

    let { children } = $props();

    //use derived in place of state here so we update when page does
    let indexPage = $derived(page.url.pathname === "/");
</script>

<main>
    {#if !indexPage} 
        <Header/>
    {/if}

    {@render children()}

    <!-- {#if !indexPage}  -->
        <!-- <Footer></Footer> -->
    <!-- {/if} -->
</main>