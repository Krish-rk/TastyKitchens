import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'

class FoodDetails extends Component {
  state = {
    quantity: 0,
  }

  renderAdd = () => {
    const {addCartItem, food, quantity} = this.props
    const {id} = food
    const Additem = () => {
      addCartItem({
        food,
        quantity: quantity + 1,
      })
    }

    return (
      <div>
        <button onClick={this.onIncrementQuantity}>Add</button>
      </div>
    )
  }

  renderMoreQuantity = () => {
    const {quantity} = this.state
    return (
      <div className="quantity-container">
        <button
          type="button"
          className="quantity-controller-button"
          onClick={this.onDecrementQuantity}
        >
          <BsDashSquare className="quantity-controller-icon" />
          plus
        </button>
        <p className="quantity">{quantity}</p>
        <button
          type="button"
          className="quantity-controller-button"
          onClick={this.onIncrementQuantity}
        >
          <BsPlusSquare className="quantity-controller-icon" />-
        </button>
      </div>
    )
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {food} = this.props
          const {quantity} = this.state

          const updatedFood = {
            name: food.name,
            cost: food.cost,
            imageUrl: food.image_url,
            id: food.id,
            foodType: food.food_type,
          }
          const {name, cost, imageUrl, id, foodType} = updatedFood
          const {addCartItem} = value
          const onClickAddToCart = () => {
            addCartItem({...food, quantity})
          }

          return (
            <div>
              <div>
                <img src={imageUrl} />
              </div>
              <div>
                <h1>{name}</h1>
                <p>{cost}</p>
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                  >
                    {' '}
                    -
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                  >
                    {' '}
                    +
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodDetails
