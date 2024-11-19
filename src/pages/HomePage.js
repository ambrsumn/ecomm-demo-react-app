import React, { useEffect, useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const [counter, setCounter] = useState(0);

    // function updateCounter() {
    //     setCounter(0);
    // }

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
                productsToDisplay.push(requiredProductDetails);
                // console.log(productsToDisplay);
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            console.log(productsToDisplay)
            setProducts(productsToDisplay);
            console.log(products);
        })
    }, [])
    return (
        <div className="h-[100vh] w-full" style={{ background: 'linear-gradient(109.6deg, rgb(72, 200, 160) 11.2%, rgb(32, 40, 48) 91.3%)' }} >
            <HeaderComponent />
            <p className="text-3xl italic text-white font-bold text-center mt-4">Show all your needs at one place!</p>

            <div className="relative h-[80vh] mt-6" style={{ width: '100%' }}>
                <div
                    className="absolute inset-0 bg-cover "
                ></div>
                <div className="relative h-[60vh] w-[60%] m-auto flex flex-row gap-x-1 pt-8">
                    <div className="w-[60%] h-full border-r border-r-black  z-10 pt-24 px-4" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898' }}>
                        <h1 className="text-4xl pt-6 font-semibold mb-6 items-center text-center">{products[counter]?.title}</h1>
                        <p className="text-lg px-4 text-center">{products[counter]?.description}</p>
                        <div className="flex flex-row justify-center">
                            <a href='/products' className=" mt-8 bg-teal-500 text-white rounded-lg  p-1 px-3 font-semibold">Shop Now</a>
                        </div>
                    </div>
                    <div className="w-[40%] h-full  z-10" style={{ background: 'linear-gradient(109.6deg, rgb(0, 37, 84) 11.2%, rgba(0, 37, 84, 0.32) 100.2%)' }}>
                        <img src={products[counter]?.image} alt={products[counter]?.title} className="w-full h-full object-contain" />
                    </div>
                </div>
                {useEffect(() => {
                    console.log(counter);
                    const interval = setInterval(() => {
                        setCounter((prevCounter) => (prevCounter >= products.length - 1 ? 0 : prevCounter + 1));
                    }, 2000);
                    return () => clearInterval(interval);
                }, [products.length])}
            </div>

        </div >
    );
};
export default HomePage;