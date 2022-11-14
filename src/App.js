import DefaultLayout from 'components/Layout/DefaultLayout';
import { Fragment } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { adminRoutes, privateRoutes, publicRoutes } from './routes';
import History from './History';
import HomePage from 'components/pages/HomePage';

function App() {
   return (
      <div className="App">
         <Routes history={History}>
            <Route element={<DefaultLayout />}>
               {/* route nảy của user nhưng chưa login */}
               {/* <Route  path="/" element={<HomePage />} /> */}
               {publicRoutes.map((route, index) => {
                  return <Route key={index} path={route.path} element={<route.component />} />;
               })}
               {/* route của admin khi login */}
               {adminRoutes.map((route, index) => {
                  return <Route key={index} path={route.path} element={<route.component />} />;
               })}
               {/*route này của user khi login vao  */}
               {privateRoutes.map((route, index) => {
                  return <Route key={index} path={route.path} element={<route.component />} />;
               })}
            </Route>
         </Routes>
      </div>
   );
}

export default App;
