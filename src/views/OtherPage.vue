<template>
  <div class="other-page">
    <h3>您的浏览器版本较低</h3>
    <p>为了更好的体验，推荐使用以下浏览器</p>
    <img src="@/assets/images/main/chrome.png" alt />
    <!-- <div>
      <a
        href="http://redirector.gvt1.com/edgedl/release2/chrome/Aqb3rFqdNH0EIK147khk0Q_83.0.4103.97/83.0.4103.97_chrome_installer.exe"
      >32位</a>

      <a
        href="http://redirector.gvt1.com/edgedl/release2/chrome/H7LN4Gjw529coJwgj1TOFA_83.0.4103.97/83.0.4103.97_chrome_installer.exe"
      >64位</a>
    </div> -->
     <div>
      <a
        href="http://50.73.70.116:8080/83.0.4103.97_chrome_installerX32.exe"
      >32位</a>

      <a
        href="http://50.73.70.116:8080/83.0.4103.97_chrome_installer.exe"
      >64位</a>
    </div>
  </div>
</template>
<style scoped>
.other-page {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #162e52;
  text-align: center;
  color: #fff;
}

.other-page h3 {
  margin-top: 200px;

  font-size: 30px;
}

.other-page p {
  font-size: 26px;
  margin: 20px;
}

.other-page img {
  width: 80px;
  height: 80px;
}

.other-page a {
  color: #fff;
  margin: 10px;
}
</style>