export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '康复训练'
    })
  : { navigationBarTitleText: '康复训练' };
