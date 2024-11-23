import App from "./App";
import BookDetails from "./components/BookDetails/BookDetails.jsx";
import BookList from "./components/BooksLsit/BookList.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [ 
      {
        index: true, 
        path:'/',
        element: <BookList />,
      },
      {
        path: "Book/:BookId",
        element: <BookDetails />,
      },
    ],
  },
];
export default routes;
