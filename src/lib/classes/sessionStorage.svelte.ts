/**
 * A wrapper class for the session storage API
 * since I didn't want to have to type
 * 'window.sessionStorage' every time.
 * 
 * We also have JSON methods now
 */
class SessionStorage {
    private ss: any;

    constructor() {
        this.ss = () => {
            if (typeof window !== "undefined") {
                return window.sessionStorage;
            }
        };
    }

    getJSON(key: string): Object | null {
        const value = this.ss().getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }

    setJSON(key: string, value: Object) {
        this.ss().setItem(key, JSON.stringify(value));
    }

    getItem(key: string): string | null {
        const value = this.ss().getItem(key);
        if (value) {
            return value;
        } else {
            return null;
        }
    }

    setItem(key: string, value: string) {
        this.ss().setItem(key, value);
    }

    async awaitKey(key: string): Promise<string> {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                const value = this.ss().getItem(key);
                if (value) {
                    clearInterval(interval);
                    resolve(value);
                }
            }, 100);
        });
    }
}

export default SessionStorage;