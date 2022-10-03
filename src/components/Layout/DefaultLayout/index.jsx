import classNames from 'classnames/bind';
import Dashboard from './Dashboard';
import styles from './DefaultLayout.module.scss';
import Header from './Header';
import PropTypes from 'prop-types';
import { Outlet, useLocation } from 'react-router-dom';
import { publicRoutes } from 'routes';
import { useEffect, useState } from 'react';
const cln = classNames.bind(styles);
DefaultLayout.propTypes = {
   children: PropTypes.element,
};
DefaultLayout.defaultProp = {
   children: undefined,
};
function DefaultLayout(props) {
   const { pathname } = useLocation();

   const user = {
      token: window.localStorage.getItem('token'),
      infoUser: JSON.parse(window.localStorage.getItem('infoUser')),
   };

   const showHeader = () => ['/search', '/product'].includes(pathname) && <Header />;

   return (
      <div className={cln('wrapper')}>
         <Dashboard user={user} />
         <div className={cln('container')}>
            {showHeader()}
            <div className={cln('content-wrapper')}>
               <div className={cln('content')}>
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
}
export default DefaultLayout;
