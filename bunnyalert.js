  class BunnyAlert {
            static show(options = {}) {
                const defaults = {
                    title: 'BunnyAlert',
                    message: '',
                    type: 'default',
                    buttons: [{ text: 'OK', type: 'primary', action: () => {} }],
                    closable: true,
                    onClose: () => {},
                    image: null
                };
                
                const config = { ...defaults, ...options };
                
                // Crear overlay
                const overlay = document.createElement('div');
                overlay.className = 'bunny-overlay';
                
                // Crear alerta
                const alert = document.createElement('div');
                alert.className = `bunny-alert bunny-alert-${config.type}`;
                
                // Header
                const header = document.createElement('div');
                header.className = 'bunny-alert-header';
                header.innerHTML = `
                    <span>${config.title}</span>
                    ${config.closable ? '<div class="bunny-alert-close" onclick="BunnyAlert.close(this)">×</div>' : ''}
                `;
                
                // Content
                const content = document.createElement('div');
                content.className = 'bunny-alert-content';
                
                // Contenido con o sin imagen
                let contentHTML = '';
                if (config.image) {
                    contentHTML = `
                        <div class="bunny-alert-with-image">
                            <div class="bunny-alert-image">
                                ${config.image ? `<img src="${config.image}" alt="Alert image">` : '<div class="bunny-alert-image-placeholder">Imagen<br>80x80</div>'}
                            </div>
                            <div class="bunny-alert-text-content">
                                <div class="bunny-alert-message">${config.message}</div>
                            </div>
                        </div>
                        <div class="bunny-alert-buttons">
                            ${config.buttons.map(btn => 
                                `<button class="bunny-btn bunny-btn-${btn.type}" onclick="BunnyAlert.handleButton(this, '${btn.action.name}')">${btn.text}</button>`
                            ).join('')}
                        </div>
                    `;
                } else {
                    contentHTML = `
                        <div class="bunny-alert-message">${config.message}</div>
                        <div class="bunny-alert-buttons">
                            ${config.buttons.map(btn => 
                                `<button class="bunny-btn bunny-btn-${btn.type}" onclick="BunnyAlert.handleButton(this, '${btn.action.name}')">${btn.text}</button>`
                            ).join('')}
                        </div>
                    `;
                }
                
                content.innerHTML = contentHTML;
                
                alert.appendChild(header);
                alert.appendChild(content);
                overlay.appendChild(alert);
                document.body.appendChild(overlay);
                
                // Guardar callbacks
                overlay._callbacks = {
                    onClose: config.onClose,
                    buttons: config.buttons
                };
                
                return overlay;
            }
            
            static close(element) {
                const overlay = element.closest('.bunny-overlay');
                if (overlay._callbacks?.onClose) {
                    overlay._callbacks.onClose();
                }
                overlay.remove();
            }
            
            static handleButton(element, actionName) {
                const overlay = element.closest('.bunny-overlay');
                const button = overlay._callbacks?.buttons.find(btn => btn.action.name === actionName);
                if (button?.action) {
                    button.action();
                }
                overlay.remove();
            }
            
            // Métodos específicos
            static furniPurchase(furniName, price, onConfirm = () => {}) {
                return this.show({
                    title: '🛋️ Tienda de Furnis',
                    message: `
                        <div>¿Quieres comprar este furni?</div>
                        <div class="furni-item">${furniName}</div>
                        <div style="margin-top: 12px;">
                            Precio: <span class="credits-amount">${price} créditos</span>
                        </div>
                    `,
                    type: 'furni',
                    buttons: [
                        { text: 'Comprar', type: 'primary', action: onConfirm },
                        { text: 'Cancelar', type: 'secondary', action: () => {} }
                    ]
                });
            }
            
            static trade(username, items = [], onAccept = () => {}) {
                return this.show({
                    title: '🔄 Intercambio',
                    message: `
                        <div><strong>${username}</strong> quiere intercambiar:</div>
                        <div style="margin: 12px 0;">
                            ${items.map(item => `<div class="furni-item">${item}</div>`).join('')}
                        </div>
                        <div>¿Aceptas el intercambio?</div>
                    `,
                    type: 'trade',
                    buttons: [
                        { text: 'Aceptar', type: 'primary', action: onAccept },
                        { text: 'Rechazar', type: 'danger', action: () => {} }
                    ]
                });
            }
            
            static moderation(reason, duration, moderatorImage = null) {
                return this.show({
                    title: '⚠️ Equipo de Moderación',
                    message: `
                        <div><strong>Has sido sancionado</strong></div>
                        <div style="margin: 12px 0;">Motivo: ${reason}</div>
                        <div style="margin-bottom: 12px;">Duración: ${duration}</div>
                        <div style="font-size: 12px; color: #666; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                            Si crees que esto es un error, contacta al equipo de soporte.
                        </div>
                    `,
                    type: 'mod',
                    image: moderatorImage,
                    closable: false,
                    buttons: [
                        { text: 'Entendido', type: 'primary', action: () => {} }
                    ]
                });
            }
            
            static friendOnline(username, onVisit = () => {}) {
                return this.show({
                    title: '👥 Amigos',
                    message: `
                        <div><strong>${username}</strong> se ha conectado!</div>
                        <div style="margin-top: 12px;">¿Quieres visitarlo?</div>
                    `,
                    type: 'friend',
                    buttons: [
                        { text: 'Visitar', type: 'primary', action: onVisit },
                        { text: 'Más tarde', type: 'secondary', action: () => {} }
                    ]
                });
            }
            
            static habboClub(benefits = [], onSubscribe = () => {}, clubImage = null) {
                return this.show({
                    title: '⭐ Habbo Club',
                    message: `
                        <div><span class="hc-badge">Habbo Club</span></div>
                        <div style="margin: 12px 0; font-weight: 500;">¡Únete al Habbo Club y disfruta de:</div>
                        <div style="font-size: 13px; margin: 12px 0; line-height: 1.4;">
                            ${benefits.map(benefit => `• ${benefit}<br>`).join('')}
                        </div>
                        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                            <span class="credits-amount">Solo 25 créditos/mes</span>
                        </div>
                    `,
                    type: 'default',
                    image: clubImage,
                    buttons: [
                        { text: 'Suscribirse', type: 'primary', action: onSubscribe },
                        { text: 'No gracias', type: 'secondary', action: () => {} }
                    ]
                });
            }
        }

        class BunnyToast {
            static container = null;
            
            static init() {
                if (!this.container) {
                    this.container = document.createElement('div');
                    this.container.className = 'bunny-toast-container';
                    document.body.appendChild(this.container);
                }
            }
            
            static show(options = {}) {
                this.init();
                
                const defaults = {
                    message: '',
                    type: 'info',
                    duration: 3000,
                    icon: '●'
                };
                
                const config = { ...defaults, ...options };
                
                // Crear toast cuadrito
                const toast = document.createElement('div');
                toast.className = `bunny-toast bunny-toast-${config.type}`;
                
                toast.innerHTML = `
                    <div class="bunny-toast-icon">${config.icon}</div>
                    <div class="bunny-toast-text">${config.message}</div>
                `;
                
                // Agregar al container
                this.container.appendChild(toast);
                
                // Mostrar con fundido
                setTimeout(() => {
                    toast.classList.add('show');
                }, 10);
                
                // Ocultar con fundido y remover
                setTimeout(() => {
                    toast.classList.add('hide');
                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.remove();
                        }
                    }, 300);
                }, config.duration);
                
                return toast;
            }
            
            static success(message) {
                return this.show({
                    message,
                    type: 'success',
                    icon: '✓'
                });
            }
            
            static error(message) {
                return this.show({
                    message,
                    type: 'error',
                    icon: '✕'
                });
            }
            
            static info(message) {
                return this.show({
                    message,
                    type: 'info',
                    icon: 'i'
                });
            }
            
            static warning(message) {
                return this.show({
                    message,
                    type: 'warning',
                    icon: '!'
                });
            }
        }
        
        // Funciones de demo
        function showFurniAlert() {
            BunnyAlert.furniPurchase('Sofá Rojo Clásico', 150, () => {
                BunnyToast.success('¡Furni comprado exitosamente!');
            });
        }
        
        function showTradeAlert() {
            BunnyAlert.trade('HabboUser123', ['Silla Azul', 'Planta Verde', 'Lámpara Moderna'], () => {
                BunnyToast.success('¡Intercambio aceptado!');
            });
        }
        
        function showModAlert() {
            BunnyAlert.moderation('Lenguaje inapropiado', '24 horas', 'https://via.placeholder.com/80x80/ef4444/ffffff?text=MOD');
        }
        
        function showFriendAlert() {
            BunnyAlert.friendOnline('MiAmigo2024', () => {
                BunnyToast.info('Visitando la sala de tu amigo...');
            });
        }
        
        function showHCAlert() {
            BunnyAlert.habboClub([
                'Furnis exclusivos cada mes',
                'Acceso prioritario a las salas',
                'Comandos especiales de baile',
                'Badge exclusivo de HC'
            ], () => {
                BunnyToast.success('¡Bienvenido al Habbo Club!');
            }, 'https://via.placeholder.com/80x80/ffd700/92400e?text=HC');
        }
        
        function showCustomAlert() {
            BunnyAlert.show({
                title: '💬 Mensaje Personalizado',
                message: 'Esta es una alerta completamente personalizable con BunnyAlert.',
                type: 'default',
                buttons: [
                    { text: '¡Genial!', type: 'primary', action: () => BunnyToast.success('¡Botón presionado!') },
                    { text: 'Info', type: 'secondary', action: () => BunnyToast.info('Más información...') }
                ]
            });
        }

        // Funciones para los botones de toast
        function showSuccessToast() {
            BunnyToast.success('Furni comprado');
        }

        function showErrorToast() {
            BunnyToast.error('Sin créditos');
        }

        function showInfoToast() {
            BunnyToast.info('Nuevo evento');
        }

        function showWarningToast() {
            BunnyToast.warning('HC expira pronto');
        }
