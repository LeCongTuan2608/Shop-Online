import HomePage from 'components/pages/HomePage';
import ProductPage from 'components/pages/ProductPage';
import PurchaseHistory from 'components/pages/PurchaseHistory';
import SearchPage from 'components/pages/SearchPage';
import SettingPage from 'components/pages/SettingPage';
import AddProduct from 'components/pages/AddProduct';
import UpdateProduct from 'components/pages/UpdateProduct';
import AccountManagement from 'components/pages/AccountManagement';
import CategoryIcon from '@mui/icons-material/Category';
// icon
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddCategory from 'components/pages/AddCategory';
// Puclic routes
const publicRoutes = [
   { path: '/', title: 'Home', component: HomePage, Icon: HomeOutlinedIcon },

   {
      path: '/product',
      title: 'Product',
      component: ProductPage,
      Icon: ProductionQuantityLimitsOutlinedIcon,
   },
   {
      path: '/search',
      title: 'Search',
      component: SearchPage,
      Icon: SearchOutlinedIcon,
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
      path: '/updateproduct',
      title: 'Update Product',
      component: UpdateProduct,
      Icon: FlipCameraAndroidOutlinedIcon,
   },
   {
      path: '/addcategory',
      title: 'Add Category',
      component: AddCategory,
      Icon: FlipCameraAndroidOutlinedIcon,
   },

   {
      path: '/accountManagement',
      title: 'Account Management',
      component: AccountManagement,
      Icon: CategoryIcon,
   },
];

export { publicRoutes, privateRoutes, adminRoutes };
