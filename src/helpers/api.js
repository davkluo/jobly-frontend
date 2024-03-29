import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static token = '';

  //   Token for testing:
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get list of all companies data */

  static async getCompanies(searchTerm) {
    const data = searchTerm ? { nameLike: searchTerm } : {};
    const response = await this.request(`companies`, data);
    return response.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const response = await this.request(`companies/${handle}`);
    return response.company;
  }

  /** Get list of all jobs data */

  static async getJobs(searchTerm) {
    const data = searchTerm ? { title: searchTerm } : {};
    const response = await this.request(`jobs`, data);
    return response.jobs;
  }

  /** Authenticate user */

  static async loginUser({ username, password }) {
    const response = await this.request(
      "auth/token",
      { username, password },
      "post"
    );
    return response.token;
  }

  /** Register user */

  static async signupUser({ username, password, firstName, lastName, email }) {
    const response = await this.request(
      "auth/register",
      { username, password, firstName, lastName, email },
      "post"
    );
    return response.token;
  }

  /** Get a user by username */

  static async getUser(username) {
    const response = await this.request(`users/${username}`);
    return response.user;
  }

  /** Update a user by username and data to update */
  static async updateUser(username, { firstName, lastName, email }) {
    const response = await this.request(
      `users/${username}`,
      { firstName, lastName, email },
      'patch'
    );

    return response.user;
  }

  /** Apply user to job */
  static async applyToJob(username, id) {
    await this.request(
      `users/${username}/jobs/${id}`,
      {username, id},
      'post'
    );
  }
}

export default JoblyApi;