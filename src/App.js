import "./App.css";
import JoblyNav from "./nav/JoblyNav";
import RoutesList from "./nav/RoutesList";
import Loader from './common/Loader';
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./helpers/api";
import { useEffect, useState } from "react";
import decode from "jwt-decode";

import userContext from "./auth/userContext";

const DEFAULT_USER_STATE = {
  data: null,
  isLoggedIn: false,
  hasLoaded: false
};

const LOCALSTORAGE_TOKEN_KEY = "jobly-token";

/** Jobly App
 *
 * State:
 * -user: Object containing information on current user and logged in state
 *    -data: User information { username, firstName, lastName, isAdmin, jobs }
 *        where jobs is { id, title, companyHandle, companyName, state }
 *    -isLoggedIn: Boolean for whether a user is logged in
 * -token: user token
 *
 * App -> { JoblyNav, RoutesList }
 */

function App() {
  const [user, setUser] = useState(DEFAULT_USER_STATE);
  const [token, setToken] = useState();
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  // Attempt to login previous user from localstorage
  useEffect(function checkForTokenOnMount() {
    const tokenFromLocalStorage = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    if (tokenFromLocalStorage) {
      storeToken(tokenFromLocalStorage);
    } else {
      setToken(null);
    }
  }, []);

  // Update user state whenever token changes
  useEffect(
    function updateUserOnTokenChange() {
      async function fetchAndSetUserInformation() {
        // Token has not been explicitly checked for yet
        if (token === undefined) return;

        // There is no token
        if (token === null) {
          setAppliedJobIds(new Set());
          setUser({
            data: null,
            isLoggedIn: false,
            hasLoaded: true
          });

          return;
        }

        // There is a token
        const { username } = decode(token);

        let userFromAPI;
        try {
          userFromAPI = await JoblyApi.getUser(username);
        } catch (err) {
          console.error(err);
        }
        setAppliedJobIds(new Set(userFromAPI.jobs));
        setUser({
          data: userFromAPI,
          isLoggedIn: true,
          hasLoaded: true
        });
      }

      fetchAndSetUserInformation();
    },
    [token]
  );

  // On token change, add/remove token to/from local storage.
  useEffect(
    function updateTokenInLocalStorage() {
      if (token) {
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
      } else if (token === null) {
        localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
      }
    },
    [token]
  );

  /** Register a user using the API and store the returned token */
  async function signup(signupFormData) {
    const tokenFromAPI = await JoblyApi.signupUser(signupFormData);
    storeToken(tokenFromAPI);
  }

  /** Authenticate a user using the API and store the returned token */
  async function login(loginFormData) {
    const tokenFromAPI = await JoblyApi.loginUser(loginFormData);
    storeToken(tokenFromAPI);
  }

  /** Log out user by removing token from JoblyApi class, state, localStorage */
  function logout() {
    JoblyApi.token = null;
    setToken(null);
  }

  /** Stores a token in the JoblyApi class, state, and localStorage */
  function storeToken(newToken) {
    JoblyApi.token = newToken;
    setToken(newToken);
  }

  /** Save user edits using the API and update user state */
  async function saveUserEdit(editFormData) {
    const { username, ...updateData } = editFormData;
    const userFromAPI = await JoblyApi.updateUser(username, updateData);
    setUser((prevUser) => ({
      isLoggedIn: true,
      hasLoaded: true,
      data: {
        ...prevUser.data,
        firstName: userFromAPI.firstName,
        lastName: userFromAPI.lastName,
        email: userFromAPI.email,
      },
    }));
  }

  /** Check if user has applied to job */
  function hasAppliedToJob(id) {
    return appliedJobIds.has(id);
  }

  /** Apply currently logged-in user to job by job id */
  async function applyToJob(id) {
    if (appliedJobIds.has(id)) return;

    await JoblyApi.applyToJob(user.data.username, id);
    setAppliedJobIds(prevAppliedJobIds => new Set([...prevAppliedJobIds, id]));
  }

  if (user.hasLoaded === false) {
    return <Loader />;
  }

  return (
    <div className="App">
      <userContext.Provider
        value={{ user, saveUserEdit, hasAppliedToJob, applyToJob }}
      >
        <BrowserRouter>
          <JoblyNav logout={logout} />
          <RoutesList signup={signup} login={login} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
