- Aquí solo deben haber imports de la capa de dominio. Ley de inversión de dependencias: todas las capas de nuestra
  arquitectura más externas solo deberían dependen de las capas más internas. Imfrastructura -> Aplicación -> Dominio.
  Esta premisa garantiza que si por ejemplo cambiamos algo de infraestructura no afectará a la aplicación y si
  cambiamos algo de la aplicación no afectará al dominio.
- Convención: Nombre casos de uso deben acabar en "Creator/..." de esta forma es muy fácil identificarlos.
- Comparar con Salsa donde los casos de uso acaban en "UseCase/...".

### Utilizando objetos Request y Response para comunicarnos con el App Service (AS)

* Añadimos readonly en el AS par el atributo repository. Presunción de culpabilidad: evitamos la tentación de que el 
repository pueda ser reasignado, hacemos explícito que no pueda ser heredado. Hacemos immutable el atributo repository.

* Qué aporta este dto? Pues con la premisa de que solo va a contener datos va a ser fácilmente serializable.

* Porqué hemos usado parameter object patern. Varios beneficios, le damos mayor semantica a la invocación del método. 
Otro beneficio es que tener unificado en un solo objeto facilita pasar a CQRS o aplicar decorator fácilmente.

* Estos niveles de indiracción son interesantes según qué caso, te puede interesar o no.
