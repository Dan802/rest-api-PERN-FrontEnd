/* eslint-disable react-refresh/only-export-components */
import { Link, Form, useActionData, redirect, useLoaderData } from "react-router-dom";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({params} : LoaderFunctionArgs) {
  
  // verify there are params in the url
  if(params.id !== undefined){
    const product = await getProductById(+params.id)

    if(!product) {
      return redirect('/')

      throw new Response('', {
        status: 404, 
        statusText: "Not found"
      })
    }

    return product
  }
}

/**
 * Communicate the <Form></Form> with the action through router.tsx,
 * and send the data to the API through axios
 * @param param 
 * @returns 
 */
export async function action ({ request, params } : ActionFunctionArgs){
  // always should be called action  
  
  const data = Object.fromEntries(await request.formData())

  let errors = ''
  if(Object.values(data).includes('')){
    errors = 'All fields are required'
  }

  if(errors.length) {
    return errors
  }

  if(params.id != undefined) {
    await updateProduct(data, +params.id)
  }

  return redirect('/')
}

const availabilityOptions = [
  { name: "Available", value: true},
  { name: "Not available", value: false}
]

export default function EditProduct() {

  const product = useLoaderData() as Product
  const errors = useActionData() as string

  return (
    <>
      <div className="flex justify-between">
        <h2 className=" text-4xl font-black text-slate-500">Edit product</h2>

        <Link 
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Products
        </Link>
      </div>

      {errors && <ErrorMessage>{errors}</ErrorMessage>}

      {/* Form from react router dom */}
      <Form 
        method="POST" 
        className="mt-10"
        // We communicate the form with the action through router.tsx
      >
        <ProductForm
          product= { product }
        />

        <div className="mb-4">
          <label htmlFor="availability" className="text-gray-800">
            Availability:
          </label>

          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
                <option key={option.name} value={option.value.toString()}>
                  {option.name}
                </option>
            ))}
          </select>
        </div>

        <input 
          type="submit" 
          value="Save Changes" 
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
        />
      </Form>
    </>
  )
}

