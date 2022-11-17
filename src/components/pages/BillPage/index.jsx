import classNames from 'classnames/bind';
import styles from './BillPage.module.scss';
import PropTypes from 'prop-types';
import { Alert, Dropdown, DropdownButton, Spinner, Table } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import Bill from 'API/Bill';
import Field from './Field';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import BillScreenMobile from './BillScreenMobile';

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
   const isScreen500 = useMediaQuery({ query: '(max-width: 501px)' });

   useEffect(() => {
      const q = searchParams.get('q');
      const token = {
         token: window.localStorage.getItem('token'),
         tokenType: window.localStorage.getItem('tokenType'),
      };
      const fetchAllBill = async () => {
         let response;
         setLoading(true);
         try {
            if (q === 'delivering') {
               response = await Bill.getProcess(token);
            } else if (q === 'delivered') {
               response = await Bill.getSuccess(token);
            } else if (q === 'processing') {
               response = await Bill.getAll(token);
            } else {
               response = await Bill.getAll(token);
            }
            if (q === 'processing') {
               const processing = response.data.result.filter((val) => val.status === 'PROCESSING');
               setBills(processing);
            } else {
               setBills(response.data.result.reverse());
            }
            setLoading(false);
         } catch (error) {
            console.log('error', error);
            setLoading(false);
         }
      };
      fetchAllBill();
   }, [searchParams, update]);
   const handleClick = async (e) => {
      if (e.target.id === 'delivering') {
         setTitle('Delivering');
         searchParams.set('q', 'delivering');
      } else if (e.target.id === 'delivered') {
         setTitle('Delivered');
         searchParams.set('q', 'delivered');
      } else if (e.target.id === 'processing') {
         setTitle('Processing');
         searchParams.set('q', 'processing');
      } else {
         setTitle('All');
         searchParams.delete('q');
      }
      setSearchParams(searchParams);
   };
   return (
      <>
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
         <div className={cln('wrapper')}>
            <div className={cln('header')}>
               <DropdownButton
                  variant="outline-primary"
                  id="dropdown-basic-button"
                  title={`${title} (${bills?.length})`}>
                  <Dropdown.Item id="processing" onClick={handleClick}>
                     Processing
                  </Dropdown.Item>
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
            {!isScreen500 ? (
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
                     {bills?.length > 0 ? (
                        bills?.map((value, index) => {
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
                        })
                     ) : (
                        <tr style={{ textAlign: 'center' }}>
                           <td colSpan={6}>No orders {title === 'All' ? undefined : title}!</td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            ) : (
               <div className={cln('container-mobile')}>
                  {bills?.map((value, index) => {
                     return (
                        <BillScreenMobile
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
               </div>
            )}
         </div>
      </>
   );
}

export default BillPage;
