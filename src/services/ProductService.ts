import { safeParse, number, parse, string, transform, pipe  } from "valibot";
import { DraftProductSchema, ProductsSchema, ProductSchema } from "../types";
import { toBoolean } from "../helpers";
import type { Product } from "../types";
import axios from "axios";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function saveProduct(data: ProductData) {
  try {

    // we validate it has the right format
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price, // +: convert str to number
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;

      // Send to server
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Data not valid");
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * it's called from the component Products.tsx
 * @returns 
 */
export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const {data} = await axios(url)

    const result = safeParse(ProductsSchema, data.data)

    if(result.success) {
      return result.output
    } else {
      throw new Error('There was an error')
    }

  } catch (error) {
    console.log(error)
  }
}

/**
 * it's called from the component EditProduct.tsx
 * @param id : Product['id'] because will update if we change it 
 * @returns 
 */
export async function getProductById(id : Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const {data} = await axios(url)

    const result = safeParse(ProductSchema, data.data)

    if(result.success) {
      return result.output
    } else {
      throw new Error('There was an error')
    }

  } catch (error) {
    console.log(error)
  }
}

export async function updateProduct( data : ProductData, id : Product['id']) {
  try {

    const NumberSchema = pipe(string(), transform(Number), number());
    
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString())
    })

    if(result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      await axios.put(url, result.output)
    }

  } catch (error) {
    console.log(error)
  }
}

export async function deleteProduct( id: Product['id'] ) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url)
  } catch (error) {
    console.log(error)    
  }
}

export async function updateProductAvailability( id: Product['id'] ) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url)
  } catch (error) {
    console.log(error)
  }
}
