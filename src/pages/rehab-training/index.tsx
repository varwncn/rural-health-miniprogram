import { View, Text, ScrollView } from '@tarojs/components';
import { useLoad, showToast } from '@tarojs/taro';
import { Play, Check, Clock, Target } from 'lucide-react-taro';
import './index.css';

const RehabTrainingPage = () => {
  useLoad(() => {
    // 设置页面标题
  });

  const handleStartTraining = () => {
    showToast({
      title: '开始训练',
      icon: 'success'
    });
  };

  const trainingPrograms = [
    {
      id: 1,
      title: '上肢功能康复训练',
      duration: '15分钟',
      difficulty: '初级',
      completed: false,
      exercises: ['肩关节活动', '手臂伸展', '握力练习'],
      description: '针对上肢功能障碍的康复训练，适合术后恢复患者'
    },
    {
      id: 2,
      title: '下肢力量训练',
      duration: '20分钟',
      difficulty: '中级',
      completed: true,
      exercises: ['腿部抬高', '踝泵运动', '平衡练习'],
      description: '增强下肢力量，改善行走功能'
    },
    {
      id: 3,
      title: '平衡能力训练',
      duration: '10分钟',
      difficulty: '初级',
      completed: false,
      exercises: ['单脚站立', '重心转移', '步态训练'],
      description: '提高身体平衡能力，预防跌倒'
    },
    {
      id: 4,
      title: '呼吸功能训练',
      duration: '8分钟',
      difficulty: '初级',
      completed: false,
      exercises: ['深呼吸', '咳嗽训练', '胸廓扩张'],
      description: '改善肺功能，增强呼吸能力'
    }
  ];

  const todayProgress = {
    completed: 2,
    total: 4,
    minutes: 25
  };

  return (
    <View className="rehab-training-page">
      <View className="header">
        <Text className="header-title">康复训练</Text>
        <Text className="header-subtitle">科学康复，恢复健康</Text>
      </View>

      <ScrollView className="content" scrollY>
        {/* 今日进度 */}
        <View className="progress-card">
          <View className="progress-header">
            <View className="progress-title-wrap">
              <Target size={20} color="#667eea" />
              <Text className="progress-title">今日进度</Text>
            </View>
            <Text className="progress-percent">{Math.round((todayProgress.completed / todayProgress.total) * 100)}%</Text>
          </View>
          <View className="progress-bar">
            <View
              className="progress-fill"
              style={{ width: `${(todayProgress.completed / todayProgress.total) * 100}%` }}
            />
          </View>
          <View className="progress-stats">
            <View className="progress-stat">
              <Clock size={16} color="#666" />
              <Text className="progress-stat-text">已完成 {todayProgress.completed}/{todayProgress.total} 个训练</Text>
            </View>
            <View className="progress-stat">
              <Text className="progress-stat-text">累计 {todayProgress.minutes} 分钟</Text>
            </View>
          </View>
        </View>

        {/* 训练计划 */}
        <View className="section">
          <Text className="section-title">训练计划</Text>
          <View className="training-list">
            {trainingPrograms.map((program) => (
              <View key={program.id} className="training-card">
                <View className="training-header">
                  <View className="training-info">
                    <Text className="training-title">{program.title}</Text>
                    <View className="training-tags">
                      <Text className="training-tag difficulty">{program.difficulty}</Text>
                      <Text className="training-tag duration">{program.duration}</Text>
                    </View>
                  </View>
                  {program.completed ? (
                    <Check size={24} color="#4caf50" />
                  ) : (
                    <Play size={24} color="#667eea" />
                  )}
                </View>

                <Text className="training-desc">{program.description}</Text>

                <View className="training-exercises">
                  <Text className="exercises-title">训练内容：</Text>
                  {program.exercises.map((exercise, index) => (
                    <View key={index} className="exercise-item">
                      <View className="exercise-dot" />
                      <Text className="exercise-text">{exercise}</Text>
                    </View>
                  ))}
                </View>

                <View
                  className={`training-action ${program.completed ? 'completed' : ''}`}
                  onClick={() => handleStartTraining()}
                >
                  <Text className="action-text">
                    {program.completed ? '已完成' : '开始训练'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RehabTrainingPage;
