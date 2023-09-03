import { IProductCard } from "../typings";

function ProductCard({
  product,
  addToCart,
  removeFromCart,
}: {
  product: IProductCard;
  addToCart: (product: IProductCard) => void;
  removeFromCart: (product: IProductCard) => void;
}) {
  const { title, category, price, thumbnail, rating, description } = product;

  function handleRemoveFromCart() {
    removeFromCart(product);
  }
  function handleAddToCart() {
    addToCart(product);
  }

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
