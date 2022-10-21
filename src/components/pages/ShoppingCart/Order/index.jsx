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
   const { value, stt, token } = props;
   const [infoBill, setInfoBill] = useState();
   useEffect(() => {
      const fechInfoBill = async () => {
         try {
            const response = await Bill.getById(value.billId, token);
            setInfoBill(response.data.result[0]);
         } catch (error) {
            console.log('error', error);
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
               <th style={{ width: '200px' }}>Quantity purchased</th>
               <th style={{ width: '65px' }}>ID</th>
               <th style={{ width: '142px' }}>Price</th>
               <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
         </thead>
         <tbody>
            {infoBill?.productResponse?.map((prod, index) => {
               return (
                  <tr key={index}>
                     <td>{prod.product.productName}</td>
                     <td>{infoBill.purchaseDate}</td>
                     <td>{prod.amountPurchased}</td>
                     <td>{prod.product.productId}</td>
                     <td>{formatCash(prod?.product?.productPrice)}</td>
                     <td></td>
                  </tr>
               );
            })}
            <tr>
               <th colSpan={4}>Total</th>
               <th>{formatCash(infoBill?.totalPrice)}</th>
               <td>{infoBill?.status}</td>
            </tr>
         </tbody>
      </Table>
   );
}

export default Order;
