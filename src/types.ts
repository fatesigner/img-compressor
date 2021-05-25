/**
 * interfaces
 */

export interface ICompressImgOptions {
  /**
   * 图片压缩质量，取值 0 - 1，默认为 0.7
   */
  quality?: number;
  /**
   * 图片最大不超过的宽度，默认为原图宽度，高度不设时会适应宽度。
   */
  width?: number;
  /**
   * 图片最大不超过的高度，默认为原图高度，宽度不设时会适应高度。
   */
  height?: number;
}

export interface ICompressImgResponse {
  // 后端可处理的数据
  formData?: any;
  // 压缩后的 file对象（默认已经丢在 rst.formData有一份了），需要注意的是如果压缩率太低的话，这个会是原始的 file对象
  file: Blob;
  // 生成后的图片的大小，后端可以通过此值来校验是否传输完整
  fileLen: number;
  // 生成后的图片 base64，后端可以处理此字符串为图片，也直接用于 img.src = base64
  base64?: string;
  // 生成后的 base64 的大小，后端可以通过此值来校验是否传输完整 (如果采用base64上传方式)
  base64Len?: string;
  // 也就是原始的 file 对象，里面存了一些原始文件的信息，例如大小，日期等。
  origin: File;
}
