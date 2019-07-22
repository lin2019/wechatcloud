// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songInfo: {},
    songUrl: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://localhost:3000/song/detail',
      data: {
        ids: options.id
      },
      success(res){
        if (res.data.code === 200) {
          that.setData({
            songInfo: res.data.songs[0]
          })
        }
      }
    })
    wx.request({
      url: 'http://localhost:3000/song/url',
      data: {
        id: options.id
      },
      success(res){
        if (res.data.code === 200) {
          that.setData({
            songUrl: res.data.data[0]
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.setSrc(this.data.songUrl);
    this.audioCtx.play();
  },
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  audio14() {
    this.audioCtx.seek(14)
  },
  audioStart() {
    this.audioCtx.seek(0)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})