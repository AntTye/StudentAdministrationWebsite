<template>
    <div class="main">
      <h1>Enrolled Classes</h1>
      <div class="container">
        <div v-for="item in data.Items" :key="item.netid.S">
        <div class="class-box" v-for="classtitle in item.classes.L" :key="classtitle.S">
          <div class="class-content">

            <h2>{{ classtitle.S }}</h2>

          </div>
          <button class="removebutton" @click="unenrollClass(item.netid.S, classtitle.S)">Unenroll</button>
        </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        loading: true,
        data: {},
      };
    },
    async mounted() {
    const api = import.meta.env.VITE_GET_PERSON_DATA;
    console.log(api)
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(`Error!!! status: ${response.status}`);
      }
      this.data = await response.json();
      
    } 
    catch (error) {
      console.error('error fetching data:', error);
    } 
    finally {
      this.loading = false;
    }
  },
  methods: {
    async unenrollClass(netid, CourseID) {
      const api = import.meta.env.VITE_DELETE_STUDENT_COURSE;
      try {
        const response = await fetch(`${api}/${netid}/${CourseID}`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error(`Error!!! status: ${response.status}`);
        }
        //
        console.log('Successfully unenrolled');
        
        // update the data locally
        const student = this.data.Items.find(item => item.netid.S === netid);
        if (student) {
            student.classes.L = student.classes.L.filter(course => course.S !== CourseID);
        }
      } catch (error) {
        console.error('Error unenrolling:', error);
      }
    },
  },
};
      
/* fetch(import.meta.env.VITE_API_ENDPOINT)
.then(response => response.json())
.then((data) => {
    console.log(data)
})*/
</script>
  
<style>
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
  background-color: #cc0000;
}
</style>