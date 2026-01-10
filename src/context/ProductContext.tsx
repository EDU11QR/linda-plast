import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { products as initialProducts } from '@/data/products';

// Definición de las funciones y datos disponibles en el contexto
interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

/**
 * Proveedor de Contexto para Productos.
 * Maneja el estado global de los productos, combinando los estáticos con los guardados localmente.
 */
export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    // Cargar productos al iniciar la aplicación (Montaje)
    useEffect(() => {
        // Recuperar productos personalizados desde LocalStorage
        const savedProducts = localStorage.getItem('custom_products');
        const parsedCustomProducts: Product[] = savedProducts ? JSON.parse(savedProducts) : [];

        // Combinar productos estáticos (código) con productos personalizados (localStorage)
        setProducts([...initialProducts, ...parsedCustomProducts]);
    }, []);

    // Función para añadir un nuevo producto
    const addProduct = (newProduct: Product) => {
        // 1. Actualizar el estado visual inmediatamente
        setProducts(prev => [...prev, newProduct]);

        // 2. Persistir en LocalStorage (Solo los personalizados)
        const savedProducts = localStorage.getItem('custom_products');
        const parsedCustomProducts: Product[] = savedProducts ? JSON.parse(savedProducts) : [];
        const updatedCustomProducts = [...parsedCustomProducts, newProduct];
        localStorage.setItem('custom_products', JSON.stringify(updatedCustomProducts));
    };

    // Función para actualizar un producto existente
    const updateProduct = (updatedProduct: Product) => {
        // 1. Actualizar el estado visual
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));

        // 2. Persistir cambios si es un producto personalizado
        const savedProducts = localStorage.getItem('custom_products');
        if (savedProducts) {
            const parsedCustomProducts: Product[] = JSON.parse(savedProducts);
            // Verificar si el producto editado está almacenado en LS
            const isCustom = parsedCustomProducts.some(p => p.id === updatedProduct.id);

            if (isCustom) {
                const updatedCustomProducts = parsedCustomProducts.map(p =>
                    p.id === updatedProduct.id ? updatedProduct : p
                );
                localStorage.setItem('custom_products', JSON.stringify(updatedCustomProducts));
            }
        }
    };

    // Función para eliminar un producto
    const deleteProduct = (id: string) => {
        // 1. Actualizar estado visual (filtrar el ID eliminado)
        setProducts(prev => prev.filter(p => p.id !== id));

        // 2. Actualizar almacenamiento local
        const savedProducts = localStorage.getItem('custom_products');
        if (savedProducts) {
            const parsedCustomProducts: Product[] = JSON.parse(savedProducts);
            const updatedCustomProducts = parsedCustomProducts.filter(p => p.id !== id);
            localStorage.setItem('custom_products', JSON.stringify(updatedCustomProducts));
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

// Hook personalizado para usar el contexto con seguridad de tipos
export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
