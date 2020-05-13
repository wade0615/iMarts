var app = new Vue({
  el: '#app',
  data: {
    scanner: null,
    activeCameraId: null,
    cameras: [],
    scans: [],
    test: 'test alert',
  },
  mounted: function () {
    var self = this;
    self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
    self.scanner.addListener('scan', function (content, image) {
      self.scans.unshift({ date: +(Date.now()), content: content });
      window.alert('this.test',this.test);
      window.alert(this.test);
      window.alert(this.scans[scans.length - 1].content);
    });
    Instascan.Camera.getCameras().then(function (cameras) {//取得設備的相機數目
      self.cameras = cameras;
      if (cameras.length > 0) {//若設備相機數目大於0 則先開啟最後一個相機
        self.activeCameraId = cameras[cameras.length - 1].id;
        self.scanner.start(cameras[cameras.length - 1]);
      } else {
        console.error('No cameras found.');//若設備沒有相機數量則顯示"No cameras found";
      }
    }).catch(function (e) {
      console.error(e);
    });
  },
  methods: {
    formatName: function (name) {
      return name || '(unknown)';
    },
    selectCamera: function (camera) {
      this.activeCameraId = camera.id;
      this.scanner.start(camera);
    }
  }
});
