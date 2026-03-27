import {
  ArrowLeft,
  Flame,
  Grid2X2,
  Search,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ────────────────────────────────────────────────
// Category Grid Data
// ────────────────────────────────────────────────
const MENU_CATEGORIES = [
  {
    name: "Chinese Starters",
    img: "/assets/generated/cat-chinese-starters.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Momos",
    img: "/assets/generated/cat-momos.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Noodles",
    img: "/assets/generated/cat-noodles.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Pasta",
    img: "/assets/generated/cat-pasta.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Burger & Rolls",
    img: "/assets/generated/cat-burger-rolls.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Pizza",
    img: "/assets/generated/cat-pizza.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Grill Momos",
    img: "/assets/generated/cat-grill-momos.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Main Course (Veg)",
    img: "/assets/generated/cat-main-veg.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Main Course (Non-Veg)",
    img: "/assets/generated/cat-main-nonveg.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Roti & Naan",
    img: "/assets/generated/cat-roti-naan.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Chaap",
    img: "/assets/generated/cat-chaap.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Combos",
    img: "/assets/generated/cat-combos.dim_400x250.jpg",
    type: "food",
  },
  {
    name: "Shakes & Beverages",
    img: "/assets/generated/cat-shakes.dim_400x250.jpg",
    type: "drinks",
  },
];

// Alternating accent colors: yellow and pink
const ACCENT_COLORS = ["#FFD700", "oklch(0.56 0.25 355)"];

// ────────────────────────────────────────────────
// Category Item List — Sample Dish Data
// ────────────────────────────────────────────────
interface DishItem {
  id: number;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
}

const CATEGORY_DISHES: Record<string, DishItem[]> = {
  "Chinese Starters": [
    {
      id: 1,
      name: "Crispy Chilli Paneer",
      description: "Tossed in tangy chilli sauce with peppers & spring onion",
      price: 220,
      isVeg: true,
    },
    {
      id: 2,
      name: "Kung Pao Mushroom",
      description:
        "Stir-fried mushrooms with peanuts in a spicy Kung Pao glaze",
      price: 190,
      isVeg: true,
    },
    {
      id: 3,
      name: "Chilli Chicken Dry",
      description: "Tender chicken strips wok-tossed in fiery chilli sauce",
      price: 260,
      isVeg: false,
    },
    {
      id: 4,
      name: "Manchurian Balls",
      description: "Soft veg balls in a rich, glossy Manchurian gravy",
      price: 175,
      isVeg: true,
    },
    {
      id: 5,
      name: "Dragon Chicken",
      description: "Crispy chicken glazed in sweet chilli dragon sauce",
      price: 280,
      isVeg: false,
    },
    {
      id: 6,
      name: "Veg Lollipop",
      description: "Spiced veggie patties shaped on skewers, deep fried golden",
      price: 160,
      isVeg: true,
    },
  ],
  Momos: [
    {
      id: 1,
      name: "Steam Veg Momos",
      description:
        "Soft steamed dumplings stuffed with spiced mixed vegetables",
      price: 120,
      isVeg: true,
    },
    {
      id: 2,
      name: "Steam Chicken Momos",
      description: "Juicy chicken-filled dumplings with ginger & garlic",
      price: 150,
      isVeg: false,
    },
    {
      id: 3,
      name: "Fried Veg Momos",
      description: "Crispy pan-fried dumplings with chilli dipping sauce",
      price: 130,
      isVeg: true,
    },
    {
      id: 4,
      name: "Fried Chicken Momos",
      description: "Golden fried chicken momos with house special sauce",
      price: 160,
      isVeg: false,
    },
    {
      id: 5,
      name: "Spicy Schezwan Momos",
      description: "Steamed momos tossed in fiery Schezwan chutney",
      price: 145,
      isVeg: true,
    },
    {
      id: 6,
      name: "Tandoori Momos",
      description: "Momos marinated in yogurt spice & charred in tandoor",
      price: 170,
      isVeg: true,
    },
  ],
  Noodles: [
    {
      id: 1,
      name: "Veg Hakka Noodles",
      description: "Wok-tossed noodles with crisp vegetables in soy sauce",
      price: 160,
      isVeg: true,
    },
    {
      id: 2,
      name: "Chicken Hakka Noodles",
      description: "Smoky wok noodles with shredded chicken & vegetables",
      price: 195,
      isVeg: false,
    },
    {
      id: 3,
      name: "Schezwan Noodles",
      description: "Spicy noodles in bold Schezwan sauce with veggies",
      price: 170,
      isVeg: true,
    },
    {
      id: 4,
      name: "Singapore Noodles",
      description: "Thin rice noodles stir-fried with curry powder & peppers",
      price: 185,
      isVeg: true,
    },
    {
      id: 5,
      name: "Egg Noodles",
      description: "Classic noodles tossed with scrambled egg & soy",
      price: 175,
      isVeg: false,
    },
  ],
  Pasta: [
    {
      id: 1,
      name: "Penne Arrabbiata",
      description: "Penne in spicy tomato-garlic sauce with fresh basil",
      price: 210,
      isVeg: true,
    },
    {
      id: 2,
      name: "Cream Mushroom Pasta",
      description: "Fettuccine in rich mushroom & cream sauce",
      price: 240,
      isVeg: true,
    },
    {
      id: 3,
      name: "Chicken Alfredo",
      description: "Creamy white sauce pasta with grilled chicken strips",
      price: 280,
      isVeg: false,
    },
    {
      id: 4,
      name: "Mac & Cheese",
      description: "Classic baked macaroni smothered in cheddar cheese sauce",
      price: 220,
      isVeg: true,
    },
    {
      id: 5,
      name: "Spicy Paneer Pasta",
      description: "Penne tossed with spiced paneer cubes in tomato base",
      price: 230,
      isVeg: true,
    },
  ],
  "Burger & Rolls": [
    {
      id: 1,
      name: "Classic Veg Burger",
      description: "Crispy aloo tikki with lettuce, tomato & special sauce",
      price: 130,
      isVeg: true,
    },
    {
      id: 2,
      name: "Crispy Chicken Burger",
      description: "Juicy fried chicken patty with coleslaw & mayo",
      price: 180,
      isVeg: false,
    },
    {
      id: 3,
      name: "Paneer Tikka Roll",
      description: "Grilled paneer tikka wrapped in mint chutney paratha",
      price: 160,
      isVeg: true,
    },
    {
      id: 4,
      name: "Egg Kathi Roll",
      description: "Spiced egg wrapped in a flaky paratha with onions",
      price: 120,
      isVeg: false,
    },
    {
      id: 5,
      name: "Double Patty Burger",
      description: "Two grilled patties stacked with cheese & jalapeños",
      price: 210,
      isVeg: true,
    },
    {
      id: 6,
      name: "Chicken Shawarma Roll",
      description: "Marinated chicken strips with garlic sauce & pickles",
      price: 190,
      isVeg: false,
    },
  ],
  Pizza: [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic tomato base with mozzarella & fresh basil",
      price: 250,
      isVeg: true,
    },
    {
      id: 2,
      name: "Paneer Tikka Pizza",
      description: "Spiced paneer with peppers & onion on herbed base",
      price: 290,
      isVeg: true,
    },
    {
      id: 3,
      name: "Chicken BBQ Pizza",
      description: "Smoky BBQ chicken with caramelised onions & mozzarella",
      price: 320,
      isVeg: false,
    },
    {
      id: 4,
      name: "Farmhouse Pizza",
      description: "Capsicum, mushroom, onion & sweet corn with cheese",
      price: 270,
      isVeg: true,
    },
    {
      id: 5,
      name: "Pepperoni Feast",
      description: "Loaded pepperoni slices over rich tomato sauce",
      price: 340,
      isVeg: false,
    },
    {
      id: 6,
      name: "Mexican Green Wave",
      description: "Jalapeno, onion, capsicum & olives on spicy base",
      price: 280,
      isVeg: true,
    },
  ],
  "Shakes & Beverages": [
    {
      id: 1,
      name: "Oreo Milkshake",
      description: "Thick creamy shake blended with Oreo cookies & vanilla",
      price: 140,
      isVeg: true,
    },
    {
      id: 2,
      name: "Mango Mastani",
      description: "Rich mango shake topped with ice cream & dry fruits",
      price: 160,
      isVeg: true,
    },
    {
      id: 3,
      name: "Cold Coffee Frappe",
      description: "Chilled coffee blended with ice cream & chocolate drizzle",
      price: 130,
      isVeg: true,
    },
    {
      id: 4,
      name: "Watermelon Cooler",
      description: "Fresh watermelon juice with mint & a hint of lime",
      price: 90,
      isVeg: true,
    },
    {
      id: 5,
      name: "Strawberry Smoothie",
      description: "Blended fresh strawberries with yogurt & honey",
      price: 120,
      isVeg: true,
    },
    {
      id: 6,
      name: "Virgin Mojito",
      description: "Lime, mint & soda over crushed ice with a citrus twist",
      price: 100,
      isVeg: true,
    },
  ],
  "Grill Momos": [
    {
      id: 1,
      name: "Grill Veg Momos",
      description: "Steamed then grilled momos with smoky charred skin",
      price: 150,
      isVeg: true,
    },
    {
      id: 2,
      name: "Grill Chicken Momos",
      description: "Juicy chicken dumplings grilled to perfection",
      price: 175,
      isVeg: false,
    },
    {
      id: 3,
      name: "Tandoori Grill Momos",
      description: "Spiced momos finished in tandoor with butter",
      price: 180,
      isVeg: true,
    },
    {
      id: 4,
      name: "Cheesy Grill Momos",
      description: "Momos stuffed with cheese, grilled until bubbly",
      price: 165,
      isVeg: true,
    },
    {
      id: 5,
      name: "Spicy Grill Momos",
      description: "Extra-hot marinated momos grilled over charcoal",
      price: 160,
      isVeg: false,
    },
  ],
  "Main Course (Veg)": [
    {
      id: 1,
      name: "Dal Makhani",
      description: "Slow-cooked black lentils in buttery tomato-cream sauce",
      price: 200,
      isVeg: true,
    },
    {
      id: 2,
      name: "Palak Paneer",
      description: "Cottage cheese in velvety spiced spinach gravy",
      price: 220,
      isVeg: true,
    },
    {
      id: 3,
      name: "Shahi Paneer",
      description: "Paneer in rich cashew-cream royal gravy",
      price: 240,
      isVeg: true,
    },
    {
      id: 4,
      name: "Veg Kadai",
      description: "Mixed vegetables cooked in a bold kadai masala",
      price: 185,
      isVeg: true,
    },
    {
      id: 5,
      name: "Chana Masala",
      description: "Hearty chickpeas in tangy, spiced tomato gravy",
      price: 175,
      isVeg: true,
    },
    {
      id: 6,
      name: "Malai Kofta",
      description: "Soft paneer-potato koftas in mild saffron cream sauce",
      price: 250,
      isVeg: true,
    },
  ],
  "Main Course (Non-Veg)": [
    {
      id: 1,
      name: "Butter Chicken",
      description:
        "Juicy chicken in rich tomato-cream sauce with aromatic spices",
      price: 320,
      isVeg: false,
    },
    {
      id: 2,
      name: "Mutton Rogan Josh",
      description: "Slow-braised mutton in bold Kashmiri red chilli sauce",
      price: 380,
      isVeg: false,
    },
    {
      id: 3,
      name: "Chicken Kadai",
      description: "Chicken sautéed with fresh peppers in kadai masala",
      price: 300,
      isVeg: false,
    },
    {
      id: 4,
      name: "Keema Matar",
      description: "Minced lamb with green peas in spiced onion-tomato base",
      price: 290,
      isVeg: false,
    },
    {
      id: 5,
      name: "Egg Curry",
      description: "Boiled eggs in a thick, earthy masala gravy",
      price: 220,
      isVeg: false,
    },
    {
      id: 6,
      name: "Fish Tikka Masala",
      description: "Grilled fish cubes simmered in creamy tikka masala",
      price: 350,
      isVeg: false,
    },
  ],
  "Roti & Naan": [
    {
      id: 1,
      name: "Butter Naan",
      description: "Soft leavened bread brushed with butter from tandoor",
      price: 50,
      isVeg: true,
    },
    {
      id: 2,
      name: "Garlic Naan",
      description: "Fluffy naan topped with roasted garlic & coriander",
      price: 60,
      isVeg: true,
    },
    {
      id: 3,
      name: "Stuffed Paneer Paratha",
      description: "Whole-wheat flatbread filled with spiced grated paneer",
      price: 90,
      isVeg: true,
    },
    {
      id: 4,
      name: "Laccha Paratha",
      description: "Multi-layered crispy whole-wheat paratha, butter-finished",
      price: 70,
      isVeg: true,
    },
    {
      id: 5,
      name: "Tandoori Roti",
      description: "Classic whole-wheat roti fired in tandoor",
      price: 35,
      isVeg: true,
    },
    {
      id: 6,
      name: "Cheese Naan",
      description: "Naan loaded with melted cheese & herbs",
      price: 80,
      isVeg: true,
    },
  ],
  Chaap: [
    {
      id: 1,
      name: "Malai Soya Chaap",
      description: "Tender soya chaap marinated in creamy malai masala",
      price: 180,
      isVeg: true,
    },
    {
      id: 2,
      name: "Tandoori Chaap",
      description: "Soya chaap with smoky tandoor char & mint chutney",
      price: 190,
      isVeg: true,
    },
    {
      id: 3,
      name: "Butter Masala Chaap",
      description: "Chaap simmered in rich buttery tomato-onion sauce",
      price: 200,
      isVeg: true,
    },
    {
      id: 4,
      name: "Achari Chaap",
      description: "Tangy pickle-spiced chaap cooked with mustard seeds",
      price: 185,
      isVeg: true,
    },
    {
      id: 5,
      name: "Crispy Fried Chaap",
      description: "Golden crispy chaap tossed with chilli & lemon",
      price: 170,
      isVeg: true,
    },
  ],
  Combos: [
    {
      id: 1,
      name: "Momos + Shake Combo",
      description: "6 steam momos with a choice of shake — great value",
      price: 230,
      isVeg: true,
    },
    {
      id: 2,
      name: "Pizza + Cold Coffee",
      description: "Personal pizza with a tall cold coffee",
      price: 350,
      isVeg: true,
    },
    {
      id: 3,
      name: "Burger + Fries + Cola",
      description: "Classic burger with crispy fries & chilled cola",
      price: 280,
      isVeg: false,
    },
    {
      id: 4,
      name: "Biryani + Raita Combo",
      description: "Full plate biryani with cooling cucumber raita",
      price: 320,
      isVeg: false,
    },
    {
      id: 5,
      name: "Starter + Main + Roti",
      description: "Any starter, main course gravy & 2 rotis",
      price: 420,
      isVeg: true,
    },
    {
      id: 6,
      name: "Family Feast (4 pax)",
      description: "2 mains, 4 rotis, rice, papad & dessert",
      price: 850,
      isVeg: true,
    },
  ],
};

