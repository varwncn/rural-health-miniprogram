export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '完善个人信息'
    })
  : { navigationBarTitleText: '完善个人信息' };
