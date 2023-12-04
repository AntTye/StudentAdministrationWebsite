<template>
    <div class="container">
      <h1>Add New Class</h1>
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="courseid">Course ID: </label>
          <input class="searchmodify" v-model="course.courseid.S" id="courseid" required>
        </div>
        <div>
          <label for="available">Available:</label>
          <input class="searchmodify" v-model="course.available.N" id="available" required>
        </div>
        <div>
          <label for="coursetitle">Course Title:</label>
          <input class="searchmodify" v-model="course.coursetitle.S" id="coursetitle" required>
        </div>
        <div>
          <label for="description">Description:</label>
          <input class="searchmodify" v-model="course.description.S" id="description" required>
        </div>
        <div>
          <label for="enrolled">Enrolled:</label>
          <input class="searchmodify" v-model="course.enrolled.N" id="enrolled" required>
        </div>
        <div>
          <label for="instructor">Instructor:</label>
          <input class="searchmodify" v-model="course.instructor.S" id="instructor" required>
        </div>
        <div>
          <label for="location">Location:</label>
          <input class="searchmodify" v-model="course.location.S" id="location" required>
        </div>
        <div>
          <label for="time">Time:</label>
          <input class="searchmodify" v-model="course.time.S" id="time" required>
        </div>
        <div>
          <label>Days:</label>
          <input class="searchmodify" v-for="(day, index) in course.days.L" v-model="course.days.L[index].S" :key="index">
          <button type="button" @click="addDay">Add Day</button>
        </div>
        <div>
          <label>Students:</label>
          <input class="searchmodify" v-for="(student, index) in course.students.L" v-model="course.students.L[index].S" :key="index">
          <button type="button" @click="addStudent">Add Student</button>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <p v-if="responseMessage" class="response">{{ responseMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        course: {
          courseid: { S: "" },
          available: { N: "" },
          coursetitle: { S: "" },
          days: { L: [{ S: "" }] },
          description: { S: "" },
          enrolled: { N: "" },
          instructor: { S: "" },
          location: { S: "" },
          students: { L: [{ S: "" }] },
          time: { S: "" }
        },
        responseMessage: ""
      };
    },
    methods: {
      submitForm() {
        const url = 'https://791afceg63.execute-api.us-east-1.amazonaws.com/prod/admin';
  
        fetch(url, {
          method: 'POST',
          /*headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },*/
          body: JSON.stringify(this.course)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.responseMessage = 'Course registered successfully!';
          console.log(data);
        })
        .catch(error => {
          this.responseMessage = 'There was a problem with the fetch operation: ' + error;
          console.error('Error:', error);
        });
      },
      addDay() {
        this.course.days.L.push({ S: "" });
      },
      addStudent() {
        this.course.students.L.push({ S: "" });
      }
    }
  };
  </script>
  



<style scoped>

.searchmodify {
  padding-left: 20px; /* Adjust this value as needed */
  background: white url("searchicon.png");
  border: 1px;
  border-radius: 25px;
}

.container {
    max-width: width;
    margin: auto;
    padding: 20px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
  gap: auto;
}
.form div {
  display: flex;
  flex-direction: column;
}
.label {
  font-weight: bold;
  margin-bottom: 5px;
}
.input,
.select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.submit-button:hover {
  background-color: #0056b3;
}
.response {
  margin-top: 20px;
  color: green;
  font-size: 18px;
}
</style>