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

const formatDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

/* Current Member script*/
queryFunction('select name_eng, name_kor, type, semester, startdate, enddate, career, graduate_type from member member LEFT JOIN user on member.userid = user.id LEFT JOIN member_type on member.typeid = member_type.id LEFT JOIN member_graduate_type on member.graduate_typeid = member_graduate_type.id WHERE enddate IS NOT NULL  \
ORDER BY `member`.`enddate`  DESC')
  .then(rows => {
    var resultStr = "";
    var count = 0;

    // 1) all collection ordered by enddate
    resultStr += "alumni:"+"\n";
    _.forEach(rows, row => {
      if (row.type == "Ph. D. Student") {
        count++;
        // resultStr += "  phd:"+"\n";
        // console.log(formatDate(row.enddate));
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      type : \"phd\"\n";
        resultStr += "      bio : \"박사\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";
      }
      else if (row.type == "M. S. Student") {
        count++;
        // resultStr += "  ms:"+"\n";
        // console.log(row);
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      type : \"ms\"\n";
        resultStr += "      bio : \"석사\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";

      }
      else if (row.type == "Researcher") {
        count++;
    // resultStr += "  intern:"+"\n";
        // console.log(row);
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      type : \"intern\"\n";
        resultStr += "      bio : \"인턴\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";

      }
      else if (row.type == "Staff") {
        count++;
    // resultStr += "  staff:"+"\n";
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      type : \"staff\"\n";
        resultStr += "      bio : \"Staff\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";

      }
      else if (row.type == "Research Professor") {
        count++;
    // resultStr += "  research professor:"+"\n";
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      type : \"research professor\"\n";
        resultStr += "      bio : \"연구교수\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";

      }
    });


    // 2) group by type
/*
    resultStr += "alumni:"+"\n";
    resultStr += "  phd:"+"\n";
    _.chain(rows)
      .filter({ type: "Ph. D. Student" })
      .forEach(row => {
        // console.log(formatDate(row.enddate));
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      bio : \"박사\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";
      })
      .value();
    resultStr += "  ms:"+"\n";
    // ms
    _.chain(rows)
      .filter({ type: 'M. S. Student' })
      .forEach(row => {
        // console.log(row);
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      bio : \"석사\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";
      })
      .value();
    resultStr += "  intern:"+"\n";
    // // researcher
    _.chain(rows)
      .filter({ type: 'Researcher' })
      .forEach(row => {
        // console.log(row);
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      bio : \"인턴\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";
      })
      .value();
    resultStr += "  staff:"+"\n";
    // // staff
    _.chain(rows)
      .filter({ type: 'Staff' })
      .forEach(row => {
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      bio : \"Staff\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";
      })
      .value();
    resultStr += "  research professor:"+"\n";
    // // staff
    _.chain(rows)
      .filter({ type: 'Research Professor' })
      .forEach(row => {
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      bio : \"연구교수\"\n";
        resultStr += "      status : \""+row.graduate_type+"\"\n";
        resultStr += "      semester : "+row.semester+"\n";
        resultStr += "      startdate : \""+formatDate(row.startdate)+"\"\n";
        resultStr += "      date : \""+formatDate(row.enddate)+"\"\n";
        resultStr += "      career : \""+row.career + "\"\n";
      })
      .value();
      console.log(count);
      */
    return resultStr
  }).then((resultStr) => {
    makeFileFunction(resultStr, "alumni.yml");
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