// ────────────────────────────────────────────────
// Google Review Floating Button
// ────────────────────────────────────────────────
function GoogleReviewButton({
  bottomOffset = "1.5rem",
}: { bottomOffset?: string }) {
  return (
    <>
      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.35), 0 0 0 2px #FFD700, 0 0 14px 4px rgba(255,215,0,0.45); }
          50% { box-shadow: 0 8px 32px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.35), 0 0 0 2px #FFD700, 0 0 26px 8px rgba(255,215,0,0.7); }
        }
        .google-review-btn {
          animation: bob 2.4s ease-in-out infinite, glow-pulse 2.4s ease-in-out infinite;
          transform: translateX(-50%);
        }
      `}</style>
      <button
        type="button"
        className="google-review-btn fixed left-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full select-none cursor-default"
        style={{
          bottom: bottomOffset,
          background: "#FFFFFF",
          border: "none",
        }}
        data-ocid="google-review.button"
      >
        <Star
          className="w-4 h-4 flex-shrink-0"
          style={{ color: "#F4B400", fill: "#F4B400" }}
        />
        <span
          className="font-bold text-sm whitespace-nowrap"
          style={{ color: "#111827", letterSpacing: "0.01em" }}
        >
          Review on Google
        </span>
      </button>
    </>
  );
}

// ────────────────────────────────────────────────
// Category Item Card
// ────────────────────────────────────────────────
function CategoryItemCard({ dish, index }: { dish: DishItem; index: number }) {
  const accentColor = ACCENT_COLORS[index % 2];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="rounded-2xl mx-1 mb-3 overflow-hidden"
      style={{
        background: "#1E1E1E",
        borderBottom: `2px solid ${accentColor}`,
      }}
      data-ocid={`dish.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3 px-4 py-3">
        {/* Left: veg/non-veg icon + name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>
              {dish.isVeg ? "🟩" : "🟥"}
            </span>
            <p
              className="font-bold text-white leading-tight truncate"
              style={{ fontSize: "0.95rem" }}
            >
              {dish.name}
            </p>
          </div>
          {dish.description && (
            <p
              className="text-xs leading-relaxed line-clamp-2"
              style={{ color: "#8A8A8A" }}
            >
              {dish.description}
            </p>
          )}
        </div>

        {/* Right: price badge */}
        <div className="flex-shrink-0 mt-0.5">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full font-bold"
            style={{
              background: "#0A0A0A",
              color: "#FFD700",
              fontSize: "0.82rem",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            ₹{dish.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────────
// Category Item List Page
// ────────────────────────────────────────────────
function CategoryItemListPage({
  categoryName,
  onBack,
}: {
  categoryName: string;
  onBack: () => void;
}) {
  const dishes = CATEGORY_DISHES[categoryName] ?? [];

  return (
    <div className="min-h-screen" style={{ background: "#121212" }}>
      <div className="mx-auto max-w-[430px] min-h-screen flex flex-col">
        {/* Sticky top bar */}
        <header
          className="sticky top-0 z-30 flex items-center gap-3 px-4 py-4"
          style={{
            background: "#121212",
            borderBottom: "1px solid #2E2E2E",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-opacity hover:opacity-70 active:scale-95"
            style={{ background: "#1E1E1E" }}
            data-ocid="category_list.back.button"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <h1
            className="flex-1 text-center font-bold text-white"
            style={{
              fontSize: "1.1rem",
              letterSpacing: "0.03em",
              paddingRight: "2.25rem",
            }}
          >
            {categoryName}
          </h1>
        </header>

        {/* Item count pill */}
        <div className="px-4 pt-4 pb-2">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: "#1E1E1E",
              color: "#FFD700",
            }}
          >
            {dishes.length} items
          </span>
        </div>

        {/* Dish list */}
        <main className="flex-1 px-3 pb-24">
          <AnimatePresence>
            {dishes.map((dish, i) => (
              <CategoryItemCard key={dish.id} dish={dish} index={i} />
            ))}
          </AnimatePresence>

          {dishes.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-20 gap-4"
              data-ocid="category_list.empty_state"
            >
              <UtensilsCrossed className="w-14 h-14 opacity-15 text-white" />
              <p className="text-sm" style={{ color: "#8A8A8A" }}>
                No items in this category
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="pb-8 pt-2 text-center">
          <p className="text-xs" style={{ color: "#444" }}>
            © {new Date().getFullYear()}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "#FFD700" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      {/* Floating Google Review Button */}
      <GoogleReviewButton bottomOffset="1.5rem" />
    </div>
  );
}

// ────────────────────────────────────────────────
// Category Grid Component
// ────────────────────────────────────────────────
function CategoryGrid({
  onCategorySelect,
  filter,
}: {
  onCategorySelect: (name: string) => void;
  filter: "food" | "drinks";
}) {
  const filtered = MENU_CATEGORIES.filter((c) => c.type === filter);

  return (
    <div className="mb-6">
      {/* Section heading */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <Grid2X2
            className="w-4 h-4"
            style={{ color: "oklch(0.87 0.17 89)" }}
          />
          <h2
            className="font-display uppercase text-sm font-bold text-foreground"
            style={{ letterSpacing: "0.18em" }}
          >
            Browse by Category
          </h2>
        </div>
        <div
          className="mt-1 h-0.5 w-12 rounded-full"
          style={{ background: "oklch(0.87 0.17 89)" }}
        />
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{ height: 130 }}
            onClick={() => onCategorySelect(cat.name)}
            data-ocid={`category.card.${i + 1}`}
          >
            {/* Background image */}
            <img
              src={cat.img}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark gradient overlay at bottom */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
              }}
            />

            {/* Text + accent line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
              <p
                className="font-display font-bold text-white leading-tight mb-1.5"
                style={{ fontSize: "0.8rem", letterSpacing: "0.02em" }}
              >
                {cat.name}
              </p>
              {/* Accent line */}
              <div
                className="h-0.5 rounded-full"
                style={{
                  width: 28,
                  background: ACCENT_COLORS[i % 2],
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Main App
// ────────────────────────────────────────────────
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"food" | "drinks">("food");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Show category item list page if a category was selected
  if (selectedCategory !== null) {
    return (
      <CategoryItemListPage
        categoryName={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  const filteredBySearch =
    searchQuery.trim().length > 0
      ? MENU_CATEGORIES.filter((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : null;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.085 0 0)" }}>
      {/* Phone frame centering wrapper */}
      <div className="mx-auto max-w-[430px] min-h-screen relative flex flex-col">
        {/* ── HEADER ── */}
        <header
          className="sticky top-0 z-30 px-4 pt-4 pb-3"
          style={{
            background: "oklch(0.085 0 0)",
            borderBottom: "1px solid oklch(0.18 0 0)",
          }}
        >
          {/* Brand Row */}
          <div className="flex flex-col items-center mb-3">
            {/* Brand name block — centered */}
            <div className="text-center w-full px-2">
              <h1
                className="font-display leading-snug uppercase"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  color: "oklch(0.985 0 0)",
                  textShadow: "0 0 40px oklch(0.87 0.17 89 / 0.35)",
                  letterSpacing: "0.08em",
                  wordBreak: "break-word",
                }}
              >
                Your restaurant &amp; cafe&apos;s name
              </h1>
            </div>

            {/* Veg/Non-Veg pill badges — row below the brand name */}
            <div className="flex flex-row gap-2 mt-3">
              {/* Veg badge */}
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  border: "1px solid oklch(0.85 0.18 145 / 0.4)",
                  backdropFilter: "blur(6px)",
                }}
                data-ocid="header.veg.badge"
              >
                <span style={{ fontSize: "0.72rem", lineHeight: 1 }}>🟩</span>
                <span
                  className="font-semibold"
                  style={{
                    fontSize: "0.68rem",
                    color: "oklch(0.85 0.18 145)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Veg
                </span>
              </div>
              {/* Non-Veg badge */}
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  border: "1px solid oklch(0.75 0.18 27 / 0.4)",
                  backdropFilter: "blur(6px)",
                }}
                data-ocid="header.nonveg.badge"
              >
                <span style={{ fontSize: "0.72rem", lineHeight: 1 }}>🟥</span>
                <span
                  className="font-semibold"
                  style={{
                    fontSize: "0.68rem",
                    color: "oklch(0.75 0.18 27)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Non-Veg
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2.5"
            style={{
              background: "oklch(0.18 0 0)",
              border: "1px solid oklch(0.22 0 0)",
            }}
          >
            <Search
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "oklch(0.56 0 0)" }}
            />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm"
              style={{
                color: "oklch(0.985 0 0)",
                caretColor: "oklch(0.87 0.17 89)",
              }}
              data-ocid="menu.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs transition-opacity hover:opacity-70"
                style={{ color: "oklch(0.56 0 0)" }}
                data-ocid="menu.search_input.close_button"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Tabs — Food & Drinks only */}
          {!searchQuery && (
            <div className="mt-3 flex gap-2">
              {(["food", "drinks"] as const).map((f) => {
                const isActive = activeFilter === f;
                return (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="flex-shrink-0 px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                    style={{
                      background: isActive
                        ? "oklch(0.56 0.25 355)"
                        : "oklch(0.18 0 0)",
                      color: isActive ? "oklch(0.985 0 0)" : "oklch(0.6 0 0)",
                      fontWeight: isActive ? 600 : 400,
                      boxShadow: isActive
                        ? "0 0 16px oklch(0.56 0.25 355 / 0.45)"
                        : "none",
                    }}
                    data-ocid="menu.filter.tab"
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                );
              })}
            </div>
          )}
        </header>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 px-4 pb-24">
          <div className="mt-5">
            {filteredBySearch ? (
              /* Search results */
              <>
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <Flame
                      className="w-4 h-4"
                      style={{ color: "oklch(0.87 0.17 89)" }}
                    />
                    <h2
                      className="font-display uppercase text-sm font-bold text-foreground"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      Results for &ldquo;{searchQuery}&rdquo;
                    </h2>
                  </div>
                  <div
                    className="mt-1 h-0.5 w-12 rounded-full"
                    style={{ background: "oklch(0.87 0.17 89)" }}
                  />
                </div>
                {filteredBySearch.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <UtensilsCrossed className="w-14 h-14 opacity-15 text-white" />
                    <p className="text-sm" style={{ color: "#8A8A8A" }}>
                      No categories found
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredBySearch.map((cat, i) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className="relative overflow-hidden rounded-2xl cursor-pointer group"
                        style={{ height: 130 }}
                        onClick={() => setSelectedCategory(cat.name)}
                      >
                        <img
                          src={cat.img}
                          alt={cat.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                          <p
                            className="font-display font-bold text-white leading-tight mb-1.5"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {cat.name}
                          </p>
                          <div
                            className="h-0.5 rounded-full"
                            style={{
                              width: 28,
                              background: ACCENT_COLORS[i % 2],
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <CategoryGrid
                onCategorySelect={setSelectedCategory}
                filter={activeFilter}
              />
            )}
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="pb-20 pt-2 text-center">
          <p className="text-xs" style={{ color: "oklch(0.35 0 0)" }}>
            © {new Date().getFullYear()}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "oklch(0.87 0.17 89)" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      {/* ── FLOATING GOOGLE REVIEW BUTTON ── */}
      <GoogleReviewButton bottomOffset="1.5rem" />
    </div>
  );
}
