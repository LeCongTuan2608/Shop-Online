import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchPage.module.scss';
import img_ca from '../../../images/ca.jfif';
import img_camap from '../../../images/camap.jfif';
import img_opdt from '../../../images/opdt.jfif';
import Product from 'components/shareComponents/Product';
const cln = classNames.bind(styles);
SearchPage.propTypes = {};

function SearchPage(props) {
   // const arrTest = [
   //    {
   //       image: img_ca,
   //       title: 'Mặt Nạ Đội Đầu Hình Cá ',
   //       priced: '50.000',
   //       description:
   //          'Mũ Net Red Đầu cá Douyin Nam và Nữ Mặt nạ đội đầu cá Màu xanh lá cây Đầu cá Con người dễ thương Cát vui nhộn Khắc đầu màu xanh lá cây Động vật',
   //       category: 'electronics',
   //    },
   //    {
   //       image: img_camap,
   //       title: 'Bàn học gỗ',
   //       priced: '38.500',
   //       description: 'Dép đi trong nhà AYUER hình cá mập 4cm',
   //       category: 'wood',
   //    },
   //    {
   //       image: img_opdt,
   //       title: 'Ốp lưng iphone',
   //       priced: '42.700',
   //       description:
   //          'Ốp lưng điện thoại Little Monster có hoa văn bên hông cho iPhone 6 6S 6splus 7 8 7plus 8plus X Xs Xr Xsmax 11 12 13 Pro Max',
   //       category: 'wood',
   //    },
   //    {
   //       image: img_ca,
   //       title: 'Mặt Nạ Đội Đầu Hình Cá ',
   //       priced: '50.000',
   //       description:
   //          'Mũ Net Red Đầu cá Douyin Nam và Nữ Mặt nạ đội đầu cá Màu xanh lá cây Đầu cá Con người dễ thương Cát vui nhộn Khắc đầu màu xanh lá cây Động vật',
   //       category: 'electronics',
   //    },
   //    {
   //       image: img_camap,
   //       title: 'Bàn học gỗ',
   //       priced: '38.500',
   //       description: 'Dép đi trong nhà AYUER hình cá mập 4cm',
   //       category: 'wood',
   //    },
   //    {
   //       image: img_opdt,
   //       title: 'Ốp lưng iphone',
   //       priced: '42.700',
   //       description:
   //          'Ốp lưng điện thoại Little Monster có hoa văn bên hông cho iPhone 6 6S 6splus 7 8 7plus 8plus X Xs Xr Xsmax 11 12 13 Pro Max',
   //       category: 'wood',
   //    },
   // ];
   return (
      <div className={cln('wrapper')}>
         <h4>Gợi ý: Một số sản phẩm hot</h4>
         <div className={cln('product')}>
            {/* {arrTest.map((value, index) => {
               return <Product key={index} value={value} />;
            })} */}
         </div>
      </div>
   );
}

export default SearchPage;
