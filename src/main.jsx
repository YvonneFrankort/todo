import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './screens/App'
import Authentication, { AuthenticationMode } from './screens/Authentication'
import ProtectedRoute from './components/ProtectedRoute' 
import UserProvider from './context/UserProvider' 
import { RouterProvider } from 'react-router-dom' 
import { createBrowserRouter } from "react-router-dom"; 
import NotFound from "./screens/NotFound";

const router = createBrowserRouter([
  {
    errorElement: <NotFound />
  },
  {
    path: "/signin",
    element: <Authentication authenticationMode={AuthenticationMode.SignIn} />
  },
  {
    path: "/signup",
    element: <Authentication authenticationMode={AuthenticationMode.SignUp} />
  },
  {
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/",
        element: <App />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
