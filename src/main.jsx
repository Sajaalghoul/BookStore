import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import routes from './routes.jsx'
import './index.css'

const router=createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}/>

)
