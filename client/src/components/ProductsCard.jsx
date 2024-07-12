/* eslint-disable react/prop-types */
import { BsArrowRight } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/bazarSlice'
import { ToastContainer, toast } from 'react-toastify';

function ProductsCard({ product }) {
  const dispatch = useDispatch()
  const isNew = true

  const navigate = useNavigate();
  const _id = product.title;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    })

  }
  return (
    <div className="group relative">
      <div className="w-full h-96 cursor-pointer overflow-hidden" onClick={handleDetails}>
        <img src={product.image} alt="productImg" className="w-full h-full object-cover group-hover:scale-110 duration-500" />
      </div>
      <div className="w-full border-[1px] px-2 py-4">
        <div className="flex justify-between">
          <div>
            <h2 className="font-titleFont text-base font-bold">{product.title.length > 20 ? (product.title.substring(0, 20)) + '...' : product.title}</h2>
          </div>
          <div className="flex justify-end gap-2 relative overflow-hidden w-28 text-sm">
            <div className="flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
              <p className="line-through text-gray-500">$1000</p>
              <p className="font-semibold">${product.price}</p>
            </div>
            <p
              onClick={() =>
                dispatch(addToCart({
                  _id: product.id,
                  title: product.title,
                  image: product.image,
                  price: product.price,
                  quantity: 1,
                  description: product.description,
                })) & toast.success(`${product.title} is added`)} className="absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500">add to cart {""} <BsArrowRight /></p>
          </div>
        </div>
        <div>
          <p>{product.category}</p>
        </div>
        <div className="absolute top-4 right-0">
          {isNew && (
            <p className="bg-black text-white font-semibold font-titleFont px-6 py-1">
              Sale
            </p>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  )
}
export default ProductsCard