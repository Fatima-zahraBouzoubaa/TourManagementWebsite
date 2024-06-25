import React, { useRef, useEffect, useContext, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from './../../context/AuthContext';

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Dynamic nav links
  const nav_links = [
    { path: '/home', display: 'Home' },
    { path: '/tours', display: 'Tours' },
    ...(user && user.role === 'admin' ? [{ path: '#', display: 'Manage Tours' }] : []),
    ...(user ? [{ path: `/booking/user/${user._id}`, display: 'Booked Tours' }] : []),
  ];

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            {/* Logo end */}
            {/* Menu start */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} activeClassName="active__link">
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                {user && user.role==="admin" &&(
                  <li className="nav__item">
                    <button className="dropdown__toggle" onClick={toggleDropdown}>
                      Manage Tours
                    </button>
                    {showDropdown && (
                      <div className="dropdown__content">
                        <Link to="/admin/add-tour">Add Tour</Link>
                        <Link to="/admin/modify-tour">Modify Tour</Link>
                        <Link to="/admin/delete-tour">Delete Tour</Link>
                      </div>
                    )}
                  </li>
                )}
              </ul>
            </div>
            {/* Menu end */}
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {
                  user ? (
                    <>
                      <h5 className="mb-0">{user.username}</h5>
                      <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn secondary__btn"><Link to='/login'>Login</Link></Button>
                      <Button className="btn primary__btn"><Link to='/register'>Register</Link></Button>
                    </>
                  )
                }
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
