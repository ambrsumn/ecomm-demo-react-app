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
    const [allCateogary, setallCateogary] = useState([]);

    function addToCart() {

    }

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
        axios.get('https://fakestoreapi.com/products').then((res) => {
            let allProducts = res.data;
            console.log(allProducts);


            for (let i = 0; i < allProducts.length; i++) {
                let product = allProducts[i];
                let image = product.image;

                let requiredProductDetails = {
                    id: product.id,
                    title: product.title.split(' ').slice(0, 5).join(' '),
                    price: product.price,
                    description: product.description,
                    image: image,
                    displayImage: product.image
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

        axios.get('https://fakestoreapi.com/products/categories').then((res) => {
            console.log(res.data);
            setallCateogary(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    function getProductByCateogary(cateogary) {
        if (cateogary == 'all') {
            setProducts(productsCopy);
            return;
        }
        axios.get('https://fakestoreapi.com/products/category/' + cateogary).then((res) => {
            console.log(res.data);
            setProducts(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
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
                <select name="cateogaries" id="cateogary" className="border border-black rounded-lg px-2 py-1 text-left font-semibold" onChange={(e) => {
                    console.log(e.target.value);

                    getProductByCateogary(e.target.value);
                }}>
                    <option value="all">All</option>
                    {
                        allCateogary.map((cateogary) => {
                            return <option value={cateogary} key={cateogary}>{cateogary}</option>
                        })
                    }
                </select>
                <button className="bg-teal-800 font-medium px-3 p-1 text-white rounded-lg" onClick={() => {
                    setProducts(productsCopy);
                    let ele = document.getElementById('cateogary');
                    ele.value = 'all';
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
                                    <div className="flex flex-row justify-center">
                                        <button className="border w-1/3  rounded-lg shadow-md bg-teal-900 text-white" onClick={addToCart}>Add to Cart</button>
                                    </div>
                                </div>
                            </Item>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>        </>
    )
}
export default ProductPage;