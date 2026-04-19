import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/products";

module {
  public type Product = Types.Product;

  public func listAll(products : List.List<Product>) : [Product] {
    products.toArray();
  };

  public func getById(products : List.List<Product>, id : Nat) : ?Product {
    products.find(func(p) { p.id == id });
  };

  public func create(
    products : List.List<Product>,
    nextId : Nat,
    name : Text,
    price : Float,
    image_url : Text,
    razorpay_link : Text,
    pdf_url : Text,
    description : ?Text,
  ) : Product {
    let product : Product = {
      id = nextId;
      name = name;
      price = price;
      image_url = image_url;
      razorpay_link = razorpay_link;
      pdf_url = pdf_url;
      created_at = Time.now();
      description = description;
    };
    products.add(product);
    product;
  };

  public func update(
    products : List.List<Product>,
    id : Nat,
    name : Text,
    price : Float,
    image_url : Text,
    razorpay_link : Text,
    pdf_url : Text,
    description : ?Text,
  ) : ?Product {
    var updated : ?Product = null;
    products.mapInPlace(
      func(p) {
        if (p.id == id) {
          let newProduct : Product = { p with name = name; price = price; image_url = image_url; razorpay_link = razorpay_link; pdf_url = pdf_url; description = description };
          updated := ?newProduct;
          newProduct;
        } else {
          p;
        };
      }
    );
    updated;
  };

  public func remove(products : List.List<Product>, id : Nat) : Bool {
    let sizeBefore = products.size();
    let filtered = products.filter(func(p) { p.id != id });
    products.clear();
    products.append(filtered);
    products.size() < sizeBefore;
  };
};
