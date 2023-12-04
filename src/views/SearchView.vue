<template>
  <main class=search>
    <!-- Search Bar Implementation-->
    <input type="text" v-model="search" placeholder="Search Classes...">
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p><strong>Course ID:</strong> {{ selectedClass.courseid.S }}</p>
        <p><strong>Location:</strong> {{ selectedClass.location.S }}</p>
        <p><strong>Time:</strong> {{ selectedClass.time.S }}</p>
        <p><strong>Professor:</strong> {{ selectedClass.instructor.S }}</p>
        <p><strong>Description:</strong> {{ selectedClass.description.S }}</p>
        <button class="addbutton" @click="enrollClass(item.courseid.S)"><strong>Enroll</strong></button>
      </div>
    </div>
    <!-- Individual Buttons for Classes Produced by Search, with data from classes object -->
    <div id="wrapper">
      <div class="item" v-for="item in filteredClasses" :key="item.courseid.S" @click="openModal(item)"> <!--uses filteredClasses to search for courses, searches for course number only-->
        <h2 class="text">{{ item.courseid.S }}</h2>

        <div class="item detail">
          <p class="text"><strong>Location:</strong> {{ item.location.S }}</p>
          <p class="text"><strong>Time:</strong> {{ item.time.S }}</p>
          <p class="text"><strong>Professor:</strong> {{ item.instructor.S }}</p>
        </div>
        
      </div>
      
    </div>


  </main>
</template> 

<script>
import { VueElement, ref } from "vue";
// Search Bar basic functionality
let input = ref("");
export default {
    data() {
      return {
        loading: true,
        responseData: {},
        search: '',
        showModal: false,
      selectedClass: null,
    };
  },

    computed: {
    filteredClasses() {
      if (!this.search) {
        // If search is empty, return all classes
        return this.responseData.Items;
      }
      // Return classes that match the search query
      return this.responseData.Items.filter(item =>
        item.courseid.S.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },

    async mounted() {
    const apiUrl = import.meta.env.VITE_GET_ALL_API;
    console.log(apiUrl)
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.responseData = await response.json();
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    } 
    finally {
      this.loading = false;
    }
  },
  methods: {
    enrollClass(CourseID) {
    //Call Delete API that deletes based on primary key in ClassDATA
      const api = import.meta.env.VITE_DELETE_CLASS_API;
      fetch(`${api}/${CourseID}`, {
        method: 'ADD',
      })
      
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        console.log('Class enrolled successfully');
      //update the local data as well to show change
        this.responseData.Items = this.responseData.Items.filter(item => item.courseid.S !== CourseID);
      })
      .catch(error => {
        console.error('Error enrolling class:', error);
     
      });
    },
    openModal(item){
      this.selectedClass = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
/* Search Bar Styling */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(234, 242, 255);
}
input {
  display: flex;
  width: 840px; 
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("src/assets/search-bar-icon.png") no-repeat 0px center;
  background-size: 50px 50px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.text{
  color: white;
}
.item {
  width: 750px ;
  background-color: #000E2F;
  display: center; 
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.detail {
  width: 600px;
  cursor: pointer;
  color:white;
}
.addbutton {
    background-color: lightskyblue;
    color: black;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
  
}
.error {
  background-color: tomato;
}
.modal {
  display: block; /* Show the modal */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 0%; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); /* Adding some shadow */
  /* Centering the modal content box */
  position: relative;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.close {
  color: #aaa;
  float: right;
  padding: 0px;
  font-size: 50px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>