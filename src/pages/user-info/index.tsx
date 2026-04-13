import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { useLoad, showLoading, hideLoading, showToast, switchTab, setStorageSync } from '@tarojs/taro';
import { Network } from '@/network';
import { Input } from '@/components/ui/input';
import { User, Calendar, Phone, MapPin, Heart, CircleAlert } from 'lucide-react-taro';
import './index.css';

const UserInfoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    health_status: '',
    allergies: '',
    chronic_diseases: '',
    emergency_contact_name: '',
    emergency_contact_phone: ''
  });

  useLoad(() => {
    // 设置页面标题
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  const handleSubmit = async () => {
    // 表单验证
    if (!formData.name) {
      showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    if (!formData.age) {
      showToast({
        title: '请输入年龄',
        icon: 'none'
      });
      return;
    }
    if (!formData.gender) {
      showToast({
        title: '请选择性别',
        icon: 'none'
      });
      return;
    }
    if (!formData.phone) {
      showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return;
    }
    if (!formData.address) {
      showToast({
        title: '请输入住址',
        icon: 'none'
      });
      return;
    }

    try {
      showLoading({ title: '提交中...' });

      // 保存用户信息
      const res = await Network.request({
        url: '/api/user-info',
        method: 'POST',
        data: {
          ...formData,
          age: parseInt(formData.age)
        }
      });

      console.log('保存用户信息响应:', res);

      if (res.data.code === 200) {
        // 保存首次进入标记
        setStorageSync('hasCompletedUserInfo', true);

        hideLoading();
        showToast({
          title: '保存成功',
          icon: 'success'
        });

        setTimeout(() => {
          switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      } else {
        hideLoading();
        showToast({
          title: res.data.msg || '保存失败',
          icon: 'none'
        });
      }
    } catch (error) {
      hideLoading();
      console.error('保存用户信息失败:', error);
      showToast({
        title: '网络错误',
        icon: 'none'
      });
    }
  };

  return (
    <View className="user-info-page">
      <View className="header">
        <Text className="header-title">完善个人信息</Text>
        <Text className="header-subtitle">请填写您的基本信息</Text>
      </View>

      <View className="content">
        {/* 基本信息表单 */}
        <View className="form-section">
          <Text className="section-title">基本信息</Text>

          <View className="form-item">
            <Text className="form-label">姓名 *</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <User size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                placeholder="请输入姓名"
                value={formData.name}
                onInput={(e) => handleInputChange('name', e.detail.value)}
              />
            </View>
          </View>

          <View className="form-item">
            <Text className="form-label">年龄 *</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <Calendar size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                type="number"
                placeholder="请输入年龄"
                value={formData.age}
                onInput={(e) => handleInputChange('age', e.detail.value)}
              />
            </View>
          </View>

          <View className="form-item">
            <Text className="form-label">性别 *</Text>
            <View className="gender-select">
              <View
                className={`gender-option ${formData.gender === '男' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('男')}
              >
                <Text className="gender-text">男</Text>
              </View>
              <View
                className={`gender-option ${formData.gender === '女' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('女')}
              >
                <Text className="gender-text">女</Text>
              </View>
            </View>
          </View>

          <View className="form-item">
            <Text className="form-label">联系电话 *</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <Phone size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                type="number"
                placeholder="请输入联系电话"
                value={formData.phone}
                onInput={(e) => handleInputChange('phone', e.detail.value)}
              />
            </View>
          </View>

          <View className="form-item">
            <Text className="form-label">住址 *</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <MapPin size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                placeholder="请输入详细住址"
                value={formData.address}
                onInput={(e) => handleInputChange('address', e.detail.value)}
              />
            </View>
          </View>
        </View>

        {/* 健康信息 */}
        <View className="form-section">
          <Text className="section-title">健康信息</Text>

          <View className="form-item">
            <Text className="form-label">健康状况 *</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <Heart size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                placeholder="请输入健康状况（如：良好、患有高血压等）"
                value={formData.health_status}
                onInput={(e) => handleInputChange('health_status', e.detail.value)}
              />
            </View>
          </View>

          <View className="form-item">
            <Text className="form-label">过敏史</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <CircleAlert size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                placeholder='如有过敏史请详细说明，无则填"无"'
                value={formData.allergies}
                onInput={(e) => handleInputChange('allergies', e.detail.value)}
              />
            </View>
          </View>

          <View className="form-item">
            <Text className="form-label">慢性病史</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <CircleAlert size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                placeholder='如有慢性病史请详细说明，无则填"无"'
                value={formData.chronic_diseases}
                onInput={(e) => handleInputChange('chronic_diseases', e.detail.value)}
              />
            </View>
          </View>
        </View>

        {/* 紧急联系人 */}
        <View className="form-section">
          <Text className="section-title">紧急联系人</Text>

          <View className="form-item">
            <Text className="form-label">联系人姓名</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <User size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                placeholder="请输入紧急联系人姓名"
                value={formData.emergency_contact_name}
                onInput={(e) => handleInputChange('emergency_contact_name', e.detail.value)}
              />
            </View>
          </View>

          <View className="form-item">
            <Text className="form-label">联系人电话</Text>
            <View className="form-input-wrap">
              <View className="input-icon">
                <Phone size={24} color="#667eea" />
              </View>
              <Input
                className="form-input with-icon"
                type="number"
                placeholder="请输入紧急联系人电话"
                value={formData.emergency_contact_phone}
                onInput={(e) => handleInputChange('emergency_contact_phone', e.detail.value)}
              />
            </View>
          </View>
        </View>

        {/* 提交按钮 */}
        <View className="submit-btn" onClick={handleSubmit}>
          <Text className="submit-text">提交</Text>
        </View>

        {/* 说明文字 */}
        <Text className="notice-text">
          * 所标星号为必填项，请务必填写准确
        </Text>
      </View>
    </View>
  );
};

export default UserInfoPage;
