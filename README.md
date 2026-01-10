📦 Linda Plast Catalogs

Aplicación web desarrollada en React + TypeScript para la visualización de catálogos de productos plásticos y la generación de cotizaciones dinámicas, siguiendo una arquitectura modular, escalable y mantenible.

 - Objetivo del Proyecto

El objetivo de Linda Plast Catalogs es permitir a los usuarios:

Visualizar un catálogo de productos organizados por categorías.

Agregar productos a un carrito de cotización.

Gestionar la cotización de forma global desde cualquier parte de la aplicación.

Mantener una arquitectura preparada para una futura integración con una API backend.

---------------------------------------------------------------------------------------------------

📂 Descripción de Capas
📄 src/pages — Vistas y Enrutamiento

Contiene las páginas principales de la aplicación.

Cada archivo representa una ruta completa.

Orquesta la composición de los componentes principales.

Ejemplos:

Index.tsx → Página principal

NotFound.tsx → Página 404

---------------------------------------------------------------------------------------------------

🧩 src/components — Presentación y Lógica UI

Componentes reutilizables y específicos del negocio.

Tipos de componentes:

Feature Components:
Componentes con lógica propia del dominio (ej. ProductCatalog, QuoteModal).

UI Components (components/ui):
Componentes atómicos como botones, inputs, cards (basados en shadcn/ui o similar).

✔ Favorece la reutilización y consistencia visual.

---------------------------------------------------------------------------------------------------

🌐 src/context — Estado Global

Implementa Context API para manejar estados compartidos.

Evita el prop drilling.

Ideal para funcionalidades transversales como el carrito de cotización.

Ejemplo:

CartContext → Maneja productos agregados, cantidades y acciones.

---------------------------------------------------------------------------------------------------

🪝 src/hooks — Lógica Reutilizable

Hooks personalizados que encapsulan lógica compleja.

Mantiene los componentes limpios y enfocados en la UI.

Ejemplos:

useCart

useProducts

---------------------------------------------------------------------------------------------------

📊 src/data — Datos Estáticos

Contiene productos, categorías y configuraciones simuladas.

Centraliza la información del catálogo.

Preparado para ser reemplazado por una API real en el futuro.

---------------------------------------------------------------------------------------------------

🛠️ src/lib y src/types — Utilidades y Tipado
lib/

Funciones auxiliares puras:

Formateo de moneda

Helpers de clases CSS

Validaciones

types/

Interfaces y tipos TypeScript compartidos.

Mejora la robustez del código y la experiencia de desarrollo (DX).

---------------------------------------------------------------------------------------------------

🔄 Flujo de Comunicación (One-Way Data Flow)

La aplicación utiliza un flujo de datos unidireccional, reforzado por Context API.

Ejemplo: Agregar un producto a la cotización

El usuario hace clic en Agregar desde ProductCard.

El componente llama a una función del contexto (addToCart).

El estado global (CartContext) se actualiza.

React notifica a los componentes suscritos.

La interfaz se actualiza automáticamente.

---------------------------------------------------------------------------------------------------

🧠 Principios Aplicados

✅ Separación de responsabilidades

✅ Modularidad

✅ Escalabilidad

✅ Mantenibilidad

✅ Clean Code

✅ Tipado fuerte con TypeScript

---------------------------------------------------------------------------------------------------

🧪 Tecnologías Utilizadas

React

TypeScript

Context API

Hooks personalizados

Tailwind CSS

shadcn/ui (UI Components)

---------------------------------------------------------------------------------------------------

📈 Escalabilidad Futura

El proyecto está preparado para:

Integración con una API REST o BFF.

Autenticación de usuarios.

Persistencia del carrito.

Exportación de cotizaciones (PDF / WhatsApp / Email).

Migración de data/ a backend real.

---------------------------------------------------------------------------------------------------

👨‍💻 Autor

Edu Quispe Rojas
Desarrollador Web
