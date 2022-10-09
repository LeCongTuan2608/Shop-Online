import axiosClient from './axiosClient';

const Product_API = {
   add(data, token) {
      const url = 'products/add_product';
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.post(url, data, config);
   },
   delete(idProduct, token) {
      const url = `products/delete_product/${idProduct}`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.delete(url, config);
   },
   update(data, id, token) {
      const url = `products/update_product/${id}`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.put(url, data, config);
   },
   getById(idProduct) {
      const url = `products/get_product/${idProduct}`;
      return axiosClient.get(url);
   },
   getAll() {
      const url = 'products/get_all_product';
      return axiosClient.get(url);
   },
   search(params) {
      const url = `products/search_product`;
      return axiosClient.get(url, { params });
   },
   getByCategory(idCategory) {
      const url = `products/get_product_by_category/${idCategory}`;
      return axiosClient.get(url);
   },
   getNew() {
      const url = `products/get_product_new`;
      return axiosClient.get(url);
   },
   getHot() {
      const url = `products/get_product_hot`;
      return axiosClient.get(url);
   },
};

export default Product_API;
