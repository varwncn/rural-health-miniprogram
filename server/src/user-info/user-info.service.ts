import { Injectable } from '@nestjs/common';
import { getSupabaseClient } from '@/storage/database/supabase-client';

@Injectable()
export class UserInfoService {
  private client;

  constructor() {
    this.client = getSupabaseClient();
  }

  /**
   * 保存用户基础信息
   */
  async saveUserInfo(userInfo: any) {
    console.log('保存用户信息:', userInfo);

    // 检查是否已存在相同手机号的用户
    const { data: existingUser, error: queryError } = await this.client
      .from('user_basic_info')
      .select('*')
      .eq('phone', userInfo.phone)
      .maybeSingle();

    if (queryError) {
      console.error('查询用户信息失败:', queryError);
      throw new Error(`查询失败: ${queryError.message}`);
    }

    let result;

    if (existingUser) {
      // 更新已有用户信息
      const { data, error } = await this.client
        .from('user_basic_info')
        .update({
          name: userInfo.name,
          age: userInfo.age,
          gender: userInfo.gender,
          address: userInfo.address,
          health_status: userInfo.health_status,
          allergies: userInfo.allergies,
          chronic_diseases: userInfo.chronic_diseases,
          emergency_contact_name: userInfo.emergency_contact_name,
          emergency_contact_phone: userInfo.emergency_contact_phone,
          updated_at: new Date().toISOString()
        })
        .eq('phone', userInfo.phone)
        .select();

      if (error) {
        console.error('更新用户信息失败:', error);
        throw new Error(`更新失败: ${error.message}`);
      }

      result = data?.[0];
    } else {
      // 插入新用户信息
      const { data, error } = await this.client
        .from('user_basic_info')
        .insert({
          name: userInfo.name,
          age: userInfo.age,
          gender: userInfo.gender,
          phone: userInfo.phone,
          address: userInfo.address,
          health_status: userInfo.health_status,
          allergies: userInfo.allergies || null,
          chronic_diseases: userInfo.chronic_diseases || null,
          emergency_contact_name: userInfo.emergency_contact_name || null,
          emergency_contact_phone: userInfo.emergency_contact_phone || null
        })
        .select();

      if (error) {
        console.error('插入用户信息失败:', error);
        throw new Error(`插入失败: ${error.message}`);
      }

      result = data?.[0];
    }

    console.log('用户信息保存成功:', result);
    return result;
  }

  /**
   * 根据手机号获取用户信息
   */
  async getUserInfoByPhone(phone: string) {
    console.log('查询用户信息, phone:', phone);

    const { data, error } = await this.client
      .from('user_basic_info')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (error) {
      console.error('查询用户信息失败:', error);
      throw new Error(`查询失败: ${error.message}`);
    }

    return data;
  }
}
