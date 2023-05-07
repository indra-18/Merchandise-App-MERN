import axios from 'axios'

const getAllProducts = async() => {
    axios.get('http://localhost:8080')
    .then(res => console.log(res.data))
}

getAllProducts()