import axiosClient from './axiosClient';

const Bill = {
   getAll(token) {
      const url = `bills/get_all_bill`;
      const config = {
         headers: { Authorization: `${token.tokenType} ${token.token}` },
      };
      return axiosClient.get(url, config);
   },
   addBill() {
      const url = `bills/add_bill`;
      return axiosClient.post(url);
   },
   updateStatus(idBill) {
      const url = `bills/update_bill_status/${idBill}`;
      return axiosClient.post(url);
   },
   getById(idBill) {
      const url = `bills/get_bill/${idBill}`;
      return axiosClient.post(url);
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
