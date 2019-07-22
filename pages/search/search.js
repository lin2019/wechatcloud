// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '搜索',
    searchKey: '',
    searchContext: '',
    searchList: [],
    hotSearchList: []
  },
  searchContext(e) {
    this.setData({
      searchContext: e.detail.value
    })
    // if (e.detail.cursor !== 0) {
    //   this.setData({
    //     searchText: '取消'
    //   })
    // } else {
    //   this.setData({
    //     searchText: '搜索'
    //   })
    // }  
  },
  search() {
    let that = this;
    let keys = that.data.searchContext
    let index = that.data.searchList.indexOf(keys)
    if (keys !== '') {
      if (index !== -1) {
        that.data.searchList.splice(index, 1);
        that.data.searchList.unshift(keys)
      } else {
        that.data.searchList.unshift(keys)
      }
    }
    wx.request({
      url: 'http://localhost:3000/search',
      data: {'keywords': that.data.searchContext},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        wx.setStorage({
          key: 'keywords',
          data: that.data.searchList,
        });
        wx.navigateTo({
          url: '../query/query',
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  clearRecord() {
    this.setData({
      searchList: []
    });
    wx.removeStorage({
      key: 'keywords'
    })
  },
  recallKeys (e) {
    let recalData = e.currentTarget.dataset.text;
    this.data.searchContext = recalData;
    this.search()
  },
  getHotSearchList () {
    let that = this;
    wx.request({
      url: 'http://localhost:3000/search/hot',
      success(res){
        if (res.data.code === 200) {
          that.setData({
            hotSearchList: res.data.result.hots
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'keywords',
      success: function(res) {
        that.setData({
          searchList: res.data
        })
      }
    });
    this.getHotSearchList();
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