import Product_API from 'API/Product_API';
import classNames from 'classnames/bind';
import Product from 'components/shareComponents/Product';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import img_error from '../../../images/removebg.png';
import { Spinner } from 'react-bootstrap';
const cln = classNames.bind(styles);
ProductPage.propTypes = {
   categories: PropTypes.string,
};
ProductPage.DefautlProps = {
   categories: 'all',
};

function ProductPage(props) {
   const [data, setData] = useState([]);
   const location = useLocation();
   const getCategoryRedux = useSelector((state) => state.category);
   const getRedux = useSelector((state) => state);
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      const id = window.localStorage.getItem('categoryid');
      setLoading(true);
      const fetchProduct = async () => {
         try {
            let response;
            if (id == 0) {
               response = await Product_API.getAll();
               setData(response.data.result);
               setLoading(false);
               console.log('response', response);
            } else {
               response = await Product_API.getByCategory(
                  getCategoryRedux?.current?.categoryId || id,
               );
               setData(response.data.result);
               setLoading(false);
            }
         } catch (error) {
            console.log('error', error);
            setData(undefined);
            setLoading(false);
         }
      };
      fetchProduct();
   }, [getCategoryRedux?.current]);

   return (
      <div className={cln('wrapper')}>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         {data ? (
            <div className={cln('product')}>
               {data.map((value, index) => {
                  return <Product key={index} value={value} /> || <Skeleton />;
               })}
            </div>
         ) : (
            <div className={cln('error')}>
               <div className={cln('error-img')}>
                  <img src={img_error} alt="" />
               </div>
               <div className={cln('error-title')}>
                  <span>The website is down, please reload!</span>
               </div>
            </div>
         )}
      </div>
   );
}

export default ProductPage;
