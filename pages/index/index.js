//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    photos: [],
    photo_urls: [],
    urlarray: []
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    var that = this;
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'https://gavingu.cn:444/index_image_list', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var urls = [];
        var urlarray = [];
        for (var i in res.data){
          // res.data[i].urls.thumbnailUrl = 'https://gavingu.cn:444' + res.data[i].urls.thumbnailUrl ;
          // res.data[i].thumb_src = 'https://gavingu.cn:444' + res.data[i].thumb_src;
          urls.push(res.data[i].urls);
          urlarray.push(res.data[i].urls.url)
        }
        that.setData({
          photos : res.data,
          photo_urls : urls,
          urlarray: urlarray
        })
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  cusImageTap: function (e) {
    for (var photo in this.data.photos) {
      if (this.data.photos[photo]._id == e.currentTarget.id) {
        console.log(this.data.photos[photo]._id);
        wx.previewImage({
          current: this.data.photos[photo].urls.url, // 当前显示图片的http链接
          urls: this.data.urlarray // 需要预览的图片http链接列表
        })
      }
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  }
})
