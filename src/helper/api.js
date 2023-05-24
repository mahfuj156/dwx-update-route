import axios from "axios";
const baseUrl = `https://api.desherkhobor24.com/`;

export const login = (user) =>{ 
    return axios.post(baseUrl, user,{
        headers:{
            'Content-Type':'application/json'
        }
    } )
}


 const baseUrld = `https://api.desherkhobor24.com/users`;
export const addUser = (data) =>{ 
    return axios.post(baseUrld, data,{
        mode: "no-cors",
        headers:{
            'Content-Type':'application/json', 
        }
    } )
}

export const api = {
    get: async ({url, header}) => {
      const result = await axios.get(`${baseUrl}/${url}`, header)
      return result;
    },
    post: async ({url, body, header}) => {
      const result = await axios.post(`${baseUrl}/${url}`,body, header)
      return result;
    },
    put: async ({url, body, header}) => {
      const result = await axios.put(`${baseUrl}/${url}`, body, header)
      return result
    },
    delete: async ({url, header}) => {
      const result = await axios.delete(`${baseUrl}/${url}`, header);
      return result;
    },
  };
