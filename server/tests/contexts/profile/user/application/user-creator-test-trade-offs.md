### More semantic and maintainable tests 
* El mock del repository no es muy mantenible. Si cambia la interfaz, también hay que cambiarla en el mock, esto en cada 
uno de los test donde lo hayamos mockeado manualmente, porque si no, no compila. Parece que tendría todo el sentido
sacar esto a un lugar comun. Como estamos en TS podemos sacar esto a una clase que implemente esa interfaz y reutilizar
esa instancia mockeada en todos los test que la necesitemos. Pasamos de declarar el mock de forma implicita a hacerlo
explicita.
* Instaciamos el mock en el constructor de la clase Mock para que si se instacian varios mock las instancias sean sean 
independientes y evitar falsos positivos en los test, por lo que si quisieramos hacer explícito el setup de los tests
y meter la instaciación del mock en el beforeEach, tendríamos que que limpiar el mock en el afterEach. Up to you hacer 
esto explícito o dejarlo de forma implícita y usar una instancia del mock por cada test.
* Testeamos la lógica de nuestros value objects, en este caso que la longitud del nombre sea inferior a 30 caracteres como
algo colateral al hecho de testear nuestro casos de uso. No tiene sentido crear un test propio para el value object, sino lo que 
queremos es testear esto como consecuencia de llamar al caso de uso. Esto nos va a permitir que nuestros tests sean menos
fragiles y si cambiamos como se modela ese userName no haya que cambiar la equivalencia de ese test sino que siempre nos 
regimos por esos casos de uso como ciudadanos de primer nivel.

### Object mother for tests

[//]: # (TODO: https://github.com/CodelyTV/typescript-ddd-course/tree/main/6-course-aggregate-value-objects-tests/2-object-mother-pattern)

[//]: # (https://pro.codely.com/library/ddd-en-typescript-modelado-y-arquitectura-172533/375662/path/step/149490427/discussion/2398405/)


