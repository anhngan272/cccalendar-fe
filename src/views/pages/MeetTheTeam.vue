<template>
  <div class="container">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title title-left text-center text-lg-left">
            <h3 class="top-sep">{{$t('about_page.meet_our_team')}}</h3>
            <!-- <p>
              Lorem ipsum dolor sit amet, consectadetudzdae rcquisc adipiscing
              elit. Aenean socada commodo ligaui egets dolor. Nullam quis ante
              tiam sit ame orci eget erovtiu faucid.
            </p> -->
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4 mb-30">
          <div class="team-item">
            <div class="mb-30 position-relative d-flex align-items-center">
              <span class="socials d-inline-block">
                <!-- <a href="#" style="background:#181717"><i class="fa fa-github"></i></a>
                                <a href="#" style="background:#1877F2"><i class="fa fa-facebook"></i></a> -->
              </span>
              <span class="img-holder d-inline-block">
                <img src="@/assets/images/prof_dang.jpg" alt="Team" />
              </span>
            </div>
            <div class="team-content">
              <h5 class="mb-2">Nguyễn Tuấn Đăng</h5>
              <p class="text-uppercase mb-0">{{$t('about_page.assoc_prof')}}</p>
            </div>
            <div class="team-content">
              <p class="mb-0 email">
                <i class="fa fa-envelope"></i> dangnt@sgu.edu.vn
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-30">
          <div class="team-item">
            <div class="mb-30 position-relative d-flex align-items-center">
              <span class="socials d-inline-block">
                <a
                  href="https://github.com/saidan00"
                  target="_blank"
                  style="background: #181717"
                  ><i class="fa fa-github"></i
                ></a>
                <a
                  href="https://facebook.com/huy.sgh"
                  target="_blank"
                  style="background: #1877f2"
                  ><i class="fa fa-facebook"></i
                ></a>
              </span>
              <span class="img-holder d-inline-block">
                <img src="@/assets/images/member_jaysgh.png" alt="Team" />
              </span>
            </div>
            <div class="team-content">
              <h5 class="mb-2">Võ Hoàng Huy</h5>
              <p class="text-uppercase mb-0">Back-end Developer</p>
            </div>
            <div class="team-content">
              <p class="mb-0 email">
                <i class="fa fa-envelope"></i> huysgh94@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 mb-30">
          <div class="team-item">
            <div class="mb-30 position-relative d-flex align-items-center">
              <span class="socials d-inline-block">
                <a
                  href="https://github.com/anhngan272"
                  target="_blank"
                  style="background: #181717"
                  ><i class="fa fa-github"></i
                ></a>
                <a
                  href="https://facebook.com/h.t.anhngan17"
                  target="_blank"
                  style="background: #1877f2"
                  ><i class="fa fa-facebook"></i
                ></a>
              </span>
              <span class="img-holder d-inline-block">
                <img src="@/assets/images/member_anhngan272.jpg" alt="Team" />
              </span>
            </div>
            <div class="team-content">
              <h5 class="mb-2">Hứa Thị Ánh Ngân</h5>
              <p class="text-uppercase mb-0">Front-end Developer</p>
            </div>
            <div class="team-content">
              <p class="mb-0 email">
                <i class="fa fa-envelope"></i> anhngan272@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  margin-top: 20px;
  background: #eee;
}

/* ===== ABOUT PAGE ===== */
.team-item {
  padding: 35px;
  padding-right: 0;
  position: relative;
  z-index: 0;
  height: 100%;
}

.team-item:after,
.team-item:before {
  content: "";
  position: absolute;
  -webkit-box-shadow: 0 5px 30px 0 rgba(39, 39, 39, 0.15);
  box-shadow: 0 5px 30px 0 rgba(39, 39, 39, 0.15);
  border-radius: 10px;
  z-index: -1;
}

.team-item:before {
  height: 100%;
  background-color: #fff;
  left: 0;
  top: 0;
  right: 30px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.team-item:after {
  height: 6px;
  width: calc(100% - 30px);
  background-color: #4e63d7;
  left: 0;
  bottom: 0;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}

.team-item:hover:after {
  height: 100%;
}

.team-item .img-holder {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-shadow: 0 0 20px 0 rgba(51, 51, 51, 0.2);
  box-shadow: 0 0 20px 0 rgba(51, 51, 51, 0.2);
  border-radius: 10px;
  width: calc(100% - 70px);
  margin-left: 70px;
  overflow: hidden;
}

.team-item .img-holder img {
  border-radius: 10px;
  width: 100%;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  -webkit-transition: all 0.6s ease;
  transition: all 0.6s ease;
}

.team-item:hover .img-holder img {
  -webkit-transform: scale(1);
  transform: scale(1);
}

.team-item .socials {
  position: absolute;
}

.team-item .socials a {
  display: block;
  margin-right: 0;
  margin-bottom: 15px;
  -webkit-box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.12);
}

.team-item .socials a:hover {
  transform: translateY(-7px);
  filter: brightness(150%);
  box-shadow: 5px 5px 2px 0 rgba(0, 0, 0, 0.12);
}

.team-item .socials a:last-of-type {
  margin-bottom: 0;
}

.team-content .email {
  margin-top: 30px;
  text-align: center;
  color: #000000a6 !important;
}

.team-item .team-content {
  margin-right: 70px;
  text-align: center;
}

.team-item .team-content h5 {
  color: #101f41;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.team-item .team-content p {
  color: #4e63d7;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  font-weight: 600;
  font-size: 13px;
}

.team-item:hover .team-content h5,
.team-item:hover .team-content p,
.team-item:hover .email {
  color: #fff !important;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.d-inline-block {
  display: inline-block !important;
}

.socials a {
  width: 35px;
  height: 35px;
  background-color: #6893e1;
  border-radius: 50%;
  -webkit-box-shadow: 0 3px 2px 0 #516cd9;
  box-shadow: 0 3px 2px 0 #516cd9;
  text-align: center;
  color: #fff;
  padding-top: 4px;
  font-size: 20px;
  margin-right: 10px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.mb-2,
.my-2 {
  margin-bottom: 0.5rem !important;
}

h5 {
  font-size: 20px;
  font-weight: bold;
}

.mb-30 {
  margin-bottom: 30px;
}
</style>