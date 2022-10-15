import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ShoppingCart.module.scss';
import Product from '../ShoppingCart/Product';
import img_banPhim from '../../../images/akko.png';
import img_banHoc from '../../../images/Ban-hoc.png';
import PropTypes from 'prop-types';
import { Alert, Button, Container, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';
import { json, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined';
import { useMemo } from 'react';
import Order from './Order';
const cln = classNames.bind(styles);
ShoppingCart.propTypes = {};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function ShoppingCart(props) {
   const [productCart, setProductCart] = useState(
      JSON.parse(window.localStorage.getItem('cartProduct'))?.reverse(),
   );
   const [key, setKey] = useState('cart');
   const inputSelectAll = useRef();
   const [selected, setSelected] = useState([]);
   const [isChecked, setIsChecked] = useState();
   const [showError, setShowError] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();

   const handleSelectAll = (e) => {
      if (e.target.checked) {
         setSelected(JSON.parse(window.localStorage.getItem('cartProduct')));
         setIsChecked(true);
      } else {
         setIsChecked(false);
         setSelected([]);
      }
   };
   const handleDelete = (e) => {
      if (selected.length > 0) {
         const productDelete = productCart.filter(
            (value) => !selected.map((val) => val.productId).includes(value.productId),
         );
         window.localStorage.setItem('cartProduct', JSON.stringify(productDelete));
         setProductCart(productDelete);
         // }
         setSelected([]);
         setIsChecked(false);
      } else {
         setShowError(true);
         setTimeout(() => {
            setShowError(false);
         }, 2500);
      }
   };
   const totalPrice = useMemo(() => {
      if (selected.length > 0) {
         const result = selected?.reduce((sum, product) => {
            return sum + product?.productPrice * product?.productAmount;
         }, 0);
         return result;
      }
      return 0;
   }, [selected]);
   return (
      <>
         {showError && (
            <Alert className={cln('message')} variant="warning">
               Please select the product you want to remove from the cart!!
            </Alert>
         )}
         <div
            className={cln('wrapper')}
            style={{ height: productCart.length > 0 ? 'auto' : '100%' }}>
            <Tabs
               id="controlled-tab-example"
               activeKey={key}
               onSelect={(k) => {
                  setKey(k);
                  if (k === 'cart') {
                     searchParams.delete('q');
                  } else {
                     searchParams.set('q', k);
                  }
                  setSearchParams(searchParams);
               }}
               className="mb-3">
               <Tab eventKey="cart" title="Cart">
                  <div
                     className={cln('container')}
                     style={{
                        height: productCart.length > 0 ? 'auto' : '100%',
                        marginBottom: key === 'cart' ? '50px' : '0',
                     }}>
                     {productCart.length > 0 ? (
                        <div className={cln('content')}>
                           {productCart?.map((value, index) => {
                              return (
                                 <Product
                                    key={index}
                                    value={value}
                                    selected={selected}
                                    setSelected={setSelected}
                                    isChecked={isChecked}
                                 />
                              );
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
                              <input
                                 type="checkbox"
                                 onClick={handleSelectAll}
                                 ref={inputSelectAll}
                              />
                              <Button
                                 onClick={() => {
                                    inputSelectAll.current.click();
                                 }}
                                 variant="outline-dark">
                                 Select all
                              </Button>
                           </div>
                           <Button variant="outline-danger" onClick={handleDelete}>
                              Delete
                           </Button>
                           <span>
                              Total payment ({selected?.length || 0} products):
                              <b> {formatCash(totalPrice)}vnđ</b>
                           </span>
                           <Button style={{ width: '150px' }} variant="warning">
                              Pay
                           </Button>
                        </Nav>
                     </Container>
                  </Navbar>
               </Tab>
               <Tab eventKey="purchaseOrder" title="Purchase order">
                  <div
                     className={cln('container')}
                     style={{ height: productCart.length > 0 ? 'auto' : '100%' }}>
                     {productCart.length > 0 ? (
                        <div className={cln('content')}>
                           {productCart?.map((value, index) => {
                              return <Order key={index} value={value} />;
                           })}
                        </div>
                     ) : (
                        <div className={cln('error')}>
                           <MoodBadOutlinedIcon />
                           <span>You don't have any orders!!</span>
                        </div>
                     )}
                  </div>
               </Tab>
            </Tabs>
         </div>
      </>
   );
}

export default ShoppingCart;
