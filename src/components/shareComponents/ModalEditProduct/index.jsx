import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ModalEditProduct.module.scss';
import img_fix from '../../../images/Construction.png';
import Product_API from 'API/Product_API';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoryProduct } from 'Auth/CategorySlide';
const cln = classNames.bind(styles);

const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
ModalEditProduct.propTypes = {};

function ModalEditProduct(props) {
   const { show, handleHide, product } = props;
   const dispatch = useDispatch();
   const [token, setToken] = useState();
   const [categorie, setCategories] = useState();
   const [showError, setShowError] = useState(true);

   const userRole = JSON.parse(localStorage.getItem('infoUser'));

   useEffect(() => {
      const getToken = window.localStorage.getItem('token');
      const getTypeToken = window.localStorage.getItem('tokenType');

      setToken({
         token: getToken,
         tokenType: getTypeToken,
      });
   }, []);
   const handleSubmit = (e) => {
      console.log(e);
   };
   const handleDelete = async (e) => {
      try {
         const response = await Product_API.delete(product.productId, token);
         console.log(response);
         const categoryid = window.localStorage.getItem('categoryid');
         const categoryname = window.localStorage.getItem('categoryname');
         const valueObj = {
            categoryId: categoryid,
            categoryName: categoryname,
         };
         if (categoryid == 0) {
            await dispatch(categoryProduct(valueObj)).unwrap();
         } else {
            await dispatch(categoryProduct(valueObj)).unwrap();
         }
         handleHide(false);
      } catch (error) {
         console.log('error', error);
         setShowError(false);
      }
   };

   return (
      <Modal
         className={cln('wrapper')}
         show={show}
         onHide={handleHide}
         backdrop="static"
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered>
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Buy product</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className={cln('container')}>
               <div className={cln('container-img')}>
                  <img src={product?.images[0]?.url || img_fix} alt="" />
               </div>
               <div className={cln('container-wrapper')}>
                  <div className={cln('contents')}>
                     <div className={cln('contents-title')}>
                        <span>{product.productName}</span>
                     </div>
                     <div className={cln('contents-des')}>
                        <p>
                           <span>Mô tả sản phẩm: </span>
                           {product?.productDes}
                        </p>
                     </div>
                     <div className={cln('contents-id')}>
                        <p>
                           <span>Mã sản phẩm: </span>
                           {product?.productId}
                        </p>
                     </div>
                  </div>
                  <div className={cln('buy-product')}>
                     <Form>
                        <Form.Group className={cln('input-group')} controlId="exampleForm">
                           <Form.Label>Amount</Form.Label>
                           <Form.Control
                              type="number"
                              min={1}
                              max={product?.productAmount}
                              defaultValue={1}
                           />
                           <Form.Label className={cln('amount')}>
                              {product?.productAmount} products available
                           </Form.Label>
                        </Form.Group>
                        <Form.Label className={cln('price')}>
                           vnđ: {formatCash(product?.productPrice)}
                        </Form.Label>
                        {showError ? undefined : (
                           <Form.Label
                              className={cln('error')}
                              style={{ color: 'red', textAlign: 'center' }}>
                              "XÓA SẢN PHẨM THẤT BẠI!"
                           </Form.Label>
                        )}
                        <div className={cln('form-button')}>
                           <Button variant="outline-primary">Update</Button>
                           <Button variant="outline-danger" onClick={handleDelete}>
                              Delete
                           </Button>
                        </div>
                     </Form>
                  </div>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
}

export default ModalEditProduct;
