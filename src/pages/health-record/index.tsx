import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { Heart, Activity, Calendar, TrendingUp } from 'lucide-react-taro';
import './index.css';

const HealthRecordPage = () => {
  useLoad(() => {
    // 设置页面标题
  });

  const healthData = [
    {
      id: 1,
      type: '血压',
      value: '120/80',
      unit: 'mmHg',
      icon: Heart,
      color: '#667eea',
      status: '正常',
      date: '2024-03-15'
    },
    {
      id: 2,
      type: '心率',
      value: '72',
      unit: '次/分',
      icon: Activity,
      color: '#f5576c',
      status: '正常',
      date: '2024-03-15'
    },
    {
      id: 3,
      type: '血糖',
      value: '5.6',
      unit: 'mmol/L',
      icon: TrendingUp,
      color: '#4facfe',
      status: '正常',
      date: '2024-03-14'
    },
    {
      id: 4,
      type: '体重',
      value: '65',
      unit: 'kg',
      icon: Activity,
      color: '#fa709a',
      status: '正常',
      date: '2024-03-13'
    }
  ];

  return (
    <View className="health-record-page">
      <View className="header">
        <Text className="header-title">健康档案</Text>
        <Text className="header-subtitle">个人健康数据记录</Text>
      </View>

      <ScrollView className="content" scrollY>
        <View className="data-grid">
          {healthData.map((item) => {
            const Icon = item.icon;
            return (
              <View key={item.id} className="data-card">
                <View className="data-icon" style={{ background: item.color }}>
                  <Icon size={24} color="#fff" />
                </View>
                <View className="data-content">
                  <Text className="data-type">{item.type}</Text>
                  <View className="data-value-row">
                    <Text className="data-value">{item.value}</Text>
                    <Text className="data-unit">{item.unit}</Text>
                  </View>
                  <View className="data-status-row">
                    <Text className={`data-status ${item.status === '正常' ? 'normal' : 'abnormal'}`}>
                      {item.status}
                    </Text>
                    <Text className="data-date">{item.date}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View className="record-tips">
          <Calendar size={20} color="#666" />
          <Text className="record-tips-text">建议每周定期测量并记录健康数据</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HealthRecordPage;
