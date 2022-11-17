import Product_API from 'API/Product_API';
import classNames from 'classnames/bind';
import Product from 'components/shareComponents/Product';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { Alert, Nav, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
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
   const [infoUser, setInfoUser] = useState(JSON.parse(localStorage.getItem('infoUser')));
   const [searchParams, setSearchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [deleteId, setDeleteId] = useState('');
   const [update, setUpdate] = useState(false);
   const [key, setKey] = useState('products');
   const [data, setData] = useState([]);
   useEffect(() => {
      const id = searchParams.get('id');
      const q = searchParams.get('q');
      const list = searchParams.get('list');

      setKey(list);
      setLoading(true);
      const fetchProduct = async () => {
         try {
            let response;
            if (list === 'get_product_hot') {
               response = await Product_API.getHot();
            } else {
               response = await Product_API.search({
                  category_id: id,
                  product_name: q,
               });
            }
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

   const htmlError = (listData) => {
      listData?.length === 0 && !loading ? (
         <div className={cln('error')}>
            <div className={cln('error-title')}>
               <span>Not found!!</span>
            </div>
         </div>
      ) : (
         !loading && (
            <div className={cln('error')}>
               <div className={cln('error-img')}>
                  <img src={img_error} alt="" />
               </div>
               <div className={cln('error-title')}>
                  <span>Please check the network connection!!</span>
               </div>
            </div>
         )
      );
   };
   const handleClickButton = (list) => {
      if (list === 'products') {
         searchParams.delete('list', list);
         setSearchParams(searchParams);
      } else {
         searchParams.delete('id');
         searchParams.set('list', list);
         setSearchParams(searchParams);
      }
      setKey(list);
   };
   return (
      <>
         {loading && (
            <div className={cln('loading')}>
               <Spinner animation="grow" variant="info" />
            </div>
         )}
         <div className={cln('wrapper')} style={{ height: data?.length > 0 ? 'auto' : '100%' }}>
            <Tab.Container id="left-tabs-example" activeKey={key === null ? 'products' : key}>
               <Row>
                  <Nav
                     variant="pills"
                     className="flex-row gap-1 mb-2"
                     style={{ padding: '0 15px' }}>
                     <Nav.Item
                        onClick={() => {
                           handleClickButton('products');
                        }}>
                        <Nav.Link eventKey="products" style={{ border: '1px solid #0d6efd' }}>
                           Products
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item
                        onClick={() => {
                           handleClickButton('get_product_hot');
                        }}>
                        <Nav.Link
                           eventKey="get_product_hot"
                           style={{ border: '1px solid #0d6efd' }}>
                           Product{' '}
                           <span
                              style={{
                                 color: 'red',
                                 fontStyle: 'italic',
                                 fontWeight: '500',
                              }}>
                              hot
                           </span>
                        </Nav.Link>
                     </Nav.Item>
                     {infoUser?.role === 'ADMIN' && (
                        <Nav.Item
                           onClick={() => {
                              handleClickButton('almostOver');
                           }}>
                           <Nav.Link eventKey="almostOver" style={{ border: '1px solid #0d6efd' }}>
                              Almost over
                           </Nav.Link>
                        </Nav.Item>
                     )}
                  </Nav>
                  <Tab.Content>
                     <Tab.Pane eventKey="products">
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
                        ) : (
                           htmlError(data)
                        )}
                     </Tab.Pane>
                     <Tab.Pane eventKey="get_product_hot">
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
                        ) : (
                           htmlError(data)
                        )}
                     </Tab.Pane>
                     {infoUser?.role === 'ADMIN' && (
                        <Tab.Pane eventKey="almostOver">
                           {data?.length > 0 ? (
                              <div className={cln('product')}>
                                 {data.map((value, index) => {
                                    return (
                                       value.productAmount <= 5 && (
                                          <Product
                                             key={index}
                                             value={value}
                                             setDeleteId={setDeleteId}
                                             update={update}
                                             setUpdate={setUpdate}
                                          />
                                       )
                                    );
                                 })}
                              </div>
                           ) : (
                              htmlError(data)
                           )}
                        </Tab.Pane>
                     )}
                  </Tab.Content>
               </Row>
            </Tab.Container>
         </div>
      </>
   );
}

export default ProductPage;
