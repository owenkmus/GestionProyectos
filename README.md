# Project Management SaaS (Black Codex Chris)

Solución SaaS para equipos ágiles que facilita la colaboración y el seguimiento de tareas bajo la metodología Scrum. Tiempo real con WebSockets, tableros Kanban personalizables y seguridad robusta.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-indigo)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🚀 Arquitectura
```text
Browser ←→ Next.js (App Router) ←→ PostgreSQL (Prisma)
     ↕ 
  Socket.io (Real-time sync)
```

## ✨ Funcionalidades
- **Tablero Kanban**: Drag & drop en tiempo real con `@dnd-kit`.
- **Gestión de Sprints**: Planificación y seguimiento con gráficas Burndown.
- **Notificaciones**: Avisos instantáneos y por email al asignar tareas.
- **Equipo**: Gestión de roles (Owner, Scrum Master, Developer, Viewer).
- **Autenticación**: NextAuth v5 con soporte para Credentials y GitHub.

## 🛠️ Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/vuestro-usuario/project-management-saas.git
   cd project-management-saas
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar entorno**:
   Copia el archivo `.env.example` a `.env` y rellena los datos.
   ```bash
   cp .env.example .env
   ```

4. **Base de datos**:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## 📐 Decisiones Técnicas
- **Prisma**: Seleccionado por su type-safety y facilidad para manejar relaciones complejas.
- **Socket.io**: Implementado para asegurar que los cambios en el tablero se reflejen instantáneamente para todos los miembros sin necesidad de refrescar.
- **Zustand**: Gestión de estado ligera y eficiente para el tablero Kanban.
- **Next.js 15**: Uso de las últimas capacidades del App Router para optimizar el rendimiento y SEO.
- Credenciales de prueba:

Email	     Contraseña	Rol
admin@test.com	password123	Admin / Owner
chris@test.com	password123	Scrum Master
dev@test.com	password123	Developer

## 🗺️ Roadmap
- [ ] Integración con GitHub Issues.
- [ ] Exportación de reportes a PDF/Jira.
- [ ] Aplicación móvil nativa (React Native).

## 📄 Licencia
Este proyecto está bajo la licencia MIT.
