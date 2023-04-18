import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as action from "../../Store/actions";
import Moment from "react-moment";
import Spinner from "../UI/Spinner/Spinner";

class TutorDetail extends Component {
  state = {
    tutors: null,
    currentTutor: null,
  };

  async componentDidMount() {
    await this.props.getTutors();
    this.setState({ ...this.state, tutors: this.props.tutors });
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const index = this.state.tutors.findIndex((i) => i._id ===id);
    this.setState({ ...this.state, currentTutor: this.state.tutors[index] });
  }
  render() {
    if (!localStorage.token) {
      return <Redirect to='/' />;
    }
    let tutor = this.state.currentTutor;
    if (tutor != null) {
      tutor = (
        <div className='profile-grid my-1'>
          <div className='profile-top bg-primary1 p-2'>
            <img
              height={"200px"}
              className='round-img my-1'
              src={tutor.photo_url}
              alt=''
            />
            <h1 className='large'>{tutor.name}</h1>
            <p>
              <i className='fas fa-map-marker-alt'></i> {tutor.city},{" "}
              {tutor.country}
            </p>
          </div>
          <div className='profile-about bg-light p-2'>
            <h2 className='primary-text'>Contact Details</h2>
            <div className='skills'>
              <div className='p-1'>
                <i className='fas fa-envelope'></i> {tutor.email}
              </div>
              <div className='p-1'>
                <i className='fas fa-phone'></i> {tutor.phone_no}
              </div>
            </div>

            <div className='line'></div>
            <h2 className='primary-text'>Courses</h2>
            <div className='skills'>
              {tutor.course.map((c) => {
                return (
                  <div className='p-1' key={c._id}>
                    <Link
                      to={
                        "/student/course-details?tid=" +
                        tutor._id +
                        "&cid=" +
                        c._id
                      }
                    >
                      <i className='fa fa-check'></i> {c.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          {tutor.experience ===null || tutor.experience.length ===0 ? (
            <p></p>
          ) : (
            <div className='profile-exp bg-white p-2'>
              <h2 className='primary-text'>Experience</h2>
              {tutor.experience.map((exp) => {
                return (
                  <div key={exp._id}>
                    <h3 className='text-dark'>{exp.company}</h3>
                    <p>
                      <i className='fas fa-calendar-day'></i>{" "}
                      <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{" "}
                      {exp.to ===null || exp.to ===undefined ? (
                        "Now"
                      ) : (
                        <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
                      )}
                    </p>
                    <p>
                      <strong>
                        <i className='fas fa-users'></i> Position:{" "}
                      </strong>
                      {exp.title}
                    </p>
                    <p>
                      <strong>
                        <i className='fas fa-info-circle'></i> Description:{" "}
                      </strong>
                      {exp.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {tutor.education ===null || tutor.education.length ===0 ? (
            <p></p>
          ) : (
            <div className='profile-edu bg-white p-2'>
              <h2 className='primary-text'>Education</h2>
              {tutor.education.map((edu) => {
                return (
                  <div key={edu._id}>
                    <h3>{edu.school}</h3>
                    <p>
                      <i className='fas fa-calendar-day'></i>{" "}
                      <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{" "}
                      {edu.to ===null || edu.to ===undefined ? (
                        "Now"
                      ) : (
                        <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
                      )}
                    </p>
                    <p>
                      <strong>
                        {" "}
                        <i className='fas fa-user-graduate'></i> Degree:{" "}
                      </strong>
                      {edu.degree}
                    </p>
                    <p>
                      <strong>
                        <i className='fas fa-book'></i> Field Of Study:{" "}
                      </strong>
                      {edu.fieldofstudy}
                    </p>
                    <p>
                      <strong>
                        <i className='fas fa-info-circle'></i> Description:{" "}
                      </strong>
                      {edu.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    if (this.props.loading || tutor ===null) tutor = <Spinner />;

    return (
      <div>
        <Link to='/student/dashboard' className='btn btn-light'>
          <i className='fas fa-arrow-left'></i> Back To Profiles
        </Link>
        <br></br>
        <br></br>
        {tutor}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTutors: () => dispatch(action.getTutors()),
  };
};

const mapStateToProps = (state) => ({
  tutors: state.tutors,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorDetail);
