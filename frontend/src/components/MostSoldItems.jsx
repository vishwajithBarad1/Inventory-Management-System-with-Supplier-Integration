import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ product , type}) => {
    const [showDetail, setShowDetail] = useState(false);
    function handleMouseEnter(){
        setShowDetail(true);
    }
    function handleMouseLeave(){
        setShowDetail(false);
    }
    return (
        <div className="product-list">
            {showDetail ? (
                <div className='productList' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div>{product.productDetails.name}</div>
                    <div className='floating-window'>
                        <ul>
                            <strong>{product.productDetails.name}</strong>
                            <p>SKU: {product.productDetails.sku}</p>
                            <p>Price: ${product.productDetails.price}</p>
                            <p>{type} Quantity: {product.totalQuantitySold || product.totalQuantityRestocked}</p>
                            <p>Current Stock: {product.productDetails.current_stock}</p>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className='productList' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <div>{product.productDetails.name}</div>
                </div>
            )}
        </div>
    );
};

const MostSoldItems = () => {
    const [soldItems, setSoldItems] = useState({
        topSoldProducts: [],
        topRestockedProducts: []
    });

    async function getSoldItems() {
        const response = await axios.get('http://localhost:4000/report/mostSoldItems', {
            headers: {
                Authorization: localStorage.getItem('authToken'),
            }
        });
        setSoldItems(response.data.data);
    }

    useEffect(() => {
        getSoldItems();
    }, []);

    return (
        <div className='mostSoldItems-Container'>
            <div>
                <h2>Top Sold Products</h2>
                {soldItems.topSoldProducts.map((product) => (
                    <ProductList key={product._id} product={product}type={"Sold"} />
                ))}
            </div>
            <div>
                <h2>Top Restocked Products</h2>
                {soldItems.topRestockedProducts.map((product) => (
                    <ProductList key={product._id} product={product} type={"Restocked"} />
                ))}
            </div>
        </div>
    );
};

export default MostSoldItems;
