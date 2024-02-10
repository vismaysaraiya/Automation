Cypress automation installation and demo project.

Environment Setup
-----------------------
1) Download & install nodejs 
2) Download & install visual studio code (VSCode)
3) create a new folder for project & open in VSCode
4) open cmd/terminal then execute below command(this will create package.json)
  npm -i init 	
5) to install cypress
  npm install cypress --save -dev
6) start cypress
npx cypress open 	(or)
node_modules/.bin/cypress open
____________________________________________________________________________________________________________

Execute commands
Running Tests/Specs
-------------
To open Cypress Runner        
npx cypress open

To Run All the specs under e2e folder        
npx cypress run
npx cypress run --headed

To Run Single spec under e2e folder        
npx cypress run –-spec cypress\e2e\MyTest.js

To Run All the specs under e2e folder using Chrome        
npx cypress run --browser chrome        
npx cypress run --browser edge        
npx cypress run --browser edge --headed        

To Run single it block from testfile use it.only        
npx cypress run --spec 
__________________________________________________________________________________________________________________

TO Install xpath plungin        
npm install -D cypress-xpath        
Add entry "<reference types="Cypress-xpath" />" in command.js        
Add entry "require ('cypress-xpath') in e2e.js
__________________________________________________________________________________________________________________

Cypress Assertions
https://docs.cypress.io/guides/references/assertions

1 Implicit Assertions        
 should        
 and        
 eq        
 contain        
 Include        
 Exist        
 have.length        
 have.value        
 etc...        

2 Explicit Assertions        
  expect        
  assert
