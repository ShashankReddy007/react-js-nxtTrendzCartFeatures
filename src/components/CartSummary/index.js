// Write your code here

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalAmount = cartList.reduce(
        (sum, {price, quantity}) => sum + price * quantity,
        0,
      )

      // to find the total quantity in cart
      // const totalQuantity = cartList.reduce(
      //   (sum, {quantity}) => sum + quantity,
      //   0,
      // )

      console.log(totalAmount)
      return (
        <>
          <p>
            Order Total:<span> Rs {totalAmount}/-</span>
          </p>
          <p>{cartList.length} Items in cart</p>
          <button type="button" className="logout-desktop-btn">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
