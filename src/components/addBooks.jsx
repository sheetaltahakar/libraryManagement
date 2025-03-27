import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { addBook } from "../actions/bookaction";

export const AddBooks = ({ isDialogOpen, handleClose, setAddBookData }) => {
  const dispatch = useDispatch();
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");

  const onSubmit = () => {
    setAddBookData({
      bookTitle,
      bookAuthor,
      description: bookDescription,
    });
    if (bookTitle && bookAuthor && bookDescription) {
      dispatch(
        addBook({
          id: Date.now(),
          title: bookTitle,
          author: bookAuthor,
          description: bookDescription,
          read: false,
        })
      );
      setBookTitle("");
      setBookAuthor("");
      setBookDescription("");
    }
    handleClose();
  };

  return (
    <form>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle style={{ width: "500px" }}>Add Book</DialogTitle>
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
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
