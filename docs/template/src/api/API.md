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

## Interceptor

1. **Request Interceptor**:

   - Prior to dispatching a request to the API, this component verifies if a token (an authentication code) is available. If so, it is seamlessly appended to the request, ensuring that the API recognizes and authenticates the sender.

2. **Response Interceptor**:

   - Upon receiving a response from the API, this component meticulously inspects the outcome. In case of any errors, it gracefully manages them, ensuring a smooth flow of operations. Additionally, it communicates any encountered issues to your application, effectively handling them through `./src/api/apiProblem.ts` with user-friendly messages which are displayed through Toast notifications within the application.

## Promble Codes

The code property on error responses is filled with the best guess on where the problem lies. You can use a switch to check the problem. The values are exposed as CONSTANTS hanging on your built API.

| Problem Code | Message                                                                      |
| ------------ | ---------------------------------------------------------------------------- |
| ECONNABORTED | Request timed out. Please check your internet connection or try again later. |
| ERR_NETWORK  | Network error. Please check your internet connection.                        |
| ERR_CANCELED | Request canceled. Please try again or contact support.                       |
| 401          | Unauthorized access. Please log in again.                                    |
| 403          | Forbidden. You do not have permission to access this resource.               |
| 400          | Bad request. Please check your request parameters.                           |
| 404          | Resource not found.                                                          |
| 500          | Internal server error. Please try again later or contact support.            |
| Other        | Unexpected error occurred. Please try again.                                 |

With these mechanisms in place, your application is fully equipped to harness the API configuration seamlessly.
