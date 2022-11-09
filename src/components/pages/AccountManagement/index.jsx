import classNames from 'classnames/bind';
import { useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import styled from './AccountManagement.module.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import User from 'API/User';
import AccountScreenMobile from './AccountScreenMobile';
import { useMediaQuery } from 'react-responsive';

const cln = classNames.bind(styled);
AccountManagement.propTypes = {};

function AccountManagement(props) {
   const [user, setUser] = useState();
   const [loading, setLoading] = useState(true);
   const isScreen500 = useMediaQuery({ query: '(max-width: 501px)' });

   useEffect(() => {
      const token = {
         token: window.localStorage.getItem('token'),
         tokenType: window.localStorage.getItem('tokenType'),
      };
      const fetchUser = async () => {
         try {
            const response = await User.getAll(token);
            setUser(response.data.result);
            setLoading(false);
         } catch (error) {
            console.log('error', error);
            setLoading(false);
         }
      };
      fetchUser();
   }, []);
   return (
      <>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         <div className={cln('wrapper')}>
            {!isScreen500 ? (
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>PurchaseInvoice</th>
                     </tr>
                  </thead>
                  <tbody>
                     {user?.length > 0 ? (
                        user?.map((value, index) => {
                           return (
                              <tr key={index}>
                                 <td>{index + 1}</td>
                                 <td>{value.email}</td>
                                 <td>{value.fullName}</td>
                                 <td>{value.phone}</td>
                                 <td>{value.address}</td>
                                 <td>{value.purchaseInvoice}</td>
                              </tr>
                           );
                        })
                     ) : (
                        <tr style={{ textAlign: 'center' }}>
                           <td colSpan={6}>No user!!</td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            ) : (
               <div className={cln('container')}>
                  {user?.map((value, index) => {
                     return <AccountScreenMobile user={value} key={index} />;
                  })}
               </div>
            )}
         </div>
      </>
   );
}

export default AccountManagement;
