import axiosClient from './axiosClient';

const Bill = {
   getAll(token) {
      const url = `bills/get_all_bill`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.get(url, config);
   },
   addBill(data, token) {
      const url = `bills/add_bill`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.post(url, data, config);
   },
   getBillUser(params, token) {
      const url = `bills/search_bill?user_email=${params}`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.get(url, config);
   },
   updateStatus(id, token) {
      const url = `bills/update_bill_status/${id}`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.put(url, {}, config);
   },
   getById(id, token) {
      const url = `bills/get_bill/${id}`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.get(url, config);
   },
   getSuccess(token) {
      const url = `bills/get_bill_success`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.get(url, config);
   },
   getProcess(token) {
      const url = `bills/get_bill_process`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.get(url, config);
   },
};

export default Bill;
