import React, { useState } from 'react'
import { Typography, TextField, Button, CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, reset } from "../app/features/user/UserSlice"
// import Loading from '../component/config/Loading';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Styles from "./style/login.module.scss"
import Loading from './../component/config/Loading';
// import { toast } from "react-hot-toast"
// import { FaGlasses } from 'react-icons/fa';


const LoginPage = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    })
    const [emailError, setEmailErr] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    // const [disable, setDisable] = useState(true)
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
        // // const handleError = Object.values(input).some((field) => !field)
        // if (handleError) {
        //     setDisable(false)
        // }

        dispatch(LoginUser(input))
        setTimeout(() => {
            dispatch(reset());

        }, 2000)
    }
    const { isLoading, isSuccess, user } = useSelector((state) => state.auth);
    if (user[0]?.msg) {
        toast.error(user[0].msg, {
            toastId: "error"
        })

    }


    // if (isLoading) {
    //     return <Loading />;
    // }
    if (isSuccess && user.want_login === "yes") {
        navigate("/task", { replace: true });
    }

    // if (isError) {
    //     let emailE = user[1]?.msg

    //     return toast.error(emailE, {
    //         toastId: "success1",
    //         position: "top-left",
    //     });
    // }
    // {user[0]?.msg ? toast.error(user[0]?.msg) : ""}


    return (
        <div className={Styles.container}>
            <div className={Styles.wrapper}>


                <Typography variant='h4' component="h2" className={Styles.header} >LOGIN ACCOUNT</Typography>

                <form onSubmit={handleSubmit} method="post">
                    <div className="username">
                        <TextField label="email" name='email' error={emailError} value={email} onChange={handleInput} fullWidth />
                    </div>
                    <br />
                    <div className="password">

                        <TextField type="password" label="password" fullWidth error={passwordError} name='password' value={password} onChange={handleInput} />
                    </div>
                    <br />
                    <Button type="submit" variant="contained" fullWidth color="primary">
                        {isLoading ? (
                            <CircularProgress size="20px" color="secondary" />
                        ) : (
                            "LOGIN"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage