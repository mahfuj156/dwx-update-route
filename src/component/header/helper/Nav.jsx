import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { userInfo } from "../../../utils/auth";

const Nav = ({ navItems }) => {
  const { userRole } = userInfo();

  return (
    <>
      <ul className="nav navbar-nav">
        {navItems &&
          navItems.map((item, index) => {
            return (
              <Fragment key={index}>
                {userRole === item.userRole && (
                  <li li="true" className="dropdown">
                    <NavLink to={item.path}>
                      {item.icon}
                      {item.title}
                      {item.child && (
                        <span className="btn-caret">
                          <span className="caret"></span>
                        </span>
                      )}
                    </NavLink>
                    {item.child && (
                      <ul className="dropdown-menu">
                        {item.child.map((childItem, index) => {
                          return (
                            <li li="true" key={index}>
                              <NavLink to={childItem.path}>
                                {childItem.icon} {childItem.title}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                )}
              </Fragment>
            );
          })}
      </ul>
    </>
  );
};

export default Nav;
