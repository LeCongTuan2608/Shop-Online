import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { adminRoutes, privateRoutes, publicRoutes } from 'routes';
import styles from './Dashboard.module.scss';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import Login from './Login';
import Logout from './Logout';

const cln = classNames.bind(styles);
Dashboard.propTypes = {
   user: PropTypes.object,
};
Dashboard.defaultProps = {
   user: { token: null, infoUser: null },
};

function Dashboard(props) {
   const { user } = props;
   const [login, setLogin] = useState(user);
   const [zoomOut, setZoomOut] = useState(false);
   const { pathname } = useLocation();

   const handleClick = () => {
      setZoomOut(!zoomOut);
      window.localStorage.setItem('zoomOut', zoomOut);
   };
   return (
      <div
         className={cln('wrapper')}
         style={{
            maxWidth: zoomOut == true ? '67px' : '230px',
            minWidth: zoomOut == true ? '67px' : '150px',
         }}>
         <Navbar className={cln('navbar')} variant="dark">
            {login.token && (
               <div className={cln('user')}>
                  <div className={cln('user-card')}>
                     <div className={cln('card-img')}>{login.infoUser.fullName.slice(0, 1)}</div>
                  </div>
                  {zoomOut ? undefined : (
                     <div className={cln('info')}>
                        <span className={cln('info-name')}>{login.infoUser.fullName}</span>
                        <span className={cln('info-email')}>{login.infoUser.email}</span>
                     </div>
                  )}
               </div>
            )}

            <Container
               className={cln('container')}
               style={login.token ? undefined : { paddingTop: '100px' }}>
               {publicRoutes.map((route, index) => {
                  return (
                     <Nav.Link
                        key={index}
                        className={cln('nav-link')}
                        id={pathname === `${route.path}` ? cln('active') : undefined}
                        href={`#${route.path}`}
                        as={Link}
                        to={route.path}>
                        {route.Icon ? <route.Icon /> : undefined}
                        {zoomOut ? undefined : <span>{route.title}</span>}
                     </Nav.Link>
                  );
               })}
               {adminRoutes.map((route, index) => {
                  if (login.token && login.infoUser.role === 'ADMIN') {
                     return (
                        <Nav.Link
                           key={index}
                           className={cln('nav-link')}
                           id={pathname === `${route.path}` ? cln('active') : undefined}
                           href={`#${route.path}`}
                           as={Link}
                           to={route.path}>
                           {route.Icon ? <route.Icon /> : undefined}
                           {zoomOut ? undefined : <span>{route.title}</span>}
                        </Nav.Link>
                     );
                  }
                  return false;
               })}
               {privateRoutes.map((route, index) => {
                  if (login.token) {
                     if (route.role === login.infoUser.role || route.role === undefined) {
                        return (
                           <Nav.Link
                              key={index}
                              className={cln('nav-link')}
                              id={pathname === `${route.path}` ? cln('active') : undefined}
                              href={`#${route.path}`}
                              as={Link}
                              to={route.path}>
                              {route.Icon ? <route.Icon /> : undefined}
                              {zoomOut ? undefined : <span>{route.title}</span>}
                           </Nav.Link>
                        );
                     }
                  }
                  return false;
               })}
            </Container>
            {login.token ? (
               <Logout setLogin={setLogin} zoomOut={zoomOut} />
            ) : (
               <Login setLogin={setLogin} zoomOut={zoomOut} />
            )}
         </Navbar>
         <div className={cln('show-hide')} style={zoomOut ? { right: '-15%' } : undefined}>
            <Button
               variant="outline-warning"
               onClick={handleClick}
               style={zoomOut ? { transform: 'rotate(180deg)' } : undefined}>
               <ArrowCircleLeftOutlinedIcon />
            </Button>
         </div>
      </div>
   );
}

export default Dashboard;
