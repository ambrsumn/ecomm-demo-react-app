import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContexts';

const LoginPage = ({ setOpenLogin }) => {
    const { user, setUser } = useContext(UserContext);
    const [userNamee, setUserName] = useState('');
    const [password, setPassword] = useState('');

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

            <p className="text-sm mt-4">Not a registered user, <button className="underline text-blue-700" >Sign Up</button></p>
        </div>
    )
}

export default LoginPage;