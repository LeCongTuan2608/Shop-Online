import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const cln = classNames.bind(styles);
Product.propTypes = {
   value: PropTypes.object,
   isChecked: PropTypes.bool,
};
Product.DefaultProp = {
   value: {},
   isChecked: false,
};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function Product(props) {
   const { value, selected, setSelected, isChecked } = props;
   const inputCheck = useRef();
   const isScreen500 = useMediaQuery({ query: '(max-width: 501px)' });

   useEffect(() => {
      inputCheck.current.checked = selected.map((val) => val.productId).includes(value.productId);
   }, [selected]);
   useEffect(() => {
      inputCheck.current.checked = isChecked;
   }, [isChecked]);
   const handleCheckbox = (e) => {
      if (e.target.checked) {
         setSelected((selected) => [...selected, value]);
      } else {
         setSelected(
            selected.filter((val) => {
               return val.productId !== value.productId;
            }),
         );
      }
   };

   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <div className={cln('container-input')}>
               <span>
                  <input type="checkbox" onClick={handleCheckbox} ref={inputCheck} />
               </span>
            </div>
            <div className={cln('container-img')}>
               <img src={value?.images[0]?.url} alt="" />
            </div>
            {!isScreen500 ? (
               <>
                  <div className={cln('container-content')}>
                     <p className={cln('content-title')}>{value?.productName}</p>
                     {!isScreen500 && <p className={cln('content-des')}>{value?.productDes}</p>}
                  </div>
                  <div className={cln('container-price')}>
                     <span>Amount: {value?.productAmount}</span>
                     <span>{formatCash(value?.productPrice)}đ</span>
                  </div>
               </>
            ) : (
               <div style={{ flex: '1', display: 'flex', gap: '5px', flexDirection: 'column' }}>
                  <div className={cln('container-content')}>
                     <p className={cln('content-title')}>{value?.productName}</p>
                     {!isScreen500 && <p className={cln('content-des')}>{value?.productDes}</p>}
                  </div>
                  <div className={cln('container-price')}>
                     <span>Amount: {value?.productAmount}</span>
                     <span>{formatCash(value?.productPrice)}đ</span>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default Product;
