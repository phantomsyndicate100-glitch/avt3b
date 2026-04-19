// Product type matching backend schema
export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  razorpay_link: string;
  pdf_url: string;
  description?: string;
  created_at: bigint;
}

// Section names for the app navigation
export type SectionName =
  | "hero"
  | "what-i-build"
  | "who-i-am"
  | "skills"
  | "about"
  | "work-system"
  | "message"
  | "contact"
  | "products";

export interface SectionConfig {
  id: SectionName;
  label: string;
  index: number;
}

export const SECTIONS: SectionConfig[] = [
  { id: "hero", label: "Hero", index: 0 },
  { id: "what-i-build", label: "What I Build", index: 1 },
  { id: "who-i-am", label: "Who I Am", index: 2 },
  { id: "skills", label: "Skills", index: 3 },
  { id: "about", label: "About AVT3B", index: 4 },
  { id: "work-system", label: "Work System", index: 5 },
  { id: "message", label: "Message", index: 6 },
  { id: "contact", label: "Contact", index: 7 },
  { id: "products", label: "Products", index: 8 },
];

// Product form data (for add/edit)
export interface ProductFormData {
  name: string;
  price: number;
  image_url: string;
  razorpay_link: string;
  pdf_url: string;
  description?: string;
}
