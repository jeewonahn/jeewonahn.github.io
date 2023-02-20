const express = require('express');
// const router = express.Router();
// const mysql = require('mysql2/');
const mysql = require('mysql2/promise');
const _ = require('lodash');
const fs = require('fs');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'lab',
  user: 'root',
  password: 'lab53295root',
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0
});

// Query function
const queryFunction = async function(query) {
  const connection = await pool.getConnection();
  const [rows] = await connection.execute(query);
  await connection.release();
  return rows;
}

// File Write function
const makeFileFunction = function(resultStr, fileName) {
  fs.writeFile(fileName, resultStr, 'utf-8', function(e) {
    if(e) {
      console.log(e);
    }
    else {
      console.log("Writing file is Done!");
    }
  });
}

/* Course script*/
queryFunction('SELECT course.id, year, semesterid, course_type.name_eng as typename_eng, \
  course_type.name_kor as typename_kor, course.name_eng as coursename_eng, course.name_kor as coursename_kor, typeid, user.name_kor as username_kor, \
  user.name_eng as username_eng, professor_user.name_kor, professor_user.name_eng \
  FROM course LEFT JOIN course_type on course.typeid = course_type.id \
  LEFT JOIN user on course.assistantid = user.id \
  LEFT JOIN user AS professor_user on course.professorid = professor_user.id \
  ORDER BY `course`.`id` ASC')
  .then(rows => {
    var resultStr = "";
    _.forEach(rows, row => {
      // console.log(row);
      resultStr += "- year      : "+row.year+"\n";
      resultStr += "  semester  : "+row.semesterid + "\n";
      resultStr += "  type      : \""+row.typename_eng + "\"\n";
      resultStr += "  type_kor  : \""+row.typename_kor + "\"\n";
      resultStr += "  title     : \""+row.coursename_eng + "\"\n";
      resultStr += "  title_kor : \""+row.coursename_kor + "\"\n";
      resultStr += "  professor : \""+row.name_eng + "\"\n";
      resultStr += "  assistent : \""+row.username_eng + "\"\n";

    });
    return resultStr
  }).then((resultStr) => {
    makeFileFunction(resultStr, "courses.yml");
  });



// makeFileFunction(resultStr);
// var query = async function(query) {
// 	const connection = await pool.getConnection();
// 	const [rows] = await connection.execute(query);
//   console.log(rows[0])
//   console.log(typeof(rows))
//   // await rows.foreach(x => console.log(x))
// 	// for (var row in rows) {
//  //    var value = rows[row];
//  //    console.log(row.toString() + " , " + value.stringify());
//  //  }
//   const test = ["a" , "b", "c", "d"];
//   for (const a of test) {
//     console.log(a);
//   }

// 	await connection.release();
// 	return
// }
// Patent and Information Analysis
// Software R&D Patent Strategy
// query("SELECT * FROM project");