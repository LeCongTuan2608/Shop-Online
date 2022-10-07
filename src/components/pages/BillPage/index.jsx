import classNames from 'classnames/bind';
import styles from './BillPage.module.scss';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import Bill from 'API/Bill';
import Field from './Field';

const cln = classNames.bind(styles);
BillPage.propTypes = {};

function BillPage(props) {
   const [bills, setBills] = useState();
   const [title, setTitle] = useState('All');
   const token = {
      token: window.localStorage.getItem('token'),
      tokenType: window.localStorage.getItem('tokenType'),
   };
   useEffect(() => {
      const fechAllBill = async () => {
         try {
            const response = await Bill.getAll(token);
            setBills(response.data);
         } catch (error) {
            console.log('error', error);
         }
      };
      fechAllBill();
   }, []);
   const handleClick = async (e) => {
      console.log(e.target.id);
      if (e.target.id === 'delivering') {
         setTitle('Delivering');
         try {
            const response = await Bill.getProcess(token);
            setBills(response.data);
         } catch (error) {
            console.log('error', error);
         }
      } else {
         setTitle('Delivered');
         try {
            const response = await Bill.getSuccess(token);
            setBills(response.data);
         } catch (error) {
            console.log('error', error);
         }
      }
   };
   return (
      <div className={cln('wrapper')}>
         <div className={cln('header')}>
            <DropdownButton
               variant="outline-primary"
               id="dropdown-basic-button"
               title={`${title} (${bills?.result.length})`}>
               <Dropdown.Item id="delivering" onClick={handleClick}>
                  Delivering
               </Dropdown.Item>
               <Dropdown.Item id="delivered" onClick={handleClick}>
                  Delivered
               </Dropdown.Item>
            </DropdownButton>
         </div>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>#</th>
                  <th>Purchaser Name</th>
                  <th>Email</th>
                  <th>Purchase Date</th>
                  <th>Price</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {bills?.result.map((value, index) => {
                  return <Field key={index} bill={value} />;
               })}
               {bills?.result.length === 0 && (
                  <tr style={{ textAlign: 'center' }}>
                     <td colSpan={6}>
                        No orders {title === 'delivering' ? 'delivering' : 'delivered'}!
                     </td>
                  </tr>
               )}
            </tbody>
         </Table>
      </div>
   );
}

export default BillPage;
