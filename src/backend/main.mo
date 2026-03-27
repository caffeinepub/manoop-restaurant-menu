import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type Category = {
    #starters;
    #mains;
    #drinks;
    #desserts;
    #snacks;
  };

  type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    isVeg : Bool;
  };

  module MenuItem {
    public func compare(item1 : MenuItem, item2 : MenuItem) : Order.Order {
      Nat.compare(item1.id, item2.id);
    };
  };

  let menu = Map.empty<Nat, MenuItem>();
  var nextId = 1;

  func getMenuItemInternal(id : Nat) : MenuItem {
    switch (menu.get(id)) {
      case (null) { Runtime.trap("Menu item not found") };
      case (?item) { item };
    };
  };

  public shared ({ caller }) func addMenuItem(item : MenuItem) : async Nat {
    let newItem : MenuItem = {
      item with
      id = nextId;
    };
    menu.add(nextId, newItem);
    nextId += 1;
    newItem.id;
  };

  public query ({ caller }) func getMenuItem(id : Nat) : async MenuItem {
    getMenuItemInternal(id);
  };

  public query ({ caller }) func getAllItems() : async [MenuItem] {
    menu.values().toArray().sort();
  };

  public query ({ caller }) func getItemsByCategory(category : Category) : async [MenuItem] {
    menu.values().toArray().filter(
      func(item) { item.category == category }
    ).sort();
  };

  public query ({ caller }) func searchByName(searchTerm : Text) : async [MenuItem] {
    menu.values().toArray().filter(
      func(item) {
        item.name.toLower().contains(#text(searchTerm.toLower()));
      }
    ).sort();
  };

  // Seed data
  system func preupgrade() {};
  system func postupgrade() {
    let seedItems = [
      {
        id = 0;
        name = "Paneer Tikka";
        description = "Grilled cottage cheese cubes marinated in spices.";
        price = 250;
        category = #starters;
        isVeg = true;
      },
      {
        id = 0;
        name = "Butter Chicken";
        description = "Creamy tomato-based chicken curry.";
        price = 350;
        category = #mains;
        isVeg = false;
      },
      {
        id = 0;
        name = "Masala Dosa";
        description = "Crispy rice pancake with spiced potato filling.";
        price = 180;
        category = #snacks;
        isVeg = true;
      },
      {
        id = 0;
        name = "Lassi";
        description = "Refreshing yogurt-based drink.";
        price = 80;
        category = #drinks;
        isVeg = true;
      },
      {
        id = 0;
        name = "Gulab Jamun";
        description = "Sweet syrup-soaked milk dumplings.";
        price = 120;
        category = #desserts;
        isVeg = true;
      },
    ];

    for (item in seedItems.values()) {
      let newItem : MenuItem = {
        item with
        id = nextId;
      };
      menu.add(nextId, newItem);
      nextId += 1;
    };
  };
};
