import { redirect } from "@sveltejs/kit";
import { CLIENT_ID } from '$env/static/private';

//need to import the CLIENT_ID on the serverside since it is private,
//and we don't want to expose it to the client
export async function GET() {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:5173/home&scope=user-top-read%20user-read-email`;

    return redirect(307, url);
}