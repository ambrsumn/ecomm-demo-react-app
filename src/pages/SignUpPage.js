import axios from 'axios';
import React, { useState } from 'react';
import { Snackbar } from '@mui/material';

const SignUpPage = ({ handleModal }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    async function handleSignUp() {
        const data = {
            email: email,
            username: userName,
            password: password,
            name: {
                firstname: firstName,
                lastname: lastName,
            },
            phone: phone,
        };

        try {
            const res = await axios.post('https://dummyjson.com/users/add', data);
            console.log(res);
            setOpenSnackbar(true);
            // Show the Snackbar
        } catch (error) {
            console.error(error);
        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        if (handleModal) handleModal();
        // Close the modal only after the Snackbar is handled
    };

    return (
        <div className="h-[40vh] w-full items-center p-4 flex flex-col justify-start">
            <h1 className="text-xl text-blue-400 mb-8">Create your free Account</h1>
            <div className="flex flex-row gap-x-2">
                <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-300 rounded-md p-2 mb-4"
                />
                <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-300 rounded-md p-2 mb-4"
                />
            </div>

            <div className="flex flex-row gap-x-2">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="border border-gray-300 rounded-md p-2 mb-4"
                />
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="Phone"
                    className="border border-gray-300 rounded-md p-2 mb-4"
                />
            </div>

            <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <button
                onClick={handleSignUp}
                className="mt-6 border border-white bg-cyan-600 text-white rounded-lg font-semibold w-[30%]"
            >
                Sign Up
            </button>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="User Created Successfully"
            />
        </div>
    );
};

export default SignUpPage;
