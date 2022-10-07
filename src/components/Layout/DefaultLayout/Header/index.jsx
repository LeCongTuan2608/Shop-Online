import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Category from 'API/Category';
import { categoryProduct } from 'Auth/CategorySlide';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import History from '../../../../History';
import styles from './Header.module.scss';
const cln = classNames.bind(styles);
Header.propTypes = {
   setCategory: PropTypes.func,
};
Header.DefautlProps = {
   setCategory: null,
};

function Header(props) {
   const location = useLocation();
   const dispatch = useDispatch();
   const [title, setTitle] = useState(window.localStorage.getItem('categoryname'));
   const [categories, setCategories] = useState([]);

   const getCategoryRedux = useSelector((state) => state.category);

   useEffect(() => {
      const params = new URLSearchParams(location.search);
      const q = params.get('q');
      if (q) {
         setTitle(window.localStorage.getItem('categoryname'));
      } else {
         setTitle('Tất cả');
         window.localStorage.setItem('categoryid', 0);
         window.localStorage.setItem('categoryname', 'Tất cả');
      }
      const fechCategory = async () => {
         try {
            const response = await Category.getAll();
            setCategories([{ categoryId: 0, categoryName: 'Tất cả' }, ...response.data.result]);
         } catch (error) {
            console.log('error', error);
         }
      };
      fechCategory();
   }, []);
   const handleSetCategory = async (e) => {
      const categoryId = e.target.attributes.categoryid.value;
      const categoryName = e.target.attributes.categoryname.value;
      const valueObj = {
         categoryId: categoryId,
         categoryName: categoryName,
      };

      setTitle(categoryName);
      History.push(`?q=${categoryName}`);
      window.localStorage.setItem('categoryid', categoryId);
      window.localStorage.setItem('categoryname', categoryName);
      await dispatch(categoryProduct(valueObj)).unwrap();
   };
   return (
      <div className={cln('wrapper')}>
         <InputGroup className={cln('input-group')}>
            <Form.Control
               type="search"
               placeholder="Search"
               aria-label="search"
               aria-describedby="basic-addon2"
            />
            <Button className={cln('button')} variant="outline-secondary" id="button-addon2">
               <SearchOutlinedIcon />
            </Button>
         </InputGroup>
         {location.pathname === '/product' && (
            <div className={cln('options')}>
               <DropdownButton
                  variant="outline-primary"
                  id="dropdown-basic-button"
                  title={`Categories: ${title}`}>
                  {categories.length !== 0 ? (
                     categories.map((value, index) => {
                        return (
                           <Dropdown.Item
                              categoryname={value.categoryName}
                              categoryid={value.categoryId}
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
            </div>
         )}
      </div>
   );
}

export default Header;
