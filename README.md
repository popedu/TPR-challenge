# BIGFOOT 200 CHALLENGE

Una aplicación web moderna para gestionar el reto Bigfoot 200 Challenge, donde los equipos compiten para completar 200 millas durante el evento.

## 🚀 Características

### 📱 **Interfaz Moderna**
- Diseño glassmorphism con efectos visuales modernos
- Animaciones suaves y transiciones elegantes
- Interfaz completamente responsiva
- Soporte para múltiples idiomas (Español, Català, English, Português)

### 👥 **Gestión de Equipos**
- **Nueva pestaña de registro de equipos** con formulario integrado
- Registro de múltiples números de WhatsApp por equipo
- Categorías: 1-5 participantes (Run + Bike / Run)
- Integración con grupo de WhatsApp del challenge
- Validación de datos en tiempo real

### 📊 **Registro de Distancias**
- Formulario simplificado para registrar distancias diarias
- Selector de equipos registrados
- Calendario integrado (4-12 agosto 2025)
- Soporte para kilómetros y millas
- Conversión automática entre unidades

### 📈 **Resultados y Gráficas**
- **Gráficas interactivas por categoría** usando Chart.js
- Visualización del progreso hacia 200 millas objetivo
- Rankings en tiempo real con medallas (🥇🥈🥉)
- Estadísticas generales del challenge
- Barras de progreso por equipo
- Cálculos automáticos en millas (objetivo principal)

### 🌍 **Multilingüe**
- **Español** (predeterminado)
- **Català** 
- **English**
- **Português** (Brasil)
- Cambio de idioma en tiempo real

## 🎯 Objetivo del Challenge

**Completar 200 millas** (321.868 km) durante el evento del 4 al 12 de agosto de 2025.

## 📋 Categorías

1. **1 pax (Run + Bike)** - 1 participante (Carrera + Bicicleta)
2. **2 pax (Run + Bike)** - 2 participantes (Carrera + Bicicleta)
3. **3 pax (Run)** - 3 participantes (Solo Carrera)
4. **4 pax (Run)** - 4 participantes (Solo Carrera)
5. **5 pax (Run)** - 5 participantes (Solo Carrera)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Tailwind CSS
- **JavaScript ES6+** - Funcionalidad interactiva
- **Chart.js** - Gráficas dinámicas
- **LocalStorage** - Persistencia de datos
- **Glassmorphism** - Efectos visuales modernos

## 📱 Funcionalidades Principales

### 1. **Registro de Equipos**
- Formulario integrado en nueva pestaña
- Múltiples números de WhatsApp
- Integración automática con grupo oficial
- Validación de datos obligatorios

### 2. **Registro de Distancias**
- Selector de equipos registrados
- Calendario con rango de fechas válidas
- Soporte para km/millas con conversión
- Validación de datos en tiempo real

### 3. **Visualización de Resultados**
- **Gráficas por categoría** con Chart.js
- Rankings en tiempo real
- Progreso hacia 200 millas objetivo
- Estadísticas generales del challenge
- Medallas para los 3 primeros de cada categoría

### 4. **Sistema Multilingüe**
- 4 idiomas soportados
- Cambio instantáneo de idioma
- Traducciones completas de la interfaz

## 🎨 Diseño

### Efectos Visuales
- **Glassmorphism** - Efectos de cristal esmerilado
- **Gradientes modernos** - Colores vibrantes
- **Animaciones suaves** - Transiciones elegantes
- **Responsive design** - Adaptable a todos los dispositivos

### Paleta de Colores
- **Primario**: Azul-púrpura (#667eea → #764ba2)
- **Secundario**: Rosa-rojo (#f093fb → #f5576c)
- **Éxito**: Azul-cian (#4facfe → #00f2fe)
- **Advertencia**: Rosa-amarillo (#fa709a → #fee140)

## 📊 Gráficas y Estadísticas

### Gráficas por Categoría
- **Gráficas de barras** interactivas
- **Colores diferenciados** por posición (Oro, Plata, Bronce)
- **Datos en millas** (objetivo principal)
- **Actualización en tiempo real**

### Estadísticas Generales
- Total de equipos registrados
- Distancia total en km y millas
- Número total de registros
- Progreso general del challenge

## 🔧 Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd bigfoot-challenge
   ```

2. **Abrir en navegador**
   ```bash
   # Simplemente abre index.html en tu navegador
   # O usa un servidor local:
   python -m http.server 8000
   # Luego visita http://localhost:8000
   ```

3. **Usar la aplicación**
   - Selecciona idioma en el header
   - Registra equipos en la primera pestaña
   - Registra distancias en la segunda pestaña
   - Visualiza resultados en la tercera pestaña

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (< 768px)

## 🔄 Persistencia de Datos

- **LocalStorage** para equipos y distancias
- **Datos de ejemplo** incluidos para demostración
- **Sin dependencias externas** de base de datos

## 🎯 Próximas Mejoras

- [ ] Exportación de datos a CSV/PDF
- [ ] Notificaciones push
- [ ] Integración con APIs de fitness
- [ ] Modo offline
- [ ] Más idiomas
- [ ] Temas personalizables

## 📞 Soporte

Para soporte técnico o preguntas sobre el challenge, contacta a través del grupo oficial de WhatsApp del Bigfoot 200 Challenge.

## 🚀 Cómo publicar la web para acceso móvil

### Opción 1: GitHub Pages (Recomendado)

1. **Crear repositorio en GitHub:**
   ```bash
   # Subir todos los archivos a GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/bigfoot-challenge.git
   git push -u origin main
   ```

2. **Activar GitHub Pages:**
   - Ve a Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
   - Save

3. **Tu web estará disponible en:**
   `https://TU_USUARIO.github.io/bigfoot-challenge`

### Opción 2: Netlify (Alternativa)

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. Tu web estará disponible en: `https://random-name.netlify.app`

### Opción 3: Vercel (Alternativa)

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Deploy automático

## 📱 Acceso desde móvil

Una vez publicada, podrás acceder desde cualquier dispositivo usando la URL:
- `https://TU_USUARIO.github.io/bigfoot-challenge`

## 🔧 Gestión de Administrador

### Ver datos actuales:
1. Abre la web
2. Presiona F12 (herramientas de desarrollador)
3. Application → Local Storage → http://localhost:8000
4. Ver claves: `bigfoot_teams` y `bigfoot_distances`

### Eliminar equipo:
1. Copia el contenido de `bigfoot_teams`
2. Pégalo en un editor JSON online
3. Elimina el equipo deseado
4. Copia el JSON modificado
5. Pégalo de vuelta en localStorage
6. Recarga la página

### Resetear todos los datos:
```javascript
// En la consola del navegador (F12)
localStorage.removeItem('bigfoot_teams');
localStorage.removeItem('bigfoot_distances');
location.reload();
```

## 🛠️ Desarrollo local

```bash
# Instalar servidor local
python -m http.server 8000

# Acceder desde navegador
http://localhost:8000
```

## 📊 Funcionalidades

- ✅ Registro de equipos
- ✅ Registro de distancias diarias
- ✅ Visualización de resultados por categoría
- ✅ Historial de equipos
- ✅ Traducción multiidioma (CA, ES, EN, PT)
- ✅ Diseño responsive
- ✅ Gráficos de progreso

## 🎯 Próximas mejoras

- [ ] Panel de administración con contraseña
- [ ] Exportar datos a Excel/CSV
- [ ] Notificaciones push
- [ ] Integración con WhatsApp API

---

**¡Únete al reto y compite por completar las 200 millas!** 🏃‍♂️🚴‍♀️ 