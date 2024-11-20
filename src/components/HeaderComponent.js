import React from 'react';
import logoImage from '../assets/logoImage.png';
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import { UserContext } from '../contexts/userContexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


const HeaderComponent = () => {

    const [openLogin, setOpenLogin] = useState(false);
    const { user, setUser } = React.useContext(UserContext);

    const handleOpenLogin = () => {
        setOpenLogin(true);
        console.log("open login")
    }
    const handleCloseLogin = () => {
        setOpenLogin(false);
    }

    return (
        <div className="h-[8vh] bg-black flex flex-row justify-between pt-2">
            <div className="flex flex-row gap-x-6">
                <img src={logoImage} alt="" />
                <p className=" text-red-500 italic pt-3 font-bold text-xl">ECOM-APP</p>
            </div>
            <div className="flex flex-row gap-x-8 text-blue-600 text-xl font-semibold mr-16 items-center pt-0">

                <a href="/">Home</a>
                <a href="/products">Products</a>

                {user ? <button onClick={() => {
                    setUser(null);
                    window.location.href = "/products";
                }}>Logout</button> : <button onClick={handleOpenLogin}>Login</button>}
                {
                    user ? <a href="/cart"><FontAwesomeIcon icon={faCartShopping} /></a> : null
                }

                <Dialog open={openLogin} onClose={handleCloseLogin}>
                    <DialogActions className="text-red-600 !important" sx={{ color: "red" }}>
                        <Button className="text-red-600 !important font-semibold !important" onClick={handleCloseLogin}>X</Button>
                    </DialogActions>
                    <DialogContent className=" bg-white shadow-md rounded-lg">
                        <LoginPage setOpenLogin={setOpenLogin} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
export default HeaderComponent;