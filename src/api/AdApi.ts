import { IAdView } from './viewModel/Ad/IAdView';
import { IGetAdListParams } from './viewModel/Ad/IGetAdListParams';
import { BaseApi } from './Base/BaseApi';
/**
 * 广告相关接口
 */
export default class AdApi extends BaseApi {
  /**
   *
   * @param params 获取多广告位发布接口参数
   */
  static getAdList(params: IGetAdListParams) {
    const uri = '/GGPlace/GetList';
    return super.post<IAdView>(uri, params);
  }
}
