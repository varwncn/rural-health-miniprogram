import { View, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { useLoad, setNavigationBarTitle, navigateTo, redirectTo, getStorageSync, getWeRunData } from '@tarojs/taro';
import { Activity, Stethoscope, FileText, PhoneCall, Dumbbell, Video, User, Heart, Footprints } from 'lucide-react-taro';
import './index.css';

const IndexPage = () => {
  const [steps, setSteps] = useState<number>(0);
  const [healthScore, setHealthScore] = useState<number>(0);

  // 获取微信运动步数
  const fetchWeRunData = async (retryCount = 0) => {
    try {
      console.log(`开始获取微信运动数据 (尝试 ${retryCount + 1}次)...`);

      // 设置超时时间为 10 秒
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('请求超时')), 10000);
      });

      const res = await Promise.race([
        getWeRunData(),
        timeoutPromise
      ]) as any;

      if (res && res.encryptedData && res.iv) {
        console.log('✓ 微信运动数据获取成功');
        // 加密数据需要在后端解密（这里暂时使用模拟数据）
        // 实际项目中需要将 encryptedData 和 iv 发送到后端进行解密
        console.log('微信运动数据（加密）:', res.encryptedData);

        // 临时使用模拟数据（实际应该从后端获取解密后的步数）
        const mockSteps = Math.floor(Math.random() * 10000) + 3000; // 模拟 3000-13000 步
        setSteps(mockSteps);

        // 根据步数计算健康评分（简单算法）
        let score = 60; // 基础分
        if (mockSteps >= 10000) score = 95;
        else if (mockSteps >= 8000) score = 85;
        else if (mockSteps >= 6000) score = 75;
        else if (mockSteps >= 4000) score = 65;

        setHealthScore(score);
      } else {
        console.warn('微信运动数据为空，使用模拟数据');
        useMockData();
      }
    } catch (error: any) {
      console.error('获取运动数据失败:', error);

      // 如果是超时或网络错误，重试一次
      if (retryCount < 1 && (error.message === '请求超时' || error.message?.includes('timeout'))) {
        console.log('首次失败，尝试重试...');
        setTimeout(() => fetchWeRunData(retryCount + 1), 2000);
        return;
      }

      // 最终失败时使用模拟数据（不使用任何API）
      console.log('✓ 使用模拟数据（降级方案）');
      useMockData();
    }
  };

  // 使用模拟数据
  const useMockData = () => {
    const mockSteps = Math.floor(Math.random() * 8000) + 2000;
    setSteps(mockSteps);
    setHealthScore(70);
  };

  useEffect(() => {
    // 延迟2秒再获取数据，确保小程序完全初始化
    const timer = setTimeout(() => {
      console.log('开始初始化健康数据...');
      fetchWeRunData();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
            <Footprints size={48} color="#667eea" />
          </View>
          <Text className="overview-label">今日步数</Text>
          <Text className="overview-value">{steps.toLocaleString()}</Text>
          <Text className="overview-unit">步</Text>
        </View>
        <View className="overview-divider"></View>
        <View className="overview-item">
          <View className="overview-icon">
            <Heart size={48} color="#764ba2" />
          </View>
          <Text className="overview-label">健康评分</Text>
          <Text className="overview-value">{healthScore}</Text>
          <Text className="overview-unit">分</Text>
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
              <Activity size={40} color="#fff" />
            </View>
            <Text className="service-name">健康资讯</Text>
            <Text className="service-desc">获取健康知识和养生建议</Text>
          </View>

          {/* 医疗服务 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/medical-service/index')}>
            <View className="service-icon-wrapper medical-service">
              <Stethoscope size={40} color="#fff" />
            </View>
            <Text className="service-name">医疗服务</Text>
            <Text className="service-desc">村医联系和预约挂号</Text>
          </View>

          {/* 健康档案 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/health-record/index')}>
            <View className="service-icon-wrapper health-record">
              <FileText size={40} color="#fff" />
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
              <Dumbbell size={40} color="#fff" />
            </View>
            <Text className="service-name">康复训练</Text>
            <Text className="service-desc">个性化训练计划和视频指导</Text>
          </View>

          {/* 康复设备 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/rehab-equipment/index')}>
            <View className="service-icon-wrapper rehab-equipment">
              <Activity size={40} color="#fff" />
            </View>
            <Text className="service-name">康复设备</Text>
            <Text className="service-desc">设备借用和蓝牙连接管理</Text>
          </View>

          {/* 康复远程指导 */}
          <View className="service-card" onClick={() => handleNavigate('/pages/rehab-guide/index')}>
            <View className="service-icon-wrapper rehab-guide">
              <Video size={40} color="#fff" />
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
            <PhoneCall size={48} color="#fff" />
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
            <User size={40} color="#667eea" />
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
