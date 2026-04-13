import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad, showToast, makePhoneCall } from '@tarojs/taro';
import { Video, MessageSquare, Phone, Calendar, User, Clock } from 'lucide-react-taro';
import './index.css';

const RehabGuidePage = () => {
  useLoad(() => {
    // 设置页面标题
  });

  const handleConsult = () => {
    showToast({
      title: '发起咨询',
      icon: 'success'
    });
  };

  const handleVideoCall = () => {
    showToast({
      title: '视频通话',
      icon: 'success'
    });
  };

  const doctors = [
    {
      id: 1,
      name: '张医生',
      specialty: '康复医学',
      experience: '10年',
      avatar: '👨‍⚕️',
      rating: 4.8,
      consultationCount: 156,
      online: true,
      phone: '13800138001',
      schedule: ['周一至周五 9:00-12:00', '周一至周五 14:00-17:00']
    },
    {
      id: 2,
      name: '李医生',
      specialty: '物理治疗',
      experience: '8年',
      avatar: '👩‍⚕️',
      rating: 4.9,
      consultationCount: 203,
      online: true,
      phone: '13800138002',
      schedule: ['周一至周五 9:00-12:00', '周一至周五 14:00-17:00']
    }
  ];

  const historyRecords = [
    {
      id: 1,
      doctorName: '张医生',
      type: '视频指导',
      date: '2024-01-15',
      time: '10:30',
      duration: '25分钟',
      content: '针对上肢康复训练进行指导，建议每天坚持训练30分钟'
    },
    {
      id: 2,
      doctorName: '李医生',
      type: '在线咨询',
      date: '2024-01-10',
      time: '15:45',
      duration: '15分钟',
      content: '解答了关于理疗仪使用方法的疑问'
    }
  ];

  return (
    <View className="rehab-guide-page">
      <View className="header">
        <Text className="header-title">康复远程指导</Text>
        <Text className="header-subtitle">专业指导，远程康复</Text>
      </View>

      <ScrollView className="content" scrollY>
        {/* 医生列表 */}
        <View className="section">
          <Text className="section-title">在线医生</Text>
          <View className="doctor-list">
            {doctors.map((doctor) => (
              <View key={doctor.id} className="doctor-card">
                <View className="doctor-header">
                  <View className="doctor-avatar">
                    <Text className="avatar-emoji">{doctor.avatar}</Text>
                    {doctor.online && <View className="online-badge" />}
                  </View>
                  <View className="doctor-info">
                    <View className="doctor-name-row">
                      <Text className="doctor-name">{doctor.name}</Text>
                      {doctor.online && <View className="online-tag">在线</View>}
                    </View>
                    <Text className="doctor-specialty">{doctor.specialty} · {doctor.experience}</Text>
                    <View className="doctor-rating">
                      <Text className="rating-text">⭐ {doctor.rating}</Text>
                      <Text className="consultation-count">{doctor.consultationCount}次咨询</Text>
                    </View>
                  </View>
                </View>

                <View className="doctor-schedule">
                  <Clock size={14} color="#666" />
                  <Text className="schedule-text">{doctor.schedule.join(' | ')}</Text>
                </View>

                <View className="doctor-actions">
                  <View
                    className="action-btn consult-btn"
                    onClick={() => handleConsult()}
                  >
                    <MessageSquare size={18} color="#fff" />
                    <Text className="action-text">在线咨询</Text>
                  </View>
                  <View
                    className="action-btn video-btn"
                    onClick={() => handleVideoCall()}
                  >
                    <Video size={18} color="#fff" />
                    <Text className="action-text">视频指导</Text>
                  </View>
                  <View
                    className="action-btn phone-btn"
                    onClick={() => makePhoneCall({ phoneNumber: doctor.phone })}
                  >
                    <Phone size={18} color="#fff" />
                    <Text className="action-text">电话联系</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 指导记录 */}
        <View className="section">
          <Text className="section-title">指导记录</Text>
          <View className="history-list">
            {historyRecords.map((record) => (
              <View key={record.id} className="history-card">
                <View className="history-header">
                  <View className="history-type">
                    <User size={16} color="#667eea" />
                    <Text className="type-text">{record.type}</Text>
                  </View>
                  <View className="history-time">
                    <Calendar size={14} color="#666" />
                    <Text className="time-text">{record.date} {record.time}</Text>
                  </View>
                </View>

                <View className="history-doctor">
                  <Text className="doctor-name">{record.doctorName}</Text>
                  <Text className="duration">时长 {record.duration}</Text>
                </View>

                <Text className="history-content">{record.content}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RehabGuidePage;
