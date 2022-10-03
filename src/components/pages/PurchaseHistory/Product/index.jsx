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

function Product(props) {
   const { value } = props;
   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <div className={cln('container-img')}>
               <img src={value.image} alt="" />
            </div>
            <div className={cln('container-content')}>
               <span className={cln('content-title')}>{value.title}</span>
               <p className={cln('content-des')}>{value.des}</p>
            </div>
            <div className={cln('content-status')}>
               <span>Status: "{value.status}"</span>
               <span>Total money: {value.price}vnđ</span>
            </div>
         </div>
      </div>
   );
}

export default Product;
