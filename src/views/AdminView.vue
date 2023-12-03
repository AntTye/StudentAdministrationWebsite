<template>
    <div class="AdminView">
      <h1>Admin View</h1>
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading...</div>
      </div>
      <div v-else>
        <div v-for="user in users" :key="user.netid.S" class="user-card">
          <div class="user-info">
            <strong>Full Name:</strong> {{ user.fullname.S }}
          </div>
          <div class="user-info">
            <strong>NetID:</strong> {{ user.netid.S }}
          </div>
          <div class="user-info">
            <strong>Email:</strong> {{ user.email.S }}
          </div>
          <!-- Add more user information as needed -->
          <button @click="editUser(user)">Edit</button>
          <button @click="deleteUser(user.netid.S)">Delete</button>
        </div>
      </div>

      <!-- Edit User Form -->
      <div v-if="editingUser" class="edit-form">
        <h2>Edit User</h2>
        <form @submit.prevent="submitEditForm">
          <div>
            <label for="editFullname">Full Name:</label>
            <input id="editFullname" v-model="editedUser.fullname.S" />
          </div>
          <div>
            <label for="editEmail">Email:</label>
            <input id="editEmail" v-model="editedUser.email.S" />
          </div>
                <!-- can add more changes -->
          <button type="submit">Save Changes</button>
          <button @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        loading: true,
        users: [],
        editingUser: null,
        editedUser: {},
      };
    },
    async mounted() {
      // Fetch the list of users
      const apiUrl = import.meta.env.VITE_GET_PERSON_DATA;
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.users = data.Items;
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        this.loading = false;
      }
    },
    methods: {
      editUser(user) {
        this.editingUser = user;
        this.editedUser = { ...user };
      },
      async submitEditForm() {
        // Implement Updating INFO ON DATABASE, need lamda function
        const apiUrl = import.meta.env.VITE_UPDATE_USER;
  
        try {
          const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.editedUser),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          // Update the user data in the local array
          const index = this.users.findIndex(user => user.netid.S === this.editingUser.netid.S);
          if (index !== -1) {
            this.users[index] = this.editedUser;
          }
  
          // Clear the editingUser and editedUser
          this.editingUser = null;
          this.editedUser = {};
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      },
      cancelEdit() {
        // Clear the editingUser and editedUser
        this.editingUser = null;
        this.editedUser = {};
      },
      deleteUser(netid) {
        // Implement delete user functionality
        console.log('Deleting user with NetID:', netid);
      },
    },
  };
  </script>

  <style scoped>
  .AdminView {
    padding: 2rem;
    text-align: center;
    background-color: #f5f5f5; /* Subdued background color */
  }
  
  h1 {
    font-size: 3rem;
    color: #333; /* Dark text color */
    margin-bottom: 2rem;
  }
  
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }
  
  .loading-spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #333; /* Dark border color */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  .loading-text {
    font-size: 1.5rem;
    color: #333; /* Dark text color */
    margin-top: 1rem;
  }
  
  .user-card {
    background-color: #fff; /* White background color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 1rem;
  }
  
  .user-info {
    font-size: 1.5rem;
    color: #333; /* Dark text color */
    margin: 1rem 0;
  }
  
  button {
    margin-top: 1rem;
    background-color: #000E2F; /* Dark blue background color */
    color: #fff; /* White text color */
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  button:hover {
    background-color: #001F47; /* Darker blue on hover */
  }
  </style>