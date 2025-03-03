import './index.css'

const AppointmentItemComponent = props => {
  const {eachItem, toggleStar} = props
  const {id, title, date, isStarred} = eachItem

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li>
      <div className="appointment-item">
        <div className="appointment-details">
          <h4 className="title">{title}</h4>
          <button
            type="button"
            className="star-button"
            data-testid="star"
            onClick={onClickStar}
          >
            <img src={starImgUrl} alt="star" className="star-icon" />
          </button>
        </div>
        <div>
          <p className="date">Date: {date}</p>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItemComponent
