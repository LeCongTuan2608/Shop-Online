import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './HomePage.module.scss';
import img_robot from '../../../images/cute-robot.png';
import img_chair from '../../../images/1 1.png';
import img_diabay from '../../../images/25-remove.png';
import { useState } from 'react';

const cln = classNames.bind(styles);

HomePage.propTypes = {};
function HomePage(props) {
   const [screen, setScreen] = useState();

   const hanldeOnMouse = (e) => {
      setScreen({
         screenX: e.clientX - 350,
         screenY: e.clientY,
      });
   };

   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <div className={cln('title')}>
               <span>Wellcom to the shop</span>
            </div>
            <div className={cln('contents')} onMouseMove={hanldeOnMouse}>
               <div
                  className={cln('img_robot')}
                  style={{
                     top: screen ? `${screen.screenY}px` : undefined,
                     left: screen ? `${screen.screenX}px` : undefined,
                  }}>
                  <img src={img_robot} alt="" />
                  <span>Hello!!</span>
               </div>
               <div className={cln('img_diabay')}>
                  <img src={img_diabay} alt="" />
               </div>
               <div className={cln('img_chair')}>
                  <img src={img_chair} alt="" />
               </div>
            </div>
         </div>
      </div>
   );
}

export default HomePage;
