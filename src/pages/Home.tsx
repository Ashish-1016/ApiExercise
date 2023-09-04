import { useState, useEffect } from "react";
import { IProductData } from "../typings";
import SearchBox from "../components/SearchBox";
import UserCart from "../components/UserCart";
import ProductCard from "../components/ProductCard";
import {useUserContext} from "../contexts/UserContext.tsx";
import {Link} from "react-router-dom";

function Home() {

    const {userId} = useUserContext()
    // const cartLengthBoolean= JSON.parse(localStorage.getItem(userId))  ? JSON.parse(localStorage.getItem(userId)).products.length : 0

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [products, setProducts] = useState<IProductData[]>([]);
    const [category, setCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [query, setQuery] = useState<string>("");
    // const [cartId,setCardId]=useState<number|undefined>(undefined)
    const [cartLength,setCartLength]=useState<number>(0)


    useEffect(() => {

        // async function fetchCartItems() {
        //     try {
        //         const response = await fetch(
        //             `https://dummyjson.com/carts/user/${userId}`
        //         );
        //         if (!response.ok) {
        //             throw new Error(`Request failed`);
        //         }
        //
        //         const responseData = await response.json();
        //         setCartId(responseData.carts[0].id);
        //         setLoading(false);
        //         setError(null);
        //     } catch (err) {
        //         setError(err instanceof Error ? err : new Error(String(err)));
        //         setLoading(false);
        //     }
        // }


        async function fetchAllProducts() {
            try {
                const response = await fetch(
                    `https://dummyjson.com/products`
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
        fetchAllProducts()

        if(JSON.parse(localStorage.getItem(userId))){
            setCartLength(JSON.parse(localStorage.getItem(userId)).products.length)
        }
        else {
            setCartLength(0)
        }

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
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {/*<Link to={`/user-${userId}/cart-${cartId}`}>*/}
                    {/*
                      <p>{userId}'s Cart</p>
                      */}
                    {/*</Link>*/}
                    <Link to='/user-cart' className="flex flex-col items-center p-2">
                        <p>{cartLength } items</p>
                    </Link>
                </section>
                <section className="">
                    {products.length === 0 ? (
                        <p>No results...try changing the query...</p>
                    ) : (
                        products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}

                            />
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}

export default Home;
