export class SdkLoader {
  constructor() {}

  private generateSdkUrl(sdkVersion: string) {
    return `https://cdn.riskid.security/sdk/web_sdk_${sdkVersion}.js`;
  }

  async loadSdk(
    id: string,
    sdkVersion: string,
    sdkLoadUrl?: string,
    parentElement?: HTMLHeadElement,
  ): Promise<void>{
    if (typeof document === 'undefined' || document.getElementById(id)) { // document is exist if platform is a browser
      throw new Error('SDK cannot be loaded');
    }
    return new Promise((resolve, reject) => {
      const scriptTag = document.createElement('script');

      const sdkSrcUrl = sdkLoadUrl || this.generateSdkUrl(sdkVersion);

      scriptTag.defer = true;
      scriptTag.src = sdkSrcUrl;
      scriptTag.id = id;
      scriptTag.onload = () => resolve();
      scriptTag.onerror = () => reject();

      if (!parentElement) {
          parentElement = document.head;
      }

      parentElement.appendChild(scriptTag);
    });
  }
}
