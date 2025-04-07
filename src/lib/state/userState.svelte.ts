import User from "$lib/classes/user";

let userState: User | null = $state(null);

export let setUserState = (user: User) => {
    userState = user;
    return userState;
}

export let getUserState = () => {
    return userState;
}

export default getUserState;