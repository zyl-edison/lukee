# LUKEE
LUKEE is a powerful ES6 based web api framework built on top of nodejs and express. It is well organized and gives developers a clear picture of its structure. It includes both unit test with coverage report and web api test so that it helps you to build a robustly stable system.

## Structure
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
 
### Add middlewares
```js
// application/server/api.js
let middlewares = [];
middlewares.push(bodyParser.urlencoded({ extended: false }));
middlewares.push(bodyParser.json({
  type: 'application/json'
}));

if (appConfig.environment === 'development') {
  middlewares.push(morgan(appConfig.requestLogLevel));
} else {
  middlewares.push(morgan(
    appConfig.requestLogLevel,
    { stream: accessLogStream }
  ));
}
// YOU CAN PUSH YOUR OWN MIDDLEWARES HERE
```
### Register a component
```js
module.exports = new LUKEE.Register('<component name>', <component>);
```

### Configuration
```js
const config = new LUKEE.Configuration({
  foo: 'foo'
});

config.foo // 'foo'
```

### Helper
```js
const aHelper = new LUKEE.Helper({
  fn1: () => 'fn1',
  fn2: () => 'fn2'
});

aHelper.fn1() // 'fn1'
```

### Controller
```js
// Controller (create, acquire, acquireOne, update, updateOne, delete, deleteOne)
class AnotherController extends LUKEE.Controller {
  construcotr(props) {
    super(<model>, <logger>);
    this.a = props.a;
    this.b = props.b;
  }
   
  // overwrite existing function
  create () { ... }
   
  // create a new function
  someFunc() { ... }
}
 
const anotherCtrl = new AnotherController(...);
anotherCtrl.create()
anotherCtrl.acquire()
anotherCtrl.acquireOne()
anotherCtrl.update()
...
anotherCtrl.someFunc()
```

### A custom controller map a router
```js
class CustomController extends LUKEE.Controller {
  customFunction() {}
}

const mapper = LUKEE.helper.get('mapper');
const router = express.Router();

mapper.map({
  router: router,
  controller: new CustomController(...),
  customMapper: [{
    name: 'customFunction',
    method: 'POST/GET/PUT/DELETE',
    URL: '/'
  }],
  customOnly: false
});
```

## Unit/Web api Test Commandline
![Test Commandline](https://cldup.com/4ykYd5Hesl.png)

## Coverage report
![Coverage report](https://cldup.com/U7gfV2AliQ.png)

## License

  [MIT](LICENSE)
