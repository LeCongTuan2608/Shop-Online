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
   getByJWT(data) {
      const url = 'users/get_user';
      return axiosClient.get(url, {
         headers: { Authorization: `${data.tokenType} ${data.token}` },
      });
   },
   getAll() {
      const url = 'users/get_all_user';
      return axiosClient.get(url);
   },
};

export default User;
