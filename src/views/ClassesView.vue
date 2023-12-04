<template>
  <div class="main-content">
    <h1>Current Enrolled Classes</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="container">
      <div v-if="showModal" class="modal">
            <div class="modal-content">
              <span class="close" @click="closeModal">&times;</span>
              <p><strong>Course ID:</strong> {{ selectedClass.courseid.S }}</p>
              <p><strong>Location:</strong> {{ selectedClass.location.S }}</p>
              <p><strong>Time:</strong> {{ selectedClass.time.S }}</p>
              <p><strong>Professor:</strong> {{ selectedClass.instructor.S }}</p>
              <p><strong>Description:</strong> {{ selectedClass.description.S }}</p>
            </div>
          </div>
      <div class="class-box" v-for="item in enrolledClasses" :key="item.courseid.S">
        <div class="class-content">
          <h2>{{ item.courseid.S }}</h2>
          <h21><button class="details-button" @click="openModal(item)">Course Details</button></h21>
          <p>Enrolled</p>
        </div>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      loading: true,
      responseData: {},
      studentData: {},
      error: null,
      showModal: false,
    selectedClass: null,
    };
  },
  async mounted() {
    try {
      await Promise.all([this.fetchClasses(), this.getStudentInformation()]);
    } catch (error) {
      this.error = error.message;
      console.error('Error in mounted:', error);
    } finally {
      this.loading = false;
    }
  },
  computed: {
  enrolledClasses() {
    if (!this.studentData.Items) {
      return [];
    }
    return this.responseData.Items.filter(item => 
      this.isEnrolled(item.courseid.S)
      );
    },
  },

  methods: {
    async fetchClasses() {
      const apiUrl = import.meta.env.VITE_GET_ALL_API;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error fetching classes: status ${response.status}`);
      }
      this.responseData = await response.json();
    },
    async getStudentInformation() {
      const api = import.meta.env.VITE_GET_PERSON_DATA;
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(`Error fetching student data: status ${response.status}`);
      }
      this.studentData = await response.json();
    },
    async enrollInClass(netid, CourseID) {
      const api = import.meta.env.VITE_STUDENT_ENROLL;
      try {
        const response = await fetch(`${api}/${netid}/${CourseID}`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        console.log('Successfully enrolled');
        // Update student data locally, add logic as needed
      } catch (error) {
        console.error('Error enrolling:', error);
        this.error = 'Error enrolling: ' + error.message;
      }
    },
    isEnrolled(courseId) {
      return this.studentData.Items.some(student => student.classes.L.some(classItem => classItem.S === courseId));
    },

    openModal(item) {
      this.selectedClass = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.details-button {
  background-color: #000000; /* Black background */
  color: white; /* White text */
  font-size: 14px; /* Adjusted from 142px which seems too large */
}
.details-button:hover {
  background-color: #0056b3; /* Different color on hover */
  color: rgb(0, 0, 0); /* Keep text color white on hover */
}
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
  h21 {
    color:#000E2F;
    font-size: 10px;
    text-align: center;
    margin-top: 10px;
  }
  .removebutton {
    background-color: blue;
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
.loading, .error {
    color: red;
    text-align: center;
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
  color: blue;
  float: right;
  font-size: 25px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>