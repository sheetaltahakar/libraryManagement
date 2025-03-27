import { Description } from "@mui/icons-material";
import {
  ADD_BOOK,
  UPDATE_BOOK,
  TOGGLE_READ_STATUS,
  SET_FILTER,
} from "../shared/constant";

const initialState = {
  books: [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      description: "tetsttttttttttttttttttttttttttttttttttttttttttttt",
      read: true,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "tetsttttttttttttttttttttttttttttttttttttttttttttt",
      read: false,
    },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen", read: true },
    {
      id: 4,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "tetsttttttttttttttttttttttttttttttttttttttttttttt",
      read: false,
    },
  ],
  filter: "all",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };

    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.bookId
            ? { ...book, ...action.payload.updatedDetails }
            : book
        ),
      };

    case TOGGLE_READ_STATUS:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload ? { ...book, read: !book.read } : book
        ),
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export default booksReducer;
