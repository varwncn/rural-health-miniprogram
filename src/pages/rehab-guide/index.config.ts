export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '康复远程指导'
    })
  : { navigationBarTitleText: '康复远程指导' };
