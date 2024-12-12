import App from "./App";
import BookDetails from "./components/BookDetails/BookDetails.jsx";
import BookList from "./components/BooksLsit/BookList.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx"
import Favourites from "./components/Favourites/Favourites.jsx"
import Login from "./components/Login/Login.jsx";

const routes = [
    {
      index: true, 
      path:'/',
      element: <Login/>,
    },
    {
    path: "/main",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [ 
      {
        path:'/main',
        element: <BookList />,
      },
      {
        path: "/main/Book/:BookId",
        element: <BookDetails />,
      },
      {
      path:"/main/favourites",
      element:<Favourites/>
      }
    ],
  },
];
export default routes;
