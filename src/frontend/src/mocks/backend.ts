import type { backendInterface } from "../backend";

const sampleProduct = {
  id: BigInt(1),
  name: "AI Automation Blueprint",
  price: 1999,
  image_url: "",
  razorpay_link: "https://razorpay.me/example",
  pdf_url: "",
  created_at: BigInt(Date.now()),
};

const sampleProduct2 = {
  id: BigInt(2),
  name: "Trading System Masterclass",
  price: 2999,
  image_url: "",
  razorpay_link: "https://razorpay.me/example2",
  pdf_url: "",
  created_at: BigInt(Date.now()),
};

export const mockBackend: backendInterface = {
  getProducts: async () => [sampleProduct, sampleProduct2],
  addProduct: async (name, price, image_url, razorpay_link, pdf_url) => ({
    id: BigInt(3),
    name,
    price,
    image_url,
    razorpay_link,
    pdf_url,
    created_at: BigInt(Date.now()),
  }),
  updateProduct: async (id, name, price, image_url, razorpay_link, pdf_url) => ({
    id,
    name,
    price,
    image_url,
    razorpay_link,
    pdf_url,
    created_at: BigInt(Date.now()),
  }),
  deleteProduct: async () => true,
  getUploadUrl: async () => "https://example.com/upload",
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => {},
  _immutableObjectStorageCreateCertificate: async () => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async () => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => {},
};
