import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFilterRight} from 'react-icons/bs'
import ReactSlick from '../ReactSlick'
import RestaurantItem from '../RestaurantItem'

import './index.css'

class Home extends Component {
  state = {
    carousel: [],
    restaurentList: [],
  }

  componentDidMount() {
    this.getCorousel()
    this.getRestaurant()
  }

  getRestaurant = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${10}&limit=${9}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        restaurentList: data.restaurants,
      })
    }
  }

  getCorousel = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    this.setState({
      carousel: data.offers,
    })
  }

  render() {
    const {carousel, restaurentList} = this.state
    return (
      <>
        <div>
          <ReactSlick carousel={carousel} />
        </div>
        <div>
          <h1>Popular Restaurants</h1>
          <div>
            <p>Select your special dish</p>
            <BsFilterRight className="sort-by-icon" />
          </div>
        </div>
        <div>
          <ul className="list-container">
            {restaurentList.map(each => (
              <RestaurantItem item={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Home
