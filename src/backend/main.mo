import List "mo:core/List";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ProductsMixin "mixins/products-api";
import Types "types/products";
import Migration "migration";

(with migration = Migration.run)
actor {
  let products = List.empty<Types.Product>();

  include MixinObjectStorage();
  include ProductsMixin(products);
};
