<template>
  <div class="BigDas-page-root">
    <b-navbar toggleable="md" type="dark" variant="info" sticky>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">BigDas</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/members">Members</b-nav-item>
          <b-nav-item to="/papers">Papers</b-nav-item>
          <b-nav-item to="/projects">Projects</b-nav-item>
          <b-nav-item href="#">Demos</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- TODO(totoro): Implements Login-Session functions. -->
            <template slot="button-content">User</template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Page routers -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Root',
};
</script>

<style scoped>
.BigDas-page-root {
  display: flex;
  flex-direction: column;
}
</style>
