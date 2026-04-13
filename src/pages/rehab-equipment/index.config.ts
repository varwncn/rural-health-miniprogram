export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '康复设备'
    })
  : { navigationBarTitleText: '康复设备' };
