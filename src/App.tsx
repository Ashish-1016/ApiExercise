import { useState, useEffect } from "react";
import { IProductData } from "./typings";
import SearchBox from "./components/SearchBox";
import UserCart from "./components/UserCart";
import ProductCard from "./components/ProductCard";


function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [products, setProducts] = useState<IProductData[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [cart, setCart] = useState<IProductData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        if (!response.ok) {
          throw new Error(`Request failed`);
        }

        const responseData = await response.json();
        setCategories(responseData);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    }
    fetchData();
  },[]);

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        if (!response.ok) {
          throw new Error(`Request failed`);
        }
  
        const responseData = await response.json();
        setProducts(responseData.products);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    }
  
    async function fetchQueryData() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        if (!response.ok) {
          throw new Error(`Request failed`);
        }
  
        const responseData = await response.json();
        setProducts(responseData.products);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    }
  
    if (category !== null) {
      fetchCategoryData();
    } else if (query !== "") {
      fetchQueryData();
    }
  }, [query, category]);

  const addToCart = (product: IProductData) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productToRemove: IProductData) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productToRemove.id)
    );
  };

  return (
    <div className="flex justify-center items-center m-10 ">
      <main className="h-[90vh] w-[80vw] flex flex-col border border-black overflow-scroll">
        <section className="flex justify-between p-3 space-x-1">
          <SearchBox onSearch={setQuery} />
          <select
            className="border border-black rounded-md"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="flex items-center p-2">
            <UserCart cart={cart} />
          </div>
        </section>
        <section className="">
          {products.length === 0 ? (
            <p>No results...try changing the query...</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
