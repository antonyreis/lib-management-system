// React
import React, { useEffect, useState } from "react";

// Design
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

const styleSx = {
  mainBox: {
    display: "flex",
    flexDirection: "column",
    height: "85vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    bgcolor: "background.paper",
    boxShadow: 2,
    borderRadius: "12px",
    padding: (theme) => theme.spacing(2, 5, 2, 5),
    marginTop: 1,
    alignItems: "center",
    width: 350,
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    width: 340,
  },
  textfield: {
    width: 300,
  },
  loginButton: {
    width: 300,
  },
};

export default function Login() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const checkLoginByIp = () => {
    // Função de login por IP, ainda não implementada
  };

  useEffect(() => {
    checkLoginByIp();
  }, []);

  const onClickLoginButton = (event) => {
    // Função de login ao clicar no botão, ainda não implementada
  };

  const onChangeUser = (event) => {
    setUser(event.currentTarget.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Fade in={true} timeout={800}>
      <Box sx={styleSx.mainBox}>
        <form noValidate onSubmit={onClickLoginButton}>
          <Box sx={styleSx.loginBox}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="flex-start"
              spacing={2}
              sx={styleSx.grid}
            >
              <Grid item>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="User"
                  name="user"
                  autoComplete="off"
                  autoFocus
                  onChange={onChangeUser}
                  sx={styleSx.textfield}
                />
              </Grid>

              <Grid item>
                <Box height={90}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={onChangePassword}
                    sx={styleSx.textfield}
                  />
                </Box>
              </Grid>

              <Grid item>
                {loginLoading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={styleSx.loginButton}
                    disabled={loginLoading}
                  >
                    Login
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Fade>
  );
}