import { useState,useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { supabase } from "../supabase";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const outOfStock = product?.stock_quantity <= 0;

    useEffect(()=>{

        async function fetchingSingleProduct() {
                   try {
            setLoading(true)
           setError(null) 
           const {data,error} = await supabase.from("Products").select("*").eq("id",id).single()
           if(error) throw error
            setProduct(data)
        } catch (e) {
            console.error("Error occured while fetching product",e.message)
            setError(e.message || "Product not found")
        }finally{
            setLoading(false);
        }
        }
        fetchingSingleProduct();
        
    },[id])

  return (
    <div>
        {/* Loading... */}
        {
            loading && <div className="min-h-screen bg-softWhite py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back link placeholder */}
        <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-6" />

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-pulse">
          {/* Image placeholder */}
          <div className="bg-slate-200 aspect-square md:aspect-auto md:h-105" />

          {/* Info placeholder */}
          <div className="flex flex-col justify-between p-6 md:p-8">
            <div className="space-y-4">
              {/* Category & Title */}
              <div>
                <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
                <div className="h-7 w-3/4 bg-slate-200 rounded" />
              </div>

              {/* Price & Stock Badge */}
              <div className="flex items-center justify-between border-y border-slate-100 py-3">
                <div className="h-7 w-24 bg-slate-200 rounded" />
                <div className="h-6 w-24 bg-slate-200 rounded-full" />
              </div>

              {/* Description lines */}
              <div className="space-y-2 pt-2">
                <div className="h-3 w-24 bg-slate-200 rounded mb-3" />
                <div className="h-3.5 w-full bg-slate-200 rounded" />
                <div className="h-3.5 w-5/6 bg-slate-200 rounded" />
                <div className="h-3.5 w-2/3 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Add to Cart Button placeholder */}
            <div className="mt-6 h-12 w-full bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
        }
        {
            error || !product && <div className="flex flex-col">
                <h2 className="">{error || "Product is not found"}</h2>
                <Link to={"/"} className="bg-black text-white rounded-xl p-2 hover:text-vibrantOrange">Back to Store</Link>
            </div>
        }

        {
            !loading && !error && product && <div className="min-h-screen w-full bg-softWhite text-charcoalBlack py-6 px-4">
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto ">
                    {/*PRODUCT IMAGE */}
                <div className="bg-slate-100 aspect-square md:h-full">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover " />
                </div>
                    {/* PRODUCT INFO */}
                <div className="flex flex-col justify-between gap-3 p-6 ">
                    {/* NAME */}
                   <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                              <h2 className="text-2xl font-bold uppercase">{product.name}</h2>
                              <span className="font-bold text-xl">₹{Number(product.price).toLocaleString('en-IN')}</span>
                        </div>
                     
                    {/* DESCRIPTION */}
                    <div className="">
                        <p className="font-semibold text-md uppercase text-vibrantOrange">Descripton:</p>
                        <span className="font-normal">{product.description}</span>
                    </div>
                    {/* IN STOCK */}
                    <div className="flex gap-2">
                        <p className="font-semibold  text-vibrantOrange">In Stock:</p>
                        <span className="">{product.stock_quantity}</span>
                    </div>
                    {/* CATEGORY */}
                    <div className="flex gap-2">
                          <p className="font-semibold  text-vibrantOrange">Category:</p>
                        <span className="">{product.category}</span>
                    </div>
                   </div>
                  <div className="flex flex-col">
                      <div className="flex justify-around items-center">
                        <span className="font-bold text-3xl border border-black px-3">-</span> <span className="border border-black px-3 ">In cart</span> <span className="font-bold text-3xl border border-black px-3">+</span>
                    </div>
                    {/* CART BUTTON */}
                    <button className={outOfStock  ? "bg-red-500 cart-btn":"cart-btn"}
                    disabled={outOfStock }>{outOfStock ?"Out of stock":"Add to cart"}</button>
                  </div>
                </div>
            </div>
            </div>
        }
        
    </div>
  )
}

export default ProductDetails