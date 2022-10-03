import Product_API from 'API/Product_API';
import { categoryProduct } from 'Auth/CategorySlide';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import img_fix from '../../../images/Construction.png';
import styles from './ModalEditProduct.module.scss';
import PropTypes from 'prop-types';
import { FormatColorReset } from '@mui/icons-material';

const cln = classNames.bind(styles);

const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
ModalEditProduct.propTypes = {
   show: PropTypes.bool,
   handleHide: PropTypes.func,
   product: PropTypes.object,
};
ModalEditProduct.DefautlProps = {
   show: false,
   handleHide: null,
   product: undefined,
};

function ModalEditProduct(props) {
   const { show, handleHide, product } = props;
   const dispatch = useDispatch();
   const [token, setToken] = useState();
   const [detailProduct, setDetailProduct] = useState(product);
   const [showError, setShowError] = useState(true);
   useEffect(() => {
      // bug
      setDetailProduct(product);
   }, [product]);
   const inputName = useRef(null);
   const inputDes = useRef(null);
   const inputAmount = useRef(null);
   const inputPrice = useRef(null);
   useEffect(() => {
      const getToken = window.localStorage.getItem('token');
      const getTypeToken = window.localStorage.getItem('tokenType');
      setToken({
         token: getToken,
         tokenType: getTypeToken,
      });
   }, []);

   const handleBlur = (e) => {
      if (e.target.name === 'name') {
         if (e.target.value.trim() === '') {
            return;
         } else {
            setDetailProduct({ ...detailProduct, productName: inputName.current.value });
         }
      } else if (e.target.name === 'des') {
         if (e.target.value.trim() === '') {
            return;
         } else {
            setDetailProduct({ ...detailProduct, productDes: inputDes.current.value });
         }
      } else if (e.target.name === 'price') {
         if (e.target.value.trim() === '') {
            return;
         } else {
            setDetailProduct({ ...detailProduct, productPrice: inputPrice.current.value });
         }
      } else if (e.target.name === 'amount') {
         if (e.target.value.trim() === '') {
            return;
         } else {
            setDetailProduct({ ...detailProduct, productAmount: inputAmount.current.value });
         }
      }
   };
   const onKeyDown = (e) => {
      if (e.key === 'Enter') {
         e.target.blur();
      }
   };
   const handleReLoad = async () => {
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
   };
   const handleDelete = async (e) => {
      try {
         const response = await Product_API.delete(product.productId, token);
         console.log(response);
         handleReLoad();
         handleHide(false);
      } catch (error) {
         console.log('error', error);
         setShowError(false);
      }
   };

   const handleUpdate = async (e) => {
      console.log(detailProduct);
      const data = new FormData();
      data.append('name', detailProduct.productName);
      data.append('des', detailProduct.productDes);
      data.append('price', detailProduct.productPrice);
      data.append('amount', detailProduct.productAmount);
      data.append('imageId', detailProduct.images[0].imageId);
      try {
         await Product_API.update(data, detailProduct.productId, token);
         handleReLoad();
         handleHide(false);
      } catch (error) {
         console.log('error', error);
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
                  <img src={detailProduct?.images[0]?.url || img_fix} alt="" />
               </div>
               <div className={cln('container-wrapper')}>
                  <div className={cln('contents')}>
                     <div className={cln('contents-title')}>
                        <input
                           defaultValue={detailProduct?.productName}
                           id="name"
                           ref={inputName}
                           onBlur={handleBlur}
                           name="name"
                           onKeyDown={onKeyDown}
                        />
                     </div>
                     <div className={cln('contents-des')}>
                        <span>Mô tả:</span>
                        <Form.Control
                           className={cln('input-des')}
                           as="textarea"
                           style={{ height: '100px', border: 'none' }}
                           defaultValue={detailProduct?.productDes}
                           ref={inputDes}
                           onBlur={handleBlur}
                           name="des"
                           onKeyDown={onKeyDown}
                        />
                     </div>
                     <div className={cln('contents-id')}>
                        <p>
                           <span>Mã sản phẩm: </span>
                           {detailProduct?.productId}
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
                              defaultValue={detailProduct?.productAmount}
                              name="amount"
                              onBlur={handleBlur}
                              ref={inputAmount}
                              onKeyDown={onKeyDown}
                           />
                        </Form.Group>
                        <div className={cln('price')}>
                           <span>Vnđ:</span>
                           <input
                              type="text"
                              defaultValue={detailProduct?.productPrice}
                              id="name"
                              ref={inputPrice}
                              onBlur={handleBlur}
                              name="price"
                              onKeyDown={onKeyDown}
                           />
                        </div>

                        {showError ? undefined : (
                           <Form.Label
                              className={cln('error')}
                              style={{ color: 'red', textAlign: 'center' }}>
                              "XÓA SẢN PHẨM THẤT BẠI!"
                           </Form.Label>
                        )}
                        <div className={cln('form-button')}>
                           <Button variant="outline-primary" onClick={handleUpdate}>
                              Update
                           </Button>
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
