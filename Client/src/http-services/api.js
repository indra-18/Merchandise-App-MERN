import axios from "axios";

const fetchProductWithId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/products/${id}`)
        return response.data.result
    } catch (error) {
        console.log(error.message)
    }
}


export {
    fetchProductWithId
}