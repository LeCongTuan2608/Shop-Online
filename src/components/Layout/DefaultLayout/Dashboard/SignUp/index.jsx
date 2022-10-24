import User from 'API/User';
import classNames from 'classnames/bind';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Col, Form, Modal, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import styles from './SignUp.module.scss';

const cln = classNames.bind(styles);

SignUp.propTypes = {
   setShowLogin: PropTypes.func,
};

const schema = yup.object().shape({
   fullName: yup.string().required('Please, enter your full name'),
   email: yup.string().required('Please, enter your email').email('Please enter a valid email'),
   phone: yup.string().required('Please, enter your phone'),
   address: yup.string().required('Please, enter your address'),
   password: yup.string().required('Please, enter your password'),
});
function SignUp(props) {
   const [modalShow, setModalShow] = useState(false);
   const [text, setText] = useState();
   const [errorss, setErrorss] = useState(false);
   const [loading, setLoading] = useState(false);

   const handleShow = () => {
      setModalShow(true);
   };
   const handleHide = () => {
      setModalShow(false);
      setText();
      setErrorss(false);
   };

   const form = {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      address: '',
   };
   const handleSubmitForm = async (values) => {
      const data = new FormData();

      data.append('fullName', values.fullName);
      data.append('email', values.email);
      data.append('phone', values.phone);
      data.append('password', values.password);
      data.append('address', values.address);
      console.log('data', data);
      setErrorss(false);
      try {
         setLoading(true);
         let user = await User.register(data);
         setText({ text: user.data, status: true });
         setLoading(false);
      } catch (error) {
         console.log('error', error);
         setText({ text: error.response.data, status: false });
         setLoading(false);
         if (!error.response.data) {
            setErrorss(true);
         }
      }
   };
   return (
      <div className={cln('wrapper')}>
         <Form.Text className={cln('signup')} onClick={handleShow}>
            You don't have an account ?
         </Form.Text>
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
               <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
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
                              <Form.Group as={Col} md="4" controlId="validationFullName">
                                 <Form.Label>Full name</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Full name"
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    isInvalid={touched.fullName && !!errors.fullName}
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    {errors.fullName}
                                 </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group as={Col} md="4" controlId="validationEmail">
                                 <Form.Label>Email</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={touched.email && !!errors.email}
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                 </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group as={Col} md="4" controlId="validationPhone">
                                 <Form.Label>Phone</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    isInvalid={touched.phone && !!errors.phone}
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                 </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group as={Col} md="4" controlId="validationAddress">
                                 <Form.Label>Address</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    isInvalid={touched.address && !!errors.address}
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    {errors.address}
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
                              {text?.text && (
                                 <Form.Label
                                    style={{
                                       color: text?.status ? 'green' : 'red',
                                       fontSize: '15px',
                                       textAlign: 'center',
                                    }}>
                                    {text?.text || undefined}
                                 </Form.Label>
                              )}
                              {errorss && (
                                 <span style={{ margin: '0 auto', color: 'red' }}>
                                    Có lỗi xảy ra khi đăng kí!
                                 </span>
                              )}
                              <Button type="submit">Sign up</Button>
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

export default SignUp;
