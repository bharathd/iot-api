# node-project-api

## Project Description & Local Setup Information

This project serves the API backend for the ui project. ~~It has a backend SQL connection to MSSQL database with TYPEORM. ~~
The project also uses "typedi" for dependency injection framework and injects the singletons as needed.
For Example: A Controller injects a Service and A Service inject a Repository. 

In order to run the project, Follow the below steps. 

```console

$ git clone https://github.com/xxx.git

$ cd node-project-api

$ npm install

$ npm run build

$ npm run dev 

```

The above steps start the underlying express server that serves the API with a url prefix as http://localhost:8000/api/**** followed by the resource url .
For example: http://localhost:8000/api/test . 

All the API available in the project are exposed as a swagger document which is available on  http://localhost:8000/api-doc .


## Example usage of Dependency Injection. 

The below example shows. The project is expected to follow the dependency injection pattern and avoid object creation programatically with "new" keyword. 

1) TestService injected in to TestController
2) TestRepository injected in to TestService  
 

```typescript

@Service() // typedi annotation that makes TestController class injectable in to other classes that need it.
export default class TestController {
    
    // TestController class uses TestService. Hence its injected by referring it in the constructor. 
    // TestService class is expected to have @Service() annotation as shown below, in order for the injection to happen. 
    constructor(public testService: TestService){
        // Nothing todo
    }
    
    public async getTestResp(@Query() name: string): Promise<any> {        
        return this.testService.getTestResp(name); // This is where the testService singleton injection defined in the constructor above is used.
    }    
 }
 
 
@Service() // typedi annotation that makes TestService Injectable to other classes.
export default class TestService {
    
    constructor(public testRepository: TestRepository){ // Injects TestRepository in to TestService
        // Nothing to do
    }
    
    public async getTestResp(name: string): Promise<any>  {        
        return await this.testRepository.getTestResp(name); // This is where the testRepository singleton injection defined in the constructor above is used.
    }
} 

```

