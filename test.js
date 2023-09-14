var express = require('express');
var cors = require('cors');
const app = express()

//dotenv
const dotenv = require('dotenv');
dotenv.config();


//MYSQL Connection
var db = require('./config/db.js');

//File upload
var fileUpload = require('express-fileupload');
app.use(fileUpload());

const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log(`Book Shop API ... listening at http://localhost:${port}`)
});

//---JSON and URL Encode
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(cors());




// 1) -------- Get all books
app.get( '/books',  function (req, res)  {

  try
  {

      res.setHeader('Content-Type', 'application/json');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


      db.query(
        `
      SELECT
        bookid,title,isbn,pageCount,
        publishedDate,thumbnailUrl,
        shortDescription,authors.name as 'author',
        category,price
      FROM books,authors
      WHERE books.author=authors.authorid`,
        function (error, results, fields) {
          if (error) throw error;
          return res
            .status(200)
            .send({ error: false, message: "books list", data: results });
        }
      );

  } catch {

    return res.status(401).send()

  }



});







// 2) -------- Add new book
app.post( '/books',  function (req, res)  {

  try
  {

    var title = req.body.title;
    var price=req.body.price;
    var isbn = req.body.isbn;
    var pageCount = req.body.pageCount;
    var publishedDate=req.body.publishedDate;
    var thumbnailUrl=req.body.thumbnailUrl;
    var shortDescription=req.body.shortDescription;
    var author=req.body.author;
    var category=req.body.category;


    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    db.query(`INSERT INTO books
      (title,price, isbn, pageCount, publishedDate, thumbnailUrl,
      shortDescription, author, category)
      VALUES ( '${title}',${price}, '${isbn}', ${pageCount}, '${publishedDate}', '${thumbnailUrl}',
      '${shortDescription}', '${author}', '${category}');`,function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, message: 'Insert new book' });
    });


  } catch {

    return res.status(401).send()

  }

});







// 3) -------- Get book by id








// 4) -------- Delete book by id









// 5) -------- Edit book by id






