import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ShoppingCart.module.scss';
import Product from '../ShoppingCart/Product';
import img_banPhim from '../../../images/akko.png';
import img_banHoc from '../../../images/Ban-hoc.png';
import PropTypes from 'prop-types';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { json } from 'react-router-dom';
import { useState } from 'react';
import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined';
import { useMemo } from 'react';
const cln = classNames.bind(styles);
ShoppingCart.propTypes = {};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function ShoppingCart(props) {
   const [productCart, setProductCart] = useState(
      JSON.parse(window.localStorage.getItem('cartProduct'))?.reverse(),
   );
   const totalPrice = useMemo(() => {
      if (productCart) {
         const result = productCart?.reduce((sum, product) => {
            return sum + product?.productPrice;
         }, 0);
         return result;
      }
      return 0;
   }, []);

   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            {productCart ? (
               <div className={cln('content')}>
                  {productCart?.map((value, index) => {
                     return <Product key={index} value={value} />;
                  })}
               </div>
            ) : (
               <div className={cln('error')}>
                  <MoodBadOutlinedIcon />
                  <span>You don't have any orders!!</span>
               </div>
            )}
         </div>
         <Navbar variant="light" className={cln('navbar-bottom')}>
            <Container className={cln('navbar-container')}>
               <Nav className={`me-auto ${cln('container-contents')}`}>
                  <div className={cln('checked-all')}>
                     <input type="checkbox" />
                     <Button variant="outline-dark">Select all</Button>
                  </div>
                  <Button variant="outline-danger">Delete</Button>
                  <span>
                     Total payment ({productCart?.length || 0} products):
                     <b>{formatCash(totalPrice)}vnđ</b>
                  </span>
                  <Button style={{ width: '150px' }} variant="warning">
                     Pay
                  </Button>
               </Nav>
            </Container>
         </Navbar>
      </div>
   );
}

export default ShoppingCart;
