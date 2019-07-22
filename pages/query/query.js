// pages/query/query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allType:[
      {
        'type': 1,
        'name': '单曲 '
      },
      {
        'type': 10,
        'name': '专辑 '
      },
      {
        'type': 100,
        'name': '歌手 '
      },
      {
        'type': 1000,
        'name': '歌单 '
      },
      {
        'type': 1002,
        'name': '用户 '
      },
      {
        'type': 1004,
        'name': 'MV '
      },
      {
        'type': 1006,
        'name': '歌词 '
      },
      {
        'type': 1009,
        'name': '电台 '
      }, {
        'type': 1014,
        'name': '视频 '
      }
    ],
    selectType: 1,
    autoHeight: 0,
    defaultHeight: 0,
    currentPage: 0,
    key: '',
    result: {},
    resultList: [],
    counts: 0,
    loading: false,
    page: 1,
    pages: 0
  },
  resetObj () {
    let arr = [];
    let obj = this.data.result
    for(let key in obj){
      arr.push(obj[key])
    }
    this.setData({
      resultList: arr[0],
      counts: arr[arr.length-1],
      autoHeight: arr[0].length * 120,
      pages: arr[arr.length - 1] / 30
    })
  },
  getFirstQuery () {
    let that = this;
    wx.getStorage({
      key: 'keywords',
      success: function(res) {
        that.setData({
          key: res.data[0]
        });
        wx.request({
          url: 'http://localhost:3000/search',
          data: {
            keywords: that.data.key
          },
          success(res){
            if (res.data.code === 200) {
              that.setData({
                result: res.data.result
              })
            }
            that.resetObj();
          }
        })
      },
    });
  },
  switchNav (e) {
    let that = this;
    let cur = e.target.dataset.current;
    let num = e.currentTarget.dataset.id.type;
    if (that.data.currentPage == cur) {
      return false
    } else {
      that.setData({
        currentPage: cur,
        selectType: num
      })
    }
    wx.request({
      url: 'http://localhost:3000/search',
      data: {
        'keywords': this.data.key,
        'type': num
      },
      success(res){
        if (res.data.code === 200) {
          that.setData({
            result: res.data.result,
            page: 1
          })
        }
        that.resetObj();
      }
    })
  },
  switchTab (e) {
    let that = this;
    let num = e.detail.currentItemId;
    that.setData({
      currentPage: e.detail.current,
      selectType: num
    })
    wx.request({
      url: 'http://localhost:3000/search',
      data: {
        'keywords': this.data.key,
        'type': num
      },
      success(res) {
        if (res.data.code === 200) {
          that.setData({
            result: res.data.result,
            page: 1
          })
        }
        that.resetObj();
      }
    })
  },
  pullUp (pageNo) {
    let that = this;
    that.setData({
      loading: true
    })
    wx.request({
      url: 'http://localhost:3000/search',
      data: {
        keywords: that.data.key,
        type: that.data.selectType,
        limit: 30,
        offset: (that.data.page - 1) * 30
      },
      success(res){
        if (res.data.code) {
          let arr = []
          let obj = res.data.result
          for (let item in obj) {
            arr.push(obj[item])
          }
          console.log(arr)
          that.setData({
            page: pageNo,
            resultList: that.data.resultList.concat(arr[0]),
            autoHeight: that.data.resultList.length * 120
          })
        }
      },
      complete(res) {
        that.setData({
          loading: false
        })
      }
    })
  },
  linkToSong (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          defaultHeight: 750 / res.windowWidth * res.windowHeight
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getFirstQuery();
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
    this.pullUp(this.data.page + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})