import { Link } from "react-router-dom"


const ProductCard = ({ product }) => {
    return (
        <div className="bg-white flex flex-col justify-between rounded-xl shadow-sm border border-slate-200 hover:shadow-md overflow-hidden transition-shadow">
            {/* IMAGE */}
            <Link to={`/product/${product.id}`} className="overflow-hidden block bg-slate-100 aspect-square">
                <img src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </Link>
           <div className="flex flex-col gap-2 p-3">
            <div className="text-vibrantOrange">
                {product.category}
            </div>
             <div className="flex  items-center justify-between grow">
                <h2 className="font-semibold text-lg text-charcoalBlack hover:text-vibrantOrange transition-colors line-clamp-1">
                    {product.name}
                </h2>
                <span className="text-xl font-bold text-charcoalBlack hover:text-vibrantOrange transition-colors">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
            </div>
               
              <div className="flex justify-between items-center">
                  <p className="font-semibold  text-md text-charcoalBlack  line-clamp-1">
                   <span className="text-lg font-bold">In stock:</span> {product.stock_quantity}
                </p>
                <Link to={`/product/${product.id}`} className="view-more">
                    view more
                </Link>
              </div>
           </div>
        </div>
    )
}

export default ProductCard