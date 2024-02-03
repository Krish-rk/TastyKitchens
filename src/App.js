import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import CartContext from './context/CartContext'
import Cart from './components/Cart'
import Header from './components/Header'
import Footer from './components/Footer'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = food => {
    const {id} = food
    const {cartList} = this.state
    const updatedquantity = cartList.filter(each => each.id === id)
    let newCartList = []
    if (updatedquantity.length > 0) {
      newCartList = cartList.map(each => {
        if (each.id === id) {
          return {
            ...each,
            quantity: food.quantity,
          }
        }
        return each
      })
    } else {
      newCartList = [...cartList, food]
    }

    this.setState({
      cartList: newCartList,
    })
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
        }}
      >
        <Header />
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurant/:id" component={RestaurantDetails} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
        <Footer />
      </CartContext.Provider>
    )
  }
}

export default App
