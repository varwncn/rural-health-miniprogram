import { View, Text } from '@tarojs/components';
import { useLoad, setNavigationBarTitle, navigateTo, redirectTo, getStorageSync } from '@tarojs/taro';
import { Activity, Stethoscope, FileText, PhoneCall, Dumbbell, Video } from 'lucide-react-taro';
import './index.css';

const IndexPage = () => {
  useLoad(() => {
    setNavigationBarTitle({
      title: '乡村永健'
    });

    // 检查是否首次进入，如果未填写基础信息则跳转到信息填写页面
    const hasCompletedUserInfo = getStorageSync('hasCompletedUserInfo');
    if (!hasCompletedUserInfo) {
      redirectTo({
        url: '/pages/user-info/index'
      });
    }
  });

  const handleNavigate = (path: string) => {
    navigateTo({
      url: path
    });
  };

  return (
    <View className="home-page">
      {/* 头部Banner */}
      <View className="header-banner">
        <View className="header-content">
          <Text className="header-title">乡村永健</Text>
          <Text className="header-subtitle">为乡村居民提供便捷健康服务</Text>
        </View>
      </View>

      {/* 功能导航 */}
      <View className="nav-container">
        <View className="nav-title">
          <Text className="nav-title-text">健康服务</Text>
        </View>

        <View className="nav-grid">
          {/* 健康资讯 */}
          <View className="nav-item" onClick={() => handleNavigate('/pages/health-info/index')}>
            <View className="nav-icon health-info">
              <Activity size={32} color="#fff" />
            </View>
            <Text className="nav-text">健康资讯</Text>
            <Text className="nav-desc">健康知识 · 预防保健</Text>
          </View>

          {/* 医疗服务 */}
          <View className="nav-item" onClick={() => handleNavigate('/pages/medical-service/index')}>
            <View className="nav-icon medical-service">
              <Stethoscope size={32} color="#fff" />
            </View>
            <Text className="nav-text">医疗服务</Text>
            <Text className="nav-desc">村医联系 · 预约挂号</Text>
          </View>

          {/* 健康档案 */}
          <View className="nav-item" onClick={() => handleNavigate('/pages/health-record/index')}>
            <View className="nav-icon health-record">
              <FileText size={32} color="#fff" />
            </View>
            <Text className="nav-text">健康档案</Text>
            <Text className="nav-desc">个人数据 · 就诊记录</Text>
          </View>

          {/* 紧急求助 */}
          <View className="nav-item" onClick={() => handleNavigate('/pages/emergency/index')}>
            <View className="nav-icon emergency">
              <PhoneCall size={32} color="#fff" />
            </View>
            <Text className="nav-text">紧急求助</Text>
            <Text className="nav-desc">一键呼叫 · 急救指南</Text>
          </View>
        </View>
      </View>

      {/* 康复服务 */}
      <View className="nav-container">
        <View className="nav-title">
          <Text className="nav-title-text">康复服务</Text>
        </View>

        <View className="nav-grid">
          {/* 康复训练 */}
          <View className="nav-item" onClick={() => handleNavigate('/pages/rehab-training/index')}>
            <View className="nav-icon rehab-training">
              <Dumbbell size={32} color="#fff" />
            </View>
            <Text className="nav-text">康复训练</Text>
            <Text className="nav-desc">训练计划 · 视频指导</Text>
          </View>

          {/* 康复设备 */}
          <View className="nav-item" onClick={() => handleNavigate('/pages/rehab-equipment/index')}>
            <View className="nav-icon rehab-equipment">
              <Activity size={32} color="#fff" />
            </View>
            <Text className="nav-text">康复设备</Text>
            <Text className="nav-desc">设备借用 · 使用教程</Text>
          </View>

          {/* 康复远程指导 */}
          <View className="nav-item" onClick={() => handleNavigate('/pages/rehab-guide/index')}>
            <View className="nav-icon rehab-guide">
              <Video size={32} color="#fff" />
            </View>
            <Text className="nav-text">远程指导</Text>
            <Text className="nav-desc">在线咨询 · 视频通话</Text>
          </View>
        </View>
      </View>

      {/* 健康提示 */}
      <View className="tips-container">
        <Text className="tips-title">温馨提示</Text>
        <Text className="tips-text">定期体检，保持健康生活方式，如有不适及时就医。</Text>
      </View>
    </View>
  );
};

export default IndexPage;
