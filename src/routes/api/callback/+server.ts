import { redirect } from "@sveltejs/kit";
import User from "$lib/classes/user";
import { setUserState } from "$lib/state/userState.svelte";

//callback route for Spotify authentication,
//redirect to /home after instantiating the User class
export async function GET({ url }) {
    console.log(url);

    const hash = url.hash.slice(1);
    const pageParams = new URLSearchParams(hash);

    const token = pageParams.get("access_token") || "";
    if (!token) {
        console.error("No access token found in URL");
    }

    setUserState(new User(token));
    return redirect(308, "/home");
}