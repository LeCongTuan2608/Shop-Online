import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AddCategory.module.scss';
import { Alert, Button, Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import Category from 'API/Category';
import { useState } from 'react';
import { useRef } from 'react';
import CategoryField from './CategoryField';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSearchParams } from 'react-router-dom';
const cln = classNames.bind(styles);
AddCategory.propTypes = {};

function AddCategory(props) {
   const [category, setCategory] = useState([]);
   const [field, setField] = useState(false);
   const [token, setToken] = useState();
   const [loading, setLoading] = useState(true);
   const [showError, setShowError] = useState(false);
   const [showSucc, setShowSucc] = useState(false);
   const [inputSearch, setInputSearch] = useState('');
   const inputField = useRef();
   const refInputSearch = useRef(null);
   const [searchParams, setSearchParams] = useSearchParams();
   const fechCategory = async () => {
      try {
         const response = await Category.getAll();
         setCategory(response.data.result);
         setLoading(false);
      } catch (error) {
         console.log('error', error);
         setLoading(false);
      }
   };
   useEffect(() => {
      setToken({
         tokenType: window.localStorage.getItem('tokenType'),
         token: window.localStorage.getItem('token'),
      });
      fechCategory();
   }, []);

   const handleAdd = async () => {
      const data = new FormData();
      data.append('name', inputField.current.value);
      try {
         setLoading(true);
         await Category.add(data, token);
         fechCategory();
         setField(false);
      } catch (error) {
         console.log('error', error);
         setLoading(false);
      }
   };
   const handleSearch = (e) => {
      setInputSearch(e.target.value);
      if (refInputSearch.current) {
         clearTimeout(refInputSearch.current);
      }
      refInputSearch.current = setTimeout(async () => {
         setLoading(true);
         searchParams.set('q', e.target.value);
         setSearchParams(searchParams);
         if (e.target.value === '') {
            searchParams.delete('q');
            setSearchParams(searchParams);
         }
         try {
            const response = await Category.search({ name: e.target.value });
            setCategory(response.data.result);
            setLoading(false);
         } catch (error) {
            console.log('error', error);
            setLoading(false);
         }
      }, 400);
   };

   return (
      <>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         {showError && (
            <Alert className={cln('message')} variant="danger">
               Categories cannot be empty!
            </Alert>
         )}
         {showSucc && (
            <Alert className={cln('message')} variant="success">
               Update successful
            </Alert>
         )}
         <div className={cln('wrapper')}>
            <InputGroup className={`mb-3 ${cln('input-search')}`}>
               <Form.Control value={inputSearch} onChange={handleSearch} />
            </InputGroup>
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
                        {category.length > 0 ? (
                           category?.map((value, index) => {
                              return (
                                 <CategoryField
                                    key={index}
                                    value={value}
                                    token={token}
                                    setLoading={setLoading}
                                    setShowError={setShowError}
                                    setShowSucc={setShowSucc}
                                 />
                              );
                           })
                        ) : (
                           <tr style={{ textAlign: 'center' }}>
                              <td colSpan={2}>Not found !!</td>
                           </tr>
                        )}
                        {field && (
                           <tr className={cln('new-field')}>
                              <td>{category.length + 1}</td>
                              <td className={cln('input-field')}>
                                 <input ref={inputField} type="text" />
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
      </>
   );
}

export default AddCategory;
