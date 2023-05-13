<script setup lang="ts">
import { postLogout } from '@api/apiLogin'
import { removeToken } from '@utils/loginTools'
import { backToEntryPage } from '@utils/routerTools'

const handleLogout = () => {
  removeToken()
  backToEntryPage()
  postLogout(undefined).then()
}
</script>

<template>
  <div class="account-card">
    <div class="card">
      <img src="@assets/icon/avater-icon.png" alt="">
      <div class="base-info">
        <p class="user-name">taku</p>
      </div>
      <el-popover :popper-style="{ backgroundColor: '#fff', border: 'none' }" placement="right-start" :offset="15"
        trigger="click" :show-arrow="false">
        <template #reference>
          <div class="account-op">&lt</div>
        </template>
        <div class="pop-slot-menu">
          <div class="item" @click="handleLogout">退出登录</div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account-card {
  height: 60px;
  background-color: $menu-fg-color;
  padding: 18px 30px;
  display: flex;
  overflow: hidden;
  color: black;
  border-bottom: 1px solid black;

  .card {
    display: flex;
    position: relative;
    width: 100%;

    img {
      width: 20px;
      height: 20px;
    }

    .el-avatar {
      vertical-align: top;
    }

    .base-info {
      margin-left: 30px;

      .user-name {
        margin-top: -3px;
      }

      .user-role {
        color: #FED600;
        margin-top: 5px;
      }
    }

    .account-op {
      font-size: 15px;
      position: absolute;
      font-weight: bold;
      right: 0;
      top: 11px;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }


}


.pop-slot-menu {

  .item {
    cursor: pointer;
    padding: 5px;

    &:hover {
      color: $menu-active-text-color;
    }
  }
}
</style>