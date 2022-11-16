import React from 'react';
import PropTypes from 'prop-types';
import styles from './BillScreenMobile.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import Bill from 'API/Bill';
const cln = classNames.bind(styles);
BillScreenMobile.propTypes = {};

const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function BillScreenMobile(props) {
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
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <div className={cln('contents')}>
               <span style={{ fontWeight: '500' }}>{bill?.purchaserName}</span>
               <span style={{ fontWeight: '500' }}>vnđ: {formatCash(bill?.price)}</span>
            </div>
            <div className={cln('contents')}>
               <span>{bill?.purchaserEmail}</span>
               <span style={{ color: 'var(--color-light-black)', fontStyle: 'italic' }}>
                  {bill?.purchaseDate.slice(0, 10)}
               </span>
            </div>
            <div className={cln('container-button')}>
               <span>ID: {bill?.billId}</span>
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
            </div>
         </div>
      </div>
   );
}

export default BillScreenMobile;
