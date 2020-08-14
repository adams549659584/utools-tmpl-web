import store from '@/store';
import { Module, VuexModule, getModule, MutationAction, Action, Mutation } from 'vuex-module-decorators';
import { IAdView } from '@/api/viewModel/Ad/IAdView';
import AdApi from '@/api/AdApi';
import { IGetAdListParams } from '@/api/viewModel/Ad/IGetAdListParams';
import { ApiResultCode } from '@/api/viewModel/Base/IApiResult';

/**
 * State 定义
 *
 * @export
 * @interface IAdState
 */
export interface IAdState {
  AdView: IAdView;
}

@Module({
  namespaced: true,
  name: 'AdModule',
  store,
  dynamic: true,
})
class AdModule extends VuexModule implements IAdState {
  AdView: IAdView = {};
  adName = {};

  @MutationAction
  async getAdList(params: IGetAdListParams) {
    const result: Partial<IAdState> = {};
    try {
      const apiResult = await AdApi.getAdList(params);
      if (apiResult.Code === ApiResultCode.OK) {
        result.AdView = apiResult.Data;
      } else {
        result.AdView = null;
        alert(apiResult.Message);
      }
    } catch (error) {
      console.error(error);
    }
    return result;
  }
}

const AdStore = getModule(AdModule);
export default AdStore;
