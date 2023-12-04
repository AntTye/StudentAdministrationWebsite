<template>
  <header class="app-header">
    <div>
      <nav class="nav">
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/classes">Enrolled Classes</RouterLink>
            <RouterLink to="/search">Select Classes</RouterLink>
            <RouterLink to="/Schedule">Schedule</RouterLink>
            <RouterLink to="/Profile">Profile</RouterLink>
            <RouterLink to="/">Logout</RouterLink>


            <!--
              This RouterLink does not point to a specific path, but rather the name of a route.
              Check out router/index.js for how this is defined
            -->
            <!--<RouterLink :to="{ name: 'form' }">Form Example</RouterLink>-->
           
            
      </nav>
    </div>
  </header>
</template>

<script setup>
// import the <RouterLink> component so that we can use it in the template above
import { RouterLink } from "vue-router";

// give this component a title property so that the parent component (app.vue) can set whatever title it wants
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style>
/* give the header itself a background color, a border, and add some padding to the content */
.app-header {
  display: flex;
  justify-content: left;
  background-color:#000E2F;
  border-bottom: 1px solid gray;
  padding: 1rem;
}

.nav a {
  color:white;
  padding: 16px;
  text-decoration: none;
  font-size: 17px;
  margin-right: 5px;
}

.nav a:hover {
  background-color:#ddd;
  color:#000E2F; 
}


/* make the title within the header a larger and bolder font */
.app-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color:white;
}
</style>
