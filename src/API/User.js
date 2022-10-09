import axiosClient from './axiosClient';

const User = {
   login(data) {
      const url = 'login';
      return axiosClient.post(url, data);
   },
   register(data) {
      const url = 'users/register';
      return axiosClient.post(url, data);
   },
   update(data) {
      const url = `users/update_user/${data.email}`;
      return axiosClient.put(url, data);
   },
   getByJWT(token) {
      const url = 'users/get_user';
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.get(url, config);
   },
   getAll(token) {
      const url = 'users/get_all_user';
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.get(url, config);
   },
};

export default User;
