import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, toggleReadStatus } from "../actions/bookaction";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AddBooks } from "./addBooks";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ViewBooks } from "./viewBooks";
import "../Home.css";
import { EditBooks } from "./editBooks";

export const Home = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailViewOpen, setDetailViewOpen] = useState(false);
  const [isEditViewOpen, setEditViewOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const books = useSelector((state) => state.books.books);
  const filter = useSelector((state) => state.books.filter);
  const [filterBooks, setFilterBooks] = useState(filter);

  const [addBookData, setAddBookData] = useState({
    bookTitle: "",
    bookAuthor: "",
    description: "",
    read: false,
  });

  useEffect(() => {
    setFilterBooks(filter);
  }, [filter]);

  const filteredBooks = books.filter((book) =>
    filterBooks === "all"
      ? true
      : filterBooks === "read"
      ? book.read
      : !book.read
  );

  const handleClose = () => {
    setIsDialogOpen(false);
    setDetailViewOpen(false);
    setEditViewOpen(false);
  };

  const handleReadStatus = (id) => {
    dispatch(toggleReadStatus(id));
  };

  const handleClick = (book) => {
    setBookDetails(book);
    setDetailViewOpen(true);
  };

  const handleReadToggle = (e, book) => {
    e.stopPropagation();
    handleReadStatus(book.id);
  };

  const handleEditClick = (e, book) => {
    e.stopPropagation();
    setBookDetails(book);
    setEditViewOpen(true);
  };

  const bookImages = [
    "/book1.jpg",
    "/book2.jpg",
    "/book3.jpg",
    "/book4.jpg",
    "/book5.jpg",
  ];

  // Function to select a random image from the array
  const getRandomBookImage = () => {
    const randomIndex = Math.floor(Math.random() * bookImages.length);
    return bookImages[randomIndex];
  };

  return (
    <div className="home-container">
      <h2>Book Library</h2>

      {/* Filter Container */}
      <div className="filter-container">
        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={filterBooks}
          label="Select filter"
          onChange={(e) => {
            setFilterBooks(e.target.value);
            dispatch(setFilter(e.target.value));
          }}
          size="small"
          sx={{
            height: "40px",
          }}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"read"}>Read</MenuItem>
          <MenuItem value={"unread"}>Unread</MenuItem>
        </Select>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <Typography variant="h6" color="textSecondary">
            No books available
          </Typography>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book, index) => (
            <Card
              key={index}
              className="book-card"
              onClick={() => handleClick(book)}
            >
              <CardMedia
                sx={{ height: 140 }}
                image={getRandomBookImage()}
                title={book.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2">{book.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => handleReadToggle(e, book)}
                >
                  {!book.read ? "Mark as read" : "Mark as unread"}
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => handleEditClick(e, book)}
                >
                  {"edit"}
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}

      {/* Add Book Button */}
      <button className="add-book-button" onClick={() => setIsDialogOpen(true)}>
        +
      </button>

      {/* AddBooks and ViewBooks Modals */}
      <AddBooks
        isDialogOpen={isDialogOpen}
        handleClose={handleClose}
        setAddBookData={setAddBookData}
      />

      <EditBooks
        isEditViewOpen={isEditViewOpen}
        handleClose={handleClose}
        bookDetails={bookDetails}
      />

      <ViewBooks
        isDetailViewOpen={isDetailViewOpen}
        handleClose={handleClose}
        bookDetails={bookDetails}
      />
    </div>
  );
};
