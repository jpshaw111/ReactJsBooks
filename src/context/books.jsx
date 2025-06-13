import { createContext, useState } from "react";
import axios from "axios";


const BookContext = createContext();

const Provider = ( {children }) => {

  const[books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    
    setBooks(response.data)
  }

  const createBook = async (title) => {

     const response = await axios.post("http://localhost:3001/books", {
      title: title
    });

    setBooks([
      ...books,
      response.data
    ]);

  }

  const deleteBookById = async (id) => {

    await axios.delete(`http://localhost:3001/books/${id}`);
    
    const updatedBooks = books.filter((book) => {
      return book.id !== id;

    });

    setBooks(updatedBooks);

  }

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle

    })
    const updatedBooks = books.map((book) => {
      if(book.id === id) {
        return { ...book, ...response}
      }

      return book;

    });

    setBooks(updatedBooks);

  }
  



const valueToShare = {
    books,
    createBook,
    deleteBookById,
    editBookById,
    fetchBooks
}

return <BookContext.Provider value={valueToShare}>
    { children }
</BookContext.Provider>


}

export { Provider };

export  default BookContext;