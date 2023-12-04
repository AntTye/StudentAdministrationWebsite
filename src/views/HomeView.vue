<template>
  <main class="home">
    <h2>My Home</h2>
    <div class="box-container">
      <router-link to="/classes" class="box">
        <img src="@/assets/enrollment-icon.png" alt="Class Enrollment" />
        <p>Class Enrollment</p>
      </router-link>

      <router-link to="/search" class="box">
        <img src="@/assets/searchicon.png" alt="Class Search" />
        <p>Class Search</p>
      </router-link>

      <router-link to="/schedule" class="box">
        <img src="@/assets/schedule-icon.png" alt="View Schedule" />
        <p>View Schedule</p>
      </router-link>

      <router-link to="/Profile" class="box">
        <img src="@/assets/profile-icon.png" alt="User Profile" />
        <p>User Profile</p>
      </router-link>

      <router-link to="/createclassview" class="box">
        <img src="@/assets/createclass.png" alt="Create Class" />
        <p>Create Class</p>
      </router-link>

    </div>
  </main>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function handleSubmit() {
    router.push('/classes')

}
</script>

<style>
.home {
  padding: 1rem;
  text-align: center;
}

.home h2 {
  font-size: 40px;
  margin-bottom: 1rem;
  color: #000E2F;
}

.box-container {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.box {
  text-align: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 20%; /* Adjust the width to your desired value */
  transition: background-color 0.2s;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box img {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.box p {
  font-size: 18px;
  color: #333;
}
</style>