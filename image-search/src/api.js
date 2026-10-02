import axios from "axios";

const KEY = import.meta.env.VITE_UNSPLASH_KEY

export const searchImages = async(term) => {
    //await is a note to javascript saying pls don't cont executing until response promise resolved
    //if you use await u NEED aync up the chain
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        //headers needed for authentication
        headers: {
            Authorization: `Client-ID ${KEY}`
        },
        params: {
            query: term
        }
    })

    // console.log(response.data.results)
    return response.data.results
}