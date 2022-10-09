import classNames from 'classnames/bind';
import styles from './BillPage.module.scss';
import PropTypes from 'prop-types';
import { Alert, Dropdown, DropdownButton, Spinner, Table } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import Bill from 'API/Bill';
import Field from './Field';
import { useSearchParams } from 'react-router-dom';

const cln = classNames.bind(styles);
BillPage.propTypes = {};

function BillPage(props) {
   const [bills, setBills] = useState();
   const [title, setTitle] = useState('All');
   const [searchParams, setSearchParams] = useSearchParams();
   const [update, setUpdate] = useState(false);
   const [loading, setLoading] = useState(true);
   const [showError, setShowError] = useState(false);
   const [showSucc, setShowSucc] = useState(false);

   const token = {
      token: window.localStorage.getItem('token'),
      tokenType: window.localStorage.getItem('tokenType'),
   };
   useEffect(() => {
      const q = searchParams.get('q');
      const fechAllBill = async () => {
         let response;
         try {
            if (q === 'delivering') {
               response = await Bill.getProcess(token);
            } else if (q === 'delivered') {
               response = await Bill.getSuccess(token);
            } else {
               response = await Bill.getAll(token);
               console.log('response', response);
            }
            setBills(response.data);
         } catch (error) {
            console.log('error', error);
         }
      };
      fechAllBill();
      setLoading(false);
   }, [searchParams, update]);
   const handleClick = async (e) => {
      if (e.target.id === 'delivering') {
         setTitle('Delivering');
         searchParams.set('q', 'delivering');
      } else if (e.target.id === 'delivered') {
         setTitle('Delivered');
         searchParams.set('q', 'delivered');
      } else {
         setTitle('All');
         searchParams.delete('q');
      }
      setSearchParams(searchParams);
   };
   return (
      <div className={cln('wrapper')}>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         {showError && (
            <Alert className={cln('message')} variant="danger">
               An error occurred during the update!!
            </Alert>
         )}
         {showSucc && (
            <Alert className={cln('message')} variant="success">
               Update successful
            </Alert>
         )}
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
               <Dropdown.Item id="all" onClick={handleClick}>
                  All
               </Dropdown.Item>
            </DropdownButton>
         </div>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Purchaser Name</th>
                  <th>Email</th>
                  <th>Purchase Date</th>
                  <th>Price</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {bills?.result.map((value, index) => {
                  return (
                     <Field
                        key={index}
                        bill={value}
                        update={update}
                        setUpdate={setUpdate}
                        setLoading={setLoading}
                        setShowError={setShowError}
                        setShowSucc={setShowSucc}
                     />
                  );
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
