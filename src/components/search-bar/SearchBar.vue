<script lang="ts" src="./SearchBar.ts" />

<template>
  <div class="search-bar-container">
    <input 
      class="form-control"
      type="text"
      placeholder="Search place"
      v-model="searchTerm"
    >
    <SearchResults />
  </div>  
</template>

<style scoped>
  .search-bar-container {
    position: fixed;
    top: 30px;
    left: 30px;
    background-color: white;
    z-index: 999;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
    width: 250px;
    border-radius: 10px;
    overflow: hidden;
    padding: 5px;
  }
</style>