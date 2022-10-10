import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Category from 'API/Category';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { useLocation, useSearchParams } from 'react-router-dom';
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
   const [searchParams, setSearchParams] = useSearchParams();
   const [title, setTitle] = useState();
   const [categories, setCategories] = useState([]);
   const timing = useRef(null);
   const [keyword, setKeyWord] = useState('');
   useEffect(() => {
      const q = searchParams.get('q');
      const id = searchParams.get('id');
      const name = searchParams.get('name');
      if (id || name || q) {
         setTitle(name);
      } else {
         setTitle('Tất cả');
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
      setKeyWord(searchParams.get('q') ? searchParams.get('q') : '');
   }, []);
   const handleSetCategory = async (e) => {
      const categoryId = e.target.attributes.categoryid.value;
      const categoryName = e.target.attributes.categoryname.value;
      if (categoryId === 0 || categoryName === 'Tất cả') {
         searchParams.delete('id');
         searchParams.delete('name');
         setTitle('Tất cả');
         setSearchParams(searchParams);
      } else {
         setTitle(categoryName);
         searchParams.set('id', categoryId);
         searchParams.set('name', categoryName);
         setSearchParams(searchParams);
      }
   };
   const handleSearch = (e) => {
      setKeyWord(e.target.value);
      if (timing.current) {
         clearTimeout(timing.current);
      }
      timing.current = setTimeout(() => {
         if (e.target.value === '') {
            searchParams.delete('q');
         } else {
            searchParams.set('q', e.target.value);
         }
         setSearchParams(searchParams);
      }, 500);
   };
   return (
      <div className={cln('wrapper')}>
         <InputGroup className={cln('input-group')}>
            <Form.Control
               type="search"
               placeholder="Search"
               value={keyword}
               onChange={handleSearch}
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
