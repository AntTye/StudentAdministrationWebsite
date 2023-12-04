<template>
    <div class="main-content">
      <h1>Remove Courses</h1>
      <div class="container">
        <div class="class-box"  v-for="item in responseData.Items" :key="item.courseid.S">
          <div class="class-content">
            <h2>{{ item.courseid.S }}</h2>
            
          </div>
          <button class="removebutton" @click="unenrollClass(item.courseid.S)">Remove Class</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        loading: true,
        responseData: {},
      };
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
    unenrollClass(CourseID) {
    //Call Delete API that deletes based on primary key in ClassDATA
      const api = import.meta.env.VITE_DELETE_CLASS_API;
      fetch(`${api}/${CourseID}`, {
        method: 'DELETE',
      })
      
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        console.log('Successfully Deleted class as admin');
      //update the local data as well to show change
        this.responseData.Items = this.responseData.Items.filter(item => item.courseid.S !== CourseID);
      })
      .catch(error => {
        console.error('Error deleting class', error);
     
      });
    }
  },
};
</script>
  
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
  }
  
  .class-box {
    display: flex;
    align-items: center; 
    justify-content: space-between;
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px 0;
    text-align: center;
    width: 500px; 
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #000E2F;
  }
  .class-content {
  text-align: left; 
}
  .class-box, .class-box p {
    color: white;
  }
  .class-box h2 {
    color: white;
    font-size: 30px;
  }
  h1 {
    color:#000E2F;
    font-size: 50px;
    text-align: center;
    margin-top: 10px;
  }
  .removebutton {
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
  
}
.removebutton:hover {
  background-color: lightblue;
}
</style>