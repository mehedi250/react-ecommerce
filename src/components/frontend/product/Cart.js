import React, { useState } from 'react'
import useDelayCallback from '../../helpers/useDelayCallback';
import { cartListApi, categoryActiveListApi } from '../../../service/serviceApi';

const Cart = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cartList, setCartList] = useState([]);

    useDelayCallback(() => {
        getCartList();
    }, []);

    const getCartList = () => {
        cartListApi().then(res => {
            if (res.data.success) {
                if (res.data.status === 'success') {
                    setIsLoading(false)
                    setCartList(res.data.data)
                }
            }
            else {
                setCartList([]);
            }
        });
    }

    return (
        <div>Cart</div>
    )
}

export default Cart