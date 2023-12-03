<template>
    <div class="login-page">
        <div class="login-container">
            <form name="login-form" @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label for="username">NetID: </label>
                    <input id="username" type="text" v-model="username" />
                </div>
                <div class="mb-3">
                    <label for="password">Password: </label>
                    <input id="password" type="password" v-model="password" />
                </div>
                <button class="btn btn-outline-dark" type="submit">
                    Login
                </button>
                <!-- Display error message -->
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>



<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref(''); // For displaying error messages
async function handleSubmit() {
    errorMessage.value = ''; // Reset the error message on new submission
    const api = import.meta.env.VITE_LOGIN;
    try {
        const response = await fetch(`${api}?netid=${username.value}&password=${password.value}`, {
            method: 'POST',
            
        });
        if (response.ok) {
            //store netid to get items in db
            localStorage.setItem('username', username.value);
            //for getting user const value = localStorage.getItem('username');
            // removing : localStorage.removeItem('myKey');
            // clearing : localStorage.clear();
            //successful login
            router.push('/'); 
        } else {
            const errorData = await response.json();
            if (response.status === 401) {
                errorMessage.value = 'Incorrect password.';
            } else if (response.status === 404) {
                errorMessage.value = 'Incorrect NetID.';
            } else {
                errorMessage.value = 'Incorrect NetID or Password';
            }
        }
    } catch (error) {
        errorMessage.value = 'API Error.';
    }
    
}
</script>




<style scoped>
    .login-page {
    height: 100vh; 
    background-image: url('../assets/loginbackdrop.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    }
    .login-container {
    background-color: rgba(255, 255, 255, 0.8); 
    padding: 50px;
    border-radius: 5px; 
    max-width: 400px; 
    margin: 0 auto; 
    
    }
    .login-container label {
        font-size: 30px;
        color: #000E2F;
        
    }
    .login-container input {
        font-size: 30px;
        border-radius: 10px;
        color: #000E2F;
        width: 100%;
    }
    .login-container button {
        display: block;
        margin-left: auto;
        margin-right: auto;
        font-size: 30px;
        margin-top: 20px;
        border-radius: 5px;
        padding: 10px;
        background-color:#000E2F;
        color:white;
    }
    .error-message {
        color: red;
    }
            
/* const useNetID = 'admin';
    const usePassword = 'admin';
    // Example validation logic
    if (NetID.value === useNetID && password.value === usePassword) {
        router.push('/home');
    } 
    else{
        alert('Invalid NetID or Password.');
    } */
</style>