import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher} from 'react-router-dom'
import { formatCurrency } from "../helpers"
import type { Product } from "../types"
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
  product: Product
}

export async function action({params} : ActionFunctionArgs){
  if(params.id !== undefined){

    await deleteProduct(+params.id)

    // we stay in the same admin view
    return redirect('/')
  }
}

export default function ProductDetail({product} : ProductDetailsProps) {

  // Can be used in any part of the component
  // Link can be only used inside the return
  const navigate = useNavigate()

  const fetcher = useFetcher()

  const isAvailable = product.availability

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
          {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800 text-center">
          {formatCurrency( product.price )}
        </td>
        <td className="p-3 text-lg text-gray-800 text-center">
          <fetcher.Form method='POST'>
            <button
              type='submit'
              name='id'
              value={product.id}
              className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-slate-300 hover:cursor-pointer`}
            >
              {isAvailable ? 'In stock' : 'No stock'}
            </button>
          </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => navigate(`/products/${product.id}/edit`)}
              className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer'
            >Edit</button>

            
            <Form
              className='w-full'
              method='POST'
              action={`products/${product.id}/delete`}
              // We communicate the form with the action through router.tsx... and also here
              onSubmit={(e) => {
                if(!confirm('¿Delete?')){
                  // Prevent the default action
                  e.preventDefault()
                }
              }}
            >
              <input 
                type='submit'
                value= 'Delete'
                className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer'
              />
            </Form>
          </div>
        </td>
    </tr> 
  )
}
