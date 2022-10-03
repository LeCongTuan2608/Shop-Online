import React from 'react';
import classNames from 'classnames/bind';
import styles from './PurchaseHistory.module.scss';
import Product from './Product';
import img_banPhim from '../../../images/akko.png';
import img_banHoc from '../../../images/Ban-hoc.png';
import PropTypes from 'prop-types';

const cln = classNames.bind(styles);
PurchaseHistory.propTypes = {};

function PurchaseHistory(props) {
   const arrProduct = [
      {
         title: 'Bàn phím akko',
         des: 'Bàn phím cơ AKKO 3084B Plus Silent (Bluetooth 5.0 / Wireless 2.4Ghz / Hotswap / Foam tiêu âm / AKKO CS Jelly s',
         image: img_banPhim,
         amount: 2,
         price: 1588000,
         status: 'In transit',
      },
      {
         title: 'Bàn học',
         des: 'Bàn học dành cho trẻ em',
         image: img_banHoc,
         amount: 1,
         price: 3650000,
         status: 'Delivered',
      },
      {
         title: 'Bàn học',
         des: 'Bàn học dành cho trẻ em',
         image: img_banHoc,
         amount: 1,
         price: 3650000,
         status: 'Delivered',
      },
      {
         title: 'Bàn học',
         des: 'Bàn học dành cho trẻ em',
         image: img_banHoc,
         amount: 1,
         price: 3650000,
         status: 'Delivered',
      },
      {
         title: 'Bàn học',
         des: 'Bàn học dành cho trẻ em',
         image: img_banHoc,
         amount: 1,
         price: 3650000,
         status: 'Delivered',
      },
      {
         title: 'Bàn học',
         des: 'Bàn học dành cho trẻ em',
         image: img_banHoc,
         amount: 1,
         price: 3650000,
         status: 'Delivered',
      },
   ];
   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <div className={cln('content')}>
               {arrProduct.map((value, index) => {
                  return <Product key={index} value={value} />;
               })}
            </div>
         </div>
      </div>
   );
}

export default PurchaseHistory;
