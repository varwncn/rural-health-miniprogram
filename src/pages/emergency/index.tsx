import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad, setNavigationBarTitle, makePhoneCall } from '@tarojs/taro';
import { PhoneCall, Bell, Heart, Shield } from 'lucide-react-taro';
import './index.css';

const EmergencyPage = () => {
  useLoad(() => {
    setNavigationBarTitle({
      title: '紧急求助'
    });
  });

  const handleCall = (phone: string) => {
    makePhoneCall({
      phoneNumber: phone
    });
  };

  const emergencyContacts = [
    {
      id: 1,
      name: '120急救',
      icon: Bell,
      color: '#f44336',
      phone: '120',
      desc: '全国统一急救电话'
    },
    {
      id: 2,
      name: '村医',
      icon: Heart,
      color: '#667eea',
      phone: '13800138001',
      desc: '村卫生室值班电话'
    },
    {
      id: 3,
      name: '乡镇卫生院',
      icon: Shield,
      color: '#4caf50',
      phone: '13800138002',
      desc: '乡镇卫生院急诊'
    },
    {
      id: 4,
      name: '家庭联系人',
      icon: PhoneCall,
      color: '#ff9800',
      phone: '13900139000',
      desc: '紧急情况下的家庭联系'
    }
  ];

  const emergencyTips = [
    '遇到紧急情况，立即拨打120',
    '说明具体地点和病情',
    '保持电话畅通，等待救援',
    '如有条件，可先做简单处理',
    '保持冷静，安抚患者情绪'
  ];

  return (
    <View className="emergency-page">
      <View className="header">
        <Text className="header-title">紧急求助</Text>
        <Text className="header-subtitle">一键呼叫，快速求助</Text>
      </View>

      <ScrollView className="content" scrollY>
        <View className="emergency-section">
          <Text className="section-title">紧急联系</Text>
          <View className="contact-list">
            {emergencyContacts.map((item) => {
              const Icon = item.icon;
              return (
                <View key={item.id} className="contact-item" onClick={() => handleCall(item.phone)}>
                  <View className="contact-icon" style={{ background: item.color }}>
                    <Icon size={48} color="#fff" />
                  </View>
                  <View className="contact-info">
                    <Text className="contact-name">{item.name}</Text>
                    <Text className="contact-phone">{item.phone}</Text>
                    <Text className="contact-desc">{item.desc}</Text>
                  </View>
                  <View className="contact-call">
                    <PhoneCall size={48} color="#fff" />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View className="emergency-section">
          <Text className="section-title">急救指南</Text>
          <View className="tips-list">
            {emergencyTips.map((tip, index) => (
              <View key={index} className="tip-item">
                <Text className="tip-number">{index + 1}</Text>
                <Text className="tip-text">{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmergencyPage;
