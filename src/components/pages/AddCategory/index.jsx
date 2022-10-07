import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AddCategory.module.scss';
import { Button, Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import Category from 'API/Category';
import { useState } from 'react';
import { useRef } from 'react';
import CategoryField from './CategoryField';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
const cln = classNames.bind(styles);
AddCategory.propTypes = {};

function AddCategory(props) {
   const [category, setCategory] = useState([]);
   const [field, setField] = useState(false);
   const [token, setToken] = useState();
   const inputField = useRef();
   const [loading, setLoading] = useState(true);

   const fechCategory = async () => {
      try {
         const responese = await Category.getAll();
         setCategory(responese.data.result);
      } catch (error) {
         console.log('error', error);
      }
   };
   useEffect(() => {
      setToken({
         tokenType: window.localStorage.getItem('tokenType'),
         token: window.localStorage.getItem('token'),
      });
      setLoading(true);
      fechCategory();
      setLoading(false);
   }, []);

   const handleAdd = async () => {
      const data = new FormData();
      data.append('name', inputField.current.value);
      try {
         setLoading(true);
         await Category.add(data, token);
         fechCategory();
         setLoading(false);
         setField(false);
      } catch (error) {
         console.log('error', error);
         setLoading(false);
      }
   };
   const handleBlur = () => {
      console.log(inputField.current.value);
   };

   return (
      <div className={cln('wrapper')}>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         <h1>add category</h1>
         <div className={cln('container')}>
            <div className={cln('table_category')}>
               <Table striped bordered hover size="sm">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Category</th>
                     </tr>
                  </thead>
                  <tbody>
                     {category?.map((value, index) => {
                        return (
                           <CategoryField
                              key={index}
                              value={value}
                              token={token}
                              setLoading={setLoading}
                           />
                        );
                     })}
                     {field && (
                        <tr className={cln('new-field')}>
                           <td>{category.length + 1}</td>
                           <td className={cln('input-field')}>
                              <input ref={inputField} type="text" onBlur={handleBlur} />
                              <Button variant="primary" onClick={handleAdd}>
                                 Add
                              </Button>
                              <Button
                                 variant="danger"
                                 onClick={(e) => {
                                    setField(false);
                                 }}>
                                 Cancel
                              </Button>
                           </td>
                        </tr>
                     )}
                     <tr className={cln('add-category')}>
                        <td onClick={() => setField(true)}>
                           <AddOutlinedIcon />
                        </td>
                     </tr>
                  </tbody>
               </Table>
            </div>
         </div>
      </div>
   );
}

export default AddCategory;
