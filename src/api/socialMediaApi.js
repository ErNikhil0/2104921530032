const BASE_URL = '/evaluation-service'; // Vite will proxy this to http://20.244.56.144

let authToken = null;

// Register with the server
export const registerWithServer = async () => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: "nikhiln249btechaiml2025@kccitm.edu.in",
        name: "Nikhil",
        mobileNo: "6398935056", // ✅ 10-digit valid mobile number
        githubUsername: "ErNikhil0",
        rollNo: "2104921530032",
        collegeName: "KCC Institute of Technology and Management",
        accessCode: "baqhWc",
        clientID: "aebb64cf-b470-4128-a2d8-642b29abc8c7"
      })
    });

    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
};

// Get auth token from server
export const getAuthToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: "nikhiln249btechaiml2025@kccitm.edu.in",
        name: "Nikhil",
        rollNo: "2104921530032",
        accessCode: "baqhWc",
        clientID: "aebb64cf-b470-4128-a2d8-642b29abc8c7",
        clientSecret: "HzVEKajdvBJgZQMP"
      })
    });

    if (!response.ok) throw new Error('Authentication failed');
    const data = await response.json();
    authToken = data.access_token;
    return authToken;
  } catch (error) {
    console.error('Authentication error:', error.message);
    throw error;
  }
};

// Fetch list of users
export const fetchUsers = async () => {
  if (!authToken) await getAuthToken();

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

// Fetch posts by a user
export const fetchUserPosts = async (userId) => {
  if (!authToken) await getAuthToken();

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/posts`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) throw new Error(`Failed to fetch posts for user ${userId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error.message);
    throw error;
  }
};

// Fetch comments for a posts
export const fetchPostComments = async (postId) => {
  if (!authToken) await getAuthToken();

  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    if (!response.ok) throw new Error(`Failed to fetch comments for post ${postId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error.message);
    throw error;
  }
};
