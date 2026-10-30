type Category = {
  key: string;
  title: string;
  count: number;
};
const categories: Category[] = [
  { key: 'starters', title: 'Starters', count: 1 },
  { key: 'mains', title: 'Mains', count: 1 },
  { key: 'beverages', title: 'Beverages', count: 1 },
  { key: 'desserts', title: 'Desserts', count: 1 },
];

type MenuItem = {
  key: string;
  title: string;
  price: number;
  category: string;
  dietaryBadge: string;
  description: string;
  imageUrl: string;
};
// https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80
