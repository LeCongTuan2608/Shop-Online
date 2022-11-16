import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined';
import Bill from 'API/Bill';
import classNames from 'classnames/bind';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
   Alert,
   Button,
   Container,
   Modal,
   Nav,
   Navbar,
   Spinner,
   Tab,
   Table,
   Tabs,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Product from '../ShoppingCart/Product';
import ModalPayment from './ModalPayment';
import Order from './Order';
import styles from './ShoppingCart.module.scss';
const cln = classNames.bind(styles);
ShoppingCart.propTypes = {};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function ShoppingCart(props) {
   const [productCart, setProductCart] = useState(
      JSON.parse(window.localStorage.getItem('cartProduct'))?.reverse(),
   );
   const [loadPurchase, setLoadPurchase] = useState(false);
   const [purchaseOrder, setPurchaseOrder] = useState([]);
   const [modalShow, setModalShow] = useState(false);
   const [showError, setShowError] = useState(false);
   const [selected, setSelected] = useState([]);
   const [loading, setLoading] = useState(true);
   const [isChecked, setIsChecked] = useState();
   const [key, setKey] = useState('cart');
   const [token, setToken] = useState();
   const getUser = useSelector((state) => state.user.info);
   const [show, setShow] = useState(false);

   const [searchParams, setSearchParams] = useSearchParams();
   const inputSelectAll = useRef();

   useEffect(() => {
      const getEmail = JSON.parse(window.localStorage.getItem('infoUser'));
      const getToken = {
         token: window.localStorage.getItem('token'),
         tokenType: window.localStorage.getItem('tokenType'),
      };
      setToken(getToken);
      const fetchPurchase = async () => {
         try {
            const response = await Bill.getBillUser(getEmail?.email, getToken);
            setPurchaseOrder(response.data.result);
            if (response.data.result.length === 0) {
               setLoading(false);
            }
         } catch (error) {
            console.log('error', error);
            setLoading(false);
         }
      };
      if (getEmail?.email) {
         fetchPurchase();
      } else {
         setLoading(false);
      }
      return () => {
         setPurchaseOrder([]);
      };
   }, [loadPurchase, getUser]);
   const handleSelectAll = (e) => {
      if (e.target.checked) {
         const local = JSON.parse(window.localStorage.getItem('cartProduct'));
         if (local && local.length > 0) {
            setSelected(local);
         } else {
            return;
         }
         setIsChecked(true);
      } else {
         setIsChecked(false);
         setSelected([]);
      }
   };
   const handleDelete = () => {
      if (selected.length > 0) {
         const productDelete = productCart.filter(
            (value) => !selected.map((val) => val.productId).includes(value.productId),
         );
         window.localStorage.setItem('cartProduct', JSON.stringify(productDelete));
         setProductCart(productDelete);
         setSelected([]);
         setIsChecked(false);
         inputSelectAll.current.checked = false;
      } else {
         setShowError(true);
         setTimeout(() => {
            setShowError(false);
         }, 2500);
      }
   };

   const handlePay = () => {
      if (token?.token) {
         if (selected.length > 0) {
            setModalShow(true);
         } else {
            setShowError(true);
            setTimeout(() => {
               setShowError(false);
            }, 2500);
         }
      } else {
         setShow(true);
      }
   };
   const totalPrice = useMemo(() => {
      if (selected.length > 0) {
         const totalProduct = productCart.filter((value) =>
            selected.map((val) => val.productId).includes(value.productId),
         );
         const result = totalProduct?.reduce((sum, product) => {
            return sum + product?.productPrice * product?.productAmount;
         }, 0);
         return result;
      }
      return 0;
   }, [selected]);
   return (
      <>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         {showError && (
            <Alert className={cln('message')} variant="warning">
               Please select the product!!
            </Alert>
         )}
         <div
            className={cln('wrapper')}
            style={{ height: productCart?.length > 0 ? 'auto' : '100%' }}>
            <Tabs
               className={`mb-3 ${cln('tabs-container')}`}
               id="controlled-tab-example"
               activeKey={searchParams.get('q') ? searchParams.get('q') : 'cart'}
               onSelect={(k) => {
                  setKey(k);
                  if (k === 'cart') {
                     searchParams.delete('q');
                  } else {
                     searchParams.set('q', k);
                  }
                  setSearchParams(searchParams);
               }}>
               <Tab eventKey="cart" title="Cart">
                  <div
                     className={cln('container')}
                     style={{
                        height: productCart?.length > 0 ? 'auto' : '100%',
                        marginBottom: key === 'cart' ? '50px' : '0',
                     }}>
                     {productCart?.length > 0 ? (
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
                           <Button style={{ width: '150px' }} variant="warning" onClick={handlePay}>
                              Pay
                           </Button>
                        </Nav>
                     </Container>
                  </Navbar>
               </Tab>
               {token?.token && (
                  <Tab eventKey="purchaseOrder" title="Purchase order">
                     <div
                        className={cln('container')}
                        style={{ height: purchaseOrder?.length > 0 ? 'auto' : '100%' }}>
                        {purchaseOrder?.length > 0 ? (
                           <div className={cln('content')}>
                              {purchaseOrder?.map((value, index) => {
                                 return (
                                    <Order
                                       value={value}
                                       key={index}
                                       stt={index + 1}
                                       token={token}
                                       setLoading={setLoading}
                                    />
                                 );
                              })}
                           </div>
                        ) : (
                           !loading && (
                              <div className={cln('error')}>
                                 <MoodBadOutlinedIcon />
                                 <span>You don't have any orders!!</span>
                              </div>
                           )
                        )}
                     </div>
                  </Tab>
               )}
            </Tabs>
         </div>
         <ModalPayment
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleDelete={handleDelete}
            loadPurchase={loadPurchase}
            setLoadPurchase={setLoadPurchase}
            totalPrice={totalPrice}
            selected={selected}
         />
         <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
               <Modal.Title>Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>You must login before paying!!</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShow(false)}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ShoppingCart;
