<template>
  <div class="UserProfile">
    <h1>User Profile</h1>
    <div v-else class="profile-card">
      <div class="profile-info">
        <strong>Full Name:</strong> {{ user.fullname.S }}
      </div>
      <div class="profile-info">
        <strong>NetID:</strong> {{ user.netid.S }}
      </div>
      <div class="profile-info">
        <strong>Email:</strong> {{ user.email.S }}
      </div>
      <div class="profile-info">
        <strong>Number of Classes:</strong> {{ user.classes.L.length }}
      </div>
      <!-- Add more user information as needed -->
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
  async mounted() {
    const apiUrl = import.meta.env.VITE_GET_PERSON_DATA;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.user = data.Items[0];
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      this.loading = false;
    }
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