OTT Feature : My List [Add in list, List My Items, Remove from list]

Follow steps for the Local Setup and to play with the APIs :
------------------------------------------------------------
1. Clone the git repository
2. Go inside repo in terminal on same path
3. Enter : npm i
4. Now go to the "db" folder inside the repo, it consist of initial database setup with tables schema and initial level of dummy data. 
5. Start postgres in your local and connect it with pgadmin
6. Now go to pgadmin and import the file "initsql.sql" file. Please change your credentials inside "creds.yml" file inside "config" folder of the repo
7. Enter : "tsc" in the terminal
8. Enter : "serverless offline start" in the terminal
9. API endpoints will be there on your terminal like http://localhost:3000/dev/users/{userId}/favorites/remove  || http://localhost:3000/dev/users/{userId}/favorites/fetch || http://localhost:3000/dev/users/{userId}/favorites/add 
10. Now go to the insomnia / postman and import the "Insomnia_2024-05-28" file which contains all the API endpoints and required params to pass in the API endpoints.
11. Now everything is ready to play with these APIs via insomnia/postman.
12. For running tests go to the __tests__ folder inside repo 
13. Enter : "jest __tests__/**/*.test.js" (Please check version of dependencies)

Tech Stack Used :
-----------------
1. Typescript as code 
2. Serverless with Lambda functions in AWS as APIs
3. Database : Postgresql ( Initially started working in MongoDB but changed the decision at end moment because of issue of deployement of MongoDB on AWS connected with AWS Lambda Functions )
4. Deployment & CI/CD : Serverless framework takes care of whole deployment with CI/CD from local to cloud with single command "serverless deploy" and according to me for the scope of assignment, it is the simplest choice.
5. Testing Framework used here is "jest"

Assumptions :
-------------
1. Assuming scale of 50K RPS , choosen serverless and lambda functions . If scale is greater then this then EKS (K8S) was the only option to implement this assignment.
2. Used Postgresql in place of MongoDB ( Initially started working in MongoDB but changed the decision at end moment because of issues in deployement of MongoDB on AWS connected with AWS Lambda Functions )
2. According to scope of assignment, placed "user preference" data inside user row of type JSONB column in postgres. Can also be kept isolated.
3. Foreign Keys are not used.
4. For now authentication is kept inside APIs only, but can be added to API gateway with isolation from APIs.

Infrastructure Elements on Cloud (Hosting):
-------------------------------------------
1. This whole feature is deployed over AWS Lambda functions which are cost effective in nature due to pay per usage analogy.
2. Serverless framework
4. Basic Amazon RDS instance for database having postgresql engine running over it.
5. This Infra is working under a VPC so latency in milliseconds can be a bit more then expected.
6. Creds are stored in Secret manager.
7. Whole system is hosted for 24 hours only that is 28-29/05/2024 on AWS , it will be destroyed after 29/05/2024 9PM IST as 24 hrs based costing can come into the picture.
8. Hosted IP : <Shared on Email>, Please replace "localhost" in insomnia/postman in endpoints with this IP adress to check hosted API endpoints , also it is "http" in nature as per scope of assignment.

Optimizations :
---------------
1. Indexes are placed in DB so that query performance in terms reduces and API execution time comes under 10 millisec as mentioned in the assignment. [Please refer screenshot added to this readme.md]
2. Lambda functions are on-demand write now as it does not cost much in this case but if tested for real time scale , prewarming i.e. provisioning can be done with a single click.
3. As per the scope of assignment, cache usage was not required but it can be added to "List My Items" API for more performance time optimization at scale.






