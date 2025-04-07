import User from "$lib/classes/user";

let userState: { user: User | null} = $state({
    user: null
});

export let setUserState = (user: User): User => {
    userState.user = user;
    return userState.user;
}

export let getUserState = (): User | null => {
    return userState.user;
}

//get user state but we need to wait for it to be set
export let awaitUserState = async (): Promise<User | null> => {
    if (userState.user) {
        return userState.user;
    }

    // wait for the user state to be set
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (userState.user) {
                console.log("Returning user state");
                clearInterval(interval);
                resolve(userState.user);
            }
        }, 100);
    });
}

export default getUserState;