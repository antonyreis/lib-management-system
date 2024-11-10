// React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Design
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

const styleSx = {
  mainBox: {
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    height: "85vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    bgcolor: "",
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
  const navigate = useNavigate(); // Hook para redirecionamento
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const checkLoginByIp = () => {
    // Função de login por IP, ainda não implementada
    console.log("Checando login por IP...");
  };

  useEffect(() => {
    checkLoginByIp();
  }, []);

  const onClickLoginButton = async (event) => {
    event.preventDefault();
    setLoginLoading(true);

    // Simulação de uma verificação de autenticação (aqui você pode colocar a chamada à API)
    setTimeout(() => {
      const loginSuccess = user === "admin" && password === "password"; // Simulação de verificação
      setLoginLoading(false);

      if (loginSuccess) {
        navigate("/menu"); // Redireciona para o menu caso o login seja bem-sucedido
      } else {
        alert("Login failed");
      }
    }, 1000); // Simulando tempo de resposta
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