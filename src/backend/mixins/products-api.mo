import List "mo:core/List";
import ProductsLib "../lib/products";
import Types "../types/products";

mixin (products : List.List<Types.Product>) {

  var nextProductId : Nat = 0;

  public query func getProducts() : async [Types.Product] {
    ProductsLib.listAll(products);
  };

  public func addProduct(
    name : Text,
    price : Float,
    image_url : Text,
    razorpay_link : Text,
    pdf_url : Text,
    description : ?Text,
  ) : async Types.Product {
    let product = ProductsLib.create(products, nextProductId, name, price, image_url, razorpay_link, pdf_url, description);
    nextProductId += 1;
    product;
  };

  public func updateProduct(
    id : Nat,
    name : Text,
    price : Float,
    image_url : Text,
    razorpay_link : Text,
    pdf_url : Text,
    description : ?Text,
  ) : async ?Types.Product {
    ProductsLib.update(products, id, name, price, image_url, razorpay_link, pdf_url, description);
  };

  public func deleteProduct(id : Nat) : async Bool {
    ProductsLib.remove(products, id);
  };

  public func getUploadUrl(filename : Text, contentType : Text) : async Text {
    // Upload URL generation is handled client-side via Supabase storage.
    // This function is a no-op placeholder to satisfy the public API contract.
    "";
  };
};
