import { View, Text, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { useLoad, showToast, makePhoneCall, hideLoading, showLoading, openBluetoothAdapter, startBluetoothDevicesDiscovery, stopBluetoothDevicesDiscovery, createBLEConnection, getBLEDeviceServices, getBLEDeviceCharacteristics, closeBLEConnection, onBluetoothDeviceFound } from '@tarojs/taro';
import { Dumbbell, Calendar, BookOpen, Phone, Clock, Bluetooth, BluetoothOff, RefreshCw, Link } from 'lucide-react-taro';
import './index.css';

interface BluetoothDevice {
  deviceId: string;
  name: string;
  RSSI: number;
  advertisData: any;
}

interface ServiceInfo {
  serviceId: string;
  characteristics: Array<{
    uuid: string;
    properties: string[];
  }>;
}

const RehabEquipmentPage = () => {
  const [bluetoothAdapterAvailable, setBluetoothAdapterAvailable] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [foundDevices, setFoundDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [services, setServices] = useState<ServiceInfo[]>([]);

  useLoad(() => {
    // 初始化蓝牙适配器
    initBluetoothAdapter();
  });

  // 初始化蓝牙适配器
  const initBluetoothAdapter = () => {
    openBluetoothAdapter({
      success: () => {
        setBluetoothAdapterAvailable(true);
        console.log('蓝牙适配器已打开');
      },
      fail: (err) => {
        console.error('打开蓝牙适配器失败:', err);
        setBluetoothAdapterAvailable(false);
        showToast({
          title: '请先打开手机蓝牙',
          icon: 'none'
        });
      }
    });
  };

  // 开始搜索蓝牙设备
  const startSearch = async () => {
    if (!bluetoothAdapterAvailable) {
      showToast({
        title: '蓝牙适配器未就绪',
        icon: 'none'
      });
      return;
    }

    try {
      showLoading({ title: '搜索中...' });
      setIsSearching(true);
      setFoundDevices([]);

      // 开始搜索设备
      startBluetoothDevicesDiscovery({
        allowDuplicatesKey: false,
        success: () => {
          console.log('开始搜索蓝牙设备');
          // 监听设备发现
          onBluetoothDeviceFound((res) => {
            console.log('发现设备:', res.devices);
            const devices = res.devices.map((device: any) => ({
              deviceId: device.deviceId,
              name: device.name || device.localName || '未知设备',
              RSSI: device.RSSI,
              advertisData: device.advertisData
            }));

            // 去重并更新设备列表
            setFoundDevices((prev) => {
              const newDevices = [...prev];
              devices.forEach((device) => {
                const existingIndex = newDevices.findIndex((d) => d.deviceId === device.deviceId);
                if (existingIndex === -1) {
                  newDevices.push(device);
                }
              });
              return newDevices;
            });
          });
        },
        fail: (err) => {
          console.error('启动搜索失败:', err);
          throw err;
        }
      });

      // 10秒后自动停止搜索
      setTimeout(() => {
        stopSearch();
      }, 10000);

    } catch (error) {
      console.error('搜索失败:', error);
      showToast({
        title: '搜索失败',
        icon: 'none'
      });
      setIsSearching(false);
      hideLoading();
    }
  };

  // 停止搜索
  const stopSearch = () => {
    stopBluetoothDevicesDiscovery({
      success: () => {
        console.log('停止搜索');
        setIsSearching(false);
        hideLoading();
      }
    });
  };

  // 连接设备
  const connectDevice = async (device: BluetoothDevice) => {
    try {
      showLoading({ title: '连接中...' });

      // 创建连接
      await new Promise<void>((resolve, reject) => {
        createBLEConnection({
          deviceId: device.deviceId,
          success: () => {
            console.log('蓝牙连接成功');
            resolve();
          },
          fail: (err) => {
            console.error('蓝牙连接失败:', err);
            reject(err);
          }
        });
      });

      // 获取服务列表
      await getServices(device.deviceId);

      setConnectedDevice(device);
      hideLoading();
      showToast({
        title: '连接成功',
        icon: 'success'
      });
    } catch (error) {
      console.error('连接失败:', error);
      hideLoading();
      showToast({
        title: '连接失败',
        icon: 'none'
      });
    }
  };

  // 获取服务列表
  const getServices = async (deviceId: string) => {
    return new Promise<void>((resolve, reject) => {
      getBLEDeviceServices({
        deviceId,
        success: async (res) => {
          console.log('获取服务成功:', res.services);
          const serviceList: ServiceInfo[] = [];

          for (const service of res.services) {
            try {
              const characteristics = await getCharacteristics(deviceId, service.uuid);
              serviceList.push({
                serviceId: service.uuid,
                characteristics
              });
            } catch (error) {
              console.error('获取特征值失败:', error);
            }
          }

          setServices(serviceList);
          resolve();
        },
        fail: (err) => {
          console.error('获取服务失败:', err);
          reject(err);
        }
      });
    });
  };

  // 获取特征值
  const getCharacteristics = (deviceId: string, serviceId: string): Promise<Array<{ uuid: string; properties: string[] }>> => {
    return new Promise((resolve, reject) => {
      getBLEDeviceCharacteristics({
        deviceId,
        serviceId,
        success: (res) => {
          console.log('获取特征值成功:', res.characteristics);
          const characteristics = res.characteristics.map((char: any) => ({
            uuid: char.uuid,
            properties: char.properties
          }));
          resolve(characteristics);
        },
        fail: (err) => {
          console.error('获取特征值失败:', err);
          reject(err);
        }
      });
    });
  };

  // 断开连接
  const disconnectDevice = () => {
    if (connectedDevice) {
      closeBLEConnection({
        deviceId: connectedDevice.deviceId,
        success: () => {
          console.log('断开连接成功');
          setConnectedDevice(null);
          setServices([]);
          showToast({
            title: '已断开连接',
            icon: 'success'
          });
        }
      });
    }
  };

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
        {/* 蓝牙连接区域 */}
        <View className="bluetooth-section">
          <View className="bluetooth-header">
            <View className="bluetooth-title-wrap">
              {bluetoothAdapterAvailable ? (
                <Bluetooth size={20} color="#4caf50" />
              ) : (
                <BluetoothOff size={20} color="#999" />
              )}
              <Text className="bluetooth-title">
                蓝牙连接
              </Text>
              {bluetoothAdapterAvailable && (
                <View className="bluetooth-status status-available">
                  <Text className="status-text">已就绪</Text>
                </View>
              )}
              {!bluetoothAdapterAvailable && (
                <View className="bluetooth-status status-unavailable">
                  <Text className="status-text">未就绪</Text>
                </View>
              )}
            </View>
          </View>

          {bluetoothAdapterAvailable && (
            <>
              {/* 连接状态 */}
              {connectedDevice && (
                <View className="connected-device-card">
                  <View className="connected-header">
                    <Link size={18} color="#4caf50" />
                    <Text className="connected-title">已连接设备</Text>
                    <View
                      className="disconnect-btn"
                      onClick={disconnectDevice}
                    >
                      <Text className="disconnect-text">断开连接</Text>
                    </View>
                  </View>
                  <View className="connected-info">
                    <Text className="connected-name">{connectedDevice.name}</Text>
                    <Text className="connected-id">设备ID: {connectedDevice.deviceId}</Text>
                  </View>

                  {/* 服务列表 */}
                  {services.length > 0 && (
                    <View className="services-list">
                      <Text className="services-title">服务列表</Text>
                      {services.map((service, index) => (
                        <View key={index} className="service-item">
                          <Text className="service-id">服务 {index + 1}: {service.serviceId}</Text>
                          {service.characteristics.map((char, charIndex) => (
                            <View key={charIndex} className="characteristic-item">
                              <Text className="characteristic-id">特征值: {char.uuid}</Text>
                              <View className="characteristic-props">
                                {char.properties.map((prop, propIndex) => (
                                  <View key={propIndex} className="prop-tag">
                                    <Text className="prop-text">{prop}</Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* 搜索按钮 */}
              {!connectedDevice && (
                <View className="search-controls">
                  <View
                    className={`search-btn ${isSearching ? 'searching' : ''}`}
                    onClick={isSearching ? stopSearch : startSearch}
                  >
                    <RefreshCw size={18} color="#fff" className={isSearching ? 'rotating' : ''} />
                    <Text className="search-text">
                      {isSearching ? '停止搜索' : '搜索设备'}
                    </Text>
                  </View>
                </View>
              )}

              {/* 设备列表 */}
              {foundDevices.length > 0 && (
                <View className="found-devices-list">
                  <Text className="found-title">找到 {foundDevices.length} 个设备</Text>
                  {foundDevices.map((device, index) => (
                    <View key={index} className="device-item">
                      <View className="device-info">
                        <Text className="device-name">{device.name}</Text>
                        <Text className="device-id">ID: {device.deviceId}</Text>
                        <Text className="device-rssi">信号强度: {device.RSSI} dB</Text>
                      </View>
                      <View
                        className="connect-btn"
                        onClick={() => connectDevice(device)}
                      >
                        <Link size={16} color="#fff" />
                        <Text className="connect-text">连接</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </>
          )}

          {!bluetoothAdapterAvailable && (
            <View className="bluetooth-unavailable-tip">
              <Text className="tip-text">请先打开手机蓝牙功能</Text>
            </View>
          )}
        </View>

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
