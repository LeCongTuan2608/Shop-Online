import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import Bill from 'API/Bill';
import { useMediaQuery } from 'react-responsive';
import styles from './ModalPayment.module.scss';
import classNames from 'classnames/bind';
const cln = classNames.bind(styles);
ModalPayment.propTypes = {};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function ModalPayment(props) {
   const { handleDelete, show, onHide, loadPurchase, setLoadPurchase, totalPrice, selected } =
      props;
   const [token, setToken] = useState();

   const isScreen768 = useMediaQuery({ query: '(max-width: 768px)' });
   useEffect(() => {
      const getToken = {
         token: window.localStorage.getItem('token'),
         tokenType: window.localStorage.getItem('tokenType'),
      };
      setToken(getToken);
   }, []);
   const handlePay = async (e) => {
      const data = selected.map((value) => {
         return {
            productId: value.productId,
            amount: value.productAmount,
         };
      });
      try {
         await Bill.addBill(data, token);
         handleDelete();
         onHide();
         setLoadPurchase(!loadPurchase);
      } catch (error) {
         console.log('error', error);
      }
   };

   return (
      <div>
         <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">Using Grid in Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
               <Container className={cln('contained-body')}>
                  {selected.map((val, index) => {
                     return (
                        <Row key={index} className={cln('row-item')}>
                           <Col xs={12} md={7} className={cln('col-name-prod')}>
                              {val.productName}
                           </Col>
                           <Col xs={6} md={5} className={cln('col-price-prod')}>
                              <span>
                                 Amount:<b>{val.productAmount}</b>
                              </span>
                              <span>
                                 <b>{formatCash(val.productPrice)}đ</b>
                              </span>
                           </Col>
                        </Row>
                     );
                  })}
                  <Row className={cln('row-item-total')}>
                     <Col xs={12} md={7} style={{ width: isScreen768 && '50%' }}>
                        Total:
                     </Col>
                     <Col xs={6} md={5} className={cln('col-item-total')}>
                        <b>{formatCash(totalPrice)}đ</b>
                     </Col>
                  </Row>
                  <span>Payment methods:</span>
                  <div className={cln('pay-methods')}>
                     <Form.Check
                        inline
                        label={
                           <>
                              Payment in cash <AttachMoneyIcon />
                           </>
                        }
                        name="group1"
                        type="radio"
                        id="inline-radio-1"
                        defaultChecked
                     />
                     <Form.Check
                        inline
                        label={
                           <>
                              Pay by bank card <PaymentIcon />
                           </>
                        }
                        name="group1"
                        type="radio"
                        id="inline-radio-2"
                     />
                  </div>
               </Container>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="danger" onClick={onHide}>
                  No
               </Button>
               <Button onClick={handlePay}>Yes</Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}

export default ModalPayment;
