import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SettingPage.module.scss';
import { Button, Form, Spinner, Tab, Tabs } from 'react-bootstrap';
import img_photo from '../../../images/1 1.png';
import { useState } from 'react';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
const cln = classNames.bind(styles);
SettingPage.propTypes = {};

const schema = yup.object().shape({
   email: yup.string().required('Email not null').email('Please enter a valid email'),
   fullName: yup.string().required('Full name not null'),
   phone: yup.string().required('Phone not null'),
});
function SettingPage(props) {
   const [edit, setEdit] = useState(true);
   const [infoUser, setInfoUser] = useState();
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      setInfoUser(JSON.parse(window.localStorage.getItem('infoUser')));
      setLoading(false);
   }, []);
   const form = {};
   const handleEdit = (e) => {
      setEdit(!edit);
   };
   const handleSubmitForm = () => {};
   return (
      <>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         <div className={cln('wrapper')}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
               <Tab eventKey="profile" title="Account Setting">
                  <div className={cln('wrapper-container')}>
                     <div className={cln('container-infomation')}>
                        <div className={cln('form-info')}>
                           <h2>User Information</h2>
                           <span>Here you can edit public infomation about yourselt.</span>
                           <br />
                           <span>
                              The changes will be displayed for other users within 5 minutes.
                           </span>
                        </div>
                        <div>
                           <Formik
                              validationSchema={schema}
                              onSubmit={handleSubmitForm}
                              initialValues={form}>
                              {({ handleSubmit, values, errors }) => (
                                 <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                       <Form.Label>Email address</Form.Label>
                                       <Form.Control
                                          type="email"
                                          placeholder="Enter email"
                                          defaultValue={infoUser?.email}
                                          disabled={edit}
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
                                             defaultValue={infoUser?.fullName}
                                             disabled={edit}
                                          />
                                       </Form.Group>
                                       <Form.Group className="mb-3" controlId="formBasicPhone">
                                          <Form.Label>Phone</Form.Label>
                                          <Form.Control
                                             type="text"
                                             placeholder="Phone"
                                             defaultValue={infoUser?.phone}
                                             disabled={edit}
                                          />
                                       </Form.Group>
                                    </div>
                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                       <Form.Label>Address</Form.Label>
                                       <Form.Control
                                          type="text"
                                          placeholder="Enter address"
                                          defaultValue={infoUser?.email}
                                          disabled={edit}
                                       />
                                    </Form.Group>
                                    <span>Purchase Invoice: {infoUser?.purchaseInvoice}</span>
                                    {edit ? (
                                       <Button variant="outline-primary" onClick={handleEdit}>
                                          Edit
                                       </Button>
                                    ) : (
                                       <Button variant="outline-primary" onClick={handleEdit}>
                                          Update
                                       </Button>
                                    )}
                                 </Form>
                              )}
                           </Formik>
                        </div>
                     </div>
                     <div className={cln('container-photo')}>
                        <span>Profile Photo</span>
                        <div>
                           <img src={img_photo} alt="" />
                        </div>
                     </div>
                  </div>
               </Tab>
               <Tab eventKey="setups" title="Interface Setting">
                  <h1>Interface Setting</h1>
               </Tab>
            </Tabs>
         </div>
      </>
   );
}

export default SettingPage;
