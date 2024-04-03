# API - Network calls with axios

In your project, the `./src/api/api.ts` file serves as the intermediary enabling your application to interact with an external API. To achive this we use [Axios](https://www.npmjs.com/package/axios). Think of it as a messenger that facilitates communication between your app and the API, seamlessly handling requests and responses.

## Configuration Setup

To configure the API URL and version, you can utilize environment variables stored in a `.env` file. Here's how you can set it up:

Inside the `.env` file, update variables for the API URL and version, for example:

```plaintext
# Replace the value of API_URL with the actual URL of your API.
API_URL=http://localhost:3001/api
API_VERSION=v1
```

By setting up the API URL and version in the `.env` file and accessing them dynamically in your code, you ensure flexibility and maintainability, allowing easy configuration changes without modifying the source code directly.

## Mock API setup for testing

This repository provides instructions and resources for setting up a mock API environment for testing purposes.

### Mockoon Setup Instructions

Follow the steps outlined in the [Mockoon Setup Instructions README](./MockoonSetup.md) to set up a mock API using Mockoon.

### Postman Collection Setup

Refer to the [Postman Collection Setup README](./PostmanSetup.md) for instructions on setting up a Postman collection for testing against the mock API.

## Interceptors

You can intercept requests or responses before they are handled by then or catch.

[Interceptors README](./Interceptors.md)

## API Problem

The code property on error responses is filled with the best guess on where the problem lies. You can use a switch to check the problem. The values are exposed as CONSTANTS hanging on your built API.

[API Problem README](./APIProblem.md)

</br>
With these mechanisms in place, your application is fully equipped to harness the API configuration seamlessly.
