import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Footer = ({ onLoginClick }) => (
  <footer className={cx('footer')}>
    <Link to='/' className={cx('brand')}>reactblog</Link>
    <div onClick={onLoginClick} className={cx('admin-login')}>관리자 로그인</div>
  </footer>
);

export default Footer;
