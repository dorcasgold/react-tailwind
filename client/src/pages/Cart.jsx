import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { HiOutlineArrowLeft } from "react-icons/hi";
import StripeCheckout from 'react-stripe-Checkout'
import axios from 'axios'

function Cart() {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [totalAmt, setTotalAmt] = useState("");
  const [payNow, setPayNow] = useState(false)

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);
  const handleChcekout = () => {
    if (userInfo) {
      setPayNow(true)
    } else (
      toast.error("Please Log in to continue")
    )
  }
  const payment = async (token) => {
    await axios.post("http://localhost:8000./pay", {
      amount: totalAmt * 100,
      token: token,
    });
  }
  return (
    <div>
      <img
        className="w-full h-60 object-cover"
        src="https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="cartImg"
      />
      {
        productData.length === 0 ?
          <div className='flex flex-col justify-center items-center py-5 gap-2'>
            <p className='text-red-500 font-semibold text-lg'>Your Cart is Empty 🛒 Add Products to Your Cart !!!</p>
            <Link to="/">
              <button className="flex items-center gap-1 text-gray-400 hover:text-black duration-300">
                <span>
                  <HiOutlineArrowLeft />
                </span>
                go shopping
              </button>
            </Link>
          </div>
          :
          <div className="max-w-screen-xl mx-auto py-20 flex">
            <CartItem />
            <div className="w-1/3 bg-[#fafafa] py-6 px-4">
              <div className=" flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
                <h2 className="text-2xl font-medium ">cart totals</h2>
                <p className="flex items-center gap-4 text-base">
                  Subtotal{" "}
                  <span className="font-titleFont font-bold text-lg">
                    $ {totalAmt}
                  </span>
                </p>
                <p className="flex items-start gap-4 text-base">
                  Shipping{" "}
                  <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, veritatis.
                  </span>
                </p>
              </div>
              <p className="font-titleFont font-semibold flex justify-between mt-6">
                $ {totalAmt}
              </p>
              <button onClick={handleChcekout}
                className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
              >
                proceed to checkout
              </button>
              {
                payNow && (
                  <div className="w-full mt-6 flex items-center justify-center">
                    <StripeCheckout
                      stripeKey="pk_test_51PcBCTAg00tmyCg7ECgCGuXl1xKM9EtP4vQqWbeL8nK2WjNNehWF2nBW4859nZ9rc1Alh1ItOhFT8b3P6xHgBCkG00ynktayQn"
                      name="Bazar Online Shopping"
                      amount={totalAmt * 100}
                      label="Pay to bazar"
                      description={`Your Payment amount is $${totalAmt}`}
                      token={payment}
                      email={userInfo.email}
                    />
                  </div>
                )
              }
            </div>
          </div>
      }

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
export default Cart