import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import img_fix from '../../../images/Construction.png';
import ModalBuyProduct from '../ModalBuyProduct';
import ModalEditProduct from '../ModalEditProduct';
import styles from './Product.module.scss';
const cln = classNames.bind(styles);

Product.propTypes = {
   value: PropTypes.object,
   setDeleted: PropTypes.func,
   deleted: PropTypes.bool,
};
Product.defaultProps = {
   value: undefined,
   setDeleted: null,
   deleted: false,
};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function Product(props) {
   const { value, setDeleteId, update, setUpdate } = props;

   const [show, setShow] = useState(false);
   const token = window.localStorage.getItem('token');
   const userRole = JSON.parse(localStorage.getItem('infoUser'));
   const cardProduct = useRef();
   const handleShow = () => {
      setShow(!show);
   };
   return (
      <div className={cln('warpper')} ref={cardProduct}>
         <div className={cln('container')}>
            <div className={cln('card-img')}>
               <img src={value?.images[0]?.url || img_fix} alt="" />
            </div>
            <div className={cln('card-describe')}>
               <div className={cln('card-title')}>
                  <p className={cln('title')}> {value?.productName}</p>
               </div>
               <div className={cln('card-priced')}>
                  <span className={cln('priced')}>{formatCash(value?.productPrice)}đ</span>
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
                        <span className={cln('buy')}>Add to cart</span>
                     </Button>
                  )}
                  {userRole?.role === 'ADMIN' ? (
                     <ModalEditProduct
                        product={value}
                        show={show}
                        handleHide={handleShow}
                        setDeleteId={setDeleteId}
                        update={update}
                        setUpdate={setUpdate}
                     />
                  ) : (
                     <ModalBuyProduct product={value} show={show} handleHide={handleShow} />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Product;
