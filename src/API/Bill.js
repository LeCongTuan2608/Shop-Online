import axiosClient from './axiosClient';

const Bill = {
   getAll() {
      const url = `bills/get_all_bill`;
      return axiosClient.get(url);
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
   getSuccess() {
      const url = `bills/get_bill_success`;
      return axiosClient.get(url);
   },
   getProcess() {
      const url = `bills/get_bill_process`;
      return axiosClient.get(url);
   },
};

export default Bill;
