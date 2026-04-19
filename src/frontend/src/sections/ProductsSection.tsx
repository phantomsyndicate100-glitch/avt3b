import { useRef, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product, ProductFormData } from "../types";

interface ProductsSectionProps {
  adminAuthenticated: boolean;
}

function ProductCard({
  product,
  index,
  onEdit,
  onDelete,
  isAdmin,
}: {
  product: Product;
  index: number;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
  isAdmin: boolean;
}) {
  return (
    <div
      data-ocid={`products.item.${index}`}
      className="glass-card rounded-lg overflow-hidden group hover:border-[rgba(0,255,136,0.4)] transition-all duration-300 hover:shadow-glow-sm flex flex-col"
    >
      {/* Image */}
      <div className="relative h-40 bg-[rgba(0,255,136,0.03)] overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="font-display text-4xl text-[rgba(0,255,136,0.2)] uppercase">
              AVT3B
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3 bg-[#00ff88] text-black font-mono text-xs px-2 py-1 rounded font-bold">
          ₹{product.price.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-base tracking-wide text-white uppercase mb-2 group-hover:text-accent-glow transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex gap-2 mt-auto pt-3">
          <a
            href={product.razorpay_link}
            data-ocid={`products.buy_button.${index}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-[#00ff88] text-black font-mono text-xs tracking-widest uppercase text-center hover:shadow-glow-sm transition-all duration-200 rounded-sm"
          >
            BUY NOW
          </a>
          {isAdmin && (
            <>
              <button
                type="button"
                data-ocid={`products.edit_button.${index}`}
                onClick={() => onEdit(product)}
                className="px-3 py-2 border border-[rgba(0,255,136,0.3)] text-[#00ff88] font-mono text-xs hover:border-[#00ff88] transition-colors duration-200 rounded-sm"
                aria-label={`Edit ${product.name}`}
              >
                ✏
              </button>
              <button
                type="button"
                data-ocid={`products.delete_button.${index}`}
                onClick={() => onDelete(product.id)}
                className="px-3 py-2 border border-red-500/30 text-red-400 font-mono text-xs hover:border-red-400 transition-colors duration-200 rounded-sm"
                aria-label={`Delete ${product.name}`}
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const EMPTY_FORM: ProductFormData = {
  name: "",
  price: 0,
  image_url: "",
  razorpay_link: "",
  pdf_url: "",
  description: "",
};

export default function ProductsSection({
  adminAuthenticated,
}: ProductsSectionProps) {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getUploadUrl,
  } = useProducts();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditProduct(null);
    setUploadError(null);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name,
      price: p.price,
      image_url: p.image_url,
      razorpay_link: p.razorpay_link,
      pdf_url: p.pdf_url,
      description: p.description ?? "",
    });
    setEditProduct(p);
    setUploadError(null);
    setShowForm(true);
  };

  const handleImageFile = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const uploadUrl = await getUploadUrl(file.name, file.type);
      if (!uploadUrl) throw new Error("Could not get upload URL");
      const res = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!res.ok) throw new Error("Upload failed");
      // Derive public URL: strip query params from presigned URL
      const publicUrl = uploadUrl.split("?")[0];
      setForm((prev) => ({ ...prev, image_url: publicUrl }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    if (editProduct) {
      await updateProduct(editProduct.id, form);
    } else {
      await addProduct(form);
    }
    setSaving(false);
    setShowForm(false);
    setEditProduct(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
    }
  };

  return (
    <section
      data-ocid="products.section"
      className="relative w-full h-screen flex flex-col overflow-hidden bg-[#000000] px-6 py-12"
    >
      <div
        className="absolute top-1/2 right-0 w-80 h-80 opacity-[0.05] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col h-full">
        {/* Header */}
        <div className="flex items-end justify-between mb-6 fade-up shrink-0">
          <div>
            <span className="font-mono text-xs text-[#00ff88] tracking-widest uppercase">
              09 / PRODUCTS
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,4rem)] leading-none tracking-wide text-white uppercase mt-1">
              DIGITAL <span className="text-accent-glow">PRODUCTS</span>
            </h2>
            <div className="h-px w-16 bg-[#00ff88] mt-3" />
          </div>
          {adminAuthenticated && (
            <button
              type="button"
              data-ocid="products.add_button"
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#00ff88] text-black font-mono text-xs tracking-widest uppercase hover:shadow-glow-sm transition-all duration-200"
            >
              + ADD PRODUCT
            </button>
          )}
        </div>

        {/* Products grid / states */}
        <div className="flex-1 overflow-y-auto pr-1">
          {loading && (
            <div
              data-ocid="products.loading_state"
              className="flex items-center justify-center h-40 gap-3"
            >
              <div className="w-4 h-4 rounded-full border-2 border-[#00ff88] border-t-transparent animate-spin" />
              <span className="font-mono text-xs text-white/40 tracking-wider">
                LOADING PRODUCTS...
              </span>
            </div>
          )}
          {error && (
            <div
              data-ocid="products.error_state"
              className="flex items-center justify-center h-40"
            >
              <p className="font-mono text-xs text-red-400">{error}</p>
            </div>
          )}
          {!loading && !error && products.length === 0 && (
            <div
              data-ocid="products.empty_state"
              className="flex flex-col items-center justify-center h-40 gap-3"
            >
              <div className="font-display text-4xl text-white/10 uppercase">
                No Products Yet
              </div>
              <p className="font-mono text-xs text-white/30">
                {adminAuthenticated
                  ? 'Press the "+ ADD PRODUCT" button to add your first product.'
                  : "Products coming soon."}
              </p>
            </div>
          )}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i + 1}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  isAdmin={adminAuthenticated}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product form modal */}
      {showForm && (
        <div
          data-ocid="products.dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="glass-card rounded-lg w-full max-w-md p-6 border border-[rgba(0,255,136,0.3)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl tracking-wide text-white uppercase">
                {editProduct ? "Edit Product" : "Add Product"}
              </h3>
              <button
                type="button"
                data-ocid="products.close_button"
                onClick={() => setShowForm(false)}
                className="text-white/40 hover:text-white transition-colors duration-200"
                aria-label="Close form"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2L16 16M16 2L2 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* 1) Product Name */}
              <div>
                <label
                  htmlFor="product-name"
                  className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1"
                >
                  Product ID / Name
                </label>
                <input
                  id="product-name"
                  type="text"
                  data-ocid="products.name_input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.2)] text-white font-body text-sm px-3 py-2.5 rounded focus:outline-none focus:border-[#00ff88] transition-colors duration-200"
                  placeholder="Product Name"
                />
              </div>

              {/* 2) Image Upload */}
              <div>
                <label
                  htmlFor="product-image_url"
                  className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1"
                >
                  Product Image
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    data-ocid="products.upload_button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-4 py-2 border border-[rgba(0,255,136,0.3)] text-[#00ff88] font-mono text-xs tracking-widest uppercase hover:border-[#00ff88] transition-colors duration-200 disabled:opacity-40 flex items-center gap-2 rounded"
                  >
                    {uploading ? (
                      <>
                        <span className="w-3 h-3 rounded-full border border-[#00ff88] border-t-transparent animate-spin" />
                        UPLOADING…
                      </>
                    ) : (
                      "↑ UPLOAD IMAGE"
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageFile(file);
                    }}
                  />
                </div>
                {uploadError && (
                  <p className="font-mono text-[10px] text-red-400 mb-1">
                    {uploadError}
                  </p>
                )}
                <input
                  id="product-image_url"
                  type="text"
                  data-ocid="products.image_url_input"
                  value={form.image_url}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image_url: e.target.value }))
                  }
                  className="w-full bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.2)] text-white font-body text-sm px-3 py-2.5 rounded focus:outline-none focus:border-[#00ff88] transition-colors duration-200"
                  placeholder="Or paste image URL directly"
                />
                {form.image_url && (
                  <img
                    src={form.image_url}
                    alt="Preview"
                    className="mt-2 h-16 w-auto rounded border border-[rgba(0,255,136,0.2)] object-cover"
                  />
                )}
              </div>

              {/* 3) Price */}
              <div>
                <label
                  htmlFor="product-price"
                  className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1"
                >
                  Price (₹)
                </label>
                <input
                  id="product-price"
                  type="number"
                  data-ocid="products.price_input"
                  value={form.price || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.2)] text-white font-body text-sm px-3 py-2.5 rounded focus:outline-none focus:border-[#00ff88] transition-colors duration-200"
                  placeholder="0"
                  min={0}
                />
              </div>

              {/* 4) Razorpay Link */}
              <div>
                <label
                  htmlFor="product-razorpay_link"
                  className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1"
                >
                  Razorpay Link
                </label>
                <input
                  id="product-razorpay_link"
                  type="text"
                  data-ocid="products.razorpay_link_input"
                  value={form.razorpay_link}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      razorpay_link: e.target.value,
                    }))
                  }
                  className="w-full bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.2)] text-white font-body text-sm px-3 py-2.5 rounded focus:outline-none focus:border-[#00ff88] transition-colors duration-200"
                  placeholder="https://rzp.io/..."
                />
              </div>

              {/* 5) Description (optional) */}
              <div>
                <label
                  htmlFor="product-description"
                  className="block font-mono text-[10px] text-white/40 tracking-wider uppercase mb-1"
                >
                  Description{" "}
                  <span className="text-white/20 normal-case tracking-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="product-description"
                  data-ocid="products.description_input"
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.2)] text-white font-body text-sm px-3 py-2.5 rounded focus:outline-none focus:border-[#00ff88] transition-colors duration-200 resize-none"
                  placeholder="Short product description..."
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  data-ocid="products.cancel_button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border border-white/20 text-white/60 font-mono text-xs tracking-widest uppercase hover:border-white/40 transition-colors duration-200 rounded"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  data-ocid="products.submit_button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 bg-[#00ff88] text-black font-mono text-xs tracking-widest uppercase disabled:opacity-50 hover:shadow-glow-sm transition-all duration-200 rounded"
                >
                  {saving ? "SAVING..." : editProduct ? "UPDATE" : "ADD"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
