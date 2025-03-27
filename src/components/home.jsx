import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, setFilter, toggleReadStatus } from "../actions/bookaction";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AddBooks } from "./addBooks";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ViewBooks } from "./viewBooks";

export const Home = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailViewOpen, setDetailViewOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const books = useSelector((state) => state.books.books);
  const filter = useSelector((state) => state.books.filter);
  const [filterBooks, setFilterBooks] = useState("all");

  const [addBookData, setAddBookData] = useState({
    bookTitle: "",
    bookAuthor: "",
    description: "",
    read: false,
  });

  const filteredBooks = books.filter((book) =>
    filter === "all" ? true : filter === "read" ? book.read : !book.read
  );

  const handleClose = () => {
    setIsDialogOpen(false);
    setDetailViewOpen(false);
  };

  const handleReadStatus = (id) => {
    console.log("id", id);
    dispatch(toggleReadStatus(id));
  };

  const handleClick = (book) => {
    setBookDetails(book);
    setDetailViewOpen(true);
    console.log("clicked");
  };

  return (
    <>
      <h1>Book Library</h1>
      <div>
        <InputLabel id="demo-simple-select-label">Select filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterBooks}
          label="Select filter"
          onChange={(e) => {
            setFilterBooks(e.target.value);
            dispatch(setFilter(e.target.value));
          }}
        >
          <MenuItem value={"all"}>all</MenuItem>
          <MenuItem value={"read"}>read</MenuItem>
          <MenuItem value={"unread"}>unread</MenuItem>
        </Select>
      </div>

      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {filteredBooks.map((book, index) => (
            <Card
              sx={{ maxWidth: 345 }}
              key={index}
              style={{
                display: "grid",
                backgroundColor: "black",
              }}
              onClick={() => handleClick(book)}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="/do_epic_shit.jpg"
                title="doEpicShit"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "white" }}
                >
                  {book.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {book.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleReadStatus(book.id)}>
                  {!book.read ? "Mark as read" : "Mark as unread"}
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setIsDialogOpen(true);
        }}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#f50057",
          color: "white",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          zIndex: "1000",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#d4004c")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#f50057")}
      >
        +
      </button>

      <AddBooks
        isDialogOpen={isDialogOpen}
        handleClose={handleClose}
        setAddBookData={setAddBookData}
      />

      <ViewBooks
        isDetailViewOpen={isDetailViewOpen}
        handleClose={handleClose}
        bookDetails={bookDetails}
      />
    </>
  );
};
