import esriId from "@arcgis/core/identity/IdentityManager";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import Portal from "@arcgis/core/portal/Portal";



// UI Elements
const userDetails = document.getElementById("user-display");
const signInButton = document.getElementById("sign-in-button");

// FUnction to sign in or out of the portal
const signInOrOut = () => {
  esriId
    .checkSignInStatus(info.portalUrl + "/sharing")
    .then(() => {
      // If already signed in, then destroy the credentials to sign out
      esriId.destroyCredentials();
      window.location.reload();
    })
    .catch(() => {
      // if the user is not signed in, generate a new credential
      esriId
        .getCredential(info.portalUrl + "/sharing", {
          // set the following properties to false to not show a dialog
          // before the OAuth popup window is open
          oAuthPopupConfirmation: false,
        })
        .then(() => {
          // Once a credentials is returned from the promise, check the
          // sign in status
          checkSignIn();
        });
    });
};

signInButton.addEventListener("click", signInOrOut);

// Function to check the current sign in status and display username if signed in
const checkSignIn = () => {
  esriId
    .checkSignInStatus(info.portalUrl + "/sharing")
    .then(() => {
      // If signed in, show the username on the UI
      const portal = new Portal({
        authMode: "immediate",
      });
      if (info.portalUrl !== "https://www.arcgis.com") {
        portal.url = info.portalUrl;
      }
      // Load the portal, display the name and username, then display login info
      portal.load().then(() => {
        userDetails.innerHTML = `signed in as : <b>${portal.user.fullName}</b> <br> Username:<b>${portal.user.username}</b>`;
        signInButton.innerHTML = "Sign Out";
      });
    })
    .catch(() => {});
};

// Create a new OAuthInfo object
const info = new OAuthInfo({
  // Swap this ID out with an app ID registered in your ArcGIS Organisation.
  appId: import.meta.env.VITE_REGISTERED_APP_ID,
  // Add the portalUrl property if using your own portal.
  portalUrl: import.meta.env.VITE_AECOM_AGOL_URL,
  // portalUrl: import.meta.env.VITE_PORTAL_URL,
  // Set the authNamespace property to prevent the user's signed in state
  // from being shared with other apps on the same domain with the same authNamespace value.
  authNamespace: "portal_oauth_inline",
  // Set popup to true to show the OAuth sign-in page in a separate popup window.
  popup: true
});

// Addthe OAuthInfo to the IdentityManager
esriId.registerOAuthInfos([info]);

// call the checkSignIn function to see if the user is already signed in
// checkSignIn();
