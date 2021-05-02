<template>
  <div>
    <div class="row justify-content-center">
      <div class="avatar">
        <img src="@/assets/avatar.png" style="height: 300px" />
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="hr-sect">About us</div>
      <h3>{{ $t("about_page.text") }}</h3>
      <div class="hr-sect">Our Mission</div>
      <h3>Create a high purrformance website for managing your schedule</h3>
      <div class="hr-sect">Contact Us</div>
      <div class="contact">
        <ul>
          <li>
            <a href=""><i class="fa fa-facebook"></i></a>
          </li>
          <li>
            <a href=""><i class="fa fa-github"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  text-align: right;
  padding: 10px;
}

.hr-sect {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: black;
  font-weight: 500;
  font-size: 20px;
  margin: 16px 0px;
  padding: 0 24px;
}
.hr-sect:before,
.hr-sect:after {
  content: "";
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.35);
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 8px;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

ul li {
  position: relative;
  list-style: none;
  width: 70px;
  height: 70px;
  margin: 0px 10px;
  border-radius: 50%;
  box-sizing: border-box;
}

ul li:hover {
  opacity: 0.7;
  z-index: 2;
}

ul li a {
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  justify-content: center;
  text-align: center;
  color: white;
  background: black;
  font-size: 20px;
  border-radius: 50%;
  text-decoration: none;
  z-index: 3;
}

ul li:nth-child(1) a,
ul li:nth-child(1):before,
ul li:nth-child(1):after {
  background: linear-gradient(45deg, #3b5998, #3b5998);
}
</style>