import { IProductCard } from "../typings";
import {useUserContext} from "../contexts/UserContext.tsx";

function ProductCard({
  product,

}: {
  product: IProductCard;

}) {
  const {id, title, category, price, thumbnail, rating, description } = product;

  const {userId}=useUserContext()
  const handleRemoveFromCart = () => {

    // handleRemoveFromCart(id:number)
    // const {cartId} = useUserContext()
    // try {
    //   const response = await fetch(
    //       `https://dummyjson.com/carts/${cartId}`,{
    //        method:'PUT'
    //       headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     merge: true,
    //     products: [
    //       {
    //         id: id,
    //         quantity: 0,
    //       },
    //     ]
    //   })
    // );
    //   if (!response.ok) {
    //     throw new Error(`Request failed`);
    //   }
    //
    //   const responseData = await response.json();
    //   console.log(responseData.carts[0].products);
    //   setCartItems(responseData.carts[0].products);
    // } catch (err) {
    //   console.log(err)
    // }




    const existingCartData = localStorage.getItem(userId);

    if (existingCartData) {
      const cart = JSON.parse(existingCartData);
      const updatedProducts = cart.products.filter((p: IProductCard) => p.id !== product.id);
      const updatedCart = {
        ...cart,
        products: updatedProducts,
      };
      localStorage.setItem(userId, JSON.stringify(updatedCart));
    }
  };

  const handleAddToCart = () => {

    {/*
            handleAddToCart(id:number)
            try {
                const response = await fetch(
                   `https://dummyjson.com/carts/add`,{
                   method:'POST'
                   headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                    userId,
                    products: [
                     {
                     id: id,
                     quantity: 1,
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

    let updatedCart;

    if (existingCartData) {
      const cart = JSON.parse(existingCartData);
      const existingProduct = cart.products.find((p: IProductCard) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({  quantity: 1 ,...product});
      }

      updatedCart = cart;
    } else {
      updatedCart = {
        userId,
        products: [{ quantity:1,...product}],
      };
    }
    localStorage.setItem(userId, JSON.stringify(updatedCart));
  };

  return (
    <main className="m-3 border flex justify-between p-2">
      <section className="flex items-start space-x-2">
        <div>
          <img src={thumbnail} alt={title} className="h-20 w-20" />
        </div>
        <h2>{title}</h2>
        <p>Category: {category}</p>
        <p>Price: ${price}</p>
        <span className="line-clamp-1 w-[20vw]">{description}</span>
      </section>
      <section className="space-y-1">
        <section>
          <p>{rating}</p>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 rounded-md p-1 text-white font-medium"
          >
            Add to Cart
          </button>
        </section>
        <section>
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 rounded-md p-1 text-white font-medium"
          >
            Remove from Cart
          </button>
        </section>
      </section>
    </main>
  );
}

export default ProductCard;
