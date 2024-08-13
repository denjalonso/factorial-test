- El controller tiene que llamar al caso de uso UserCreator, es decir, colaboración usando inyecccion de dependencias.
  En este caso es el constructor el que recibe el caso de uso y aquí si que nos estamos acoplando a ese caso de uso en
  particular. Podría parecer que se rompe el patrón de ports and adapters, no así como el caso del repository, donde
  el port es la interface y el adapter es la adaptación de esa interfaz de dominio a una implementación concreta, en
  este caso no aplicamos ese patrón, en este caso en la línea 6, userCreator es la implementación concreta. El porqué
  de esto es porque hasta aquí no nos ha surgido la necesidad, ni para tener unos test más sencillos de implementar tal
  y como vimos en user repositorym ni por tolerancia al cambio, si cambia la lógica de ese user creator, es porque
  cambia el caso de uso y nos interesa que cambie ahí. Se pone de relieve que el desacoplamiento no es un fin en sí
  mismo.

### Type safe request validations

Aspiramos a una solución type safe. No se están validando los tipos de los datos que llegan en la request. 
Para el caso de uso son strings. Eso puede provocar errores en tiempo de ejecución (500).

* Definición: Puertos primarios y secundarios. Los primarios son los que estamos exponiendo hacia fuera, hacia nuestro 
cliente y los secundarios son los que estamos consumiendo de otros servicios o una conexión a la BBDD. 

La validación de tipos debe hacerse tanto en uno como en otro. 

