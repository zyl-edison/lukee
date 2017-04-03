# LUKEE
LUKEE is a powerful ES6 based web api framework built on top of nodejs and express. It is well organized and gives developers a clear picture of its structure.

### Structure
```
LUKEE (Root)
 | -------------------- Classes --------------------
 |_ APIServer ( Class )
 |_ Configuration ( Class )
 |_ Container ( Class )
 |_ Controller ( Class )
 |_ DatabaseServer ( Class )
 |_ Helper ( Class )
 |_ HttpResponseError ( Class )
 |_ Logger ( Class )
 |_ Register ( Class )
 |_ Server ( Class )
 | -------------------- Containers --------------------
 |_ config ( Container )
     |_ appConfig ( Configuration )
     |_ databaseConfig ( Configuration )
 |_ helper ( Container )
 |_ library ( Container )
 |_ schema ( Container )
 |_ model ( Container )
 |_ controller ( Container )
 |_ router ( Container )
 |_ server ( Container )
     |_ apiServer (APIServer)
     |_ databaseServer (DatabaseServer)
 ```
