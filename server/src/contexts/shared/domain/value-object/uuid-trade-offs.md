### UUIds as identifiers

- Queremos permitir/validar que los clientes envíen Uuids.

- Porqué está en shared/domain, porque este tipo lo vamos a interpretar como algo que es una carencia del lenguaje de 
programación, es decir no es un tipo particular del dominio. No va a tener lógica particular de ningún contexto/modulo.
- Porqué no delegar en que la BBDD genere los ids. Tenemos cierta ventaja tener los UUIDs como parte del dominio. Otro 
beneficio de que los clientes nos pasen los ids como UUIDS es que estamos facilitando la DX, el cliente no tendrá que 
manejar el hecho de que el id no será nullable. Un usuario no puede existir sin ID porque es una restricción de integridad
y por convención el identificador será un UUID.

- En cuanto a la implementación de la clase UUID:

- Pasamos al constructor el valor de UUID porque la forma en la que queremos almacenar el dato dentro del Value Object 
queremos que sean datos primitivos para facilitar la posible integración con otra librería. Por este motivo necesitamos 
validar que el valor es un UUID válido. 

- Para esto hemos utilizado Clásulas Guard, haciendo un early return, es decir usando 
un void return, esto quiere decir que está produciendo un efecto colateral, en este caso lanzando una excepción.

- Una vez validado lo siguiente es guardarlo. Al ser readonly por defecto es público desde fuera.
