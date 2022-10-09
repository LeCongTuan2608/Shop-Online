import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CategoryField.module.scss';
import { Button } from 'react-bootstrap';
import Category from 'API/Category';
const cln = classNames.bind(styles);
CategoryField.propTypes = {};

function CategoryField(props) {
   const { value, token, setLoading, setShowError, setShowSucc } = props;
   const [active, setActive] = useState(false);

   const categoryid = useRef();
   const categoryname = useRef();

   const handleUpdate = async () => {
      if (categoryname.current.value) {
         const data = new FormData();
         data.append('name', categoryname.current.value);
         if (categoryname.current.value === value.categoryName) {
            setActive(false);
            return;
         }
         try {
            setLoading(true);
            const response = await Category.update(data, categoryid.current.innerText, token);
            console.log('response', response);
            setActive(false);
            value.categoryName = categoryname.current.value;
            setLoading(false);
            setShowSucc(true);
            setTimeout(() => {
               setShowSucc(false);
            }, 2500);
         } catch (error) {
            console.log('error', error);
            setLoading(false);
         }
      } else {
         setShowError(true);
         setTimeout(() => {
            setShowError(false);
         }, 2500);
      }
   };
   return (
      <tr className={cln('field')}>
         <td ref={categoryid}>{value.categoryId}</td>
         <td className={cln('input-field')} style={{ display: active ? 'flex' : undefined }}>
            {active ? (
               <input defaultValue={value?.categoryName} id="name" name="name" ref={categoryname} />
            ) : (
               <span
                  onClick={() => {
                     setActive(true);
                  }}>
                  {value?.categoryName}
               </span>
            )}

            {active && (
               <div>
                  <Button variant="primary" onClick={handleUpdate}>
                     Update
                  </Button>
                  <Button
                     variant="danger"
                     onClick={(e) => {
                        setActive(false);
                     }}>
                     Cancel
                  </Button>
               </div>
            )}
         </td>
      </tr>
   );
}

export default CategoryField;
