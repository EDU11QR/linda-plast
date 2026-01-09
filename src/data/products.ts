import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'pf-001',
    name: 'Preforma PET 15g PCO',
    sector: 'alimentacion',
    gramaje: 15,
    tipoCuello: 'PCO',
    image: '/placeholder.svg',
    description: 'Ideal para botellas de agua 500ml'
  },
  {
    id: 'pf-002',
    name: 'Preforma PET 20g PCO',
    sector: 'bebidas',
    gramaje: 20,
    tipoCuello: 'PCO',
    image: '/placeholder.svg',
    description: 'Perfecta para refrescos y jugos 600ml'
  },
  {
    id: 'pf-003',
    name: 'Preforma PET 28g 30/25',
    sector: 'bebidas',
    gramaje: 28,
    tipoCuello: '30/25',
    image: '/placeholder.svg',
    description: 'Para bebidas carbonatadas 1L'
  },
  {
    id: 'pf-004',
    name: 'Preforma PET 35g 28mm',
    sector: 'alimentacion',
    gramaje: 35,
    tipoCuello: '28mm',
    image: '/placeholder.svg',
    description: 'Envases para aceites y salsas'
  },
  {
    id: 'pf-005',
    name: 'Preforma PET 42g 38mm',
    sector: 'limpieza',
    gramaje: 42,
    tipoCuello: '38mm',
    image: '/placeholder.svg',
    description: 'Para productos de limpieza 1L'
  },
  {
    id: 'pf-006',
    name: 'Preforma PET 50g 38mm',
    sector: 'limpieza',
    gramaje: 50,
    tipoCuello: '38mm',
    image: '/placeholder.svg',
    description: 'Envases industriales 2L'
  },
  {
    id: 'pf-007',
    name: 'Preforma PET 18g PCO',
    sector: 'higiene',
    gramaje: 18,
    tipoCuello: 'PCO',
    image: '/placeholder.svg',
    description: 'Para cosméticos y shampoo'
  },
  {
    id: 'pf-008',
    name: 'Preforma PET 25g 30/25',
    sector: 'higiene',
    gramaje: 25,
    tipoCuello: '30/25',
    image: '/placeholder.svg',
    description: 'Productos de cuidado personal'
  },
  {
    id: 'pf-009',
    name: 'Preforma PET 32g 28mm',
    sector: 'alimentacion',
    gramaje: 32,
    tipoCuello: '28mm',
    image: '/placeholder.svg',
    description: 'Para conservas y mermeladas'
  },
  {
    id: 'pf-010',
    name: 'Preforma PET 45g 38mm',
    sector: 'bebidas',
    gramaje: 45,
    tipoCuello: '38mm',
    image: '/placeholder.svg',
    description: 'Bebidas deportivas 1.5L'
  },
  {
    id: 'pf-011',
    name: 'Preforma PET 22g PCO',
    sector: 'alimentacion',
    gramaje: 22,
    tipoCuello: 'PCO',
    image: '/placeholder.svg',
    description: 'Aceites de cocina 500ml'
  },
  {
    id: 'pf-012',
    name: 'Preforma PET 38g 30/25',
    sector: 'limpieza',
    gramaje: 38,
    tipoCuello: '30/25',
    image: '/placeholder.svg',
    description: 'Detergentes líquidos'
  }
];

export const sectors = [
  { id: 'all', label: 'Todos', icon: 'Layers' },
  { id: 'bebidas', label: 'Bebidas', icon: 'GlassWater' },
  { id: 'alimentacion', label: 'Alimentación', icon: 'UtensilsCrossed' },
  { id: 'limpieza', label: 'Limpieza', icon: 'SprayCanIcon' },
  { id: 'higiene', label: 'Higiene', icon: 'Droplet' },
] as const;

export const gramajeRanges = [
  { min: 15, max: 25, label: '15g - 25g' },
  { min: 26, max: 35, label: '26g - 35g' },
  { min: 36, max: 50, label: '36g - 50g' },
] as const;

export const tipoCuelloOptions = ['PCO', '30/25', '28mm', '38mm'] as const;
