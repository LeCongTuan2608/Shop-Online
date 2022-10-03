import Category from 'API/Category';
import Product_API from 'API/Product_API';
import classNames from 'classnames/bind';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Row, Spinner } from 'react-bootstrap';
import * as yup from 'yup';
import styles from './AddProduct.module.scss';
import PropTypes from 'prop-types';

const cln = classNames.bind(styles);

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const validateImageType = (value) => {
   if (value) {
      let type = value.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
      return SUPPORTED_FORMATS.includes(type);
   }
};
const schema = yup.object().shape({
   nameProduct: yup.string().required('Please enter name product'),
   price: yup
      .number()
      .integer('Input must be an integer')
      .required('Please enter price product')
      .min(1000),
   description: yup.string().required('Please enter description product'),
   amount: yup
      .number()
      .integer('Input must be an integer')
      .required('Please enter price product')
      .min(1),
});

AddProduct.propTypes = {};
function AddProduct(props) {
   const [images, setImages] = useState();
   const [category, setCategory] = useState([]);
   const [title, setTitle] = useState({ name: 'Choose', id: null });
   const [showError, setShowError] = useState({ categories: false, image: false });
   const [success, setSuccess] = useState({ status: false, message: '', color: 'red' });
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fechCategory = async () => {
         try {
            const response = await Category.getAll();
            setCategory(response.data.result);
         } catch (error) {
            console.log('error', error);
         }
      };
      fechCategory();
      return () => {
         images && URL.revokeObjectURL(images.preview);
      };
   }, [images]);

   const handleSetCategory = (e) => {
      setTitle({
         name: e.target.attributes.categoryname.value,
         id: e.target.attributes.categoryid.value,
      });
      setShowError(false);
   };

   const handlePreviewImage = (e) => {
      const file = e.target.files[0];
      if (file) {
         file.preview = URL.createObjectURL(file);
         console.log(file);
         setImages(file);
      } else {
         setImages('');
         return;
      }
   };
   const form = {
      nameProduct: '',
      price: '',
      description: '',
      amount: '',
   };
   const handleSubmitForm = async (value) => {
      const token = {
         tokenType: window.localStorage.getItem('tokenType'),
         token: window.localStorage.getItem('token'),
      };
      const data = new FormData();
      data.append('name', value.nameProduct);
      data.append('price', value.price);
      data.append('des', value.description);
      data.append('amount', value.amount);
      data.append('imageFiles', images);
      data.append('categoryId', title.id);

      if (!title.id) {
         setShowError({ ...showError, categories: true });
         console.log(showError);
      } else if (!images) {
         setShowError({ ...showError, image: true });
         console.log(showError);
      } else {
         try {
            setLoading(true);
            const product = await Product_API.add(data, token);
            console.log('product', product);
            setSuccess({ status: true, message: product.data.message, color: 'green' });
            setLoading(false);
         } catch (error) {
            setLoading(false);
            console.log('error', error);
            setSuccess({ status: true, message: 'CÓ LỖI XẢY RA KHI THÊM SẢN PHẨM', color: 'red' });
         }
      }
   };
   return (
      <div className={cln('wrapper')} style={images ? undefined : { justifyContent: 'center' }}>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         <div className={cln('container_form')}>
            <Formik validationSchema={schema} onSubmit={handleSubmitForm} initialValues={form}>
               {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                     <Form.Group as={Col} md="4" controlId="validationFormik01">
                        <Form.Label>Name product</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Name product"
                           name="nameProduct"
                           value={values.nameProduct}
                           onChange={handleChange}
                           isInvalid={touched.nameProduct && !!errors.nameProduct}
                        />
                        <Form.Control.Feedback type="invalid">
                           {errors.nameProduct}
                        </Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group as={Col} md="4" controlId="validationFormik02">
                        <Form.Label>Price product</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Price"
                           name="price"
                           value={values.price}
                           onChange={handleChange}
                           isInvalid={touched.price && !!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group as={Col} md="6" controlId="validationFormik03">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Description"
                           name="description"
                           value={values.description}
                           onChange={handleChange}
                           isInvalid={touched.description && !!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                           {errors.description}
                        </Form.Control.Feedback>
                     </Form.Group>
                     <Row className={cln('row_form')}>
                        <Form.Group as={Col} md="6" controlId="validationFormik04">
                           <Form.Label>Amount</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="Amount"
                              name="amount"
                              value={values.amount}
                              onChange={handleChange}
                              isInvalid={touched.amount && !!errors.amount}
                           />
                           <Form.Control.Feedback type="invalid">
                              {errors.amount}
                           </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="validationFormik05">
                           <Form.Label>Categories</Form.Label>
                           <DropdownButton id="dropdown-basic-button" title={title.name}>
                              {category.length !== 0 ? (
                                 category.map((value, index) => {
                                    return (
                                       <Dropdown.Item
                                          categoryname={value.categoryName}
                                          categoryid={index + 1}
                                          key={index}
                                          onClick={handleSetCategory}>
                                          {value.categoryName}
                                       </Dropdown.Item>
                                    );
                                 })
                              ) : (
                                 <Dropdown.Item>Null</Dropdown.Item>
                              )}
                           </DropdownButton>
                           {showError.categories && (
                              <div
                                 style={{
                                    margin: '4px 0 0 0',
                                    color: '#dc3545',
                                    fontSize: '14px',
                                 }}>
                                 Please, choose categories!
                              </div>
                           )}
                        </Form.Group>
                     </Row>
                     <Form.Group as={Col} md="6" controlId="validationFormik06">
                        <Form.Label>Choose image</Form.Label>
                        <Form.Control
                           type="file"
                           placeholder="Image"
                           name="image"
                           onChange={handlePreviewImage}
                        />
                        {showError.image && (
                           <div
                              style={{
                                 margin: '4px 0 0 0',
                                 color: '#dc3545',
                                 fontSize: '14px',
                              }}>
                              Please, upload file image!
                           </div>
                        )}
                     </Form.Group>

                     {success.status ? (
                        <div
                           style={{
                              textAlign: 'center',
                              color: `${success.color}`,
                              fontSize: '16px',
                           }}>
                           {success.message}
                        </div>
                     ) : undefined}
                     <Button type="submit" value="Submit">
                        Add product
                     </Button>
                  </Form>
               )}
            </Formik>
         </div>
         {images ? (
            <div className={cln('container_img')}>
               <div className={cln('contents_img')}>
                  <img src={images.preview} alt="" />
               </div>
            </div>
         ) : undefined}
      </div>
   );
}

export default AddProduct;
