import React from 'react';
import PropTypes from 'prop-types';
import styled from './AccountManagement.module.scss';
import classNames from 'classnames/bind';

const cln = classNames.bind(styled);
index.propTypes = {};

function index(props) {
   return (
      <div className={cln('wrapper')}>
         <h1>hello account managerment</h1>
      </div>
   );
}

export default index;
