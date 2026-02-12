import { createBrowserRouter} from "react-router-dom"
import Layout from "./layouts/Layout"
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products"
import NewProduct, {action as newProductAction} from "./views/NewProduct"
import EditProduct, {loader as editProductLoader, action as editproductAction} from "./views/EditProduct"
import { action as deleteProductAction } from "./components/ProductDetail"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        loader: productsLoader, // Before mounting the component (to load prior data)
        index: true, // Will load with the main page '/'
        element: <Products />,
        // onSubmit form > button > availability toggl
        action: updateAvailabilityAction
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction // onSubmit <Form></Form>
      },
      {
        path: "products/:id/edit", // ROA Pattern - Resorce-oriented design 
        element: <EditProduct/>,
        loader: editProductLoader,
        action: editproductAction // onSubmit <Form></Form>
      },{
        path: "products/:id/delete",
        action: deleteProductAction
      }
    ]
  },
])