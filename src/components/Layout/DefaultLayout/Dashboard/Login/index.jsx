import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import { userLogin } from 'Slide/UserSlide';
import classNames from 'classnames/bind';
import { Formik } from 'formik';
import { useState } from 'react';
import { Button, Col, Form, Modal, Nav, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import SignUp from '../SignUp';
import styles from './Login.module.scss';
import PropTypes from 'prop-types';
import categorySlice from '../../../../../Slide/CategorySlide';
import { useNavigate } from 'react-router-dom';
const cln = classNames.bind(styles);
Login.propTypes = {
   setLogin: PropTypes.func,
};
Login.defaultProps = {
   setLogin: null,
};
const schema = yup.object().shape({
   email: yup.string().required('Please, enter your email').email('Please enter a valid email'),
   password: yup.string().required('Please, enter your password'),
});
function Login(props) {
   const { setLogin, zoomOut } = props;
   const dispatch = useDispatch();
   const [modalShow, setModalShow] = useState(false);
   const [loading, setLoading] = useState(false);
   const [errorss, setErrorss] = useState(false);
   const [text, setText] = useState('');
   const navigate = useNavigate();
   const handleShow = () => {
      setModalShow(true);
   };
   const handleHide = () => {
      setModalShow(false);
      setErrorss(false);
   };

   const form = {
      email: '',
      password: '',
   };

   const handleSubmitForm = async (value) => {
      try {
         setLoading(true);
         const fetchLogin = await dispatch(userLogin(value)).unwrap();
         setLogin({
            token: window.localStorage.getItem('token'),
            infoUser: JSON.parse(window.localStorage.getItem('infoUser')),
         });
         if (window.localStorage.getItem('token')) {
            setModalShow(false);
            navigate('/');
         } else if (fetchLogin === 'LOGIN FAIL!') {
            setErrorss(true);
            setText('wrong email or password!!');
         } else {
            setText('');
            setErrorss(true);
         }
         setLoading(false);
      } catch (error) {
         console.log('error', error);
         setLoading(false);
      }
   };
   return (
      <div className={cln('wrapper')}>
         <Nav.Link className={cln('nav-link')} onClick={handleShow}>
            <LoginIcon />
            {zoomOut ? undefined : 'Login'}
         </Nav.Link>
         <Modal
            className={cln('modal_login')}
            show={modalShow}
            onHide={handleHide}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            {loading && (
               <div className={cln('loading')}>
                  <Spinner animation="grow" variant="info" />
               </div>
            )}
            <Modal.Header className={cln('header_login')} closeButton>
               <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
            </Modal.Header>
            <Modal.Body className={cln('body-login')}>
               <div className={cln('container')}>
                  <div className={cln('contents-wrapper')}>
                     <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmitForm}
                        initialValues={form}>
                        {({
                           handleSubmit,
                           handleChange,
                           handleBlur,
                           values,
                           touched,
                           isValid,
                           errors,
                        }) => (
                           <Form noValidate onSubmit={handleSubmit}>
                              <Form.Group as={Col} md="4" controlId="validationEmail">
                                 <Form.Label>Email address</Form.Label>
                                 <Form.Control
                                    type="email"
                                    placeholder="Email address"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={touched.email && !!errors.email}
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                 </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group as={Col} md="4" controlId="validationPassWord">
                                 <Form.Label>Password</Form.Label>
                                 <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={touched.password && !!errors.password}
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                 </Form.Control.Feedback>
                              </Form.Group>
                              <Button type="submit">Login</Button>
                              {errorss && text ? (
                                 <span style={{ textAlign: 'center', color: 'red' }}>
                                    Wrong email or password!
                                 </span>
                              ) : (
                                 errorss && (
                                    <span style={{ textAlign: 'center', color: 'red' }}>
                                       An error occurred while logging in!
                                    </span>
                                 )
                              )}
                              <SignUp />
                              <Row className={cln('other')}>
                                 <Button className={cln('login-other')} variant="outline-primary">
                                    <FacebookIcon />
                                    Facebook
                                 </Button>
                                 <Button className={cln('login-other')} variant="outline-danger">
                                    <GoogleIcon />
                                    Google
                                 </Button>
                              </Row>
                           </Form>
                        )}
                     </Formik>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
}

export default Login;
