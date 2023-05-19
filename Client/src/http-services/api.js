import axios from "axios";

const fetchProductWithId = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_NODE_API}/products/${id}`)
        return response.data.result
    } catch (error) {
        console.log(error.message)
    }
}


export {
    fetchProductWithId
}