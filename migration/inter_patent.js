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

const formatDate2 = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        // day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    // if (day.length < 2) day = '0' + day;

    return [year, month].join('-');
}

const pad = function(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

/* Current Member script*/
queryFunction('SELECT patent.id, type, `status`, research.title as research_title, patent.title, `applicant1`, `applicant2`, `applicant3`, `applicant4`, `applicant5`, `applicant6`, `applicant7`, `applicant8`, `appliedid`, `applieddate`, `applied_first_file`, `applied_file`, `issuedid`, `issueddate`, `issued_first_file`, `issued_file`, `researchid`, `app_country` FROM patent LEFT JOIN patent_type ON patent.typeid = patent_type.id LEFT JOIN patent_status ON patent.statusid = patent_status.id LEFT JOIN research ON patent.researchid = research.id WHERE patent.typeid = 1')
  .then(rows => {
    // console.log(rows);
    var i = 0;
    var dateArr = [];
    var pathPrefix = "/assets/files/publication/international/patent/";
    _.forEach(rows, row => {
      // console.log(row);

      var resultStr = "";
      i++;
      resultStr += "---\n";
      resultStr += "title: \""+row.title+"\"\n";
      resultStr += "categories: international patent\n";
      resultStr += "status: \""+row.status+"\"\n";

      // var publication = "";
      // if (row.name_eng.toLowerCase().indexOf("regular") != -1 || row.name_kor.toLowerCase().indexOf("regular") != -1) {
      //   publication += "Regular Paper";
      // }
      // else if (row.name_eng.toLowerCase().indexOf("poster") != -1 || row.name_kor.toLowerCase().indexOf("poster") != -1) {
      //   publication += "Poster Paper";
      // }
      // else if (row.name_eng.toLowerCase().indexOf("short") != -1 || row.name_kor.toLowerCase().indexOf("short") != -1) {
      //   publication += "Short Paper";
      // }
      // resultStr += "publication: \""+publication+"\"\n";

      (row.research_title) ?
      resultStr += "research_info: \""+row.research_title+"\"\n" : resultStr += "research_info:\n";

      resultStr += "patent:\n";
      resultStr += "  applied:\n";
      (row.appliedid) ? 
      resultStr += "    id: \""+row.appliedid+"\"\n" : resultStr += "    id:\n"; 
      (row.applieddate) ?
      resultStr += "    date: \""+formatDate(row.applieddate)+"\"\n" : resultStr += "    date:\n";
      (row.applied_first_file) ? 
      resultStr += "    firstfile: \""+pathPrefix+row.applied_first_file+"\"\n" : resultStr += "    firstfile:\n"; 
      (row.applied_file) ? 
      resultStr += "    file: \""+pathPrefix+row.applied_file+"\"\n" : resultStr += "    file:\n"; 

      resultStr += "  issued:\n";
      (row.issuedid && row.status.toLowerCase().indexOf("issued") != -1) ? 
      resultStr += "    id: \""+row.issuedid+"\"\n" : resultStr += "    id:\n"; 
      (row.issueddate && row.status.toLowerCase().indexOf("issued") != -1) ?
      resultStr += "    date: \""+formatDate(row.issueddate)+"\"\n" : resultStr += "    date:\n";
      (row.issued_first_file && row.status.toLowerCase().indexOf("issued") != -1) ? 
      resultStr += "    firstfile: \""+pathPrefix+row.issued_first_file+"\"\n" : resultStr += "    firstfile:\n"; 
      (row.issued_file && row.status.toLowerCase().indexOf("issued") != -1) ? 
      resultStr += "    file: \""+pathPrefix+row.issued_file+"\"\n" : resultStr += "    file:\n"; 

      (row.researchid) ? 
      resultStr += "  researchid: \""+row.researchid+"\"\n" : resultStr += "  researchid: \n";      
      (row.app_country) ? 
      resultStr += "  country: \""+row.app_country+"\"\n" : resultStr += "  country: \n";

      resultStr += "authors:\n";
      if (row.applicant1) {
        resultStr += "  "+row.applicant1+":\n";
      }
      
      if (row.applicant2) {
        resultStr += "  "+row.applicant2+":\n" 
      }
      
      if (row.applicant3) {
        resultStr += "  "+row.applicant3+":\n" 
      }
      
      if (row.applicant4) {
        resultStr += "  "+row.applicant4+":\n" 
      }
      
      if (row.applicant5) {
        resultStr += "  "+row.applicant5+":\n" 
      }
      
      if (row.applicant6) {
        resultStr += "  "+row.applicant6+":\n" 
      }
      
      if (row.applicant7) {
        resultStr += "  "+row.applicant7+":\n" 
      }
      
      if (row.applicant8) {
        resultStr += "  "+row.applicant8+":\n" 
      }
      


      // // // make date form appended post number in same year-month
      var date = "";
      if (row.status.toLowerCase().indexOf("issued") != -1) {
        date += formatDate2(row.issueddate);
      } else {
        date += formatDate2(row.applieddate);
      }
      // var date += row.year+"-"+pad(row.month);
      var count = 0;
      for (var i=0; i<dateArr.length; i++) {
        if (dateArr[i] == date) count++;
      }
      var finalDate = date+"-"+pad(count+1);
      resultStr += "date: \""+finalDate+"\"\n"; 
      dateArr.push(date);

      resultStr += "---\n";

      resultStr += "## Applicants\n";
      resultStr += "{% include authors_label authors=page.authors categories=page.categories %}\n\n";

      resultStr += "{% if page.patent.country %}\n";
      resultStr += "## Country\n";
      resultStr += "{{ page.patent.country }}\n";
      resultStr += "{% endif %}\n";
      resultStr += "## Applied\n";
      resultStr += "### ID\n";
      resultStr += "{{ page.patent.applied.id }}\n";
      resultStr += "### date\n";
      resultStr += "{{ page.patent.applied.date | date: '%B %e, %Y'}}\n";
      resultStr += "{% if page.patent.issued.date %}\n";
      resultStr += "## Issued\n";
      resultStr += "### ID\n";
      resultStr += "{{ page.patent.issued.id }}\n";
      resultStr += "### date\n";
      resultStr += "{{ page.patent.issued.date | date: '%B %e, %Y'}}\n";
      resultStr += "{% endif %}\n";

      resultStr += "## Status\n";
      resultStr += "{{ page.status }}\n\n";

      resultStr += "{% if page.research_info %}\n";
      resultStr += "## Research\n";
      resultStr += "{{ page.research_info }}\n";
      resultStr += "{% endif %}\n\n";



      makeFileFunction(resultStr, "international/patent/"+finalDate+"-"+
        row.title.replace(/<strong/g, "")
        .replace(/\/strong/g, "")
        .replace(/ /g, "-")
        .replace(/\./g, "_")+".md");

      // console.log(resultStr);
    });
  });
