# Widget Reloj

Widget de reloj con temporizadores duales para presentaciones.
![Chess Clock Widget](https://i.ibb.co/S4pb8hfY/image.png)

## Características

### Reloj principal
- Muestra la hora actual en formato digital (HH:MM)
- Display de 7 segmentos dividido en 4 bloques
- Visualización clara y de fácil lectura

### Temporizadores
1. Temporizador azul (cuenta regresiva)
2. Temporizador rojo (cuenta progresiva)

### Panel de control
- 6 botones divididos en dos grupos (rojo y azul)
- Controles intuitivos para cada temporizador

## Instalación

1. Clona este repositorio
2. Abre index.html en tu navegador

## Uso

- El widget es completamente movible
- Hover sobre el widget muestra el marco
- Usa los botones correspondientes para controlar cada temporizador 

## Inicialización del Proyecto
1. Asegúrate de tener Node.js instalado
   - Puedes descargarlo desde: https://nodejs.org/
   - Verifica la instalación con: `node --version`

2. Abre cmd.exe (Command Prompt) en la carpeta del proyecto

3. Ejecuta los siguientes comandos en orden:
``` bash
npm init -y
npm install electron --save-dev
npm install electron-builder --save-dev
```
4. Para iniciar la aplicación:
``` bash
npm start
```

Nota: Es importante usar cmd.exe en lugar de PowerShell para evitar problemas con los permisos de ejecución de scripts.

## Construir Ejecutable Portable

1. Asegúrate de tener todas las dependencias instaladas:

``` bash
npm install
```

2. Construir el ejecutable:

``` bash
npm run build
```

3. El ejecutable portable se creará en:
   - `dist/ChessClockWidget.exe`

### Notas para usuarios
- No requiere instalación
- Ejecutar haciendo doble clic en `ChessClockWidget.exe`
- El widget se puede mover arrastrando desde cualquier parte
- Click derecho para acceder al menú de opciones

## Descargar versión construida

Puedes descargar la versión ya construida del proyecto desde el siguiente enlace de Mega:

[Descargar desde Mega](https://mega.nz/file/xt5nnLxK#0mh4dXbxMAkoRloIN3-8y-wzvE8ihMc6wkfUlwYLcK0)

Para descargar:
1. Haz clic en el enlace anterior
2. Presiona el botón "Descargar" en Mega
3. Espera a que se complete la descarga
4. Descomprime el archivo descargado para acceder al contenido