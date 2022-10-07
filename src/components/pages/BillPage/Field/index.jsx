import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Field.module.scss';
const cln = classNames.bind(styles);
Field.propTypes = {};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function Field(props) {
   const { bill } = props;
   const [active, setActive] = useState(false);
   const handleUpdate = (e) => {
      setActive(!active);
      // call APi and update status bill
   };
   return (
      <tr className={cln('field')}>
         <td>{bill.billId}</td>
         <td>{bill.purchaserName}</td>
         <td>{bill.purchaserEmail}</td>
         <td>{bill.purchaseDate}</td>
         <td>{formatCash(bill.price)}đ</td>
         <td className={cln('status')}>
            {active ? (
               <Button variant="outline-success" onClick={handleUpdate}>
                  Old
               </Button>
            ) : (
               <Button variant="outline-danger" onClick={handleUpdate}>
                  {bill.status}
               </Button>
            )}
         </td>
      </tr>
   );
}

export default Field;
