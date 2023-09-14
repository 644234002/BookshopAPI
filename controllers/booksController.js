const db = require("../config/db");






// 1) -------- Get all books








// 2) -------- Add new book








// 3) -------- Get book by id








// 4) -------- Delete book by id









// 5) -------- Edit book by id














//-------- Upload book picture
const uploadBookCover = async function (req, res) {
  const bookCoverPath = process.env.BOOKSHOP_PICTURE_PATH;
  var bookid = Number(req.params.bookid);
  try {
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" });
    }

    const bookPictureFile = req.files.book_cover;

    var path = require("path");
    var pictureEx = path.extname(bookPictureFile.name);
  
    bookPictureFile.mv(`${bookCoverPath}${bookid}${pictureEx}`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }

      return res.send({
        name: `${bookid}${pictureEx}`,
        path: `${bookCoverPath}${bookid}${pictureEx}`,
      });
    });
  } catch {
    return res.status(401).send();
  }
};


module.exports = {
  // 6) -------- export functions from here (getBooks, addBook, etc.)
  
  uploadBookCover,
};
