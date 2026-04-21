import { Product } from "./types";

// Dark editorial Imgix params applied to all images for moody/mysterious aesthetic
const D = "?w=600&h=800&fit=crop&bri=-12&sat=-20&con=8&q=80";
const DL = "?w=800&h=1000&fit=crop&bri=-12&sat=-20&con=8&q=80";

const img = (id: string) => `https://images.unsplash.com/photo-${id}${D}`;
const imgL = (id: string) => `https://images.unsplash.com/photo-${id}${DL}`;

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Shadow Wrap Coat",
    price: 289,
    cover_image: img("1539109136881-3be0616acf4b"),
    images: [imgL("1539109136881-3be0616acf4b"), imgL("1520975954732-35dd22299614")],
    description:
      "Deconstructed silhouette. Heavyweight woven wool blend. No rules — just structure where you decide it lives.",
    available_colors: ["Void Black", "Ash White", "Rust"],
    available_sizes: ["XS", "S", "M", "L", "XL"],
    category: "outerwear",
  },
  {
    id: 2,
    name: "Fracture Blazer",
    price: 199,
    cover_image: img("1617127365659-c47fa864d8bc"),
    images: [imgL("1617127365659-c47fa864d8bc"), imgL("1593030761757-71fae45fa0e7")],
    description:
      "Oversized and unlined. Raw seam edges and dropped shoulders. The kind of piece that makes a room notice.",
    available_colors: ["Charcoal", "Ecru"],
    available_sizes: ["S", "M", "L", "XL"],
    category: "tops",
  },
  {
    id: 3,
    name: "Void Knit Sweater",
    price: 149,
    cover_image: img("1576566588028-4147f3842f27"),
    images: [imgL("1576566588028-4147f3842f27")],
    description:
      "Open-knit with intentional drops at the hem. Cropped boxy fit. Wears like a second skin you chose.",
    available_colors: ["Off White", "Dark Grey", "Clay"],
    available_sizes: ["XS", "S", "M", "L"],
    category: "tops",
  },
  {
    id: 4,
    name: "Threshold Trousers",
    price: 179,
    cover_image: img("1584917865442-de89df76afd3"),
    images: [imgL("1584917865442-de89df76afd3")],
    description:
      "Wide-leg with a low-rise waist and hardware detail at the hip. Built for the long walk and the late exit.",
    available_colors: ["Black", "Bone"],
    available_sizes: ["XS", "S", "M", "L", "XL"],
    category: "bottoms",
  },
  {
    id: 5,
    name: "Ritual Silk Shirt",
    price: 165,
    cover_image: img("1551489186-cf8726f514f8"),
    images: [imgL("1551489186-cf8726f514f8")],
    description:
      "Fluid bias-cut silk. Collarless and asymmetric. The shirt that doesn't ask for permission.",
    available_colors: ["Pearl", "Black Onyx", "Dusty Rose"],
    available_sizes: ["XS", "S", "M", "L"],
    category: "tops",
  },
  {
    id: 6,
    name: "Noise Cotton Tee",
    price: 75,
    cover_image: img("1562157873-818bc0726f68"),
    images: [imgL("1562157873-818bc0726f68")],
    description:
      "100% heavyweight cotton. Garment-dyed and pre-shrunk. The tee that survives everything you put it through.",
    available_colors: ["Washed Black", "Dirty White", "Terracotta"],
    available_sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "tops",
  },
  {
    id: 7,
    name: "Eclipse Leather Jacket",
    price: 449,
    cover_image: img("1551028719-00167b16eac5"),
    images: [imgL("1551028719-00167b16eac5")],
    description:
      "Full-grain Italian leather. Minimal stitching. Zero branding. The jacket that outlives every trend.",
    available_colors: ["Black", "Cognac"],
    available_sizes: ["S", "M", "L", "XL"],
    category: "outerwear",
  },
  {
    id: 8,
    name: "Sérum Linen Set",
    price: 219,
    cover_image: img("1515886657613-9f3515b0c78f"),
    images: [imgL("1515886657613-9f3515b0c78f")],
    description:
      "Matching linen top and wide-leg pant. Washed for softness. Wears like nothing at all.",
    available_colors: ["Sand", "Storm", "Blush"],
    available_sizes: ["XS", "S", "M", "L"],
    category: "sets",
  },
  {
    id: 9,
    name: "Remnant Cargo Pant",
    price: 159,
    cover_image: img("1519345182560-3f2917c472ef"),
    images: [imgL("1519345182560-3f2917c472ef")],
    description:
      "Relaxed cargo with side utility pockets and adjustable hem. Deadstock fabric — no two exactly alike.",
    available_colors: ["Olive", "Black", "Stone"],
    available_sizes: ["XS", "S", "M", "L", "XL"],
    category: "bottoms",
  },
  {
    id: 10,
    name: "Cipher Trench",
    price: 345,
    cover_image: img("1509631179647-0177331693ae"),
    images: [imgL("1509631179647-0177331693ae")],
    description:
      "Double-breasted, belted, storm-proof. Worn open or cinched — either way it makes a statement without trying.",
    available_colors: ["Void Black", "Camel", "Slate"],
    available_sizes: ["XS", "S", "M", "L", "XL"],
    category: "outerwear",
  },
  {
    id: 11,
    name: "Burial Turtleneck",
    price: 95,
    cover_image: img("1558618666-fcd25c85cd64"),
    images: [imgL("1558618666-fcd25c85cd64")],
    description:
      "Ribbed mock-neck in heavy cotton-modal blend. The layer that goes under everything. The base of everything.",
    available_colors: ["Black", "Ash", "Burgundy"],
    available_sizes: ["XS", "S", "M", "L", "XL"],
    category: "tops",
  },
  {
    id: 12,
    name: "Negative Space Dress",
    price: 245,
    cover_image: img("1529139574466-a303027c1d8b"),
    images: [imgL("1529139574466-a303027c1d8b")],
    description:
      "Asymmetric hem, single shoulder, structural back. Not for the background.",
    available_colors: ["Black", "Slate Grey", "Dusty Mauve"],
    available_sizes: ["XS", "S", "M", "L"],
    category: "dresses",
  },
  {
    id: 13,
    name: "Phantom Coat",
    price: 389,
    cover_image: img("1490481651871-ab68de25d43d"),
    images: [imgL("1490481651871-ab68de25d43d")],
    description:
      "Oversized topcoat in brushed wool. Long enough to swallow you whole. That's the point.",
    available_colors: ["Graphite", "Ivory", "Rust"],
    available_sizes: ["S", "M", "L", "XL"],
    category: "outerwear",
  },
  {
    id: 14,
    name: "Static Wide Shorts",
    price: 115,
    cover_image: img("1596755389378-c31d21fd1273"),
    images: [imgL("1596755389378-c31d21fd1273")],
    description:
      "Relaxed cut, elastic waistband, raw hem edge. The kind of shorts that have no interest in being modest.",
    available_colors: ["Black", "Stone", "Washed Navy"],
    available_sizes: ["XS", "S", "M", "L", "XL"],
    category: "bottoms",
  },
  {
    id: 15,
    name: "Debris Field Jacket",
    price: 265,
    cover_image: img("1525562723836-dca67a71d5f1"),
    images: [imgL("1525562723836-dca67a71d5f1")],
    description:
      "Military-inspired utility jacket, reworked. Four pockets, one hidden. Deadstock nylon shell.",
    available_colors: ["Olive Drab", "Black", "Stone"],
    available_sizes: ["S", "M", "L", "XL"],
    category: "outerwear",
  },
  {
    id: 16,
    name: "Archive Overshirt",
    price: 135,
    cover_image: img("1606836591695-4d58a73eba1e"),
    images: [imgL("1606836591695-4d58a73eba1e")],
    description:
      "Heavyweight brushed flannel. Double-chest pockets, drop shoulder. Wears as jacket or shirt.",
    available_colors: ["Black Check", "Oatmeal", "Brown"],
    available_sizes: ["XS", "S", "M", "L", "XL"],
    category: "tops",
  },
  {
    id: 17,
    name: "Signal Tank",
    price: 65,
    cover_image: img("1581044777550-4cfa60707c03"),
    images: [imgL("1581044777550-4cfa60707c03")],
    description:
      "Heavyweight cotton slab tank. Raw-edge armhole. Longer length for tucking or leaving out.",
    available_colors: ["Washed Black", "Dirty White", "Forest"],
    available_sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "tops",
  },
  {
    id: 18,
    name: "Meridian Suit",
    price: 495,
    cover_image: img("1513542789411-b6a5d4f31634"),
    images: [imgL("1513542789411-b6a5d4f31634"), imgL("1591047139829-d91aecb6caea")],
    description:
      "Single-button jacket and pleated trouser. Unlined, slightly deconstructed. Bought as a set. Worn as a statement.",
    available_colors: ["Charcoal", "Chalk", "Midnight Navy"],
    available_sizes: ["XS", "S", "M", "L", "XL"],
    category: "sets",
  },
];

export const featuredProducts = mockProducts.slice(0, 3);
