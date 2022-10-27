import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Bill from 'API/Bill';
import { useState } from 'react';

const cln = classNames.bind(styles);
Order.propTypes = {
   value: PropTypes.object,
   isChecked: PropTypes.bool,
};
Order.DefaultProp = {
   value: {},
   isChecked: false,
};
const formatCash = (str) => {
   return str?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function Order(props) {
   const { value, stt, token, setLoading } = props;
   const [infoBill, setInfoBill] = useState();
   useEffect(() => {
      const fechInfoBill = async () => {
         try {
            const response = await Bill.getById(value.billId, token);
            setInfoBill(response.data.result[0]);
            setLoading(false);
         } catch (error) {
            console.log('error', error);
            setLoading(false);
         }
      };
      fechInfoBill();
   }, []);
   return (
      <Table striped bordered hover>
         <thead>
            <tr>
               <th style={{ width: '500px' }}>Name product</th>
               <th style={{ width: '225px' }}>Purchase Date</th>
               <th style={{ width: '200px' }}>Amount</th>
               <th style={{ width: '142px' }}>Price</th>
               <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
         </thead>
         <tbody>
            {infoBill?.productResponse?.map((prod, index) => {
               return (
                  <tr key={index}>
                     <td>
                        <span>{prod.product.productName}</span>
                     </td>
                     <td>
                        <span>{infoBill.purchaseDate}</span>
                     </td>
                     <td>
                        <span>{prod.amountPurchased}</span>
                     </td>
                     <td>
                        <span>{formatCash(prod?.product?.productPrice)}</span>
                     </td>
                  </tr>
               );
            })}
            <tr
               style={{
                  backgroundColor: 'rgb(13 110 253 / 20%)',
               }}>
               <th colSpan={3}>Total</th>
               <th>{formatCash(infoBill?.totalPrice)}</th>
               <td
                  style={{
                     color: infoBill?.status === 'SUCC' ? 'green' : 'red',
                     fontWeight: '500',
                  }}>
                  {infoBill?.status}
               </td>
            </tr>
         </tbody>
      </Table>
   );
}

export default Order;
