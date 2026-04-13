import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad, makePhoneCall } from '@tarojs/taro';
import { Phone, Clock, MapPin, Stethoscope, Building } from 'lucide-react-taro';
import './index.css';

const MedicalServicePage = () => {
  useLoad(() => {
    // 设置页面标题
  });

  const handleCall = (phone: string) => {
    makePhoneCall({
      phoneNumber: phone
    });
  };

  const services = [
    {
      id: 1,
      name: '村卫生室',
      icon: Stethoscope,
      color: '#667eea',
      doctor: '王医生',
      phone: '13800138001',
      address: '村东头村委会旁',
      hours: '8:00-18:00',
      services: ['常见病诊疗', '健康检查', '疫苗接种']
    },
    {
      id: 2,
      name: '乡镇卫生院',
      icon: Building,
      color: '#f5576c',
      doctor: '李医生',
      phone: '13800138002',
      address: '镇中心路88号',
      hours: '24小时',
      services: ['急诊', '住院', '手术', '体检']
    },
    {
      id: 3,
      name: '县级医院',
      icon: MapPin,
      color: '#4facfe',
      doctor: '张医生',
      phone: '13800138003',
      address: '县城健康大道12号',
      hours: '24小时',
      services: ['专科门诊', '住院', '手术', '急诊']
    }
  ];

  return (
    <View className="medical-service-page">
      <View className="header">
        <Text className="header-title">医疗服务</Text>
        <Text className="header-subtitle">便民医疗服务信息</Text>
      </View>

      <ScrollView className="content" scrollY>
        <View className="service-list">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <View key={item.id} className="service-item">
                <View className="service-header">
                  <View className="service-icon" style={{ background: item.color }}>
                    <Icon size={24} color="#fff" />
                  </View>
                  <View className="service-info">
                    <Text className="service-name">{item.name}</Text>
                    <Text className="service-doctor">值班医生：{item.doctor}</Text>
                  </View>
                </View>

                <View className="service-details">
                  <View className="detail-item">
                    <Phone size={16} color="#666" />
                    <Text className="detail-text" onClick={() => handleCall(item.phone)}>
                      {item.phone}
                    </Text>
                  </View>

                  <View className="detail-item">
                    <MapPin size={16} color="#666" />
                    <Text className="detail-text">{item.address}</Text>
                  </View>

                  <View className="detail-item">
                    <Clock size={16} color="#666" />
                    <Text className="detail-text">{item.hours}</Text>
                  </View>
                </View>

                <View className="service-services">
                  <Text className="service-services-title">提供服务：</Text>
                  <View className="service-tags">
                    {item.services.map((service, index) => (
                      <Text key={index} className="service-tag">{service}</Text>
                    ))}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalServicePage;
