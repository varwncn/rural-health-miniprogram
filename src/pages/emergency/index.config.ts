export default typeof definePageConfig === 'function'
  ? definePageConfig({ navigationBarTitleText: '紧急求助' })
  : { navigationBarTitleText: '紧急求助' }
