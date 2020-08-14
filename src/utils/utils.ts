import { DeployConfig } from '../utils/config/DeployConfig';
const fastOperationCalclator = {};

export default class Utils {
  /**
   * 是否快速操作
   *
   * @static
   * @param key 区分同一点击的唯一键
   * @param count 间隔时间内点击次数
   * @param time 间隔时间/毫秒
   */
  static isFastOperation(key: string, count = 5, time = 1000) {
    if (!fastOperationCalclator[key] || !Array.isArray(fastOperationCalclator[key])) {
      fastOperationCalclator[key] = [];
    }
    fastOperationCalclator[key].push(Date.now());
    const calcLength = fastOperationCalclator[key].length;
    // console.log('fastOperationCalclator:', fastOperationCalclator);
    if (calcLength >= count) {
      if (fastOperationCalclator[key][calcLength - 1] - fastOperationCalclator[key][calcLength - count] < time) {
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * 分析身份证信息，返回生日，年龄，性别等等
   * @param idCard 身份证号码
   */
  static analyticIDCard(idCard: string) {
    const birthYear = +idCard.substring(6, 10);
    const birthMonth = +idCard.substring(10, 12);
    const birthDay = +idCard.substring(12, 14);
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const nowDate = new Date();
    const age =
      nowDate.getFullYear() -
      birthDate.getFullYear() -
      (nowDate.getMonth() < birthDate.getMonth() || (nowDate.getMonth() === birthDate.getMonth() && nowDate.getDate() < birthDate.getDate()) ? 1 : 0);
    const sex = +idCard.substring(16, 17) % 2 === 0;
    return {
      birthDate,
      age,
      /**
       * true-女 false-男
       */
      sex,
    };
  }

  /**
   * 休眠
   * @param timeout 休眠时间，毫秒
   */
  static sleep(timeout: number) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeout);
    });
  }

  /**
   * 图片压缩
   * @param file 上传的图片文件
   * @param config 配置
   */
  static imgCompress(file: File, config: { maxWidth?: number; quality: number }) {
    return new Promise<Blob>((resolve, reject) => {
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ev => {
          const img = new Image();
          img.src = fileReader.result as string;
          img.onload = () => {
            let w = img.width;
            let h = img.height;
            // 默认按比例压缩
            const scale = w / h;
            if (config.maxWidth < w) {
              w = config.maxWidth;
              h = w / scale;
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const anw = document.createAttribute('width');
            anw.nodeValue = w.toString();
            const anh = document.createAttribute('height');
            anh.nodeValue = h.toString();
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(img, 0, 0, w, h);
            // 图片质量
            const quality = config.quality > 0 && config.quality <= 1 ? config.quality : 0.7;
            canvas.toBlob(resolve, file.type, quality);
          };
        };
      } catch (error) {
        reject(file);
      }
    });
  }

  /**
   * 复制文本
   * @param text 文本
   */
  static copy(text: string) {
    try {
      const ele = document.createElement('textarea');
      ele.value = text;
      ele.setAttribute('readonly', '');
      ele.style.position = 'absolute';
      ele.style.left = '-9999px';
      document.body.appendChild(ele);
      const n = document.getSelection().rangeCount > 0 && document.getSelection().getRangeAt(0);
      ele.select();
      document.execCommand('copy');
      document.body.removeChild(ele);
      if (n) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(n);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}
