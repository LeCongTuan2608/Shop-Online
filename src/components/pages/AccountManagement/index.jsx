import classNames from 'classnames/bind';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import styled from './AccountManagement.module.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import User from 'API/User';

const cln = classNames.bind(styled);
AccountManagement.propTypes = {};

function AccountManagement(props) {
   const [user, setUser] = useState();
   useEffect(() => {
      const token = {
         token: window.localStorage.getItem('token'),
         tokenType: window.localStorage.getItem('tokenType'),
      };
      const fechUser = async () => {
         try {
            const response = await User.getAll(token);
            console.log('response', response);
            setUser(response.data.result);
         } catch (error) {
            console.log('error', error);
         }
      };
      fechUser();
   }, []);
   return (
      <div className={cln('wrapper')}>
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
               {user?.map((value, index) => {
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
               })}
            </tbody>
         </Table>
      </div>
   );
}

export default AccountManagement;
