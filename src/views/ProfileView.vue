<template>
  <div class="UserProfile">
    <h1>User Profile</h1>

    <div class="profile-card" v-if="user">
      <div class="profile-info">
        <strong>Full Name:</strong> {{ user.fullname?.S || 'N/A' }}
      </div>
      <div class="profile-info">
        <strong>NetID:</strong> {{ user.netid?.S || 'N/A' }}
      </div>
      <div class="profile-info">
        <strong>Email:</strong> {{ user.email?.S || 'N/A' }}
      </div>
      <div class="profile-info">
        <strong>Number of Classes Enrolled:</strong> {{ user.numberOfClasses || 'N/A' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      user: {},
    };
  },
  computed: {
    numberOfClasses() {
      return this.user.classes?.L?.length || 0;
    },
  },
  async mounted() {
    const loggedInUsername = localStorage.getItem('username');
    if (loggedInUsername) {
      await this.fetchUserData(loggedInUsername);
    } else {
      // Handle case where no user is logged in
      console.error('No user is logged in');
    }
  },
  methods: {
    async fetchUserData(username) {
      const apiUrl = import.meta.env.VITE_GET_PERSON_DATA;
      try {
        const response = await fetch(`${apiUrl}?netid=${username}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('User Data:', data);
        const loggedInUser = data.Items.find(item => item.netid.S === username);
        if (loggedInUser) {
          this.user = { ...loggedInUser, numberOfClasses: loggedInUser.classes.L.length };
        } else {
          console.error('Logged-in user not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
.UserProfile {
  padding: 2rem;
  text-align: center;
  background-color: #f5f5f5; /* Subdued background color */
}
h1 {
  font-size: 3rem;
  color: #333; /* Dark text color */
  margin-bottom: 2rem;
}
.profile-card {
  background-color: #fff; /* White background color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;
  animation: slideIn 1s ease; /* Subtle slide-in animation */
}
.profile-info {
  font-size: 1.5rem;
  color: #333; /* Dark text color */
  margin: 1rem 0;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>