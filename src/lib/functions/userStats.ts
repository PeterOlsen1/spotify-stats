class User {
    accessToken = "";

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    async getUserProfile() {
        const url = "https://api.spotify.com/v1/me";
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    }

    async getUserTopTracks() {
        let url = "https://api.spotify.com/v1/me/top/tracks";
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

        return items;
    }
}

export default User;