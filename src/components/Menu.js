import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import menuJson from "../data/menu.json";


const MenuLink = ({ label, to, activeOnlyWhenExact, icon }) => {
  return (

    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        var active = match ? 'active' : '';
        return (

          <li className="nav-item">
            <Link to={to}>
              <span className={`nav-link ${active}`}>
                <i className={`nav-icon fas ${icon}`} />
                <p>{label}</p>
              </span>


            </Link>

          </li>
        );
      }}
    />

  );
}

class Menu extends Component {
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        {/* <a href="index3.html" className="brand-link">
          <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a> */}
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
            </div>
            <div className="info">
              <a href="Cybertect" className="d-block">CyberTech Admin</a>
            </div>
          </div>
          {/* ==================== Bắt đầu các phần menu item ====================================== */}
          {/* Sidebar Menu */}
          <nav className="mt-2">

            <Route>
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}

                {/* ================  Dashboard Item   ================ */}
                {this.showMenu(menuJson)}
              </ul>
            </Route>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

    )
  }

  //menuJSon lấy từ phần import trên đầu! < Tự hiểu nhé >
  showMenu = (menuJson) => {
    //TH1: Nó có tồn tại menu con
    if (menuJson.length > 0) {
      var result = null;
      result = menuJson.map(
        (menuItem, index) => {
          //Nếu nó là item đầu tiên menu-open
          if (menuItem.id === 1) {
            return (
              // <li className="nav-item" key={index}>
              //   <span className="nav-link active">
              //     <i className="nav-icon fas fa-tachometer-alt" />
              //     <p>{menuItem.name}</p>
              //   </span>
              // </li>
              <MenuLink
                key={index}
                label={menuItem.name}
                to={menuItem.to}
                activeOnlyWhenExact={menuItem.exact}
                icon={menuItem.icon}
              />
            )
          }
          //Nếu item có một list submenu
          if (menuItem.subMenu.length > 0) {
            return (
              <li className="nav-item has-treeview" key={index}>
                <span className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>{menuItem.name}<i className="right fas fa-angle-left" /></p>
                </span>

                {/* Các menu item cấp 2 */}
                <ul className="nav nav-treeview" >
                  {
                    menuItem.subMenu.map(
                      (x, i) => {
                        return (
                          <MenuLink
                            key={i}
                            label={x.name}
                            to={x.to}
                            activeOnlyWhenExact={x.exact}
                            icon={x.icon}
                          />
                        )
                      }
                    )
                  }
                </ul>
              </li>
            )
          } else {
            //Còn lại nó là menu chỉ có một cấp
            return (
              <MenuLink
                key={index}
                label={menuItem.name}
                to={menuItem.to}
                activeOnlyWhenExact={menuItem.exact}
                icon={menuItem.icon}
              />
            )
          }


        }

      );
    }
    //TH2: Nó không có menu con
    return result;
  }
}

export default Menu;
