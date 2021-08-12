import axios from 'axios';

const axiosInstance = axios.create({});
class API {
    static async getInfo(pageNo, pageSize) {
        const { data } = await axiosInstance
            .get(`https://api.mercadolibre.com/sites/MLA/search?q=mesa&offset=${pageNo}&limit=${pageSize}`);
        return data; 
    }
}

export default API;