import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { addBook } from "../actions/bookaction";
import { z } from "zod";

// Create Zod schema for form validation
const bookSchema = z.object({
  bookTitle: z.string().min(1, "Book title is required"),
  bookAuthor: z.string().min(1, "Author is required"),
  bookDescription: z.string().min(1, "Description is required"),
});

export const AddBooks = ({ isDialogOpen, handleClose, setAddBookData }) => {
  const dispatch = useDispatch();
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const result = bookSchema.safeParse({
      bookTitle,
      bookAuthor,
      bookDescription,
    });

    if (result.success) {
      setAddBookData({
        bookTitle,
        bookAuthor,
        description: bookDescription,
      });
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
      setErrors({});
      handleClose();
    } else {
      const errorMessages = result.error.formErrors.fieldErrors;
      setErrors(errorMessages);
    }
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
            id="bookTitle"
            name="bookTitle"
            label="Book Title"
            type="text"
            fullWidth
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            error={Boolean(errors.bookTitle)}
            helperText={errors.bookTitle}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookAuthor"
            name="bookAuthor"
            label="Book Author"
            type="text"
            fullWidth
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            error={Boolean(errors.bookAuthor)}
            helperText={errors.bookAuthor}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="bookDescription"
            name="bookDescription"
            label="Description"
            type="text"
            fullWidth
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)}
            error={Boolean(errors.bookDescription)}
            helperText={errors.bookDescription}
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
