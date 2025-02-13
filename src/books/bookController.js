const Book = require("./bookModel");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book Posted Successfully!", book: newBook });
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

// *Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.log("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book Not Found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.log("Error fetching book", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

// *Update Book Data

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    if (!updateBook) {
      res.status(404).send({ message: "Book Not Found!" });
    }
    res
      .status(200)
      .send({ message: "Book Updated Successfully!", book: updatedBook });
  } catch (error) {
    console.log("Error Updating book", error);
    res.status(500).send({ message: "Failed to update book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book Not Found!" });
    }
    res
      .status(200)
      .send({ message: "Book Deleted Successfully!", book: deletedBook });
  } catch (error) {
    console.log("Error Deleting book", error);
    res.status(500).send({ message: "Failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
