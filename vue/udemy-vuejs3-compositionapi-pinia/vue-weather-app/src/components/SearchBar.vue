<template>
  <div class="search-bar">
    <form>
      <div class="form-group">
        <input type="search" placeholder="지역을 입력해 주세요">
        <button>
          <font-awesome-icon class="icon" :icon="['fas', 'magnifying-glass']" />
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .search-bar {
    padding: 8px 20px;
    border-radius: 40px;
    background: #fff;
    border: 1px solid #ccc;
    padding: 0 20px;
  
    form {
      .form-group {
        display: flex;
        input {
          width: 100%;
          border: none;
          padding: 1em 0;
          font-size: 18px;
          outline: none;
          font-size: 14px;
        }
        button {
          background: transparent;
          border: none;
          &:hover { cursor: pointer; }
          .icon { font-size: 24px; }
        }
      }
    }
  }
</style>