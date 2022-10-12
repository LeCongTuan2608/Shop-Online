import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import PropTypes from 'prop-types';

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
   useEffect(() => {
      inputCheck.current.checked = isChecked;
   }, [isChecked]);
   const handleCheckbox = (e) => {
      if (e.target.checked) {
         setSelected([...selected, value]);
      } else {
         setSelected(
            selected.filter((val) => {
               return val.productId != value.productId;
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
            <div className={cln('container-content')}>
               <p className={cln('content-title')}>{value?.productName}</p>
               <p className={cln('content-des')}>{value?.productDes}</p>
            </div>
            <div className={cln('container-price')}>
               <span>Amount: {value?.productAmount}</span>
               <span>{formatCash(value?.productPrice)}vnđ</span>
            </div>
         </div>
      </div>
   );
}

export default Product;
