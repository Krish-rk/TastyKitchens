import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFilterRight} from 'react-icons/bs'
import {BiChevronRightSquare, BiChevronLeftSquare} from 'react-icons/bi'
import ReactSlick from '../ReactSlick'
import RestaurantItem from '../RestaurantItem'

import './index.css'

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

class Home extends Component {
  state = {
    carousel: [],
    restaurentList: [],
    sortBy: '',
    offset: 0,
    limit: 9,
    count: 1,
  }

  componentDidMount() {
    this.getCorousel()
    this.getRestaurant()
  }

  onDecreasePageno = () => {
    const {count, limit} = this.state
    if (count > 1) {
      this.setState(
        {count: count - 1, offset: (count - 1) * limit},
        this.getRestaurant,
      )
    }
  }

  onIncreasePageno = () => {
    const {count, limit} = this.state
    if (count < 20) {
      this.setState(
        {count: count + 1, offset: (count - 1) * limit},
        this.getRestaurant,
      )
    }
  }

  getRestaurant = async () => {
    const {sortBy, offset, limit} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}`
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

  onChangeSortby = event => {
    event.preventDefault()
    this.setState(
      {
        sortBy: event.target.value,
      },
      this.getRestaurant,
    )
  }

  render() {
    const {carousel, restaurentList, sortBy, count} = this.state
    return (
      <>
        <div className="home-cont">
          <ReactSlick carousel={carousel} />
        </div>
        <div className="sort-card">
          <div>
            <h1 className="card-head">Popular Restaurants</h1>
            <p>Select your special dish</p>
          </div>
          <div>
            <div className="sort-by-container">
              <BsFilterRight className="sort-by-icon" />
              <p className="sort-by">Sort by</p>
              <select
                className="sort-by-select"
                value={sortBy}
                onChange={this.onChangeSortby}
              >
                {sortByOptions.map(eachOption => (
                  <option
                    key={eachOption.optionId}
                    value={eachOption.optionId}
                    className="select-option"
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <ul className="list-container">
            {restaurentList.map(each => (
              <RestaurantItem item={each} key={each.id} />
            ))}
          </ul>
        </div>
        <div className="page-indicator">
          <button
            type="button"
            onClick={this.onDecreasePageno}
            data-testid="pagination-left-button"
          >
            <BiChevronLeftSquare size={40} />+
          </button>
          <p data-testid="active-page-number">{count} of 20</p>
          <button
            type="button"
            onClick={this.onIncreasePageno}
            data-testid="pagination-right-button"
          >
            -
            <BiChevronRightSquare size={40} />
          </button>
        </div>
      </>
    )
  }
}

export default Home
