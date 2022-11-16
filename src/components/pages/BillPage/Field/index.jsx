import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Field.module.scss';
import Bill from 'API/Bill';
const cln = classNames.bind(styles);
Field.propTypes = {
   update: PropTypes.bool,
   setUpdate: PropTypes.func,
};
Field.DefaultProp = {
   update: false,
   setUpdate: null,
};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function Field(props) {
   const { bill, update, setUpdate, setLoading, setShowError, setShowSucc } = props;

   const handleUpdate = async (e) => {
      setLoading(true);
      const token = {
         tokenType: window.localStorage.getItem('tokenType'),
         token: window.localStorage.getItem('token'),
      };
      try {
         await Bill.updateStatus(bill.billId, token);
         setUpdate(!update);
         setShowSucc(true);
         setTimeout(() => {
            setShowSucc(false);
         }, 2500);
      } catch (error) {
         console.log('error', error);
         setLoading(false);
         setShowError(true);
         setTimeout(() => {
            setShowError(false);
         }, 2500);
      }
   };
   return (
      <tr className={cln('field')}>
         <td>{bill?.billId}</td>
         <td>{bill?.purchaserName}</td>
         <td>{bill?.purchaserEmail}</td>
         <td>{bill?.purchaseDate.slice(0, 10)}</td>
         <td>{formatCash(bill?.price)}đ</td>
         <td className={cln('status')}>
            {bill?.status === 'PROCESSING' ? (
               <Button variant="outline-primary" onClick={handleUpdate}>
                  Processing
               </Button>
            ) : bill?.status === 'SUCC' ? (
               <Button variant="outline-success" onClick={handleUpdate}>
                  Delivered
               </Button>
            ) : (
               <Button variant="outline-danger" onClick={handleUpdate}>
                  Delivering
               </Button>
            )}
         </td>
      </tr>
   );
}

export default Field;
