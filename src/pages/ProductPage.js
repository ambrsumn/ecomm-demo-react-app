import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid2 } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';

const ProductPage = () => {

    const [products, setProducts] = useState([]);
    const [productsCopy, setProductsCopy] = useState([]);

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

    useEffect(() => {
        let productsToDisplay = [];
        axios.get('https://dummyjson.com/products').then((res) => {
            let allProducts = res.data.products;


            for (let i = 0; i < allProducts.length; i++) {
                let product = allProducts[i];
                let image = product.images[0];

                let requiredProductDetails = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    image: image,
                    displayImage: product.images[1]
                }

                // setProducts([...products, requiredProductDetails]);

                if (!requiredProductDetails.title.includes('Calvin Klein CK One')) {
                    productsToDisplay.push(requiredProductDetails);
                }

                // console.log(productsToDisplay);
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            console.log(productsToDisplay)
            setProducts(productsToDisplay);
            setProductsCopy(productsToDisplay);
            console.log(products);
        })
    }, [])
    return (
        <>
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
                                        <img className="w-[5rem]" src={product?.image} alt="" />
                                    </div>
                                    <p className="text-lg  text-left">{product.title}</p>
                                    <p className="text-left">{product.price}</p>
                                </div>
                            </Item>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>        </>
    )
}
export default ProductPage;