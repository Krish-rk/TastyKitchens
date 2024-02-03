import CartContext from '../../context/CartContext'
import EmptyCartListView from '../EmptyCartListView'
import CartListView from '../CartListView'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0
      return (
        <div>
          {showEmptyView ? (
            <EmptyCartListView />
          ) : (
            <div className="cart-items-box">
              <div className="t-header">
                <h1 className="t-h-item">Item</h1>
                <h1 className="t-h-item">Quantity</h1>
                <h1 className="t-h-item">Price</h1>
              </div>
              <CartListView cartList={cartList} />
              <hr />
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
