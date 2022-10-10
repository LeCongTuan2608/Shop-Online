import React from 'react';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import PropTypes from 'prop-types';

const cln = classNames.bind(styles);
Product.propTypes = {
   value: PropTypes.object,
};
Product.DefaultProp = {
   value: {},
};
const formatCash = (str) => {
   return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
function Product(props) {
   const { value } = props;
   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <div className={cln('container-input')}>
               <span>
                  <input type="checkbox" />
               </span>
            </div>
            <div className={cln('container-img')}>
               <img src={value?.images[0].url} alt="" />
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
