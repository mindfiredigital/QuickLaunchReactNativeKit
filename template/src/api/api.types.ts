/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * The API version of the api.
   */
  apiVersion: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}
