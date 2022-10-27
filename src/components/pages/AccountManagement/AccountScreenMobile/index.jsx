import React from 'react';
import PropTypes from 'prop-types';
import styles from './AccountScreenMobile.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import Bill from 'API/Bill';
const cln = classNames.bind(styles);
AccountScreenMobile.propTypes = {};

const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function AccountScreenMobile(props) {
   const { user } = props;
   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <div className={cln('contents')}>
               <div className={cln('item')}>
                  <span className={cln('title')}>Email</span>
                  <span>{user?.email}</span>
               </div>
               <div className={cln('item')}>
                  <span className={cln('title')}>Name</span>
                  <span>{user?.fullName}</span>
               </div>
            </div>
            <div className={cln('contents')}>
               <div className={cln('item')}>
                  <span className={cln('title')}>Name</span>
                  <span>{user?.phone}</span>
               </div>
               <div className={cln('item')}>
                  <span className={cln('title')}>Address</span>
                  <span>{user?.address}</span>
               </div>
            </div>
            <span>
               <b>Purchase Invoice:</b> {user?.purchaseInvoice}
            </span>
         </div>
      </div>
   );
}

export default AccountScreenMobile;
