import AccountManagement from 'components/pages/AccountManagement';
import AddCategory from 'components/pages/AddCategory';
import AddProduct from 'components/pages/AddProduct';
import BillPage from 'components/pages/BillPage';
import HomePage from 'components/pages/HomePage';
import ProductPage from 'components/pages/ProductPage';
import PurchaseHistory from 'components/pages/PurchaseHistory';
import SettingPage from 'components/pages/SettingPage';

// icon
import CategoryIcon from '@mui/icons-material/Category';
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
// Puclic routes
const publicRoutes = [
   { path: '/', title: 'Home', component: HomePage, Icon: HomeOutlinedIcon },

   {
      path: '/product',
      title: 'Product',
      component: ProductPage,
      Icon: ProductionQuantityLimitsOutlinedIcon,
   },
];
// Private routes / active ddc chua chua :v
const privateRoutes = [
   {
      path: '/purchaseHistory',
      title: 'Purchase History',
      component: PurchaseHistory,
      Icon: HistoryOutlinedIcon,
      role: 'USER',
   },
   {
      path: '/setting',
      title: 'Setting',
      component: SettingPage,
      Icon: SettingsSuggestOutlinedIcon,
   },
];
//
const adminRoutes = [
   {
      path: '/addproduct',
      title: 'Add Product',
      component: AddProduct,
      Icon: PostAddOutlinedIcon,
   },
   {
      path: '/addcategory',
      title: 'Add Category',
      component: AddCategory,
      Icon: CategoryIcon,
   },
   {
      path: '/bill',
      title: 'All Bill',
      component: BillPage,
      Icon: BallotOutlinedIcon,
   },

   {
      path: '/accountManagement',
      title: 'Account Management',
      component: AccountManagement,
      Icon: ManageAccountsIcon,
   },
];

export { publicRoutes, privateRoutes, adminRoutes };
