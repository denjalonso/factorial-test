### Integración de BBDD por cada BC

Los bounded context no solo son una carpeta, sino que tienen implicaciones que se derivan de la estructura organizacional
, es decir, son equipos de trabajo. Lo que buscamos en esa parte estratégica es evitar fricciones y dependencias y eso 
tiene implicaciones en las infrastructuras. No podemos compartir BBDD entre diferentes equipos si queremos evitar bloqueos.

* Convict

Convict te permite hacer validaciones custom, tales como valídame que la private key de stripe es una string a secas sino 
valídame que es una key real.

* TypeOrmClientFactory 

Cada contexto debería tener su propia conexión a BBDD, por lo que se ha creado un TypeOrmClientFactory que se encargaría
de gestionar todas las conexiones de todos los contextos a cosas de Postgre/Mongo..., por eso está en 'context/shared' 
