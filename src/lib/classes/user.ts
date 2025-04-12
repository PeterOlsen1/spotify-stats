import SessionStorage from "./sessionStorage.svelte";

class User {
    accessToken = "";
    userData: any = null;
    ss: SessionStorage;

    constructor(accessToken?: string) {
        this.ss = new SessionStorage();
        console.log(accessToken);

        //caller didn't pass in access token, likely in session storage
        if (!accessToken) {
            if (this.ss.getItem("accessToken")) {
                this.accessToken = this.ss.getItem("accessToken") ?? "";
                if (!this.ss.getJSON("userData")) {
                    //user data is not in session storage, so we need to fetch it
                    this.getUserProfile();
                }
                else {
                    this.userData = this.ss.getJSON("userData");
                }
                return;
            }

            //token was not in session storage. (not good?)
            //if this happens, we probably know of it, and we should use
            //awaitUserState() to make sure the token is set
            return;
        }
        else {
            //put the access token in session storage
            window.sessionStorage.setItem("accessToken", accessToken ?? "");
            this.accessToken = accessToken ?? "";
        }

        console.log(this.ss.getItem("accessToken"));

        //load user data asynchronously
        //workaround to avoid using async/await in the constructor
        (async () => {
            this.userData = await this.getUserProfile();
            console.log(this.userData);
        })();
    }

    /**
     * Ensure that the user state is set by polling
     * session storage for the access token. We really
     * only need to use this when the user is not initialized
     * (the header before the home page executes) 
     * 
     * @returns Promise<null>
     */
    async awaitUserState() {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                const token = this.ss.getItem("accessToken");
                if (token) {
                    this.accessToken = token;
                    this.userData = this.ss.getJSON("userData");
                    clearInterval(interval);
                    resolve(this);
                }
            }, 100)
        })
    }

    /**
     * Returns the user data according to the /me route.
     * 
     * Data will be stored in the _this.userData_ property.
     * 
     * @returns Promise<Object>
     */
    async getUserProfile() {
        //check session storage for user data (naive cache)
        const sessionStorageData = this.ss.getJSON("userData");
        if (sessionStorageData) {
            this.userData = sessionStorageData;
            return this.userData;
        }

        //data is not in session storage. fetch it and set the storage
        const url = "https://api.spotify.com/v1/me";
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };

        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);

        this.ss.setJSON("userData", data);
        this.userData = data;
        return data;
    }

    async getUserTopTracks(timeframe: "short_term" | "medium_term" | "long_term" = "medium_term", pages: number = 1) {
        let url = "https://api.spotify.com/v1/me/top/tracks?time_range=" + timeframe;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };

        let items = [];
        for (let i = 0; i < pages; i++) {
            const result = await fetch(url, options);
            const data = await result.json();
            for (let item of data.items) {
                items.push(item);
            }
            url = data.next;

            if (!url) {
                break;
            }
        }

        return items;
    }

    /**
     * A generator function version of getUserTopTracks.
     * 
     * This is much more friendly for using multiple pages,
     * since we don't need to wait for all pages to finish fetching
     * before we can use the data
     */
    async *generateUserTopTracks(timeframe: "short_term" | "medium_term" | "long_term" = "medium_term", pages: number = 1) {
        let url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeframe}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            }
        };

        for (let i = 0; i < pages; i++) {
            const result = await fetch(url, options);
            const data = await result.json();

            for (let item of data.items) {
                yield item;
            }

            url = data.next;
            if (!url) break;
        }
    }

    async getUserTopArtists(timeframe: "short_term" | "medium_term" | "long_term" = "medium_term", pages: number = 1) {
        let url = "https://api.spotify.com/v1/me/top/artists?time_range=" + timeframe;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
        let items = [];
        for (let i = 0; i < pages; i++) {
            const result = await fetch(url, options);
            const data = await result.json();
            for (let item of data.items) {
                items.push(item);
            }
            url = data.next;
            if (!url) {
                break;
            }
        }

        return items;
    }

    /**
     * A generator function version of getUserTopArtists.
     * 
     * This is much more friendly for using multiple pages,
     * since we don't need to wait for all pages to finish fetching
     * before we can use the data
     */
    async *generateUserTopArtists(timeframe: "short_term" | "medium_term" | "long_term" = "medium_term", pages: number = 1) {
        let url = `https://api.spotify.com/v1/me/top/artists?time_range=${timeframe}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            }
        };

        for (let i = 0; i < pages; i++) {
            const result = await fetch(url, options);
            const data = await result.json();

            for (let item of data.items) {
                yield item;
            }

            url = data.next;
            if (!url) break;
        }
    }

    async getUserPlaylists() {
        let url = "https://api.spotify.com/v1/me/playlists";
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };

        let items = [];
        for (let i = 0; i < 1; i++) {
            const result = await fetch(url, options);
            const data = await result.json();
            for (let item of data.items) {
                items.push(item);
            }
            url = data.next;

            if (!url) {
                break;
            }
        }

        console.log(items);
        return items;
    }
}

export default User;