import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './HomePage.module.scss';
import img_home1 from '../../../images/banner1.png';
const cln = classNames.bind(styles);

HomePage.propTypes = {};
function HomePage(props) {
   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <img src={img_home1} alt="" />
         </div>
      </div>
   );
}

export default HomePage;
