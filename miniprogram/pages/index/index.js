const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    articles: [],
    search_articles: [],
    showTop: true,
    isHide: true,
    hnode: [{
      _id: "1",
      index_id: "1",
      node: '<img style="border-radius:15px; width: 862px !important; height: auto !important; vertical-align: middle; visibility: visible !important; max-width: 100%; " src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587724074005&di=b3800cdcb75980d4dadda205e2db7329&imgtype=0&src=http%3A%2F%2F3580.wangid.com%2Ftemplate_xin%2Fmingxingbao%2Fimg%2Fmxb.gif" crossorigin="anonymous" data-w="1080" data-type="jpeg" data-src="https://mmbiz.qpic.cn/mmbiz_jpg/VzFuMauwoqTc6bRD4ibOr9ib60UjMDe4jLVkxsI8zYVAibUfFdEibricL0C3fwrIFJlWCIAsZ0yULMvJgZggtOniaqGA/640?wx_fmt=jpeg" data-ratio="0.3740741" _width="862px" data-fail="0">'
    },
    ],
  },

  onLoad: function() {
    
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onPageScroll: function(e){
    if(e.scrollTop > 500)
    {
      this.setData({
        showTop: false
      })
    }
    else
    {
      this.setData({
        showTop: true
      })
    }
  },

  showinfo: function(){
    console.log(this.data.articles);
  },

  preview: function (e) {
    wx.previewImage({
      current: e.target.dataset.action,
      urls: [e.target.dataset.action]
    })
  },

  getUserInfo: function () {
    var that = this
    wx.login({
      success: res => {
      }
    })
    wx.getSetting({
      success:function(res){
        if (res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: res => {
            }
          })
        }
        else{
          
          wx.showToast({
            title: '⊗您拒绝了授权',
            icon:'none'
          })
        }
      }
    }),

    function _getUserInfo() {
    wx.getUserInfo({
      success: function (res) {
        console.log(res.data);
      }
    })
    }
  },
  
  goTop: function(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  goto_articlelist: function(){
    wx.navigateTo({
      url: '../../pages/articlelist/articlelist',
    })
  },

  goto_user_profile: function(){
    if(!app.globalData.data_status)
    {
      wx.showToast({
        title: '加载中，请稍候',
        icon: "none"
      })
    }
    else
    {
      wx.navigateTo({
        url: '../../pages/user_profile/user_profile',
      })
    }
  },

  goto_eventlist: function(){
    wx.navigateTo({
      url: '../../pages/eventlist/eventlist',
    })
  },

  goto_locate: function(){
    wx.navigateTo({
      url: '../../pages/locate/locate',
    })
  }
})
