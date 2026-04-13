import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Calendar, Heart, Activity, Shield } from 'lucide-react-taro';
import './index.css';

const HealthInfoPage = () => {
  useLoad(() => {
    // 设置页面标题
  });

  const infoList = [
    {
      id: 1,
      title: '春季传染病预防',
      icon: Shield,
      color: '#667eea',
      content: '春季是传染病高发季节，要注意个人卫生，勤洗手，避免去人群密集场所。',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: '高血压患者的日常管理',
      icon: Heart,
      color: '#f5576c',
      content: '定期测量血压，按时服药，低盐饮食，适量运动，保持良好心态。',
      date: '2024-03-12'
    },
    {
      id: 3,
      title: '合理膳食指南',
      icon: Activity,
      color: '#4facfe',
      content: '均衡营养，多吃蔬菜水果，少吃高油高盐食物，按时规律进餐。',
      date: '2024-03-10'
    },
    {
      id: 4,
      title: '老年人保健要点',
      icon: Calendar,
      color: '#fa709a',
      content: '定期体检，保持适当运动，充足睡眠，保持社交活动，注意防跌倒。',
      date: '2024-03-08'
    }
  ];

  return (
    <View className="health-info-page">
      <View className="header">
        <Text className="header-title">健康资讯</Text>
        <Text className="header-subtitle">守护乡村居民健康</Text>
      </View>

      <ScrollView className="content" scrollY>
        <View className="info-list">
          {infoList.map((item) => {
            const Icon = item.icon;
            return (
              <View key={item.id} className="info-item">
                <View className="info-icon" style={{ background: item.color }}>
                  <Icon size={48} color="#fff" />
                </View>
                <View className="info-content">
                  <Text className="info-title">{item.title}</Text>
                  <Text className="info-text">{item.content}</Text>
                  <Text className="info-date">{item.date}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HealthInfoPage;
