<template>
  <div class="wraper">
    <Sidebar></Sidebar>
    <Content></Content>
  </div>
</template>

<style>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.wraper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.cursor-pointer {
  cursor: pointer;
}

@media screen and (min-width: 769px) {
  .wraper {
    flex-direction: row;
  }
}
</style>