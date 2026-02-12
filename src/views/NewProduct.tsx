/* eslint-disable react-refresh/only-export-components */
import { Link, Form, useActionData, redirect } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import { saveProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

/**
 * Communicate the <Form></Form> with the action through router.tsx,
 * and send the data to the API through axios
 * @param param0 
 * @returns 
 */
export async function action ({ request } : ActionFunctionArgs){
  // always should be called action  
  
  const data = Object.fromEntries(await request.formData())

  let errors = ''
  if(Object.values(data).includes('')){
    errors = 'All fields are required'
  }

  if(errors.length) {
    return errors
  }

  await saveProduct(data)

  return redirect('/')
}

export default function NewProduct() {

  const errors = useActionData() as string

  return (
    <>
      <div className="flex justify-between">
        <h2 className=" text-4xl font-black text-slate-500">Add product</h2>

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
        <ProductForm />

        <input 
          type="submit" 
          value="Save Product" 
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
        />
      </Form>
    </>
  )
}

