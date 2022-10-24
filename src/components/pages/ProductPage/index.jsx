import Product_API from 'API/Product_API';
import classNames from 'classnames/bind';
import Product from 'components/shareComponents/Product';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import img_error from '../../../images/removebg.png';
import styles from './ProductPage.module.scss';
const cln = classNames.bind(styles);
ProductPage.propTypes = {
   categories: PropTypes.string,
};
ProductPage.DefautlProps = {
   categories: 'all',
};

function ProductPage(props) {
   const [data, setData] = useState([]);
   const [searchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [deleteId, setDeleteId] = useState('');
   const [update, setUpdate] = useState(false);
   useEffect(() => {
      const id = searchParams.get('id');
      const q = searchParams.get('q');
      setLoading(true);
      const fetchProduct = async () => {
         try {
            let response = await Product_API.search({
               category_id: id,
               product_name: q,
            });
            setData(response.data.result);
            setLoading(false);
         } catch (error) {
            console.log('error', error);
            setData(undefined);
            setLoading(false);
         }
      };
      fetchProduct();
   }, [searchParams, update]);
   useEffect(() => {
      if (deleteId === '') {
         return;
      } else {
         setData(
            data?.filter((item) => {
               return item.productId != deleteId;
            }),
         );
      }
   }, [deleteId]);
   return (
      <>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         <div className={cln('wrapper')}>
            {data?.length > 0 ? (
               <div className={cln('product')}>
                  {data.map((value, index) => {
                     return (
                        <Product
                           key={index}
                           value={value}
                           setDeleteId={setDeleteId}
                           update={update}
                           setUpdate={setUpdate}
                        />
                     );
                  })}
               </div>
            ) : data?.length === 0 && !loading ? (
               <div className={cln('error')}>
                  <div className={cln('error-title')}>
                     <span>No product found!!</span>
                  </div>
               </div>
            ) : (
               !loading && (
                  <div className={cln('error')}>
                     <div className={cln('error-img')}>
                        <img src={img_error} alt="" />
                     </div>
                     <div className={cln('error-title')}>
                        <span>Website not working, please reload!</span>
                     </div>
                  </div>
               )
            )}
         </div>
      </>
   );
}

export default ProductPage;
