import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import './index.css'

const CartListView = props => {
  const {cartList} = props
  return (
    <ul className="cart-list-container">
      {cartList.map(each => (
        <CartItem item={each} key={each.id} quantity={each.quantity} />
      ))}
    </ul>
  )
}

export default CartListView
