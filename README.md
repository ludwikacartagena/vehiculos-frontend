# 🚗 Sistema de Gestión de Vehículos - Frontend

Aplicación web desarrollada con React.js para la gestión de vehículos y sus registros de entradas/salidas. Interfaz moderna y responsiva construida con PrimeReact.

## 🌐 Deploy

**URL de producción:** https://tu-app.vercel.app *(actualiza con tu URL real)*

## 🛠️ Tecnologías Utilizadas

- **React.js** v18+ - Biblioteca de JavaScript para interfaces
- **React Router DOM** - Navegación entre páginas
- **PrimeReact** - Librería de componentes UI
- **PrimeIcons** - Iconos
- **Axios** - Cliente HTTP para consumir la API
- **Vite** - Build tool y dev server

## 📁 Estructura del Proyecto
```
vehiculos-frontend/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # Páginas de la aplicación
│   ├── services/       # Servicios para API
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Punto de entrada
├── public/             # Archivos estáticos
├── package.json        # Dependencias
└── .env                # Variables de entorno
```

## ✨ Funcionalidades

### 🚙 Gestión de Vehículos
- Listado de todos los vehículos registrados
- Registro de nuevos vehículos (marca, modelo, placa)
- Edición de vehículos existentes
- Eliminación de vehículos
- Validación de campos obligatorios

### 📝 Registro de Entradas/Salidas
- Registro de entradas y salidas de vehículos
- Selección de vehículo desde dropdown
- Captura de: motorista, fecha, hora, kilometraje
- Indicación de tipo (entrada/salida)

### 🔍 Historial y Filtros
- Visualización de todos los registros
- Filtros por:
  - Fecha
  - Vehículo
  - Motorista
- Tabla con información detallada

### 📱 Diseño Responsivo
- Interfaz adaptable a móviles, tablets y desktop
- Componentes PrimeReact optimizados
- Navegación intuitiva

## 🚀 Instalación Local

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn
- Git
- Backend API corriendo (ver repositorio backend)

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/ludwikacartagena/vehiculos-frontend.git
cd vehiculos-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:5000/api
```

Para producción:
```env
VITE_API_URL=https://vehiculos-backend-production.up.railway.app/api
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

5. **Build para producción**
```bash
npm run build
```

## 🎨 Páginas de la Aplicación

### 🏠 Home
Página de inicio con bienvenida y navegación rápida

### 🚗 Vehículos
- Ruta: `/vehiculos`
- Listado completo de vehículos
- Botones de acción: Editar, Eliminar
- Botón para agregar nuevo vehículo

### ➕ Nuevo Vehículo
- Ruta: `/vehiculos/nuevo`
- Formulario de registro
- Validaciones en tiempo real

### ✏️ Editar Vehículo
- Ruta: `/vehiculos/editar/:id`
- Formulario prellenado con datos actuales
- Actualización en tiempo real

### 📥 Registrar Entrada/Salida
- Ruta: `/registros/nuevo`
- Selección de vehículo
- Campos: motorista, fecha, hora, kilometraje, tipo
- Validaciones completas

### 📊 Historial de Registros
- Ruta: `/registros`
- Tabla con todos los registros
- Filtros múltiples
- Información detallada de cada registro

## 🔌 Integración con API

El frontend consume los siguientes endpoints del backend:
```javascript
// Vehículos
GET    /api/vehiculos          // Obtener todos
POST   /api/vehiculos          // Crear nuevo
PUT    /api/vehiculos/:id      // Actualizar
DELETE /api/vehiculos/:id      // Eliminar

// Registros
GET    /api/registros          // Obtener todos (con filtros)
POST   /api/registros          // Crear nuevo
PUT    /api/registros/:id      // Actualizar
DELETE /api/registros/:id      // Eliminar
```

## 🎨 Componentes PrimeReact Utilizados

- **DataTable** - Tablas de datos
- **Button** - Botones de acción
- **InputText** - Campos de texto
- **Dropdown** - Selectores
- **Calendar** - Selector de fechas
- **Dialog** - Modales
- **Toast** - Notificaciones
- **Card** - Tarjetas informativas

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px - 767px)
- 📱 Tablets (768px - 1023px)
- 💻 Desktop (1024px+)

## 🚀 Deploy en Vercel

### Pasos para deploy

1. **Instalar Vercel CLI**
```bash
npm i -g vercel
```

2. **Login en Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

### Variables de entorno en Vercel

En el dashboard de Vercel, agrega:
```
VITE_API_URL = https://vehiculos-backend-production.up.railway.app/api
```

## 🐛 Solución de Problemas

### Error de CORS
Asegúrate de que el backend tenga configurado CORS para permitir peticiones desde tu dominio de Vercel.

### Variables de entorno no funcionan
- Verifica que las variables empiecen con `VITE_`
- Reinicia el servidor de desarrollo después de cambiar `.env`
- En Vercel, redeploya después de agregar variables

### API no responde
- Verifica que el backend esté corriendo
- Comprueba la URL en `VITE_API_URL`
- Revisa la consola del navegador para errores

## 📦 Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Ejecutar linter
```

## 🔐 Validaciones Implementadas

- ✅ Campos obligatorios en formularios
- ✅ Formato de placa vehicular
- ✅ Validación de kilometraje (números positivos)
- ✅ Formato de fecha y hora
- ✅ Prevención de duplicados de placas

## 👤 Autor

**Ludwika Cartagena**
- GitHub: [@ludwikacartagena](https://github.com/ludwikacartagena)
- Backend: [vehiculos-backend](https://github.com/ludwikacartagena/vehiculos-backend)

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica para Desarrollador Web.

---

## 🔗 Enlaces Relacionados

- [Backend Repository](https://github.com/ludwikacartagena/vehiculos-backend)
- [Backend API - Railway](https://vehiculos-backend-production.up.railway.app)
- [Documentación PrimeReact](https://primereact.org/)
