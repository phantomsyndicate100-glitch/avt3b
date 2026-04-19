module {
  public type Product = {
    id : Nat;
    name : Text;
    price : Float;
    image_url : Text;
    razorpay_link : Text;
    pdf_url : Text;
    created_at : Int;
    description : ?Text;
  };
};
