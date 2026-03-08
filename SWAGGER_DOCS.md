# Documentación API - Swagger/OpenAPI

## Acceso a la documentación

La documentación interactiva de la API está disponible en:

```
http://localhost:3000/api/docs
```

## Características

- **Interfaz interactiva**: Prueba los endpoints directamente desde el navegador
- **Especificación OpenAPI 3.0**: Documentación completa de todos los endpoints
- **Autenticación**: Integración con Bearer Token para pruebas autenticadas
- **Ejemplos**: Ejemplos de request/response para cada endpoint

## Endpoints documentados

### Usuario (`/api/user`)
- **GET** - Obtener listado de usuarios (paginado)
  - Parámetros: `page`, `perPage`, `name`, `roleId`, `userId`
  - Requiere autenticación (Usuario o Administrador)

### Rol (`/api/role`)
- **GET** - Obtener todos los roles
  - Solo administradores

### Movimiento (`/api/movement`)
- **GET** - Obtener listado de movimientos (paginado)
  - Parámetros: `userId` (requerido), `typeMovement`, `page`, `perPage`
  - Requiere autenticación (Usuario o Administrador)
  
- **POST** - Crear nuevo movimiento
  - Parámetros requeridos: `userId`, `typeMovement`, `amount`, `fecha`
  - Solo administradores

### Tipo de Movimiento (`/api/type-movement`)
- **GET** - Obtener tipos de movimiento disponibles
  - Solo administradores

## Autenticación

Todos los endpoints requieren autenticación vía Bearer Token (Bearer Auth).

Para usar un token en Swagger UI:
1. Obtén un token válido del sistema de autenticación
2. Haz clic en el botón "Authorize" en la parte superior
3. Introduce el token en formato: `Bearer <tu_token_aqui>`

## Convenciones

- **Status 200**: Operación exitosa
- **Status 201**: Recurso creado exitosamente
- **Status 400**: Parámetros inválidos o faltantes
- **Status 401**: No autenticado
- **Status 403**: Acceso denegado (permisos insuficientes)
- **Status 500**: Error del servidor

## Roles y Permisos

- **Administrador (ID: 1)**: Acceso completo a todos los endpoints
- **Usuario (ID: 2)**: Acceso limitado según las restricciones definidas

## Formato de respuestas

Las respuestas paginated incluyen metadatos:
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 10,
    "totalPages": 10
  }
}
```

## Notas

- Todos los timestamps usan formato ISO 8601
- Los números se envían como strings en algunos casos (ej: `typeMovement`, `roleId` en requests)
- El filtro de usuarios normales está implementado según el rol del usuario autenticado
