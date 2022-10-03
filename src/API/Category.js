import axiosClient from './axiosClient';

const Category = {
   getAll() {
      const url = `categories/get_all_category`;
      return axiosClient.get(url);
   },
   add(params) {
      const url = `categories/add_category?name=${params}`;
      return axiosClient.post(url);
   },
   update(data) {
      const url = `categories/update_category/${data.id}`;
      return axiosClient.get(url, { data });
   },
   search(params) {
      const url = `categories/search_category?name=${params}`;
      return axiosClient.get(url);
   },
};

export default Category;
