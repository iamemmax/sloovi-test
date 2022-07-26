import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../app/features/user/UserSlice";
import { LoadingButton as Button } from "@mui/lab";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Styles from "./style/login.module.scss";

const LoginPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailErr] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  let { email, password } = input;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailErr(false);
    setPasswordError(false);

    if (!email && !password) {
      setEmailErr(true);
      setPasswordError(true);
      return;
    }
    if (!email) {
      setEmailErr(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }

    dispatch(LoginUser(input));
  };
  const { isLoading, isSuccess, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(reset());
  }, [dispatch, user]);

  if (user?.length) {
    toast.error(user[0]?.msg, {
      toastId: "error",
    });
  }

  if (isSuccess && user.want_login === "yes") {
    navigate("/task", { replace: true });
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.wrapper}>
        <Typography variant="h4" component="h2" className={Styles.header}>
          LOGIN ACCOUNT
        </Typography>

        <form onSubmit={handleSubmit} method="post">
          <div className="username">
            <TextField
              label="email"
              name="email"
              error={emailError}
              value={email}
              onChange={handleInput}
              fullWidth
            />
          </div>
          <br />
          <div className="password">
            <TextField
              type="password"
              label="password"
              fullWidth
              error={passwordError}
              name="password"
              value={password}
              onChange={handleInput}
            />
          </div>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            fullWidth
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
