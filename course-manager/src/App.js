import {useState} from 'react';

import { messages } from './messages';
import List from './List';
import "./App.css";

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [course, setCourse] = useState({});
  const [showCourse, setShowCourse] = useState(false);

  const update = e => {
    setSearchText(e.target.value);
  }

  const getDepartmentAndCourse = str => {
    let deptStr = '', courseStr = '';
    [...str].forEach(x => {
      if(isNaN(x)){
        deptStr += x;
      }
      else{
        courseStr += x;
      }
    });
    const output = {
      department: deptStr,
      course: courseStr
    };
    return output;
  }

  const isValidSearch = list => {
    if(list.length < 3){
      return false;
    }
    let isValid = true;

    let department, course, year, semester;
    if(list.length === 4){
      department = list[0];
      course = list[1];

      if(!isNaN(parseInt(list[2], 10))){
        year = list[2].length === 2 ? ('20' + list[2]): list[2];
        semester = list[3];
      }
      else if(isNaN(parseInt(list[2], 10))){
        semester = list[2];
        year = list[3].length === 2 ? ('20' + list[3]): list[3];

      }

      const departmentRegex = new RegExp(/^[A-Z:-]+$/i);
      const courseRegex = new RegExp(/^[0-9]+$/);
      const yearRegex = new RegExp(/^(200\d|201\d|2020|2021|2022)$/);

      isValid = departmentRegex.test(department) && courseRegex.test(parseInt(course, 10)) && yearRegex.test(year)
      && (semester.charAt(0).toLowerCase() === 'f' || semester.charAt(0).toLowerCase() === 's' || semester.charAt(0).toLowerCase() === 'w');
    }
    else if(list.length === 3){
      department = getDepartmentAndCourse(list[0]).department;
      course = getDepartmentAndCourse(list[0]).course;
      if(!isNaN(parseInt(list[1], 10))){
        year = list[1].length === 2 ? ('20' + list[1]): list[1];
        semester = list[2];
      }
      else if(isNaN(parseInt(list[1], 10))){
        semester = list[1];
        year = list[2].length === 2 ? ('20' + list[2]): list[2];

      }

      const departmentRegex = new RegExp(/^[a-zA-Z0-9:-]+$/i);
      const yearRegex = new RegExp(/^(200\d|201\d|2020|2021|2022)$/);

      isValid = departmentRegex.test(department) && yearRegex.test(year)
      && (semester.charAt(0).toLowerCase() === 'f' || semester.charAt(0).toLowerCase() === 's' || semester.charAt(0).toLowerCase() === 'w');
    }

    const props = {
      department,
      course,
      year,
      semester
    };

    return {isValid, props};
  }

  const addCourse = () => {

    const list = searchText.trim().split(' ');
    const isValidCheckObj = isValidSearch(list);
    if(searchText === '' || !list.length || !isValidCheckObj.isValid){
      setShowErrorMsg(true);
      setShowCourse(false);
    }
    else{
      setSearchText('');
      setCourse(isValidCheckObj.props);
      setShowErrorMsg(false);
      setShowCourse(true);
    }
  }

  return (
    <div className='content'>
      <div className='formLayout'>
        <label>Course</label><br />
        <label>
          <input type="text" className={showErrorMsg ? "error": ""} value={searchText} onChange={update} placeholder="Enter course..."/>
        </label>
        <span className="text">
          <button onClick={addCourse}>Submit</button>
        </span><br />
        {showErrorMsg && <label className="errorMsg">{messages.INVALID_COURSE}</label>}
      </div>
      {showCourse && <List {...course}/>}
    </div>
  );
}
