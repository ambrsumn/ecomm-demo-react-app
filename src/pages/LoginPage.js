import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContexts';
import SignUpPage from './SignUpPage';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

const LoginPage = ({ setOpenLogin }) => {
    const { user, setUser } = useContext(UserContext);
    const [userNamee, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [openSignUp, setOpenSignUp] = useState(false);

    // console.log(user);

    function handleLogin() {
        console.log(userNamee, password);
        setUser({
            userName: userNamee,
            password: password
        })
        console.log(user);
        setTimeout(() => {
            setOpenLogin(false);
        }, 1000);
    }

    function handleCloseSignUp() {
        setOpenSignUp(false);
        setOpenLogin(false);
    }

    return (
        <div className="h-[30vh] w-full items-center  p-4 flex flex-col justify-start">
            <h1 className="text-xl text-blue-400 mb-4">Welcome, User</h1>
            <input onChange={(e) => {
                setUserName(e.target.value);
            }} type="text" placeholder="Username" className="border border-gray-300 rounded-md p-2 mb-4" />
            <input onChange={(e) => {
                setPassword(e.target.value);
            }} type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2 mb-4" />
            <button onClick={handleLogin} className="border border-white bg-cyan-600 text-white rounded-lg font-semibold w-[30%]">Login</button>

            <p className="text-sm mt-4">Not a registered user, <button onClick={() => {
                setOpenSignUp(true);
                // setOpenLogin(false);
            }} className="underline text-blue-700" >Sign Up</button></p>

            <Dialog open={openSignUp} onClose={handleCloseSignUp}>
                <DialogActions className="text-red-600 !important" sx={{ color: "red" }}>
                    <Button className="text-red-600 !important font-semibold !important" onClick={handleCloseSignUp}>X</Button>
                </DialogActions>
                <DialogContent className=" bg-white shadow-md rounded-lg">
                    <SignUpPage handleModal={handleCloseSignUp} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default LoginPage;