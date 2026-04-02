export interface Trip {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  destination: string;
  duration: string;
  price: number;
  currency: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  image: string;
  tripCount: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
