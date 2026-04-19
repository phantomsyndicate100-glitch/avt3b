import List "mo:core/List";

module {
  // Old types defined inline (copied from .old/src/backend/types/products.mo)
  type OldProduct = {
    id : Nat;
    name : Text;
    price : Float;
    image_url : Text;
    razorpay_link : Text;
    pdf_url : Text;
    created_at : Int;
  };

  // New product type matches types/products.mo
  type NewProduct = {
    id : Nat;
    name : Text;
    price : Float;
    image_url : Text;
    razorpay_link : Text;
    pdf_url : Text;
    created_at : Int;
    description : ?Text;
  };

  type OldActor = {
    products : List.List<OldProduct>;
  };

  type NewActor = {
    products : List.List<NewProduct>;
  };

  public func run(old : OldActor) : NewActor {
    let products = old.products.map<OldProduct, NewProduct>(
      func(p) { { p with description = null } }
    );
    { products };
  };
};
