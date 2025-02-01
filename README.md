Este proyecto consiste en el desarrollo de un e-commerce para una empresa dedicada a la venta de productos tecnológicos. Durante su implementación, además de las tecnologías vistas en clase, utilicé SweetAlert2 para las alertas de finalización de compra y algunas validaciones , Bootstrap como librería de estilos CSS y AOS para las animaciones en la página de inicio.

La estructura del proyecto se organiza dentro de una carpeta principal que contiene src, donde se encuentran los archivos principales: App.js, que define las rutas de la aplicación, e Index.js, encargado de renderizar el componente principal.

Dentro de src, hay varias carpetas organizadas según su función. En la carpeta Config, se encuentra Firebase.js, responsable de instanciar la base de datos en Firebase y exportarla para ser utilizada en los demás componentes. 

Por otro lado, la carpeta Assets almacena las imágenes utilizadas en el componente Home.jsx.

En la caperta Context, se encuentra CartContext.jsx, que proporciona un CartProvider para gestionar el estado global del carrito de compras y compartirlo con los componentes hijos. 

Dentro de la carpeta Pages se encuentran los componentes tipo pagina y  hay dos componentes: Home.jsx, que muestra información general de la empresa, y Checkout.jsx, que renderiza el componente Brief.jsx, donde se muestra el resumen de la compra.

La carpeta Styles contiene los archivos de estilos utilizados en los componentes ItemDetail.jsx, ItemsCategory.jsx, ItemDetailContainer.jsx y Home.jsx. 

Mientras que en Components, se agrupan los elementos reutilizables más importantes del proyecto los cuales son los siguientes:

Brief.jsx, encargado de leer la orden de compra almacenada en la base de datos de firebase mas espcificamente en la coleccion de ordenes y mostrarla en una tabla, además de gestionar el proceso de finalización de la compra.

CartWidget.jsx, un ícono que se renderiza dentro de Navbar.jsx, permitiendo redirigir al usuario a la página del carrito y mostrar la cantidad total de productos añadidos.

El Footer.jsx es un componente renderizado dentro de Layout.jsx, mostrando enlaces a las secciones accesibles de la página. 

ItemDetailContainer.jsx maneja la lógica para obtener y mostrar todos los productos almacenados en Firebase en la coleccion de productos  y redirigir al componente ItemDetail.jsx, el cual, a su vez, muestra la información detallada de un producto y permite añadirlo o eliminarlo del carrito.

Otro componente clave es ItemsCategory.jsx, encargado de leer y mostrar productos filtrados por categoría desde la base de datos de Firebase, además de permitir redirigir al usuario al componente ItemDetail.jsx al hacer clic en "Ver más información".

Navbar.jsx representa la barra de navegación que permite al usuario moverse entre las distintas secciones de la página. 

Finalmente, Layout.jsx define una estructura común que heredan todos los componentes visibles en la aplicación.

Durante el desarrollo del proyecto, identifiqué un error importante: la repetición de código en varias partes, especialmente en las llamadas a la colección de la base de datos. Este problema me permitió darme cuenta de la importancia de optimizar el código y mejorar la reutilización de funciones para futuras implementaciones.
