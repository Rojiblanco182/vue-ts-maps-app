<script lang="ts" src="./MapView.ts" />

<template>
<div v-if="!isUserLocated" class="loading-map d-flex justify-content-center align-items-center">
  <div class="text-center">
    <h3>Please wait</h3>
    <span>Locating...</span>
  </div>
</div>

  <div v-show="isUserLocated" class="map-container" ref="mapElement" />
</template>

<style scoped>
.loading-map {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  height: 100vh;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100vw;
  z-index: 9999;
}

.map-container {
  height: 100vh;
  position: fixed;
  width: 100vw;
}
</style>