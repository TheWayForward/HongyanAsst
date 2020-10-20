// pages/register/register.js
Page({
  data: {
    success: false,
    //获取验证码的 button 上的文字
    butText: 'Get encrypted',
    //验证码冷却时间
    cooldwTime: 61,
    //验证码按钮是否被禁用
    ifDisabled: false,
    //手机号码
    phoneNum: '',
    encrCodeIn: '',
    encrCodeTr: '',
    passWordIn: '',
    passWordRp: ''
  },

  //处理手机号输入
  inputPhone: function (e) {this.setData ({phoneNum: e.detail.value})},

  //获取验证码
  encrCodeGain: function () {
  },

  //读取输入的验证码
  encrCodeRd: function (e) {
    console.log('[Local][encrCodeRd] ', e);
    this.setData ({encrCodeIn: e.detail.value})
  },

  //处理首次输入的密码
  pwInput: function (e) {
    console.log ('[Local][pwInput] ', e);
    this.setData ({
      passWordIn: e.detail.value
    })
  },

  //处理再次输入的密码
  pwRepeat: function (e) {
    console.log ('[Local][pwRepeat] ', e);
    this.setData ({
      passWordRp: e.detail.value
    })
  },

  //提交
  subMit: function (e) {
    if (this.data.encrCode == '') {
      wx.showToast ({
        title: 'Please input your encrypt code.'
      })
      return;
    } else if (this.data.encrCodeIn != this.data.encrCodeTr) {
      wx.showToast ({
        title: 'Encrypt code Err.'
      })
      return;
    } else if (this.data.passWordIn == '') {
      wx.showToast ({
        title: 'Please ipnut your password.'
      })
      return;
    } else if (this.data.passWordIn != this.data.passWordRp) {
      wx.showToast ({
        title: 'Pw Err.'
      })
      return;
    } else {

    }
  }
})