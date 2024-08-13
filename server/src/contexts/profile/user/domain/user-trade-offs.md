### Constructor de agregados con Parameter Object+Destructuring

- Se ha demostrado que user tipos typescript y los exportamos causan problemas de rendimiento en la compilación porque se 
generan muchos tipos, es decir, typescript no reutiliza el mismo tipo, sino que en cada lugar que lo usamos genera uno
nuevo. Por este motivo hemos decidido utilizar un Parameter Object para el constructor de los agregados.

