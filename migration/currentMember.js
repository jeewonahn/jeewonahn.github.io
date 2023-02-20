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

/* Current Member script*/
queryFunction('select name_eng, name_kor, type, semester, startdate, enddate, career, image, email from member member join user on member.userid = user.id join member_type on member.typeid = member_type.id where enddate IS NULL ORDER BY `member`.`semester` DESC')
  .then(rows => {
    var resultStr = "";
    // professor
    _.forEach(rows, row => {
      if (row.type == ("Professor")) {
      // console.log(row);
        resultStr += "professor:"+"\n";
        resultStr += "  "+row.name_eng + ":\n";
        resultStr += "    name: \""+row.name_eng + "\"\n";
        resultStr += "    name_ko: \""+row.name_kor + "\"\n";
        resultStr += "    avatar: \"/assets/images/member/current/"+row.image + "\"\n";
        resultStr += "    bio : \"Professor of Dept. of Computer Science, Yonsei University\"\n";
        resultStr += "    location : \"Dept.of Computer Science, Yonsei university, 134 Sinchon-dong, Seodaemun-gu, Seoul, 120-749, Korea\"\n";
        resultStr += "    phone : \"+82-2-2123-5714\"\n";
        resultStr += "    fax : \"+82-2-365-2579\"\n";
        resultStr += "    email : \""+row.email + "\"\n";
      }
    });

    resultStr += "current:"+"\n";
    resultStr += "  phd:"+"\n";
    // phd
    _.chain(rows)
      .filter({ type: "Ph. D. Student" })
      .forEach(row => {
        // console.log(row);
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      avatar: \"/assets/images/member/current/"+row.image + "\"\n";
        resultStr += "      bio : \"박사 "+row.semester+"학기\"\n";
        resultStr += "      email : \""+row.email + "\"\n";
        resultStr += "      team : \""+ "\"\n";
        resultStr += "      team_url : \""+ "\"\n";
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
        resultStr += "      avatar: \"/assets/images/member/current/"+row.image + "\"\n";
        resultStr += "      bio : \"석사 "+row.semester+"학기\"\n";
        resultStr += "      email : \""+row.email + "\"\n";
        resultStr += "      team : \""+ "\"\n";
        resultStr += "      team_url : \""+ "\"\n";
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
        resultStr += "      avatar: \"/assets/images/member/current/"+row.image + "\"\n";
        resultStr += "      bio : \"Intern\"\n";
        resultStr += "      email : \""+row.email + "\"\n";
        resultStr += "      team : \""+ "\"\n";
        resultStr += "      team_url : \""+ "\"\n";
      })
      .value();
    resultStr += "  staff:"+"\n";
    // // staff
    _.chain(rows)
      .filter({ type: 'Staff' })
      .forEach(row => {
        console.log(row);
        resultStr += "    "+row.name_eng + ":\n";
        resultStr += "      name: \""+row.name_eng + "\"\n";
        resultStr += "      name_ko: \""+row.name_kor + "\"\n";
        resultStr += "      avatar: \"/assets/images/member/current/"+row.image + "\"\n";
        resultStr += "      email : \""+row.email + "\"\n";
      })
      .value();
    return resultStr
  }).then((resultStr) => {
    makeFileFunction(resultStr, "members.yml");
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