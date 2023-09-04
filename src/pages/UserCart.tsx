import {IProductCard, IUserCart} from '../typings';
import {useUserContext} from "../contexts/UserContext.tsx";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

function UserCart() {

    const {userId} = useUserContext()
    // const {cartId} = useParams()
    const [cartItems, setCartItems] = useState<IUserCart[]>([])
    const cartLength= JSON.parse(localStorage.getItem(userId)) as string ? JSON.parse(localStorage.getItem(userId)).products.length : 0
    const [total,setTotal]=useState<number>(0)

    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const response = await fetch(
        //             `https://dummyjson.com/carts/user/${userId}`
        //         );
        //         if (!response.ok) {
        //             throw new Error(`Request failed`);
        //         }
        //
        //         const responseData = await response.json();
        //         console.log(responseData.carts[0].products);
        //         setCartItems(responseData.carts[0].products);
        //
        //     } catch (err) {
        //       console.log(err)
        //     }
        // }
        // fetchData();

        const cartData = localStorage.getItem(userId);
        if (cartData) {
            const cart = JSON.parse(cartData);
            setCartItems(cart.products);
        }

    }, [userId]);

    // async function handleRemoveAllItems(){
    //     try {
    //         const response = await fetch(
    //             `https://dummyjson.com/carts/${cartId}`,{
    //             { method:'DELETE'}
    //         );
    //      if(response.isDeleted){
    //          console.log('All items deleted')
    //          setCartItems([])
    //             }
        //     } catch (err) {
        //       console.log(err)
        //     }
        // }
    // }


    async function handleRemoveFromCart(id:number){

        {/*

        const {cartId} = useUserContext()
         try {
                const response = await fetch(
                   `https://dummyjson.com/carts/${cartId}`,{
                   method:'PUT'
                   headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                    merge: true,
                    products: [
                     {
                     id: id,
                     quantity: 0,
                      },
                    ]
                 })
               );
               if (!response.ok) {
                   throw new Error(`Request failed`);
               }

               const responseData = await response.json();
                console.log(responseData.carts[0].products);
                setCartItems(responseData.carts[0].products);
            } catch (err) {
              console.log(err)
            }




        */}





        const existingCartData = localStorage.getItem(userId);

        if (existingCartData) {
            const cart = JSON.parse(existingCartData);
            const updatedProducts = cart.products.filter((p: IProductCard) => p.id !== id);
            const updatedCart = {
                ...cart,
                products: updatedProducts,
            };
            setCartItems(updatedProducts)
            localStorage.setItem(userId, JSON.stringify(updatedCart));
        }
    }

    return (
        <div>
            <Link className='underline underline-offset-3 text-blue-600' to='/'>Back</Link>
            <br/>
            <span>{userId}'s Cart</span>
            <br/>
            <span>No. of items in cart:{cartLength}</span>
            <br/>
            <h3 className='text-2xl font-bold'>Total:</h3>
            {/*<button onClick={handleRemoveAllItems} className='bg-red-500 p-2 ml-32 text-white rounded-md'>Remove All items from cart</button>*/}
            {
                cartItems.map((prod)=>(
                    <main key={prod.id} className="m-3 border flex justify-between p-2">
                        <div>
                            <img src={prod.thumbnail} alt={prod.title} className="h-20 w-20" />
                        </div>
                        <p>x {prod.quantity}</p>
                        <section className="flex items-start space-x-2">
                            <h2>{prod.title}</h2>
                            <p>Category: {prod.category}</p>
                            <p>Price: ${prod.price}</p>
                        </section>
                        <section className="space-y-1">
                            <section>
                                <button
                                    onClick={()=>handleRemoveFromCart(prod.id)}
                                    className="bg-red-500 rounded-md p-1 text-white font-medium"
                                >
                                    Remove from Cart
                                </button>
                            </section>
                        </section>
                    </main>
                ))
            }
        </div>
    );
}


export default UserCart;