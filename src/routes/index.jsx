import AccountManagement from 'components/pages/AccountManagement';
import AddCategory from 'components/pages/AddCategory';
import AddProduct from 'components/pages/AddProduct';
import BillPage from 'components/pages/BillPage';
import HomePage from 'components/pages/HomePage';
import ProductPage from 'components/pages/ProductPage';
import ShoppingCart from 'components/pages/ShoppingCart';
import SettingPage from 'components/pages/SettingPage';

// icon
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// Puclic routes
const publicRoutes = [
   { path: '/', title: 'Home', component: HomePage, Icon: HomeOutlinedIcon },

   {
      path: '/product',
      title: 'Product',
      component: ProductPage,
      Icon: RedeemOutlinedIcon,
   },
   {
      path: '/shoppingcart',
      title: 'Shopping Cart',
      component: ShoppingCart,
      Icon: ShoppingCartOutlinedIcon,
      role: 'USER',
   },
];
// Private routes
const privateRoutes = [
   {
      path: '/setting',
      title: 'Setting',
      component: SettingPage,
      Icon: SettingsSuggestOutlinedIcon,
   },
];
// admin routes
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
      title: 'Bill',
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
