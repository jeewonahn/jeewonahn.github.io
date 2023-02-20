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
const pad = function(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

/* Current Member script*/
queryFunction('SELECT * FROM `board` WHERE listid = 3 ORDER BY `id` ASC')
  .then(rows => {
    // console.log(rows);
    var i = 0;
    _.forEach(rows, row => {
      var resultStr = "";
      i++;
      resultStr += "---\n";
      resultStr += "title: \""+row.title+"\"\n";
      resultStr += "date: \""+formatDate(row.regdate)+"\"\n";
      if (row.moddate != null) {
        resultStr += "last_modified_at: \""+formatDate(row.moddate)+"\"\n";
      } 
      else {
        resultStr += "last_modified_at: \n";
      }
      resultStr += "---\n";
      resultStr += "\\\\\n";
      resultStr += row.content.replace(/<br\/>/g, " ").replace(/<br>/g," ");

      // console.log(row.content.replace(/<br\/>/g, " "));

      makeFileFunction(resultStr, "news/"+pad(i)+"-"+
        row.title.replace(/<strong/g, "")
        .replace(/\/strong/g, "")
        .replace(/ /g, "-")
        .replace(/\./g, "_")+".md");
    });
  });


// excerpt: "저희 연구실에서 아래와 같은 일을 함께할 인턴 학생을 모집합니다."

// excerpt: "연구실에서 2018년 전기 신입생 3명을 새로 선발했습니다."

// excerpt: "우리 연구실의 김정우, 김재형, 황소희 학생이 학과에서 선발하는 BK 미참여학과 우수학생 장학생으로 선정되었습니다."

// excerpt: "2017년 한국정보처리학회 추계학술대회에 우수 논문으로 선정되었습니다."