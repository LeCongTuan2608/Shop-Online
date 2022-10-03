import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SettingPage.module.scss';
import { Tab, Tabs } from 'react-bootstrap';
const cln = classNames.bind(styles);
SettingPage.propTypes = {};

function SettingPage(props) {
   return (
      <div className={cln('wrapper')}>
         <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="profile" title="Profile">
               <h1>page profile</h1>
            </Tab>
            <Tab eventKey="setups" title="Setting">
               <h1>page setups</h1>
            </Tab>
         </Tabs>
      </div>
   );
}

export default SettingPage;
