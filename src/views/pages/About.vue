<template>
  <div class="container-fluid">
    <div class="row" style="padding: 0 80px">
      <div class="col-lg-6 col-md-12">
        <a-divider style="font-size: 25px">Our Mission</a-divider>
        <h4 style="text-align: center">bla bla bla</h4>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <a-divider style="font-size: 25px">Special Thanks</a-divider>
        <div class="row">
          <div class="col-lg-5 col-md-12 col-sm-12">
            <img src="@/assets/avatar.png" class="avatar dang" />
          </div>
          <div class="col-md-7 info">
            <span> <h4>PGS. TS. Nguyễn Tuấn Đăng</h4> </span>
            <div>
              <h5 style="color: #808080; font-weight: 500">
                Asscociate Professor Ph.D
              </h5>
            </div>
            <div class="contact">
              <span class="mail"
                ><i class="fa fa-envelope"></i> dangnt@sgu.edu.vn</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div style="padding: 0 80px">
      <a-divider style="font-size: 25px">Our Team</a-divider>
    </div>
    <div class="row" style="padding: 0 80px">
      <div class="col-lg-6 col-md-12">
        <div class="row">
          <div class="col-sm-5">
            <img src="@/assets/avatar.png" class="avatar huy" />
          </div>
          <div class="col-sm-7 info">
            <span> <h4>VÕ HOÀNG HUY</h4> </span>
            <div>
              <h5 style="color: #808080; font-weight: 500">Back-end</h5>
              <h6 style="color: #808080; font-weight: 500">Class: DCT1173</h6>
            </div>
            <div class="contact">
              <span class="mail"
                ><i class="fa fa-envelope"></i> huysgh94@gmail.com</span
              >
              <ul>
                <li class="facebook">
                  <a href=""><i class="fa fa-facebook"></i></a>
                </li>
                <li class="github">
                  <a href=""><i class="fa fa-github"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12">
        <div class="row">
          <div class="col-sm-5">
            <img src="@/assets/avatar.png" class="avatar ngan" />
          </div>
          <div class="col-sm-7 info">
            <span> <h4>HỨA THỊ ÁNH NGÂN</h4> </span>
            <div>
              <h5 style="color: #808080; font-weight: 500">Front-end</h5>
              <h6 style="color: #808080; font-weight: 500">Class: DCT1171</h6>
            </div>
            <div class="contact">
              <span class="mail"
                ><i class="fa fa-envelope"></i> anhngan272@gmail.com</span
              >
              <ul>
                <li class="facebook">
                  <a href=""><i class="fa fa-facebook"></i></a>
                </li>
                <li class="github">
                  <a href=""><i class="fa fa-github"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr />
  </div>
</template>

<style scoped>
.mail {
  color: #808080;
  font-size: 17px;
}

.info {
  padding: 10px 0px;
}

.ant-divider-horizontal.ant-divider-with-text-center::before,
.ant-divider-horizontal.ant-divider-with-text-center::after {
  border-top: 0.5px solid rgba(0, 0, 0, 0.3);
}

.avatar {
  border-radius: 50%;
  height: 200px;
  margin-left: 30px;
  border: 4px solid white;
}

.avatar.dang {
  box-shadow: 0 0 0 3px rgb(134, 44, 134);
}

.avatar.huy {
  box-shadow: 0 0 0 3px rgb(84, 107, 238);
}

.avatar.ngan {
  box-shadow: 0 0 0 3px rgb(236, 89, 175);
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  /* justify-content: center; */
}

ul li {
  position: relative;
  list-style: none;
  width: 35px;
  height: 35px;
  margin: 10px;
  border-radius: 50%;
  box-sizing: border-box;
}

ul li:hover {
  opacity: 0.7;
  /* z-index: 2; */
  transform: translateY(-7px);
}

ul li a {
  display: flex;
  align-items: center;
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  justify-content: center;
  text-align: center;
  color: white;
  background: black;
  font-size: 17px;
  border-radius: 50%;
  text-decoration: none;
  /* z-index: 3; */
}

ul li:nth-child(1) a,
ul li:nth-child(1):before,
ul li:nth-child(1):after {
  background: linear-gradient(45deg, #3b5998, #3b5998);
}
</style>