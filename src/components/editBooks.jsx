import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { updateBook } from "../actions/bookaction";
import { z } from "zod";

// Create Zod schema for form validation
const bookSchema = z.object({
  bookTitle: z.string().min(1, "Book title is required"),
  bookAuthor: z.string().min(1, "Author is required"),
  bookDescription: z.string().min(1, "Description is required"),
});

export const EditBooks = ({ isEditViewOpen, handleClose, bookDetails }) => {
  const dispatch = useDispatch();
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [errors, setErrors] = useState({});

  // Set initial values when bookDetails change
  useEffect(() => {
    if (bookDetails) {
      setBookTitle(bookDetails.title);
      setBookAuthor(bookDetails.author);
      setBookDescription(bookDetails.description);
    }
  }, [bookDetails]);

  // Handle form submission
  const handleSubmit = () => {
    // Validate the form data using Zod
    const result = bookSchema.safeParse({
      bookTitle,
      bookAuthor,
      bookDescription,
    });

    if (result.success) {
      dispatch(
        updateBook(bookDetails.id, {
          ...bookDetails,
          title: bookTitle,
          author: bookAuthor,
          description: bookDescription,
        })
      );
      setBookTitle("");
      setBookAuthor("");
      setBookDescription("");
      setErrors({});
      handleClose();
    } else {
      // If validation fails, set the errors state
      const errorMessages = result.error.formErrors.fieldErrors;
      setErrors(errorMessages);
    }
  };

  return (
    <form>
      <Dialog open={isEditViewOpen} onClose={handleClose}>
        <DialogTitle style={{ width: "500px" }}>Edit Book</DialogTitle>
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
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
