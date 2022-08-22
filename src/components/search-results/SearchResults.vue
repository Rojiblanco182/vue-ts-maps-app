<script lang="ts" src="./SearchResults.ts" />

<template>
      <ul class="list-group mt-3">
      <li class="list-group-item list-group-item-action">
        <h5>Place</h5>
        <p>Description</p>
        <div align="right">
          <button class="btn btn-outline-primary btn-sm">
            Directions
          </button>
        </div>
      </li>
    </ul>
</template>

<style scoped>
  li {
    cursor: pointer;
  }

  h5 {
    font-size: 15px;
  }

  p {
    font-size: 10px;
  }
</style>