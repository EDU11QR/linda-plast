export interface Product {
  id: string;
  name: string;
  sector: 'limpieza' | 'higiene' | 'alimentacion' | 'bebidas';
  gramaje: number;
  tipoCuello: 'PCO' | '30/25' | '28mm' | '38mm';
  image: string;
  description: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number; // in thousands (millares)
}

export interface QuoteRequest {
  empresa: string;
  volumenEstimado: string;
  ciudad: string;
  email: string;
  telefono: string;
}
