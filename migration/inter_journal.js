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
queryFunction('SELECT paper_intl_jour.id, paper_status.name_eng as paper_name_eng, paper_status.name_kor as paper_name_kor, paper_jour_publication.name_eng, paper_jour_publication.name_kor, project.subject, research.title as research_title, intl_jour.jour_name, author1, author2, author3, author4, author5, author6, author7, author8, paper_intl_jour.title, year, month, volumn, intl_jour_number_type.numbertype, number, startpage, endpage, paper_file, coverpage_file, listpage_file, firstpage_file FROM paper_intl_jour LEFT JOIN paper_status ON paper_intl_jour.statusid = paper_status.id LEFT JOIN paper_jour_publication ON paper_intl_jour.publicationid = paper_jour_publication.id LEFT JOIN project ON paper_intl_jour.projectid = project.id LEFT JOIN research ON paper_intl_jour.researchid = research.id LEFT JOIN intl_jour ON paper_intl_jour.jourid = intl_jour.id LEFT JOIN intl_jour_number_type ON paper_intl_jour.numbertypeid = intl_jour_number_type.id')
  .then(rows => {
    // console.log(rows);
    var i = 0;
    var dateArr = [];
    var pathPrefix = "/assets/files/publication/international/journal/";
    _.forEach(rows, row => {
      // console.log(row);

      var resultStr = "";
      i++;
      resultStr += "---\n";
      resultStr += "title: \""+row.title+"\"\n";
      resultStr += "categories: international journal\n";
      resultStr += "status: \""+row.paper_name_eng+"\"\n";

      var publication = "";
      if (row.name_eng.toLowerCase().indexOf("regular") != -1 || row.name_kor.toLowerCase().indexOf("regular") != -1) {
        publication += "Regular Paper";
      }
      else if (row.name_eng.toLowerCase().indexOf("poster") != -1 || row.name_kor.toLowerCase().indexOf("poster") != -1) {
        publication += "Poster Paper";
      }
      else if (row.name_eng.toLowerCase().indexOf("short") != -1 || row.name_kor.toLowerCase().indexOf("short") != -1) {
        publication += "Short Paper";
      }
      resultStr += "publication: \""+publication+"\"\n";

      (row.subject) ?
      resultStr += "project_info: \""+row.subject+"\"\n" : resultStr += "project_info:\n";
      (row.research_title) ?
      resultStr += "research_info: \""+row.research_title+"\"\n" : resultStr += "research_info:\n";

      resultStr += "journal:\n";
      (row.jour_name) ? 
      resultStr += "  title: \""+row.jour_name+"\"\n" : resultStr += "  title:\n"; 
      (row.volumn) ?
      resultStr += "  volume: \""+row.volumn+"\"\n" : resultStr += "  volume:\n";
      (row.numbertype) ? 
      resultStr += "  type: \""+row.numbertype+"\"\n" : resultStr += "  type:\n"; 
      (row.number) ? 
      resultStr += "  number: \""+row.number+"\"\n" : resultStr += "  number:\n"; 
      (row.startpage) ? 
      resultStr += "  startpage: \""+row.startpage+"\"\n" : resultStr += "  startpage:\n"; 
      (row.endpage) ?
      resultStr += "  endpage: \""+row.endpage+"\"\n" : resultStr += "  endpage:\n";

      resultStr += "authors:\n";
      if (row.author1) {
        resultStr += "  "+row.author1+":\n";
      }
      
      if (row.author2) {
        resultStr += "  "+row.author2+":\n" 
      }
      
      if (row.author3) {
        resultStr += "  "+row.author3+":\n" 
      }
      
      if (row.author4) {
        resultStr += "  "+row.author4+":\n" 
      }
      
      if (row.author5) {
        resultStr += "  "+row.author5+":\n" 
      }
      
      if (row.author6) {
        resultStr += "  "+row.author6+":\n" 
      }
      
      if (row.author7) {
        resultStr += "  "+row.author7+":\n" 
      }
      
      if (row.author8) {
        resultStr += "  "+row.author8+":\n" 
      }
      


      // // make date form appended post number in same year-month
      var date = row.year+"-"+pad(row.month);
      var count = 0;
      for (var i=0; i<dateArr.length; i++) {
        if (dateArr[i] == date) count++;
      }
      var finalDate = date+"-"+pad(count+1);
      resultStr += "date: \""+finalDate+"\"\n"; 
      dateArr.push(date);

      resultStr += "files:\n";
      (row.paper_file && row.paper_file != "undefined") ? 
      resultStr += "  paper: \""+pathPrefix+row.paper_file+"\"\n" : resultStr += "  paper:\n"; 
      (row.coverpage_file && row.coverpage_file != "undefined") ?
      resultStr += "  coverpage: \""+pathPrefix+row.coverpage_file+"\"\n" : resultStr += "  coverpage:\n";
      (row.listpage_file && row.listpage_file != "undefined") ? 
      resultStr += "  listpage: \""+pathPrefix+row.listpage_file+"\"\n" : resultStr += "  listpage:\n"; 
      (row.firstpage_file && row.firstpage_file != "undefined") ?
      resultStr += "  firstpage: \""+pathPrefix+row.firstpage_file+"\"\n" : resultStr += "  firstpage:\n";
      resultStr += "---\n";

      resultStr += "## Authors\n";
      resultStr += "{% include authors_label authors=page.authors categories=page.categories %}\n\n";

      resultStr += "## Date\n";
      resultStr += "{{ page.date | date: '%B, %Y' }}\n\n";

      resultStr += "## Information\n";
      resultStr += "{{ page.journal.title }}, Volume {{ page.journal.volume }}, {{ page.journal.type }} {{ page.journal.number }}, {{ page.journal.startpage }}-{{ page.journal.endpage }} pp.\n\n";

      resultStr += "## Status\n";
      resultStr += "{{ page.status }}\n\n";

      resultStr += "## Publication\n";
      resultStr += "{{ page.publication }}\n\n";

      resultStr += "{% if page.project_info %}\n";
      resultStr += "## Project\n";
      resultStr += "{{ page.project_info }}\n";
      resultStr += "{% endif %}\n\n";

      resultStr += "{% if page.research_info %}\n";
      resultStr += "## Research\n";
      resultStr += "{{ page.research_info }}\n";
      resultStr += "{% endif %}\n\n";



      makeFileFunction(resultStr, "international/journal/"+finalDate+"-"+
        row.title.replace(/<strong/g, "")
        .replace(/\/strong/g, "")
        .replace(/ /g, "-")
        .replace(/\./g, "_")+".md");

      // console.log(resultStr);
    });
  });
