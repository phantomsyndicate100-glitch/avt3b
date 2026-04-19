import { useCallback, useEffect, useState } from "react";
import type { Product, ProductFormData } from "../types";

// Gracefully handle the case where backend methods are not yet available
// (backend.d.ts may be empty until pnpm bindgen runs)
let actorInstance: Record<string, unknown> | null = null;

async function getActor() {
  if (actorInstance) return actorInstance;
  try {
    // Dynamically import to avoid hard failure if not ready
    const mod = await import("../backend");
    actorInstance = mod as unknown as Record<string, unknown>;
  } catch {
    actorInstance = null;
  }
  return actorInstance;
}

async function callBackend<T>(
  methodName: string,
  args: unknown[] = [],
): Promise<T | null> {
  try {
    const actor = await getActor();
    if (!actor) return null;
    const backend =
      (actor as { default?: Record<string, unknown> }).default ?? actor;
    const method = backend[methodName] as
      | ((...a: unknown[]) => Promise<T>)
      | undefined;
    if (typeof method !== "function") return null;
    return await method(...args);
  } catch (err) {
    console.warn(`Backend call ${methodName} failed:`, err);
    return null;
  }
}

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (data: ProductFormData) => Promise<Product | null>;
  updateProduct: (id: number, data: ProductFormData) => Promise<Product | null>;
  deleteProduct: (id: number) => Promise<boolean>;
  getUploadUrl: (
    filename: string,
    contentType: string,
  ) => Promise<string | null>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await callBackend<Product[]>("getProducts");
      if (result !== null) {
        setProducts(result);
      }
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(
    async (data: ProductFormData): Promise<Product | null> => {
      try {
        const result = await callBackend<Product>("addProduct", [
          data.name,
          data.price,
          data.image_url,
          data.razorpay_link,
          data.pdf_url,
          data.description ?? "",
        ]);
        if (result) {
          setProducts((prev) => [...prev, result]);
        }
        return result;
      } catch (err) {
        console.error("addProduct failed:", err);
        return null;
      }
    },
    [],
  );

  const updateProduct = useCallback(
    async (id: number, data: ProductFormData): Promise<Product | null> => {
      try {
        const result = await callBackend<Product | null>("updateProduct", [
          id,
          data.name,
          data.price,
          data.image_url,
          data.razorpay_link,
          data.pdf_url,
          data.description ?? "",
        ]);
        if (result) {
          setProducts((prev) => prev.map((p) => (p.id === id ? result : p)));
        }
        return result;
      } catch (err) {
        console.error("updateProduct failed:", err);
        return null;
      }
    },
    [],
  );

  const deleteProduct = useCallback(async (id: number): Promise<boolean> => {
    try {
      const result = await callBackend<boolean>("deleteProduct", [id]);
      if (result) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error("deleteProduct failed:", err);
      return false;
    }
  }, []);

  const getUploadUrl = useCallback(
    async (filename: string, contentType: string): Promise<string | null> => {
      return callBackend<string>("getUploadUrl", [filename, contentType]);
    },
    [],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getUploadUrl,
  };
}
