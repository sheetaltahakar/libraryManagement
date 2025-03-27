import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export const ViewBooks = ({ isDetailViewOpen, handleClose, bookDetails }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");

  useEffect(() => {
    if (bookDetails) {
      setBookTitle(bookDetails.title);
      setBookAuthor(bookDetails.author);
      setBookDescription(bookDetails.description);
    }
  }, [bookDetails]);

  return (
    <form>
      <Dialog open={isDetailViewOpen} onClose={handleClose}>
        <DialogTitle style={{ width: "500px" }}>View Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Email Title"
            type="title"
            fullWidth
            disabled
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="author"
            name="author"
            label="Email Author"
            type="author"
            fullWidth
            disabled
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            disabled
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
