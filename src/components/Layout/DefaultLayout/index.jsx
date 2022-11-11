import classNames from 'classnames/bind';
import Dashboard from './Dashboard';
import styles from './DefaultLayout.module.scss';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Header from './Header';
import PropTypes from 'prop-types';
import { Outlet, useLocation } from 'react-router-dom';
import { publicRoutes } from 'routes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Button } from 'react-bootstrap';
const cln = classNames.bind(styles);
DefaultLayout.propTypes = {
   children: PropTypes.element,
};
DefaultLayout.defaultProp = {
   children: undefined,
};
function DefaultLayout(props) {
   const { pathname } = useLocation();
   const [dashboard, setDashboard] = useState(true);
   const user = {
      token: window.localStorage.getItem('token'),
      infoUser: JSON.parse(window.localStorage.getItem('infoUser')),
   };
   const showHeader = () => ['/product'].includes(pathname) && <Header />;

   return (
      <div className={cln('wrapper')}>
         <div className={cln('header')}>
            <Button
               variant="outline-dark"
               onClick={() => {
                  setDashboard(!dashboard);
               }}>
               <MenuOutlinedIcon />
            </Button>
            <span className={cln('brand')}>SoPa</span>
         </div>
         <Dashboard user={user} dashboard={dashboard} setDashboard={setDashboard} />
         <div className={cln('container')}>
            {showHeader()}
            <div className={cln('content-wrapper')}>
               <div
                  className={cln('content')}
                  style={{
                     overflowY: pathname === '/' ? 'hidden' : undefined,
                  }}>
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
}
export default DefaultLayout;
