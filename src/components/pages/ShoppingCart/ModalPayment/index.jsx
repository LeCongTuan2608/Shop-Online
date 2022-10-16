import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import Bill from 'API/Bill';

ModalPayment.propTypes = {};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function ModalPayment(props) {
   const { selected, handleDelete, show, onHide, loadPurchase, setLoadPurchase, totalPrice } =
      props;
   const [token, setToken] = useState();
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
         const response = await Bill.addBill(data, token);
         console.log('response', response);
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
               <Container style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {selected.map((value, index) => {
                     return (
                        <Row
                           key={index}
                           style={{
                              border: '1px solid black',
                           }}>
                           <Col xs={12} md={8} style={{ borderRight: '1px solid black' }}>
                              {value.productName}
                           </Col>
                           <Col xs={6} md={4} style={{ display: 'flex', flexDirection: 'column' }}>
                              <span>
                                 <b>Amount:</b> {value.productAmount}
                              </span>
                              <span>
                                 <b>vnđ:</b> {formatCash(value.productPrice)}
                              </span>
                           </Col>
                        </Row>
                     );
                  })}
                  <Row>
                     <Col xs={12} md={8}>
                        Total:
                     </Col>
                     <Col xs={6} md={4}>
                        {formatCash(totalPrice)}
                     </Col>
                  </Row>
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
