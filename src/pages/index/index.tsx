import { View, Text } from '@tarojs/components';
import { useLoad, setNavigationBarTitle, navigateTo, redirectTo, getStorageSync } from '@tarojs/taro';
import { Activity, Stethoscope, FileText, PhoneCall, Dumbbell, Video, User, Heart } from 'lucide-react-taro';
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

      {/* 健康数据概览 */}
      <View className="health-overview">
        <View className="overview-item">
          <View className="overview-icon">
            <Heart size={24} color="#667eea" />
          </View>
          <Text className="overview-label">今日步数</Text>
          <Text className="overview-value">0</Text>
        </View>
        <View className="overview-divider"></View>
        <View className="overview-item">
          <View className="overview-icon">
            <Heart size={24} color="#764ba2" />
          </View>
          <Text className="overview-label">健康评分</Text>
          <Text className="overview-value">--</Text>
        </View>
      </View>

      {/* 基础服务板块 */}
      <View className="service-section">
        <View className="section-header">
          <View className="section-title">基础服务</View>
          <Text className="section-subtitle">为您提供日常健康管理</Text>
        </View>

        <View className="service-grid">
          {/* 健康资讯 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/health-info/index')}>
            <View className="service-icon-wrapper health-info">
              <Activity size={28} color="#fff" />
            </View>
            <Text className="service-name">健康资讯</Text>
            <Text className="service-desc">获取健康知识和养生建议</Text>
          </View>

          {/* 医疗服务 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/medical-service/index')}>
            <View className="service-icon-wrapper medical-service">
              <Stethoscope size={28} color="#fff" />
            </View>
            <Text className="service-name">医疗服务</Text>
            <Text className="service-desc">村医联系和预约挂号</Text>
          </View>

          {/* 健康档案 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/health-record/index')}>
            <View className="service-icon-wrapper health-record">
              <FileText size={28} color="#fff" />
            </View>
            <Text className="service-name">健康档案</Text>
            <Text className="service-desc">查看个人健康数据和记录</Text>
          </View>
        </View>
      </View>

      {/* 康复服务板块 */}
      <View className="service-section">
        <View className="section-header">
          <View className="section-title">康复服务</View>
          <Text className="section-subtitle">专业康复训练与指导</Text>
        </View>

        <View className="service-grid">
          {/* 康复训练 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/rehab-training/index')}>
            <View className="service-icon-wrapper rehab-training">
              <Dumbbell size={28} color="#fff" />
            </View>
            <Text className="service-name">康复训练</Text>
            <Text className="service-desc">个性化训练计划和视频指导</Text>
          </View>

          {/* 康复设备 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/rehab-equipment/index')}>
            <View className="service-icon-wrapper rehab-equipment">
              <Activity size={28} color="#fff" />
            </View>
            <Text className="service-name">康复设备</Text>
            <Text className="service-desc">设备借用和蓝牙连接管理</Text>
          </View>

          {/* 康复远程指导 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/rehab-guide/index')}>
            <View className="service-icon-wrapper rehab-guide">
              <Video size={28} color="#fff" />
            </View>
            <Text className="service-name">远程指导</Text>
            <Text className="service-desc">在线咨询和康复师视频指导</Text>
          </View>
        </View>
      </View>

      {/* 应急服务板块 */}
      <View className="service-section">
        <View className="section-header">
          <View className="section-title">应急服务</View>
          <Text className="section-subtitle">紧急情况快速响应</Text>
        </View>

        <View className="emergency-card" onClick={() => handleNavigate('/pages/emergency/index')}>
          <View className="emergency-icon-wrapper">
            <PhoneCall size={32} color="#fff" />
          </View>
          <View className="emergency-content">
            <Text className="emergency-title">紧急求助</Text>
            <Text className="emergency-desc">一键呼叫、紧急联系人、位置分享</Text>
          </View>
          <View className="emergency-arrow">
            <Text className="arrow-text">→</Text>
          </View>
        </View>
      </View>

      {/* 个人信息入口 */}
      <View className="user-info-entry">
        <View className="user-info-content" onClick={() => handleNavigate('/pages/user-info/index')}>
          <View className="user-icon-wrapper">
            <User size={24} color="#667eea" />
          </View>
          <View className="user-info-text">
            <Text className="user-info-title">个人信息</Text>
            <Text className="user-info-desc">管理个人基础信息</Text>
          </View>
        </View>
      </View>

      {/* 底部提示 */}
      <View className="footer-tips">
        <Text className="tips-text">定期体检，保持健康生活方式，如有不适及时就医。</Text>
      </View>
    </View>
  );
};

export default IndexPage;
