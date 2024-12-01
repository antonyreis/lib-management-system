import React, { useState, useCallback } from "react";

// Design
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deepOrange } from "@mui/material/colors";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Bookmarks from '@mui/icons-material/Bookmarks';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Search from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

// Third-party
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";

const HOME_URL = "/menu";

const appBarBoxStyle = {
  display: "flex",
  width: "100%",
  gap: 4,
  flexDirection: "column",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
};

const style = {
  appBar: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "background.paper",
    boxShadow: 2,
    height: "100vh",
    paddingTop: 1,
    gap: 4,
  },
  appBarFirstBox: Object.assign({}, appBarBoxStyle, {
    justifyContent: "flex-start",
  }),
  appBarSecondBox: Object.assign({}, appBarBoxStyle, {
    justifyContent: "center",
  }),
  appBarThirdBox: Object.assign({}, appBarBoxStyle, {
    justifyContent: "flex-end",
    paddingBottom: 2,
  }),
  avatar: {
    cursor: "pointer",
    color: (theme) => theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: "#393536",
    width: 46,
    height: 46,
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#393536",
    },
  },
};

export default function CustomAppBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

  const avatarOpen = Boolean(avatarAnchorEl);

  const handleClickAvatar = (event) => setAvatarAnchorEl(event.currentTarget);
  const handleCloseAvatarMenu = () => setAvatarAnchorEl(null);

  const handleClickBookmark = (event) => {
    navigate("/book")
  };

  const handleClickUser = (event) => {
    navigate("/user")
  };

  // const handleClickProfileSettings = () => {
  //   navigate("/app/user-settings");
  // };

  const handleClickLogout = () => {
    // sessionStorage.setItem("isAuthenticated", "false");
    navigate("/login");
  };

  const handleClickMenu = () => {
    // sessionStorage.setItem("isAuthenticated", "false");
    navigate("/menu");
  };

  const handleClickLoan = () => {
    // sessionStorage.setItem("isAuthenticated", "false");
    navigate("/loan");
  };

  const userData = JSON.parse(sessionStorage.getItem("usuario") || {})
  console.log({userData: userData})

  return (
    <>
      <div style={style.appBar}>
        <div style={style.appBarFirstBox}>
          <Tooltip title="Menu Principal" arrow>
            <IconButton onClick={handleClickMenu} sx={style.avatar}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div style={style.appBarThirdBox}>
          {(userData.cargo === "Administrador") && (
            <Tooltip title="Central de Usuários" arrow>
              <IconButton onClick={handleClickUser} sx={style.avatar}>
                <PeopleIcon />
              </IconButton>
            </Tooltip>
          )}
          {(userData.cargo === "Administrador" || userData.cargo === "Funcionario" ) && (
            <Tooltip title="Empréstimos" arrow>
              <IconButton onClick={handleClickLoan} sx={style.avatar}>
                <CreditScoreIcon />
              </IconButton>
            </Tooltip>
          )}
          {(userData.cargo !== "Cliente") && (
            <Tooltip title="Central de Livros" arrow>
              <IconButton onClick={handleClickBookmark} sx={style.avatar}>
                <Bookmarks />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Meu Perfil" arrow>
            <IconButton onClick={handleClickAvatar} sx={style.avatar}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Menu
        anchorEl={avatarAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={avatarOpen}
        onClose={handleCloseAvatarMenu}
        id="avatar-button"
      >
        {/* <MenuItem onClick={handleClickProfileSettings}>
          User Settings
        </MenuItem> */}
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
