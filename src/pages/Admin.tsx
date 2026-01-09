import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/types/product';
import { Trash2, Plus, Package, Lock, Home, Edit, Upload, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Página de Administración del Catálogo.
 * Permite a los usuarios autenticados crear, editar y eliminar productos.
 */
const Admin = () => {
    const navigate = useNavigate();
    // Acceso a las funciones del contexto de productos
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();

    // Estado de Autenticación (Persistente en localStorage)
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('admin_session') === 'true';
    });
    const [password, setPassword] = useState('');

    // Estado para controlar si estamos editando o creando
    const [isEditing, setIsEditing] = useState(false);

    // Estado del Formulario
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        sector: 'alimentacion',
        gramaje: 0,
        tipoCuello: 'PCO',
        description: '',
        image: '/placeholder.svg'
    });

    // Manejo del Login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Validación simple de contraseña (en producción usar backend real)
        if (password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('admin_session', 'true');
        } else {
            alert('Contraseña incorrecta');
        }
    };

    // Cerrar sesión y limpiar almacenamiento local
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_session');
        navigate('/');
    };

    // Salir del panel (también cierra sesión por seguridad)
    const handleExit = () => {
        handleLogout();
    };

    // Manejo de carga de imágenes (Convierte a Base64)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Guarda la imagen como string Base64 en el estado
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Reiniciar el formulario a sus valores por defecto
    const resetForm = () => {
        setFormData({
            name: '',
            sector: 'alimentacion',
            gramaje: 0,
            tipoCuello: 'PCO',
            description: '',
            image: '/placeholder.svg'
        });
        setIsEditing(false);
    };

    // Preparar el formulario para editar un producto existente
    const startEdit = (product: Product) => {
        setFormData(product);
        setIsEditing(true);
        // Desplazarse hacia arriba para ver el formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Manejo del envío del formulario (Crear o Actualizar)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && formData.id) {
            // Lógica de Actualización
            const updatedProduct: Product = {
                ...formData as Product
            };
            updateProduct(updatedProduct);
            alert('Producto actualizado correctamente');
            resetForm();
        } else {
            // Lógica de Creación
            const newProduct: Product = {
                id: `custom-${Date.now()}`, // ID único basado en timestamp
                name: formData.name || 'Nuevo Producto',
                sector: formData.sector as any,
                gramaje: Number(formData.gramaje),
                tipoCuello: formData.tipoCuello as any,
                image: formData.image || '/placeholder.svg',
                description: formData.description || ''
            };
            addProduct(newProduct);
            alert('Producto agregado correctamente');
            resetForm();
        }
    };

    // Manejo de cambios en los inputs del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Renderizado de la Pantalla de Login si no está autenticado
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-primary/10 rounded-full">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                    </div>

                    <div className="absolute top-4 left-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            <span>Inicio</span>
                        </Link>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Acceso Administrativo</h2>
                    <p className="text-muted-foreground mb-6">Ingresa la contraseña para gestionar el catálogo.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                            placeholder="Contraseña..."
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Renderizado del Panel de Administración (Autenticado)
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            {/* Cabecera del Panel */}
            <header className="bg-white dark:bg-slate-800 border-b border-border sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Package className="w-6 h-6 text-primary" />
                        <h1 className="text-xl font-bold">Panel de Administración</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExit}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden sm:inline">Volver al Inicio</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sección del Formulario (Columna Izquierda / Superior) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-border p-6 sticky top-24">
                            <h2 className="text-lg font-bold mb-6 flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    {isEditing ? <Edit className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                                    {isEditing ? 'Editar Producto' : 'Agregar Producto'}
                                </span>
                                {isEditing && (
                                    <button onClick={resetForm} className="text-xs text-muted-foreground hover:text-foreground">
                                        Cancelar
                                    </button>
                                )}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Carga de Imagen */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Imagen del Producto</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-lg border border-border overflow-hidden bg-gray-50 flex items-center justify-center">
                                            {formData.image && formData.image !== '/placeholder.svg' ? (
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <Upload className="w-6 h-6 text-muted-foreground opacity-50" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="text-xs w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                            />
                                            <p className="text-[10px] text-muted-foreground mt-1">Recomendado: 500x500px, WebP/JPG</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Nombre del Producto</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                                        placeholder="Ej. Botella 500ml"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Sector</label>
                                        <select
                                            name="sector"
                                            value={formData.sector}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                                        >
                                            <option value="alimentacion">Alimentación</option>
                                            <option value="bebidas">Bebidas</option>
                                            <option value="limpieza">Limpieza</option>
                                            <option value="higiene">Higiene</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Gramaje (g)</label>
                                        <input
                                            type="number"
                                            name="gramaje"
                                            value={formData.gramaje}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Tipo de Cuello</label>
                                    <select
                                        name="tipoCuello"
                                        value={formData.tipoCuello}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
                                    >
                                        <option value="PCO">PCO</option>
                                        <option value="30/25">30/25</option>
                                        <option value="28mm">28mm</option>
                                        <option value="38mm">38mm</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Descripción</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none resize-none text-sm"
                                        placeholder="Detalles adicionales..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-2.5 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 mt-4 text-white ${isEditing ? 'bg-amber-500 hover:bg-amber-600' : 'bg-primary hover:bg-primary/90'}`}
                                >
                                    {isEditing ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sección de Lista de Productos (Derecha / Inferior) */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold">Inventario Actual</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Renderizado de lista de productos (invertida para mostrar los nuevos primero) */}
                            {[...products].reverse().map((product) => (
                                <div
                                    key={product.id}
                                    className={`bg-white dark:bg-slate-800 p-4 rounded-xl border flex items-start justify-between group hover:shadow-md transition-all ${isEditing && formData.id === product.id ? 'border-primary ring-1 ring-primary' : 'border-border'}`}
                                >
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                                            <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                                                {/* Etiqueta de Sector con código de colores */}
                                                <span className={`px-2 py-1 rounded-md font-medium ${product.sector === 'bebidas' ? 'bg-blue-500/10 text-blue-600' :
                                                    product.sector === 'alimentacion' ? 'bg-amber-500/10 text-amber-600' :
                                                        product.sector === 'limpieza' ? 'bg-emerald-500/10 text-emerald-600' :
                                                            product.sector === 'higiene' ? 'bg-violet-500/10 text-violet-600' :
                                                                'bg-secondary/10 text-secondary-foreground'
                                                    }`}>
                                                    {product.sector.charAt(0).toUpperCase() + product.sector.slice(1)}
                                                </span>
                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">{product.gramaje}g</span>
                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">{product.tipoCuello}</span>
                                            </div>
                                            {/* Indicador de producto personalizado (no estático) */}
                                            {product.id.toString().startsWith('custom-') && (
                                                <span className="inline-block mt-2 text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">Personalizado</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Botones de acción (Editar / Eliminar) - Visibles al hacer hover */}
                                    <div className="flex flex-col gap-2 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => startEdit(product)}
                                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            title="Editar"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('¿Estás seguro de eliminar este producto?')) {
                                                    deleteProduct(product.id);
                                                }
                                            }}
                                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Estado vacío */}
                            {products.length === 0 && (
                                <div className="col-span-full py-12 text-center text-muted-foreground bg-white dark:bg-slate-800 rounded-xl border border-dashed border-border">
                                    <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No hay productos registrados.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Admin;
