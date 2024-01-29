import './index.css'

const RestaurantItem = props => {
  const {item} = props
  const {name, rating, cuisine} = item
  return (
    <li className="item-container">
      <div>
        <img src={item.image_url} className="item-img" />
        <div>
          <h1>{name}</h1>
          <p>{cuisine}</p>
          <p>{rating}</p>
        </div>
      </div>
    </li>
  )
}

export default RestaurantItem
