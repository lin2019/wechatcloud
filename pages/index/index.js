// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendSongSheet: [],
    hotTopic: []
  },
  getRandom(arr, count) {
    let newArr = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = newArr[index];
      newArr[index] = newArr[i];
      newArr[i] = temp;
    }
    return newArr.slice(min);
  },
  getBannerList() {
    let that = this;
    wx.request({
      url: 'http://localhost:3000/banner?type=2',
      success(res){
        // console.log(res.data);
        if (res.data.code === 200) {
          that.setData({
            bannerList: res.data.banners
          })
        }
      }
    })
  },
  getCommendSongSheet() {
    let that = this;
    wx.request({
      url: 'http://localhost:3000/personalized',
      success(res) {
        // console.log(res.data);
        if (res.data.code === 200) {
          let newResult = that.getRandom(res.data.result, 6);
          that.setData({
            recommendSongSheet: newResult
          })
        }
      }
    })
  },
  getHotTopic() {
    let that = this;
    wx.request({
      url: 'http://localhost:3000/hot/topic?limit=30&offset=30',
      success(res) {
        console.log(res.data);
        if (res.data.code === 200) {
          that.setData({
            hotTopic: res.data.hot
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerList();
    this.getCommendSongSheet();
    this.getHotTopic();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    let that = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: 'http://localhost:3000/personalized',
      success(res) {
        if (res.data.code === 200) {
          let newResult = that.getRandom(res.data.result, 6);
          that.setData({
            recommendSongSheet: newResult
          })
        }
      },
      complete(){
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
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