import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SettingPage.module.scss';
import { Button, Form, Modal, Spinner, Tab, Tabs } from 'react-bootstrap';
import img_person from '../../../images/person.png';
import { useState } from 'react';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import User from 'API/User';
import { userUpdate } from 'Slide/UserSlide';
import { useDispatch } from 'react-redux';
const cln = classNames.bind(styles);
SettingPage.propTypes = {};

const schema = yup.object().shape({
   email: yup.string().required('Please, enter your email').email('Please enter a valid email'),
   fullName: yup.string().required('Please, enter your full name'),
   phone: yup.string().required('Please, enter your phone'),
   address: yup.string().required('Please, enter your address'),
   password: yup.string().required('Please, enter your password'),
});
function SettingPage(props) {
   const [edit, setEdit] = useState(true);
   const [infoUser, setInfoUser] = useState();
   const [loading, setLoading] = useState(true);
   const [token, setToken] = useState();
   const [initiaValue, setInitiaValue] = useState();

   const dispatch = useDispatch();
   const inputName = useRef();
   const inputPhone = useRef();
   const inputAddr = useRef();

   useEffect(() => {
      const info = JSON.parse(window.localStorage.getItem('infoUser'));
      setInfoUser(info);
      setToken({
         token: window.localStorage.getItem('token'),
         tokenType: window.localStorage.getItem('tokenType'),
      });
      setInitiaValue({
         fullName: info.fullName,
         phone: info.phone,
         address: info.address,
      });
      setLoading(false);
   }, []);

   let form = { ...JSON.parse(window.localStorage.getItem('infoUser')), password: '' };
   const handleSubmitForm = async (values) => {
      setInitiaValue({
         fullName: values.fullName,
         phone: values.phone,
         address: values.address,
      });
      setEdit(!edit);
      const newValue = {
         email: values.email,
         fullName: values.fullName,
         password: values.password,
         phone: values.phone,
         address: values.address,
      };
      try {
         await User.update(newValue, token).then(async () => {
            const infoUser = await User.getByJWT(token);
            await dispatch(userUpdate(infoUser.data)).unwrap();
            localStorage.setItem('infoUser', JSON.stringify(infoUser.data));
         });
         setEdit(true);
      } catch (error) {
         console.log('error', error);
         const response = error.response.data;
         console.log('response', response);
      }
   };

   return (
      <>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         <div className={cln('wrapper')}>
            <div className={cln('wrapper-container')}>
               <div className={cln('container-infomation')}>
                  <div className={cln('form-info')}>
                     <h2>User Information</h2>
                     <span>Here you can edit public infomation about yourselt.</span>
                  </div>
                  <div>
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
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                 <Form.Label>Email</Form.Label>
                                 <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={values.email}
                                    disabled
                                 />
                              </Form.Group>
                              <div
                                 style={{
                                    display: 'flex',
                                    gap: '20px',
                                    justifyContent: 'center',
                                 }}>
                                 <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control
                                       type="text"
                                       placeholder="Full name"
                                       name="fullName"
                                       defaultValue={values.fullName}
                                       onChange={handleChange}
                                       disabled={edit}
                                       isInvalid={touched.fullName && !!errors.fullName}
                                       ref={inputName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                       {errors.fullName}
                                    </Form.Control.Feedback>
                                 </Form.Group>
                                 <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="phone"
                                       placeholder="Phone"
                                       defaultValue={values.phone}
                                       onChange={handleChange}
                                       disabled={edit}
                                       isInvalid={touched.phone && !!errors.phone}
                                       ref={inputPhone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                       {errors.phone}
                                    </Form.Control.Feedback>
                                 </Form.Group>
                              </div>
                              <Form.Group className="mb-3" controlId="formBasicAddress">
                                 <Form.Label>Address</Form.Label>
                                 <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Enter address"
                                    defaultValue={values.address}
                                    onChange={handleChange}
                                    disabled={edit}
                                    isInvalid={touched.address && !!errors.address}
                                    ref={inputAddr}
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                 </Form.Control.Feedback>
                              </Form.Group>
                              {!edit && (
                                 <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control
                                       type="password"
                                       name="password"
                                       placeholder="Enter password"
                                       defaultValue={values.password}
                                       onChange={handleChange}
                                       isInvalid={touched.password && !!errors.password}
                                       disabled={edit}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                       {errors.password}
                                    </Form.Control.Feedback>
                                 </Form.Group>
                              )}
                              <span>Purchase Invoice: {infoUser?.purchaseInvoice}</span>
                              {!edit && (
                                 <div className={cln('btn')}>
                                    <Button variant="outline-primary" type="submit">
                                       Update
                                    </Button>
                                    <Button
                                       variant="outline-danger"
                                       onClick={() => {
                                          setEdit(true);
                                          inputName.current.value = initiaValue?.fullName;
                                          inputPhone.current.value = initiaValue?.phone;
                                          inputAddr.current.value = initiaValue?.address;
                                       }}>
                                       Cancel
                                    </Button>
                                 </div>
                              )}
                           </Form>
                        )}
                     </Formik>
                     {edit && (
                        <div className={cln('btn-edit')}>
                           <Button
                              variant="outline-primary"
                              onClick={() => {
                                 setEdit(!edit);
                              }}>
                              edit
                           </Button>
                        </div>
                     )}
                  </div>
               </div>
               <div className={cln('container-photo')}>
                  <img src={img_person} alt="" />
               </div>
            </div>
         </div>
      </>
   );
}

export default SettingPage;
