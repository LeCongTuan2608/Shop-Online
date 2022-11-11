import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import img_bgr from '../../../images/Home4.png';

const cln = classNames.bind(styles);

HomePage.propTypes = {};
function HomePage(props) {
   return (
      <div className={cln('wrapper')}>
         <div className={cln('container')}>
            <div className={cln('title')}>
               <p>
                  <span>Ecommerce </span> <span style={{ color: 'black' }}>&</span>
                  <span style={{ color: 'orange' }}> Online Shopping</span>
               </p>
            </div>
            <div className={cln('contents')}>
               <div className={cln('contents-bgr')}>
                  <img src={img_bgr} alt="" />
               </div>
            </div>
         </div>
      </div>
   );
}

export default HomePage;
