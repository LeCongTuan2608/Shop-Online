import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Product_API from 'API/Product_API';
import { categoryProduct } from 'Slide/CategorySlide';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Logout.module.scss';
const cln = classNames.bind(styles);
Logout.propTypes = {
   setLogin: PropTypes.func,
};
Logout.defaultProps = {
   setLogin: null,
};
function Logout(props) {
   const { setLogin, zoomOut } = props;
   const [show, setShow] = useState(false);
   const pathname = useLocation();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleClose = () => {
      setShow(false);
   };
   const handleShow = () => {
      setShow(true);
   };
   const handleLogout = async () => {
      setShow(false);
      setLogin({
         token: window.localStorage.removeItem('token'),
         infoUser: window.localStorage.removeItem('infoUser'),
      });
      window.localStorage.removeItem('tokenType');
      navigate('/');
   };

   return (
      <div className={cln('logout')}>
         <Nav.Link className={cln('nav-link')} onClick={handleShow}>
            <LogoutOutlinedIcon />
            {zoomOut ? undefined : <span>Logout</span>}
         </Nav.Link>
         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
               <Modal.Title>Sign out</Modal.Title>
            </Modal.Header>
            <Modal.Body>Wohooo, do you want to sign out?</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  No
               </Button>
               <Button variant="primary" onClick={handleLogout}>
                  Yes
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}

export default Logout;
