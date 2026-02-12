import type { Product } from "../types"

type ProductFormProps = {
  product? : Product
}

export default function ProductForm({product} : ProductFormProps) {
  return (
    <>
      <div className="mb-4">
          <label 
            htmlFor="name"
            className="text-gray-800"
          >Name</label>
          <input 
            type="text"   
            id="name" 
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Name's Product"
            name="name"
            defaultValue={product?.name}
          />
        </div>

        <div className="mb-4">
          <label 
            htmlFor="price" 
            className="text-gray-800"
          >Price</label>
          <input 
            type="number" 
            id="price" 
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Price's product. Ex. 200, 300"
            name="price" 
            defaultValue={product?.price}
          />
        </div>
    </>
  )
}
