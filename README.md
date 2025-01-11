## Translator Project(Prototype)

This is a personal project focused on building a serverless application that translates text using AWS Cloud services. This project demonstrates how to integrate various AWS services, manage infrastructure with code, and develop a frontend interface for seamless translation functionality. It leverages AWS CDK, AWS SDK, and Next.js with TypeScript to achieve these goals.

Demo: https://www.121103.xyz/

## Key Features

* **Text Translation**: Utilize AWS services such as Amazon Translate and other APIs for translating text between languages.
* **Infrastructure as Code**: Use **AWS CDK** to define and deploy serverless infrastructure.
* **Frontend Integration**: Build a user-friendly interface using **Next.js** to input and display translations.
* **Scalable Design**: Create a robust, scalable application leveraging serverless architecture.
* **Monorepo Management**: Organize the project using **NPM workspaces** for efficient structure and code sharing.

## Project Components

### Backend

* **Translation Service**: Leverage Amazon Translate to process text translations.
* **Infrastructure**: Define serverless resources like Lambda functions, API Gateway, and DynamoDB with AWS CDK.

### Frontend

* **User Interface**: Build a clean and responsive interface using Next.js and React.
* **Integration**: Connect the frontend to backend translation services via API Gateway.

### Project Organization

* **Monorepo Structure**: Use NPM workspaces to organize the project and share common code modules.

## What Comes Next

This project is still in its prototype stage, and the next steps include:

* **Frontend Improvements**: Enhance the design and usability of the user interface.
* **Cognito**: Implement customer identity and access management into app (sign-up and sign-in features).
  * TranslatorService.restApiServicetimeOfDayRestApiEndpoint092B5D66 = https://2oombrapu7.execute-api.us-east-1.amazonaws.com/prod/
  * TranslatorService.userAuthServiceuserPoolClient3E3EBF9B = 2r06q5vnbm5fcadj42kt7n70ct
  * TranslatorService.userAuthServiceuserPoolId097CF8F2 = us-east-1_oPvZLC6Cq
