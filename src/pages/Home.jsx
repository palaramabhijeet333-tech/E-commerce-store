import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { supabase } from "../supabase";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [searchParams,setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search")||"";

    async function fetchProducts() {
        try {
            setLoading(true)
            setError(null)
            const {data,error} = await supabase.from('Products').select('*').order('created_at',{ascending:false});

            if(error) throw error
            setProducts(data || [])
        } catch (err) {
            console.error(err.message || "failed to load products")
            setError(err.message)
        }finally{
            setLoading(false)
        }   
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    const categories = ["All",...new Set(products.map(p=>p.category).filter(Boolean))];

    const filteredProducts = products.filter((product)=>{
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }).sort((a,b)=>{
        if(sortBy ==="lowest to highest") return Number(a.price) - Number(b.price);
        if(sortBy ==="highest to lowest")return Number(b.price) - Number(a.price);
        return 0
    })

 
  return (
    <div className="min-h-screen w-full bg-softWhite text-charcoalBlack">
        <div className="text-center">
            <h1 className="font-bold text-3xl tracking-tight">Online <span className="text-vibrantOrange">Store</span></h1>
            <p className="text-slate-600">Browse our latest collections</p>
        </div>
        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse">
                <div className="bg-slate-200 aspect-square rounded-lg mb-4" />
                <div className="h-3 bg-slate-200 rounded w-1/3 mb-2" />
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-4" />
                <div className="h-8 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
            {products !== "" ? products.map((product)=>{
                return <ProductCard product={product} key={product.id}/>
            }):null}
        </div>
    </div>
  )
}

export default Home