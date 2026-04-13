import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad, showToast, makePhoneCall } from '@tarojs/taro';
import { Dumbbell, Calendar, BookOpen, Phone, Clock } from 'lucide-react-taro';
import './index.css';

const RehabEquipmentPage = () => {
  useLoad(() => {
    // 设置页面标题
  });

  const handleReserve = () => {
    showToast({
      title: '预约成功',
      icon: 'success'
    });
  };

  const handleCall = (phone: string) => {
    makePhoneCall({
      phoneNumber: phone
    });
  };

  const equipment = [
    {
      id: 1,
      name: '康复训练器械',
      image: '🏋️',
      type: '力量训练',
      description: '用于增强肌肉力量和关节活动度',
      location: '村卫生室',
      stock: 3,
      phone: '13800138001',
      features: ['可调节阻力', '安全保护装置', '适合多种康复需求']
    },
    {
      id: 2,
      name: '平衡训练器',
      image: '⚖️',
      type: '平衡训练',
      description: '提高身体平衡能力和协调性',
      location: '乡镇卫生院',
      stock: 2,
      phone: '13800138002',
      features: ['多级难度', '实时反馈', '预防跌倒']
    },
    {
      id: 3,
      name: '理疗仪器',
      image: '🔌',
      type: '物理治疗',
      description: '缓解疼痛，促进组织修复',
      location: '乡镇卫生院',
      stock: 5,
      phone: '13800138002',
      features: ['多种模式', '安全有效', '专业设备']
    },
    {
      id: 4,
      name: '助行器具',
      image: '🚶',
      type: '辅助行走',
      description: '帮助行走不便患者安全行走',
      location: '村卫生室',
      stock: 8,
      phone: '13800138001',
      features: ['轻便易携', '可调节高度', '防滑设计']
    }
  ];

  const usageTips = [
    '使用前请仔细阅读使用说明',
    '首次使用请在专业人员指导下进行',
    '使用过程中如出现不适立即停止',
    '定期检查设备安全性能',
    '使用后请及时归还或妥善保管'
  ];

  return (
    <View className="rehab-equipment-page">
      <View className="header">
        <Text className="header-title">康复设备</Text>
        <Text className="header-subtitle">专业设备，助力康复</Text>
      </View>

      <ScrollView className="content" scrollY>
        {/* 设备列表 */}
        <View className="section">
          <Text className="section-title">可用设备</Text>
          <View className="equipment-list">
            {equipment.map((item) => (
              <View key={item.id} className="equipment-card">
                <View className="equipment-header">
                  <View className="equipment-icon">
                    <Text className="equipment-emoji">{item.image}</Text>
                  </View>
                  <View className="equipment-info">
                    <Text className="equipment-name">{item.name}</Text>
                    <Text className="equipment-type">{item.type}</Text>
                  </View>
                </View>

                <Text className="equipment-desc">{item.description}</Text>

                <View className="equipment-details">
                  <View className="detail-item">
                    <BookOpen size={16} color="#666" />
                    <Text className="detail-text">位置：{item.location}</Text>
                  </View>

                  <View className="detail-item">
                    <Dumbbell size={16} color="#666" />
                    <Text className="detail-text">库存：{item.stock} 件</Text>
                  </View>

                  <View className="detail-item">
                    <Phone size={16} color="#666" />
                    <Text className="detail-text" onClick={() => handleCall(item.phone)}>
                      联系：{item.phone}
                    </Text>
                  </View>
                </View>

                <View className="equipment-features">
                  {item.features.map((feature, index) => (
                    <View key={index} className="feature-tag">
                      <Text className="feature-text">{feature}</Text>
                    </View>
                  ))}
                </View>

                <View
                  className="equipment-action"
                  onClick={() => handleReserve()}
                >
                  <Calendar size={18} color="#fff" />
                  <Text className="action-text">预约借用</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 使用说明 */}
        <View className="section">
          <Text className="section-title">使用说明</Text>
          <View className="tips-card">
            <View className="tips-header">
              <Clock size={20} color="#667eea" />
              <Text className="tips-title">温馨提示</Text>
            </View>
            <View className="tips-list">
              {usageTips.map((tip, index) => (
                <View key={index} className="tip-item">
                  <View className="tip-number">{index + 1}</View>
                  <Text className="tip-text">{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RehabEquipmentPage;
