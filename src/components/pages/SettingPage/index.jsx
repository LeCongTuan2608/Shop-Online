import User from 'API/User';
import classNames from 'classnames/bind';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { userUpdate } from 'Slide/UserSlide';
import * as yup from 'yup';
import img_person from '../../../images/person.png';
import styles from './SettingPage.module.scss';
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
   const [showError, setShowError] = useState(false);
   const [succ, setSucc] = useState(false);
   const [key, setKey] = useState('info');
   const [searchParams, setSearchParams] = useSearchParams();
   const [validated, setValidated] = useState(false);
   const [errorss, setErrorss] = useState(false);

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
   }, [searchParams]);

   let form = { ...JSON.parse(window.localStorage.getItem('infoUser')), password: '' };
   const handleShowAlert = (status) => {
      setShowError(status);
      setTimeout(() => {
         setShowError(false);
         setSucc(false);
      }, 2500);
   };
   const handleSubmitForm = async (values) => {
      setInitiaValue({
         fullName: values.fullName,
         phone: values.phone,
         address: values.address,
      });
      const newValue = {
         email: values.email,
         fullName: values.fullName,
         password: values.password,
         phone: values.phone,
         address: values.address,
      };
      setLoading(true);
      try {
         await User.update(newValue, token).then(async () => {
            const infoUser = await User.getByJWT(token);
            await dispatch(userUpdate(infoUser.data)).unwrap();
            localStorage.setItem('infoUser', JSON.stringify(infoUser.data));
            let status = true;
            handleShowAlert(status);
         });
         setEdit(true);
         setSucc(true);
      } catch (error) {
         console.log('error', error);

         let status = false;
         handleShowAlert(status);
         setSucc(true);
      }
      setLoading(false);
   };
   const handleSubmitChangePW = async (event) => {
      // const form = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();
      // if (form.checkValidity() === false) {
      // }
      if (event.target[1].value === event.target[2].value) {
         setValidated(true);
         setErrorss(false);
         if (event.target[1].value && event.target[2].value !== '') {
            setLoading(true);
            const data = {
               email: infoUser.email,
               oldPassword: event.target[0].value,
               newPassword: event.target[1].value,
            };
            try {
               const response = await User.changePW(data, token);
               console.log('response', response);
               handleShowAlert(true);
               setSucc(true);
            } catch (error) {
               console.log('error', error);
               handleShowAlert(false);
               setSucc(true);
            }
            setLoading(false);
         }
      } else {
         setErrorss(true);
      }
   };
   return (
      <>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         {showError ? (
            <Alert className={cln('message')} variant="success">
               Update success!!
            </Alert>
         ) : succ ? (
            <Alert className={cln('message')} variant="danger">
               Update failed!!
            </Alert>
         ) : undefined}

         <div className={cln('wrapper')}>
            <div className={cln('wrapper-container')}>
               <div style={{ zIndex: '2' }}>
                  <Tabs
                     id="controlled-tab-example"
                     activeKey={searchParams.get('q') ? searchParams.get('q') : key}
                     onSelect={(k) => {
                        searchParams.set('q', k);
                        setSearchParams(searchParams);
                        setKey(searchParams.get('q'));
                     }}
                     className="mb-3">
                     <Tab eventKey="info" title="Info">
                        <div className={cln('container-information')}>
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
                                          <Form.Group
                                             className="mb-3"
                                             controlId="formBasicPassword">
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
                                       Edit
                                    </Button>
                                 </div>
                              )}
                           </div>
                        </div>
                     </Tab>
                     <Tab eventKey="password" title="Password">
                        <div className={cln('password-wrapper')}>
                           <div className={cln('password-container')}>
                              <Form
                                 noValidate
                                 validated={validated}
                                 onSubmit={handleSubmitChangePW}>
                                 <Row
                                    className="mb-3"
                                    style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Group as={Col} md="6">
                                       <Form.Label>Old Password</Form.Label>
                                       <Form.Control
                                          type="password"
                                          placeholder="Old Password"
                                          required
                                       />
                                       <Form.Control.Feedback type="invalid">
                                          Please enter old password.
                                       </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                       <Form.Label>New Password</Form.Label>
                                       <Form.Control
                                          type="password"
                                          placeholder="New Password"
                                          required
                                       />
                                       <Form.Control.Feedback type="invalid">
                                          Please enter new password.
                                       </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                       <Form.Label>Confirm Password</Form.Label>
                                       <Form.Control
                                          type="password"
                                          placeholder="Confirm Password"
                                          required
                                       />
                                       <Form.Control.Feedback type="invalid">
                                          Please enter comfirm password.
                                       </Form.Control.Feedback>
                                       {errorss && (
                                          <span style={{ color: 'red', fontSize: '.875em' }}>
                                             Wrong password confirmation!
                                          </span>
                                       )}
                                    </Form.Group>
                                 </Row>

                                 <Button type="submit">Change Password</Button>
                              </Form>
                           </div>
                        </div>
                     </Tab>
                  </Tabs>
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
