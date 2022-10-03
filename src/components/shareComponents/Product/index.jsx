import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalBuyProduct from '../ModalBuyProduct';
import styles from './Product.module.scss';
import img_fix from '../../../images/Construction.png';
import ModalEditProduct from '../ModalEditProduct';

const cln = classNames.bind(styles);

Product.propTypes = {
   value: PropTypes.object,
};
Product.defaultProps = {
   value: undefined,
};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function Product(props) {
   const { value } = props;
   const [show, setShow] = useState(false);

   const token = window.localStorage.getItem('token');
   const userRole = JSON.parse(localStorage.getItem('infoUser'));

   const handleShow = () => {
      setShow(!show);
   };
   return (
      <div className={cln('warpper')}>
         <div className={cln('container')}>
            <div className={cln('card-img')}>
               <img src={value?.images[0]?.url || img_fix} alt="" />
            </div>
            <div className={cln('card-describe')}>
               <div className={cln('card-title')}>
                  <p className={cln('title')}> {value.productName}</p>
               </div>
               <div className={cln('card-priced')}>
                  <span className={cln('priced')}> vnđ: {formatCash(value.productPrice)}</span>
               </div>
               <div className={cln('card-buy')}>
                  {userRole?.role === 'ADMIN' ? (
                     <Button variant="primary" onClick={handleShow}>
                        <BorderColorOutlinedIcon />
                        <span className={cln('buy')}>Edit</span>
                     </Button>
                  ) : (
                     <Button variant="primary" onClick={handleShow}>
                        <ShoppingCartOutlinedIcon />
                        <span className={cln('buy')}>Buy</span>
                     </Button>
                  )}
                  {token ? (
                     userRole.role === 'ADMIN' ? (
                        <ModalEditProduct product={value} show={show} handleHide={handleShow} />
                     ) : (
                        <ModalBuyProduct product={value} show={show} handleHide={handleShow} />
                     )
                  ) : (
                     <Modal show={show} onHide={handleShow}>
                        <Modal.Header closeButton>
                           <Modal.Title>Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Heyy, you must login before purchasing the product!</Modal.Body>
                        <Modal.Footer>
                           <Button variant="primary" onClick={handleShow}>
                              Ok
                           </Button>
                        </Modal.Footer>
                     </Modal>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Product;
