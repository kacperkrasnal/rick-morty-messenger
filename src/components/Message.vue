<template>
  <div class="message-box">
    <p class="title-message">{{ title }}</p><img class="dropdown-button" alt="dropdown icon" src="../assets/dropdown_icon.svg">

    <div class="message-body">
      <div class="message-data">
        <img class="character-image"
             :src="characterImage"
             alt="character image">
        <div class="character-data">
          <span>Sent to: {{ characterName }}</span>
          <span>Date: {{ date }}</span>
          <span>At: {{ time }}</span>
        </div>
      </div>

      <div class="message-text">
        {{ body }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Message",
  props: ['title', 'body', 'characterName', 'characterImage', 'date', 'time']
}
</script>

<style lang="scss" scoped>
.message-box {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;

  padding: 0.3rem 0 0.3rem;
  border-bottom: #E0E0E0 solid 1px;
  cursor: pointer;

  & .dropdown-button {
    position: absolute;
    right: 0;
    top: 45%;
    transition: rotate 0.2s, top 0s;
  }

  &.active {
    .message-body {
      display: block;
    }

    .dropdown-button {
      top: 25px;
      transform: rotate(180deg);
    }
  }

  .message-body {
    display: none;

    .message-data {
      display: flex;
      flex-direction: row;
      height: 48px;
      margin-bottom: 24px;
      border-left: #C4C4C4 1px solid ;

      .character-image {
        margin: 0 6px 0;
        border-radius: 24px;
      }

      .character-data {
        display: flex;
        flex-direction: column;
        align-items: start;
        font-weight: 400;
        font-size: 14px;
      }
    }

    .message-text {
      text-align: start;
      margin-bottom: 19px;
    }
  }

  .title-message {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
  }
}
</style>