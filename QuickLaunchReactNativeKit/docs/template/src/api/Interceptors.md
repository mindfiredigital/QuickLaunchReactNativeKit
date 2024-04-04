# Interceptors

1. **Request Interceptor**:

   - Prior to dispatching a request to the API, this component verifies if a token (an authentication code) is available. If so, it is seamlessly appended to the request, ensuring that the API recognizes and authenticates the sender.

2. **Response Interceptor**:

   - Upon receiving a response from the API, this component meticulously inspects the outcome. In case of any errors, it gracefully manages them, ensuring a smooth flow of operations. Additionally, it communicates any encountered issues to your application, effectively handling them through `./src/api/apiProblem.ts` with user-friendly messages which are displayed through Toast notifications within the application.

   For error codes refer **[API Problem README](./APIProblem.md)**
