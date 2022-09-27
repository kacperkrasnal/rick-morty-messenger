<template>
  <nav>
    <div class="nav-bar">
      <img class="logo" src="./assets/rick_and_morty_logo.png" alt="rick and morty logo">
      
      <a @click="showMobileMenu = !showMobileMenu"
         class="toggle-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </a>
      
      <div class="buttons"
           :class="{ active: showMobileMenu }">
        <router-link to="/" class="nav-button">New message</router-link>
        <router-link to="/history" class="nav-button">History</router-link>
      </div>
    </div>

    <div class="horizontal-line"/>
  </nav>

  <div class="break"/>

  <div class="container">
    <div class="margin"/>

    <div class="content">
      <router-view/>
    </div>

    <div class="margin"/>
  </div>

  <div id="message-alert">
    Message send.
  </div>

</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false
    }
  },

  mounted() {
    document.title = "RaM Message"
  }
}
</script>

<style lang="scss">
$nav-color: #4EADC5;
$font-color: #324B72;

// General styles
body {
  margin: 0!important;
  padding: 0!important;
}

#app {
  font-family: source-sans-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-color;
}

// Navigation styles

nav {
  position: fixed;
  z-index: 1000;

  .nav-bar {
    display: flex;
    position: relative;
    height: 8vh;
    background-color: white;

    .logo {
      position: absolute;
      top: 20%;
      left: 16%;
    }

    .toggle-button {
      position: absolute;
      right: 2%;
      top: 30%;
      display: none;
      @media (max-width: 530px) {
        display: block;
      }
    }

    .buttons {
      @media (max-width: 530px) {
        display: none;
        bottom: -56.8px;
        right: 0;
        &.active {
          display: block;
        }
        a {
          border: 3px $nav-color solid;
        }
      }
      position: absolute;
      bottom: 8px;
      right: 18%;
        a {
          background-color: white;
          text-decoration: none!important;
          padding: 8px 16px 8px;
          font-size: 16px;
          font-weight: 400;
          color: $font-color;
          &.router-link-exact-active {
            background-color: $nav-color!important;
            font-weight: 400;
            color: white;
          }
        }
    }
  }
  .horizontal-line {
    width: 100vw;
    height: 24px;
    background: $nav-color;
  }
}

// Content styles

.break {
  height: 10vh;
}
.container {
  display: flex;

  .margin {
    @media (max-width: 700px) {
      flex: 10%
    }
    flex: calc(100%/3);
  }
  .content {
    @media (max-width: 700px) {
      flex: 80%
    }
    flex: calc(100%/3);
  }
}

// Reusable styles

.title {
  font-family: source-sans-pro, sans-serif;
  font-weight: 300!important;
  font-style: normal;
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 0.75rem;
}

.flex-container-start {
  @media (max-width: 530px) {
    margin-top: 8vh!important;
  }
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
}

#message-alert {
  position: absolute;
  display: none;
  opacity: 1;
  right: 0;
  bottom: 10vh;
  padding: 10px 30px;
  background-color: $nav-color;
  color: white;
  transition: opacity 4s;
}
</style>
