<template>
  <form @submit.prevent="submitMessageForm" class="flex-container-start">
    <div class="title">
      Send a new message
    </div>

    <div class="cell">
      <label>Title</label>
      <input  v-model="title"
              type="text"
              :class="{ error: titleErrors.length }"
              placeholder="Enter the title">
      <span class="error-message" v-for="error in titleErrors" :key="error">
        {{ error }}
      </span>
    </div>

    <div class="cell">
      <label>Message</label>
      <textarea v-model="message"
                :class="{ error: messageErrors.length }"
                rows="6"
                placeholder="Enter the message here..."/>
      <span class="error-message" v-for="error in messageErrors" :key="error">
        {{ error }}
      </span>
    </div>

    <div class="cell">
      <label>Character</label>
      <div class="dropdown" :class="{ active: showDropdown }">
        <input class="character-selector"
               type="text"
               @click="showDropdown = !showDropdown"
               :class="{ active: showDropdown, error: characterErrors.length }"
               placeholder="Pick a character"
               readonly>
        <div class="option-box"
             v-if="showDropdown">
          <div class="option"
               @click="selectCharacter(character)"
               v-for="character in characterList"
               :key="character.id">
            {{ character.name }}
          </div>
        </div>
      </div>
      <span class="error-message" v-for="error in characterErrors" :key="error">
        {{ error }}
      </span>
    </div>

    <div class="cell">
      <div class="checkbox">
        <img @click="useQuickPost = !useQuickPost" v-if="!useQuickPost" src="../assets/radio-inactive.svg" alt="inactive">
        <img @click="useQuickPost = !useQuickPost" v-else src="../assets/radio-active.svg" alt="active">
        <p>I want to use InterGalaxy Quickpost™</p>
      </div>
    </div>

    <button class="submit">
      Send
    </button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  name: "MessageView",
  data() {
    return {
      title: '',
      titleErrors: [],
      message: '',
      messageErrors: [],
      characterList: [],
      selectedCharacter: '',
      characterErrors: [],

      showDropdown: false,
      useQuickPost: false,
    }
  },
  mounted() {
    this.getCharacterList()
  },
  methods: {
    async submitMessageForm() {
      this.titleErrors = [];
      this.messageErrors = [];
      this.characterErrors = [];


      // Title validation
      const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if (format.test(this.title)) {
        this.titleErrors.push('Special characters (*,.^ etc.) are not allowed in the title.')
      }

      if (this.title.trim() === '') {
        this.titleErrors.push('Please enter the title')
      } else if (this.title.trim().length < 3 || this.title.trim().length > 32) {
        this.titleErrors.push('The title should be 3 to 32 characters long')
      }

      // Message validation
      if (this.message.trim() === '') {
        this.messageErrors.push('Please enter the message')
      } else if (this.message.length > 256) {
        this.messageErrors.push('The message is to long. (max 256 characters)')
      }

      // Character validation
      if (this.selectedCharacter === '') {
        this.characterErrors.push('Please choose a character')
      }


      if (this.correctForm) {
        const now = new Date

        const message = {
          title: this.title,
          body: this.message,
          characterName: this.selectedCharacter.name,
          characterImage: this.selectedCharacter.image,
          date: now.toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          time: now.getHours() + ':' + String(now.getMinutes()).padStart(2, "0")
        }

        let existingMessages = JSON.parse(localStorage.getItem('messageList')) || []
        localStorage.setItem("message", JSON.stringify(message))
        existingMessages.unshift(message)
        localStorage.setItem('messageList', JSON.stringify(existingMessages))

        this.title = ''
        this.message = ''
        await this.showMessageAlert()
      }
    },

    async showMessageAlert() {
      const alert = document.getElementById("message-alert")
      alert.style.display = "block"
      alert.style.opacity = "1"
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert.style.opacity = "0"
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert.style.display = "none"
    },

    async getCharacterList() {
      await axios
          .get("https://rickandmortyapi.com/api/character")
          .then(response => {
            this.characterList = response.data.results
          })
          .catch(error => {
            console.log('Something went wrong, please try again', { cause: error })
          })
    },

    selectCharacter(character) {
      document.querySelector('.character-selector').value = character.name;
      this.selectedCharacter = character;
      this.showDropdown = false
    }
  },

  computed: {
    correctForm() {
      return 0 === this.titleErrors.length + this.messageErrors.length + this.characterErrors.length
    }
  }
}
</script>

<style lang="scss" scoped>
$nav-color: #4EADC5;
$font-color: #324B72;


.cell {
  margin-top: 1rem;
  text-align: left;
  font-size: 16px;
  .checkbox {
    display: flex;
    align-items: center;
    p {
      display: inline;
      margin-left: 5px;
      font-weight: 600;
      font-size: 14px;
      line-height: 10px;
    }
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input, textarea{
    box-sizing:border-box;
    width: 100%;
    padding: 10px;
    resize: none;

    border: 1px solid #E0E0E0;
    border-radius: 8px;

    text-align: left;
    font-family: inherit;
    font-weight: inherit;
    font-style: inherit;

    background: white;
    color: $font-color;

    &.error {
      border: 1px solid #DE212B;
      &::placeholder {
        color: #DE212B66!important;
      }
    }

    &::placeholder {
      color: #E0E0E0;
    }

    &:focus {
      outline: none;
    }
  }
}

.submit {
  align-self: end;
  width: 82px;
  height: 40px;
  background: $nav-color;

  cursor: pointer;

  font-weight: 500;
  color: white;

  border: none;
  border-radius: 20px;
}

.dropdown {
  position: relative;
  height: 40px;

  &.active {
    height: 225px;
  }

  &.active::before {
    transform: rotate(-225deg)!important;
    top: 18px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 2px solid $font-color;
    border-top: 2px solid #fff;
    border-right: 2px solid #fff;

    right: 20px;
    top: 12px;

    z-index: 100;
    pointer-events: none;

    transform: rotate(-45deg);
    transition: 0.2s;
  }

  input {
    position: absolute;
    display: block;
    cursor: pointer;

    &.active {
      border-radius:8px 8px 0 0!important;
    }

    &::placeholder {
      color: $font-color!important;
      font-size: 14px;
    }
  }

  .option-box {
    box-sizing:border-box;
    position: absolute;

    top: 40px;

    width: 100%;
    height: 180px;

    overflow-y: scroll;
    overflow-x: hidden;

    border: 1px solid #E0E0E0;
    border-radius: 0 0 8px 8px;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #C4C4C4;
      border-radius: 4px;
    }

    .option {
      padding: 12px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background: #F4F4F4;
      }
    }
  }

}

.error-message {
  font-size: 12px;
  color: rgba(222, 33, 43, 0.6);
}


</style>