<template>
  <div id="app">
    <h1>Blood Pressure</h1>
    <router-link to="/sign-in">Sign In</router-link>
    <router-view />
    <Nav />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script lang="ts">
// TODO import * as firebase from "firebase/app";
// - import "firebase/firestore"
import * as firebase from "firebase";
import { Component, Vue } from "vue-property-decorator";

import Nav from "@/components/Nav.vue";

// TODO Only need services
const app = firebase.initializeApp({
  apiKey: "AIzaSyDuhRSUr7ub8istev24u7Z_rkzQQrq2bV0",
  authDomain: "blood-pressure-prod.firebaseapp.com",
  databaseURL: "https://blood-pressure-prod.firebaseio.com",
  projectId: "blood-pressure-prod",
  storageBucket: "blood-pressure-prod.appspot.com",
  messagingSenderId: "604839321626",
  appId: "1:604839321626:web:dc4333681769b591b631a3",
  measurementId: "G-G491VN9HKS"
});

@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {}
</script>
