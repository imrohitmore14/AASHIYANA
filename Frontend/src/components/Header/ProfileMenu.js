import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./styles.css";
import { Link } from "react-router-dom"; // Import Link from 'react-router-dom' instead of '@mui/material/Link'
import UserLogin from "../Auth/UserLogin";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserLogin = () => {
    return (
      <div>
        <Link
          to="/UserLogin"
          className="bg-[#eca74e] hover:bg-[#ee5e5f] duration-200 text-white font-bold py-2 px-4 rounded mt-2 mr-6 ml-4 mx-2"
        >
          Log In
        </Link>
      </div>
    );
  };
  const handleUserSignup = () => {
    return (
      <div>
        <Link
          to="/UserSignup"
          className="bg-[#eca74e] hover:bg-[#ee5e5f] duration-200 text-white font-bold py-2 px-4 rounded mt-2 mr-6 ml-4 mx-2"
        >
          Signup
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="profile-menu-flex"
      >
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            minWidth: "200px",
            borderRadius: "1rem",
            boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
          },
        }}
      >
        <MenuItem className="menu-items">{handleUserSignup()}</MenuItem>
        <MenuItem className="menu-items">{handleUserLogin()}</MenuItem>
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--grey)",
            width: "100%",
          }}
        />
        <MenuItem onClick={handleClose} className="menu-items">
          Airbnb Your Home
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          Host an experience
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          Help
        </MenuItem>
      </Menu>

      <BrowserRouter>
        <Routes>
          <Route path="/UserLogin" component={UserLogin} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
