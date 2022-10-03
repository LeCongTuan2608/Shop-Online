import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './ModalBuyProduct.module.scss';
import img_table from '../../../images/1b.png';
import img_fix from '../../../images/Construction.png';

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
   const userRole = JSON.parse(localStorage.getItem('infoUser'));

   const handleSubmit = (e) => {
      console.log(e);
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
                        <Button variant="primary">Buy now</Button>
                     </Form>
                  </div>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
}

export default ModalBuyProduct;
