import App from "./App";
import BookDetails from "./components/BookDetails/BookDetails.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx"
import Favourites from "./components/Favourites/Favourites.jsx"
import Login from "./components/Login/Login.jsx";
import BookShelves from "./BookShelves/BookShelves.jsx";
import withGoogleAuth from "./HighOrderComponents/withGoogleAuth/withGoogleAuth.jsx";
import SearchedBooks from "./components/SearchedBooks/SearchedBooks.jsx";
import BooksList from "./components/BooksLsit/BooksList.jsx";

// Wrap Login with the HOC
const LoginWithGoogleAuth = withGoogleAuth(Login);

const routes = [
    {
      index: true, 
      path:'/',
      element:  <LoginWithGoogleAuth />,
    },
    {
    path: "/main",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [ 
      {
        path:'/main',
        element: <SearchedBooks />,
      },
      {
        path: "/main/Book/:BookId",
        element: <BookDetails />,
      },
      {
      path:"/main/favourites",
      element:<Favourites/>
      },
      {
        path:"/main/BookShelves",
        element:<BookShelves/>,
        children: [
          {
            path : "/main/BookShelves/:BookShelfId",
            element:<BooksList/>
          }
        ]
      },
    ],
  },
];
export default routes;
