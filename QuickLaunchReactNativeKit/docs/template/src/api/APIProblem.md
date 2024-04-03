# Promble Codes

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
