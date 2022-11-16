import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Alert, Button, Carousel, Form, Modal } from 'react-bootstrap';
import styles from './ModalBuyProduct.module.scss';
import img_table from '../../../images/1b.png';
import img_fix from '../../../images/Construction.png';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const cln = classNames.bind(styles);

ModalBuyProduct.propTypes = {
   show: PropTypes.bool,
   handleHide: PropTypes.func,
   product: PropTypes.object,
};
ModalBuyProduct.DefautlProps = {
   show: false,
   handleHide: null,
   product: undefined,
};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function ModalBuyProduct(props) {
   const { show, handleHide, product } = props;
   const [amount, setAmount] = useState(1);
   const [showSucc, setShowSucc] = useState(false);

   const handleChange = (e) => {
      setAmount(e.target.value);
   };
   const handleAdd = (e) => {
      const newProduct = { ...product, productAmount: +amount };
      const cartProduct = JSON.parse(window.localStorage.getItem('cartProduct'));
      let updateProduct;
      if (cartProduct) {
         const products = cartProduct.filter((value) => {
            if (value.productId === newProduct.productId) {
               updateProduct = {
                  ...value,
                  productAmount: value.productAmount + newProduct.productAmount,
               };
            }
            return value.productId != newProduct.productId;
         });
         localStorage.setItem(
            'cartProduct',
            JSON.stringify([...products, updateProduct || newProduct]),
         );
      } else {
         localStorage.setItem('cartProduct', JSON.stringify([newProduct]));
      }
      handleHide(false);
      setShowSucc(true);
      setTimeout(() => {
         setShowSucc(false);
      }, 2500);
   };
   return (
      <>
         {showSucc && (
            <Alert className={cln('message')} variant="success">
               Added to cart!!
            </Alert>
         )}
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
                     {/* <img src={product?.images[0]?.url || img_fix} alt="" /> */}
                     <Carousel>
                        {product?.images.map((value, index) => {
                           return (
                              <Carousel.Item key={index}>
                                 <img src={value?.url || img_fix} alt="" />
                              </Carousel.Item>
                           );
                        })}
                     </Carousel>
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
                                 value={amount}
                                 onChange={handleChange}
                              />
                              <Form.Label className={cln('amount')}>
                                 {product?.productAmount} products available
                              </Form.Label>
                           </Form.Group>
                           <Form.Label className={cln('price')}>
                              Price: {formatCash(product?.productPrice)}đ
                           </Form.Label>
                           <Button variant="primary" onClick={handleAdd}>
                              Add to cart
                           </Button>
                        </Form>
                     </div>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default ModalBuyProduct;
