import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserInfoService } from './user-info.service';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  /**
   * 保存用户基础信息
   */
  @Post()
  async saveUserInfo(@Body() body: any) {
    console.log('收到保存用户信息请求:', body);

    const result = await this.userInfoService.saveUserInfo(body);

    return {
      code: 200,
      msg: '保存成功',
      data: result
    };
  }

  /**
   * 获取用户基础信息
   */
  @Get()
  async getUserInfo(@Body() body: any) {
    console.log('收到获取用户信息请求:', body);

    const { phone } = body;
    const result = await this.userInfoService.getUserInfoByPhone(phone);

    return {
      code: 200,
      msg: '获取成功',
      data: result
    };
  }
}
