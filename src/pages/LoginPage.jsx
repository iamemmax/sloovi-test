import React, { useEffect, useState } from 'react'
import { Typography, TextField, Button, CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, reset } from "../app/features/user/UserSlice"
// import Loading from '../component/config/Loading';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    })
    const [emailError, setEmailErr] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    let { email, password } = input

    const handleSubmit = (e) => {
        e.preventDefault()
        setEmailErr(false)
        setPasswordError(false)


        if (!email && !password) {
            setEmailErr(true)
            setPasswordError(true)
            return
        }
        if (!email) {
            setEmailErr(true)
            return

        }
        if (!password) {
            setPasswordError(true)
            return


        }

        dispatch(LoginUser(input))

    }


    const { isLoading, isError, isSuccess, message, user } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        dispatch(reset());
    }, [dispatch, message, user, isSuccess]);


    // if (isLoading) {
    //     return <Loading />;
    // }
    if (isSuccess && user.want_login === "yes") {
        navigate("/user", { replace: true });
    }

    if (isError) {
      let emailE =  user[1]?.msg
      
        return toast.error(emailE, {
            toastId: "success1",
            position: "top-left",
        });
    }

    return (
        <div>
            <Typography variant='h4' component="h2" p={2} >Login Account</Typography>

            <form onSubmit={handleSubmit} method="post">
                <div className="username">
                    <TextField label="email" name='email' error={emailError} value={email} onChange={handleInput} />
                </div>
                <br />
                <div className="password">

                    <TextField type="password" label="password" error={passwordError} name='password' value={password} onChange={handleInput} />
                </div>
                <br />
                <Button type="submit" variant="contained" > Login  {isLoading && <CircularProgress size={20} color="secondary" /> }</Button>
            </form>
        </div>
    )
}

export default LoginPage