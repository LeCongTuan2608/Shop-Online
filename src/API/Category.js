import axiosClient from './axiosClient';

const Category = {
   getAll() {
      const url = `categories/get_all_category`;
      return axiosClient.get(url);
   },
   add(data, token) {
      const url = `categories/add_category`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.post(url, data, config);
   },
   update(data, id, token) {
      const url = `categories/update_category/${id}`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.put(url, data, config);
   },
   search(params) {
      const url = `categories/search_category`;
      return axiosClient.get(url, { params });
   },
};

export default Category;
