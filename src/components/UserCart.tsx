import { IUserCart } from '../typings';

function UserCart({ cart }: { cart: IUserCart[] }) {
    console.log(cart)

    return (
        <div>
            <span>No. of items in cart:</span>
            <span>{cart.length}</span>
        </div>
    );
 }
 
 
 export default UserCart;
