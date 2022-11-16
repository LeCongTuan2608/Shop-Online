import Product_API from 'API/Product_API';
import { categoryProduct } from 'Slide/CategorySlide';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Carousel, Form, Modal, Spinner } from 'react-bootstrap';
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
   const { show, handleHide, product, update, setUpdate, setDeleteId } = props;
   const [token, setToken] = useState();
   const [detailProduct, setDetailProduct] = useState(product);
   const [showError, setShowError] = useState({ update: false, delete: false });
   const [newImage, setNewImage] = useState([]);
   const [loading, setLoading] = useState(false);
   const [active, setActive] = useState({ name: false, amount: false, price: false });
   const inputFile = useRef();
   const inputName = useRef();
   const inputDes = useRef();
   const inputAmount = useRef();
   const inputPrice = useRef();

   /// xử lý xóa file preview để tránh tràn bộ nhớ
   const revokeImage = () => {
      newImage?.map((value) => {
         return URL.revokeObjectURL(value.preview);
      });
   };

   //=================================================================
   useEffect(() => {
      // bug
      setDetailProduct(product);
   }, [product]);
   useEffect(() => {
      const getToken = window.localStorage.getItem('token');
      const getTypeToken = window.localStorage.getItem('tokenType');
      setToken({
         token: getToken,
         tokenType: getTypeToken,
      });
   }, []);
   useEffect(() => {
      return () => {
         revokeImage();
      };
   }, [newImage]);
   const handleBlur = (e) => {
      if (e.target.name === 'name') {
         if (e.target.value.trim() === '') {
            setActive({ ...active, name: false });
         } else {
            setDetailProduct({ ...detailProduct, productName: inputName.current.value });
            setActive({ ...active, name: false });
         }
      } else if (e.target.name === 'des') {
         if (e.target.value.trim() === '') {
            setDetailProduct(product);
         } else {
            setDetailProduct({ ...detailProduct, productDes: inputDes.current.value });
         }
      } else if (e.target.name === 'price') {
         if (e.target.value.trim() === '') {
            setActive({ ...active, price: false });
         } else {
            setDetailProduct({ ...detailProduct, productPrice: inputPrice.current.value });
            setActive({ ...active, price: false });
         }
      } else if (e.target.name === 'amount') {
         if (e.target.value.trim() === '') {
            setActive({ ...active, amount: false });
         } else {
            setDetailProduct({ ...detailProduct, productAmount: inputAmount.current.value });
            setActive({ ...active, amount: false });
         }
      }
   };
   const onKeyDown = (e) => {
      if (e.key === 'Enter') {
         e.target.blur();
      }
   };

   const handleDelete = async (e) => {
      try {
         setLoading(true);
         await Product_API.delete(product.productId, token);
         revokeImage();
         handleHide(false);
         setDeleteId(product.productId);
         setLoading(false);
      } catch (error) {
         console.log('error', error);
         setLoading(false);
         setShowError({ update: false, delete: true });
      }
   };

   const handleUpdate = async (e) => {
      const data = new FormData();
      data.append('name', detailProduct.productName);
      data.append('des', detailProduct.productDes);
      data.append('price', detailProduct.productPrice);
      data.append('amount', detailProduct.productAmount);

      if (newImage.length === 0) {
         detailProduct.images.map((value) => {
            return data.append('imageId', value.imageId);
         });
      } else {
         newImage.map((value) => {
            return data.append('imageFiles', value);
         });
      }
      try {
         setLoading(true);
         await Product_API.update(data, detailProduct.productId, token);
         handleHide(false);
         revokeImage();
         setUpdate(!update);
         setLoading(false);
      } catch (error) {
         console.log('error', error);
         setLoading(false);
         setShowError({ delete: false, update: true });
      }
   };

   const handleHideModal = () => {
      setDetailProduct(product);
      revokeImage();
      setNewImage([]);
      handleHide();
      setShowError({ delete: false, update: false });
   };
   return (
      <>
         <Modal
            className={cln('wrapper')}
            show={show}
            onHide={handleHideModal}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            {loading && (
               <div className={cln('loading')}>
                  <Spinner animation="grow" variant="info" />
               </div>
            )}
            {showError.delete ? (
               <div className={cln('message')}>
                  <Alert variant="danger">CAN NOT DELETE!</Alert>
               </div>
            ) : showError.update ? (
               <div className={cln('message')}>
                  <Alert variant="danger">CAN NOT UPDATE!</Alert>
               </div>
            ) : undefined}

            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">Buy product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className={cln('container')}>
                  <div className={cln('container-img')}>
                     <Carousel>
                        {newImage.length !== 0 ? (
                           newImage?.map((value, index) => {
                              value.preview = URL.createObjectURL(value);
                              return (
                                 <Carousel.Item key={index}>
                                    <img src={value?.preview || img_fix} alt="" />
                                 </Carousel.Item>
                              );
                           })
                        ) : detailProduct?.images.length === 0 ? (
                           <img src={img_fix} alt="" />
                        ) : (
                           detailProduct?.images.map((value, index) => {
                              return (
                                 <Carousel.Item key={index}>
                                    <img src={value?.url || img_fix} alt="" />
                                 </Carousel.Item>
                              );
                           })
                        )}
                     </Carousel>
                     <div className={cln('input_file')}>
                        <input
                           type="file"
                           id="editFile"
                           multiple="multiple"
                           style={{ display: 'none' }}
                           onChange={(e) => {
                              setNewImage([...e.target.files]);
                           }}
                           ref={inputFile}
                        />
                        <Button
                           variant="outline-warning"
                           onClick={() => {
                              inputFile.current.click();
                           }}>
                           Select file ...
                        </Button>
                     </div>
                  </div>
                  <div className={cln('container-wrapper')}>
                     <div className={cln('contents')}>
                        <div className={cln('contents-title')}>
                           {active.name ? (
                              <input
                                 defaultValue={detailProduct?.productName}
                                 id="name"
                                 ref={inputName}
                                 onBlur={handleBlur}
                                 name="name"
                                 onKeyDown={onKeyDown}
                              />
                           ) : (
                              <span
                                 style={{ width: '100%', display: 'block', lineHeight: '1.5rem' }}
                                 onClick={() => {
                                    setActive({ ...active, name: true });
                                 }}>
                                 {detailProduct?.productName}
                              </span>
                           )}
                        </div>
                        <div className={cln('contents-des')}>
                           <span>Mô tả:</span>
                           <Form.Control
                              className={cln('input-des')}
                              as="textarea"
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
                              {active.amount ? (
                                 <Form.Control
                                    type="number"
                                    min={1}
                                    defaultValue={detailProduct?.productAmount}
                                    name="amount"
                                    onBlur={handleBlur}
                                    ref={inputAmount}
                                    onKeyDown={onKeyDown}
                                 />
                              ) : (
                                 <span
                                    style={{ width: '45%', display: 'block', lineHeight: '38px' }}
                                    onClick={() => {
                                       setActive({ ...active, amount: true });
                                    }}>
                                    {detailProduct?.productAmount}
                                 </span>
                              )}
                           </Form.Group>
                           <div className={cln('price')}>
                              <span>Price:</span>
                              {active.price ? (
                                 <input
                                    type="text"
                                    defaultValue={detailProduct?.productPrice}
                                    id="name"
                                    ref={inputPrice}
                                    onBlur={handleBlur}
                                    name="price"
                                    onKeyDown={onKeyDown}
                                 />
                              ) : (
                                 <span
                                    style={{ width: '100%', display: 'block', lineHeight: '44px' }}
                                    onClick={() => {
                                       setActive({ ...active, price: true });
                                    }}>
                                    {detailProduct?.productPrice}đ
                                 </span>
                              )}
                           </div>

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
      </>
   );
}

export default ModalEditProduct;
