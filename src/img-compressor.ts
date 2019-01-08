/**
 * img-compressor
 */

import { ICompressImgOptions, ICompressImgResponse } from './interfaces';

const DefaultOptions: ICompressImgOptions = {
  quality: 0.6
};

/**
 * 压缩图片
 * @param file
 * @param options
 * @constructor
 */
export async function CompressImg(
  file: Blob,
  options: ICompressImgOptions
): Promise<ICompressImgResponse> {
  const options_: ICompressImgOptions = Object.assign({}, DefaultOptions, options);
  if (!(window as any).lrz) {
    await import('./lib/localResizeIMG/dist/lrz.bundle.js');
  }
  return (window as any).lrz(file, {
      quality: options_.quality
    })
    .then(function (res: ICompressImgResponse) {
      const res_: ICompressImgResponse = {
        formData: res.formData,
        file: res.file,
        fileLen: res.fileLen,
        base64: res.base64,
        base64Len: res.base64Len,
        origin: res.origin
      };
      return res_;
    });
}
