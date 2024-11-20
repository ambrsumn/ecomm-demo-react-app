import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Grid2 } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContexts';
import ProductBoughtModal from './ProductBoughtModal';


const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
        borderColor: '#444d58',
    }),
}));

const CartPage = () => {

    const { cart, removeFromCart } = useContext(UserContext);
    const [products, setProducts] = useState(cart);
    const [productsCopy, setProductsCopy] = useState(cart);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <HeaderComponent />
            <div className="h-[5vh] my-4 flex flex-row gap-x-4">
                <input onChange={(e) => {
                    let allProducts = productsCopy;
                    let searchText = e.target.value;
                    let filteredProducts = allProducts.filter((product) => {
                        return product.title.toLowerCase().includes(searchText.toLowerCase());
                    })
                    setProducts(filteredProducts);
                }} type="text" className="w-1/2 rounded-lg h-full pl-5 border border-black" placeholder="Search here" />
                <button className="bg-teal-800 font-medium px-3 p-1 text-white rounded-lg" onClick={() => {
                    setProducts(productsCopy);
                }}>Reset</button>
            </div>
            <Box sx={{ width: '100%' }}>
                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {products.map((product) => (
                        <Grid2 xs={4} key={product.id} className="w-[30%] overflow-auto ">
                            <Item className="">
                                <div className="flex flex-col gap-y-3 ">
                                    <div className="flex flex-row  justify-center">
                                        <img className="w-[5rem] h-[5rem]" src={product?.image} alt="" />
                                    </div>
                                    <p className="text-lg  text-left">{product.title}</p>
                                    <p className="text-left">{product.price}</p>
                                    <div className="flex flex-row gap-x-4 justify-left mt-4">
                                        <button className="bg-green-500 px-3 py-1 rounded-lg text-white" onClick={() => {
                                            let modifiedCartProducts = productsCopy.filter((p) => {
                                                return p.id !== product.id;
                                            })
                                            setProductsCopy(modifiedCartProducts);
                                            setProducts(modifiedCartProducts);
                                            removeFromCart(product.id);
                                            setShowModal(true);
                                        }}>Buy</button>

                                        <ProductBoughtModal show={showModal} onHide={closeModal} />
                                        <button className="bg-red-500 px-3 py-1 rounded-lg text-white" onClick={() => {
                                            let modifiedCartProducts = productsCopy.filter((p) => {
                                                return p.id !== product.id;
                                            })
                                            setProductsCopy(modifiedCartProducts);
                                            setProducts(modifiedCartProducts);
                                            removeFromCart(product.id);
                                        }}>Remove from Cart</button>
                                    </div>

                                </div>
                            </Item>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </div>
    )
}

export default CartPage;