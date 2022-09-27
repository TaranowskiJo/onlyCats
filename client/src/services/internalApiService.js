import axios from 'axios';
//FRONT END

// in route lets you call asynchronus functs
// Normally the url would be saved in a .env or config file that is git ignored
// so it's easy to have a different url for production.
const http = axios.create({
    baseURL: 'http://localhost:8000/api',
});
//exporting these lets you expot a single function from this file
//calling this function bring to route and returns data
export const getAllCats = async () => {
    const res = await http.get('/cats');
    return res.data;
}

export const getCatById = async (id) => {
    const res = await http.get(`/cats/${id}`);
    console.log(id);
    return res.data;
};
export const getCatByCity = async (city) => {
    const res = await http.get(`/cats/city/${city}`);
    // console.log(city);
    return res.data;
};

export const createCat = async (data) => {
    const res = await http.post(`/cats`, data);
    console.log(res)
    return res.data;
};

export const updateCatById = async (id, data) => {
    const res = await http.put(`/cats/${id}`, data);
    return res.data;
};

export const updateCatStatusById = async (id, data) => {
    const res = await http.put(`/cats/status/${id}`, data);
    return res.data;
};

export const deleteCatById = async (id) => {
    const res = await http.delete(`/cats/${id}`);
    return res.data;
};

export const likeCatById = async (id) => {
    const res = await http.put(`/cats/${id}`);
    return res.data;
};
