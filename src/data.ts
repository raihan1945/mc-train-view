import { MenuItem } from './types';

export const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLP_r33gkgQL_Px3-VgNU-R_4K-DwUg-I5S7Zy0np_VeBGpWC9J0ENTuXB0iYgPAURW8n7P8rxdj77347CWFHRCMe6sJapUt-iJseylxbmCqxJFnthMWc5ii1h7EG7aQMIBo58Y04HN73dhaNpxldrOZJDyRm7Ni1wKTX0lQ0Fwm7VH40XEgUaG33Q8tf8b319EMGUYWbQy1J5HPfRgwY2MqQMhZUHDjFxyEslDx1xwAdymzBy7jlf083GUo8UbbWjL8p9S5gOdg",
  about: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDwPKcSLOH1jMl4KAw9hHPAvT6mrlwzqhXXZf6br3khxFtnWJnyCC2sDwu4DHN2qNpMEgEcgK6ywGe5skIwXuygmqpJg79ID-27DbRdlL5RkcsJ9y2C_M5geDikwZlTUmyREQQdZSTiQczXg2kXSV05NpqR9cuI9UeR4PnbIcl4vmp8LTcJhfJMQdQr0NdC9TJ7yCUS2MgvgDluL40IKJN5nwXmuCOhSv6VfAFWgq-eIgEfKtYSu5gm-FzlF460CvgbhEAsSEmfQ",
  contactMapBanner: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWwuG4qMF5auG8m0Z5tdrjuLrveeHQ6QVFm2xiKDYuYk4D2wwcm9kZ6bGdt5NO4V8-hZnDDXjSpK97ML0Lj1R2BVCtgQdzqtdUes3ivjDe9ToCM12wMNDImkVc8xX8aqdwcdUvoXmVegZzScdet1lIPwvRbE1aOrHeMTVsck97lrUKtnAEuKNEhtNEg6SDJWcU3-k1dOBzBzQWPFpoI9dyKXtpZrqc6-8gHWXE7OMjl3uLFiLa987EeAsFFOVIKUe-U1Tg4RkMYA",
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGR10WTKEM7EpZXmKSL6DtFl2uFZMJQELMLbQJVOW1CxWX2xPadfvZx7dIygBC4rkgXiU5KyGr-1wI722aj4jFukKxBE4ea67GpWFCYjF2HVdd7RnfoYVMQwsKZt_h5mIgZBN-sE6u_Mazsj6oy4eIEA-E0TJ0u65VUtU2ULK7uE_5V7o1xc9RigZX-sG4SpcIc2aCqKeU9RGjJpF8aQ7EpMqG_f_j4Ap6KDXJf_x8G5wbLwgHS4G0HvQAsC0D_OxGj0Oridj-KA"
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "burger-chicken",
    name: "Burger Chicken",
    price: 32000,
    desc: "Patty daging ayam dada panggang yang juicy, disajikan dalam roti burger lembut bersama selada segar, tomat, bawang bombay, dan saus pilihan buatan sendiri.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCn5slWlkJp7cAsLJUromraPaCj7-GVucFo9tlTMk4dV5RO-vLCh0QwZDH_Hio-qm-GNhCaQKHx0FDEaAXql9uWa85FTomjxIcSiThMuNHsRScNZqd5NFMy1IwpiFZSJQbtVX7yFHUtYIZ7eLO3he-fxzBuR2sjPCJxqdHQ7lIXI6BP_UC5ucxyNjc7DIu35un5wPog6vnU3h4cPOaqprXZPBdTPX13rHVBAOYbQn91_AjZZOgIMdJjDubnr2H18lfmPOHRAHpQ-Q",
    categories: ["main-course"],
    tag: "Best Seller"
  },
  {
    id: "croissant-banana",
    name: "Croissant Banana",
    price: 25000,
    desc: "Croissant berlapis dengan tekstur flaky khas Prancis yang renyah dan bermentega, diisi kombinasi pisang manis matang, cokelat lumer premium, dan keju gurih yang meleleh.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2SUmknY_jItceKmTa0BIVofs_GSHMWfC8tzAZUwvUfZtzARf3iy7itU1vpaMj_hMXRIvjIQXzWQpznY8S72GpLmezXQXShSumUF6hcSjpV9rQnRDKjqOo_ZP8ViopXxqOVpGAkqaAyq_YjEvdm5Wn_561kM58h8iArhqnfMZvl3jW2hnrhYf9YiE9u4_vB5zIngrxFEj5SD9IIn_360WJjRvOQYH1YeLz087DWG4M-zhxDl8Q9Aa9_TPbvC3YcSjYEM93XHh0Ww",
    categories: ["bakery"]
  },
  {
    id: "new-york-cheese-cake",
    name: "New York Cheese Cake",
    price: 30000,
    desc: "Kue keju padat klasik gaya New York yang lembut, padat, dan kaya rasa dari krim keju berkualitas. Dipanggang rata dengan biskuit graham sebagai crust bawah yang gurih serta siraman strawberry gel merah mengkilat yang manis segar.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSSccKS5o1sskuCAGhqYOc-79sLgZhPKlmoy0AHfkJxzkRvH2St3sLMIFlRQduI6jwojL_YIXDs2624ujjqCHHELiQJVPIbra8Lerkv9mkxpYjbHxsdtG71GVDqq52XBESj8A2trYGI5q253XkKEN8URqzvBilEz5ogfGLYREGdfpLWWBzJe1pGCY3wngd2KqD7D4gk98_UQPr8iIhgmsYHG0AN0kmvGnJ4JtvC5WNwaRNcNnZn8dsy-ajfxMmrhpQ3mPb0qczXg",
    categories: ["bakery", "signature"],
    tag: "Signature"
  },
  {
    id: "nasi-goreng-mctv",
    name: "Nasi Goreng MCTV",
    price: 27000,
    desc: "Nasi goreng racikan khas MC Train View dengan bumbu rempah tradisional Jawa, disajikan dengan telur mata sapi setengah matang, potongan ayam panggang berair (juicy), acar segar dan kerupuk renyah.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVbwBJXguapu6tTZ183qzOlcfrBUxbW047S56tT44SCEsWZw5VKqoSTdhYmDvR4cz17_Nw23uAblWiQyCJfDD4ni1v2zGVMSFyiwaPA1H3w6GuhCk39ZT7VY_WVQsp5LlOLJY2yBNLdmw4VB2aCvBSf9s9YM2kDUzQOw35hEQ6JUOWF7vayT_Yz0gx0QklLibVA_5peZDWGv3YRsaWa0oXVmSxlgw4xhtIJ70IIBZvxS6j4CxY7RTePBF6MieAnYFlYaiYS4pKrA",
    categories: ["main-course", "signature"],
    tag: "Signature"
  },
  {
    id: "coffee-latte-iced",
    name: "Coffee Latte Iced",
    price: 30000,
    desc: "Perpaduan double-shot espresso Arabika berkualitas tinggi dengan susu segar full cream premium dan es batu. Rasa kopi yang solid berpadu harmonis dengan creamy-nya susu.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkw3WpE6yWwnyj0ge1ZgFWLrzL1DoL_cLEl6AN7b4M0G12odYvgENVTkOBOWWyf9n9JyD9vsWLAMWDHixdw-559To0cxOGJzQeYHq_9YhTiAVmYz0MdlwdoaGTl9lmduLGBbXFNu4fidXDg9H7KQEG1oP9eZzDvkRISQDgqGOA_PjsMO3XOXFUIh6GvmghMUoFckGPtou_SOnr-cS5TVPkWC9WwxZevNZ09v-gis22QjyOwBZ81MUTQ-XthOI-uKiF1wL5RNfj0A",
    categories: ["beverages"]
  },
  {
    id: "cheese-bites",
    name: "Cheese Bites",
    price: 40000,
    desc: "Bola ubi renyah bertabur tepung roti di luarnya, diisi dengan keju mozzarella gurih di dalamnya yang mulur sempurna saat ditarik selagi hangat. Sangat pas untuk menu santai berteman kopi.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBepWTNHx-6L3-OiauP7bgkHIHVXxozDsWKg5O4v8m9dG2OHMbP7LdZ8vvl4nZ3H60jKF2cFH-TMvPzp7ffOxZBiVZgBE8-nGMnMWGMMRmptxwO2j40OzMGowA9rLRk2tgIVmyXdVEXendfgRW8zaaA_urRKSw3am8UDBI0yAwJ5APMc0U8aV6NU7O4M0ayjfnGj-5ceMo1_KecIVnLA8YKYfJpm7iA51e1n9vBGq3cJ5dZwdNUnNq-htnj-e4eXVh969kbnbiTw",
    categories: ["snacks", "signature"],
    tag: "Signature"
  },
  {
    id: "croissant-butter",
    name: "Classic Butter Croissant",
    price: 18000,
    desc: "Croissant laminasi mentega Prancis klasik berkualitas premium. Renyah beremah di bagian luar, berongga lembut dan harum mentega di bagian dalam.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDwPKcSLOH1jMl4KAw9hHPAvT6mrlwzqhXXZf6br3khxFtnWJnyCC2sDwu4DHN2qNpMEgEcgK6ywGe5skIwXuygmqpJg79ID-27DbRdlL5RkcsJ9y2C_M5geDikwZlTUmyREQQdZSTiQczXg2kXSV05NpqR9cuI9UeR4PnbIcl4vmp8LTcJhfJMQdQr0NdC9TJ7yCUS2MgvgDluL40IKJN5nwXmuCOhSv6VfAFWgq-eIgEfKtYSu5gm-FzlF460CvgbhEAsSEmfQ", // fallback to bakery interior
    categories: ["bakery"]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'Semua' },
  { id: 'main-course', name: 'Main Course' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'signature', name: 'Signature' }
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Citra Lestari",
    role: "Local Guide Yogyakarta",
    quote: "Sensasi ngopi yang berbeda banget! Kopi latte-nya mantap, rotinya lembut, dan momen pas nungguin kereta lewat di depan meja itu magis banget. Recommended dapet spot outdoor saat golden hour!",
    rating: 5
  },
  {
    id: "2",
    name: "Dimas Saputra",
    role: "Pecinta Kuliner & Railfans",
    quote: "MCTV jadi tempat favorit nongkrong sore di Sleman. New York Cheese Cake-nya juara, balance antara gurih krim keju dan saus strawberry-nya. Pas banget buat kerja sambil refreshing.",
    rating: 5
  }
];

export const FAQS = [
  {
    question: "Apakah perlu reservasi sebelum datang ke lokasi?",
    answer: "Reservasi tidak wajib (bisa walk-in langsung), namun sangat disarankan terutama jika Anda ingin mendapatkan spot meja terbaik di pinggir rel kereta pada hari libur atau sore hari."
  },
  {
    question: "Berapa menit sekali kereta lewat di depan kafe?",
    answer: "Sesuai jadwal operasional PT KAI, rata-rata ada kereta yang melintas setiap 20-30 menit sekali, baik kereta komuter maupun kereta jarak jauh."
  },
  {
    question: "Apakah makanan di MC Train View halal?",
    answer: "Dapur kami 100% halal, menyajikan aneka olahan bakery, pastry prancis lembut, aneka rice dish, dan minuman kopi-non kopi berkualitas tinggi."
  }
];
