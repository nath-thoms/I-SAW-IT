import axios from 'axios';

const url = "https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data";

export const getAllProducts = () => {
    return axios.get(url)
        .then(res => res.data.products)
}