import Axios from "./caller.service";

let show_profile = () => { 
    return Axios.get('/show/profile')
}

let create_profile = () => {
    return Axios.post('/create/profile')
}

let edit_profile = () => {
    return Axios.put('/edit/profile')
}

export const profile = {
    show_profile,
    create_profile,
    edit_profile
}