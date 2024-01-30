import './index.css'
import {Link} from 'react-router-dom'

const RestaurantItem = props => {
  const {item} = props
  const {name, rating, cuisine, id} = item
  return (
    <Link to={`/restaurant/${id}`}>
      <li className="item-container">
        <img src={item.image_url} className="item-img" />
        <div>
          <h1>{name}</h1>
          <p>{cuisine}</p>
          <p>{rating}</p>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
