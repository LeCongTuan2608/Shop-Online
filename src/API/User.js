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
   update(data, token) {
      const url = `users/update_user`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.put(url, data, config);
   },
   changePW(data, token) {
      const url = `users/change_password`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.put(url, data, config);
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
