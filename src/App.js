import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import CartContext from './context/CartContext'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = food => {
    this.setState(prev => ({
      cartList: [...prev.cartList, food],
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurant/:id" component={RestaurantDetails} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
