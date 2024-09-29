const axios = require("axios");

const getLogin = async ({ code, redirectUri }) => {
  try {
    // Validate input
    if (!code || !redirectUri) {
      throw new Error("Authorization code and redirect URI are required.");
    }

    let accessToken, refreshToken, idToken, userInfo;

    // Token exchange with Google OAuth
    const tokenResponse = await axios.post(
      "https://accounts.google.com/o/oauth2/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }
    );

    // Check if the token response has data
    if (!tokenResponse.data) {
      throw new Error("No data returned from Google OAuth token exchange.");
    }

    // Extract tokens from response
    accessToken = tokenResponse.data.access_token;
    refreshToken = tokenResponse.data.refresh_token;
    idToken = tokenResponse.data.id_token;

    if (!accessToken) {
      throw new Error("Access token is missing from token response.");
    }

    // Fetch user info from Google API
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Check if user info response has data
    if (!userInfoResponse.data) {
      throw new Error("No data returned from Google user info.");
    }

    userInfo = userInfoResponse.data;

    if (!userInfo.email) {
      throw new Error("Email missing from user information.");
    }

    // Return successful result
    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        ...userInfo,
      },
    };
  } catch (error) {
    console.error("Error in getLogin:", error.message);
    return {
      success: false,
      message: error.message || "Error during login process",
    };
  }
};

module.exports = { getLogin };
