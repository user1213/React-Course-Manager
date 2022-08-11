import "./App.css";

const List = (props) => {
  const {department, course, year, semester} = props;
  return (
    <div className="list">
        <div className="wrapper">
          <div className="header">
            {department} {course}
          </div>
          <div className="row">
              <div className="label">Department: </div>
              <div className="text">{department}</div>
          </div>
          <div className="row">
              <div className="label">Course: </div>
              <div className="text">{course}</div>
          </div>
          <div className="row">
              <div className="label">Year: </div>
              <div className="text">{year}</div>
          </div>
          <div className="row">
              <div className="label">Semester: </div>
              <div className="text">{semester}</div>
          </div>
        </div>
    </div>
  )
};

export default List;