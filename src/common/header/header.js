import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./header.css";
import { TextField, Menu, MenuItem, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AppContext from "../app-context";
import PROFILE_ICON from "../../assets/profile_icon.png";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, searchKey, setSearchKey } = useContext(
    AppContext
  );
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userIcon] = useState(PROFILE_ICON);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      history.push("/");
    }
  }, []);

  const logoutHandler = () => {
    handleClose();
    sessionStorage.removeItem("access_token");
    setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <div className="header-container">
      <span className="app-logo">Image Viewer</span>
      {isLoggedIn && (
        <div className="right-container">
          {window.location.pathname === "/home" && (
            <TextField
              id="outlined-basic"
              className="search-damage-id"
              placeholder="Search..."
              variant="outlined"
              value={searchKey}
              onChange={event => setSearchKey(event.target.value)}
              InputProps={{
                startAdornment: <SearchIcon />
              }}
            />
          )}
          <div className="avatar-menu">
            <IconButton onClick={handleClick}>
              <img src={userIcon} className="profile-pic" alt="user" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {window.location.pathname === "/home" && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    history.push("/profile");
                  }}
                >
                  My Account
                </MenuItem>
              )}
              {window.location.pathname === "/home" && <hr />}
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
