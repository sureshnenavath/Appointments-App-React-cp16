// src/components/Appointments/index.js
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItemComponent from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isStarredFilterActive: false,
  }

  onHandleSubmitForm = event => {
    event.preventDefault()

    const {title, date} = this.state
    if (title === '' || date === '') {
      alert('Please enter both Title and Date')
      return
    }
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onHandleDate = event => {
    this.setState({date: event.target.value})
  }

  onHandleTitle = event => {
    this.setState({title: event.target.value})
  }

  toggleStarredFilter = () => {
    this.setState(prevState => ({
      isStarredFilterActive: !prevState.isStarredFilterActive,
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(appointment =>
        appointment.id === id
          ? {...appointment, isStarred: !appointment.isStarred}
          : appointment,
      ),
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isStarredFilterActive} = this.state
    return isStarredFilterActive
      ? appointmentsList.filter(appointment => appointment.isStarred)
      : appointmentsList
  }

  render() {
    const {date, title, isStarredFilterActive} = this.state
    const filteredAppointments = this.getFilteredAppointments()

    return (
      <div className="main-container">
        <div className="container">
          <div className="top-container">
            <div className="form-container">
              <h1>Add Appointment</h1>
              <form onSubmit={this.onHandleSubmitForm}>
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  id="title"
                  value={title}
                  onChange={this.onHandleTitle}
                  placeholder="Enter Title"
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={this.onHandleDate}
                />
                <br />
                <button type="submit">Add</button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>

          <div className="appointments-container">
            <div className="appointments-stared">
              <h3>Appointments</h3>
              <button
                className="stared-button"
                onClick={this.toggleStarredFilter}
              >
                {isStarredFilterActive ? 'Starred' : 'Starred'}
              </button>
            </div>
            <ul className="ul-items">
              {filteredAppointments.map(eachItem => (
                <AppointmentItemComponent
                  key={eachItem.id}
                  eachItem={eachItem}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
