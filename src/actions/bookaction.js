import {
  ADD_BOOK,
  UPDATE_BOOK,
  TOGGLE_READ_STATUS,
  SET_FILTER,
} from "../shared/constant";

export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: book,
});

export const updateBook = (bookId, updatedDetails) => ({
  type: UPDATE_BOOK,
  payload: { bookId, updatedDetails },
});

export const toggleReadStatus = (bookId) => ({
  type: TOGGLE_READ_STATUS,
  payload: bookId,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
