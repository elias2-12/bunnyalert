# bunnyalert
alerts for games
# 🐰 BunnyAlert

Una librería de alertas moderna y elegante diseñada especialmente para juegos online como Habbo Hotel, con un estilo retro y funcionalidades específicas para gaming.

## ✨ Características

- 🎮 **Diseñada para gaming**: Alertas específicas para compras, intercambios, moderación, etc.
- 🎨 **Estilo retro**: Inspirada en la estética clásica de juegos online
- 📱 **Responsive**: Se adapta perfectamente a cualquier dispositivo
- 🚀 **Fácil de usar**: API simple e intuitiva
- 🎯 **Cero dependencias**: No requiere jQuery ni otras librerías
- 💾 **Ligera**: Menos de 15KB minificada

## 🔧 Instalación

### Opción 1: CDN (Recomendado)
```html
<!-- Incluir en el <head> de tu página -->
<script src="https://cdn.jsdelivr.net/gh/elias2-12/bunnyalert@main/bunnyalert.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/elias2-12/bunnyalert@main/bunnyalert.min.css">
```

### Opción 2: Descarga directa
1. Descarga `bunnyalert.min.js` y `bunnyalert.min.css`
2. Sube los archivos a tu servidor
3. Incluye en tu HTML:
```html
<script src="ruta/a/bunnyalert.min.js"></script>
<link rel="stylesheet" href="ruta/a/bunnyalert.min.css">
```

## 📖 Uso Básico

### Alerta Simple
```javascript
BunnyAlert.show({
    title: 'Mi Alerta',
    message: 'Este es un mensaje de ejemplo',
    buttons: [
        { text: 'OK', type: 'primary', action: () => console.log('OK presionado') }
    ]
});
```

## 🎮 Alertas Específicas para Gaming

### 🛋️ Compra de Furni
```javascript
BunnyAlert.furniPurchase('Sofá Rojo Clásico', 150, () => {
    // Código cuando el usuario confirma la compra
    console.log('Furni comprado!');
    BunnyToast.success('¡Furni comprado exitosamente!');
});
```

### 🔄 Intercambio entre usuarios
```javascript
BunnyAlert.trade('NombreUsuario', ['Silla Azul', 'Planta Verde'], () => {
    // Código cuando se acepta el intercambio
    console.log('Intercambio aceptado');
    BunnyToast.success('¡Intercambio completado!');
});
```

### ⚠️ Alerta de Moderación
```javascript
BunnyAlert.moderation(
    'Lenguaje inapropiado', 
    '24 horas',
    'https://ejemplo.com/imagen-moderador.png' // Opcional
);
```

### 👥 Notificación de Amigo Conectado
```javascript
BunnyAlert.friendOnline('MiAmigo2024', () => {
    // Código para visitar al amigo
    window.location.href = '/sala-usuario/MiAmigo2024';
    BunnyToast.info('Visitando la sala...');
});
```

### ⭐ Promoción Habbo Club
```javascript
BunnyAlert.habboClub([
    'Furnis exclusivos cada mes',
    'Acceso prioritario a salas',
    'Comandos especiales de baile',
    'Badge exclusivo de HC'
], () => {
    // Código para suscribirse
    console.log('Suscrito al HC');
    BunnyToast.success('¡Bienvenido al Habbo Club!');
}, 'https://ejemplo.com/hc-logo.png'); // Imagen opcional
```

## 🍞 Sistema de Toasts

### Tipos de Toast
```javascript
// Toast de éxito
BunnyToast.success('Operación exitosa');

// Toast de error
BunnyToast.error('Algo salió mal');

// Toast informativo
BunnyToast.info('Nueva información');

// Toast de advertencia
BunnyToast.warning('Cuidado con esto');
```

### Toast personalizado
```javascript
BunnyToast.show({
    message: 'Mensaje personalizado',
    type: 'success', // success, error, info, warning
    duration: 5000,  // Duración en ms (default: 3000)
    icon: '🎉'       // Icono personalizado
});
```

## ⚙️ API Completa

### BunnyAlert.show(options)

#### Opciones disponibles:
```javascript
{
    title: 'Título',              // Título de la alerta
    message: 'Mensaje HTML',      // Contenido (acepta HTML)
    type: 'default',              // default, furni, trade, mod, friend
    buttons: [                    // Array de botones
        {
            text: 'Texto',
            type: 'primary',      // primary, secondary, danger
            action: () => {}      // Función a ejecutar
        }
    ],
    closable: true,               // Si muestra la X para cerrar
    onClose: () => {},            // Función al cerrar
    image: 'url-imagen'           // URL de imagen opcional
}
```

### Tipos de botón:
- `primary` - Verde (acción principal)
- `secondary` - Gris (acción secundaria)  
- `danger` - Rojo (acciones peligrosas)

### Tipos de alerta:
- `default` - Azul estándar
- `furni` - Naranja para furnis
- `trade` - Púrpura para intercambios
- `mod` - Rojo para moderación
- `friend` - Verde para amigos

## 🎨 Personalización

### Colores personalizados
```css
/* Cambiar color principal */
.bunny-alert-custom .bunny-alert-header {
    background: linear-gradient(180deg, #your-color 0%, #your-dark-color 100%);
}

/* Botón personalizado */
.bunny-btn-custom {
    background: #your-color;
    border-color: #your-border-color;
    color: white;
}
```

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+
- ✅ Móviles iOS/Android

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Ejemplos Adicionales

### Alerta con imagen
```javascript
BunnyAlert.show({
    title: 'Nuevo Item',
    message: 'Has recibido un item especial!',
    image: 'https://ejemplo.com/item-especial.png',
    buttons: [
        { text: 'Ver Inventario', type: 'primary', action: () => window.location.href = '/inventario' }
    ]
});
```

### Alerta de confirmación
```javascript
function eliminarFurni(furniId) {
    BunnyAlert.show({
        title: '⚠️ Confirmar eliminación',
        message: '¿Estás seguro de que quieres eliminar este furni? Esta acción no se puede deshacer.',
        buttons: [
            { 
                text: 'Eliminar', 
                type: 'danger', 
                action: () => {
                    // Lógica para eliminar
                    BunnyToast.success('Furni eliminado');
                }
            },
            { text: 'Cancelar', type: 'secondary', action: () => {} }
        ]
    });
}
```

## 📄 Licencia

MIT License - Libre para uso comercial y personal.

## 🐛 Reportar Bugs

Si encuentras algún bug, por favor crea un [issue](https://github.com/elias-2/bunnyalert/issues) en GitHub.

## 📧 Contacto

- GitHub: [@elias-2](https://github.com/tuusuario)
- Email: elias-2@gmail.com

---

⭐ Si te gusta BunnyAlert, no olvides darle una estrella en GitHub!
