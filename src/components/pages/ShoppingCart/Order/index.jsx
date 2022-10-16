import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

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
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function Order(props) {
   const { value, stt } = props;
   return (
      <tr>
         <td>{stt}</td>
         <td>{value.purchaserName}</td>
         <td>{value.purchaserEmail}</td>
         <td>{value.purchaseDate}</td>
         <td>{value.billId}</td>
         <td>{value.price}</td>
         <td>{value.status}</td>
      </tr>
   );
}

export default Order;
