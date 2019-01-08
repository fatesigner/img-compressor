# img-compressor

[![download][download-image]][download-url]
[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/@fatesigner/img-compressor.svg?color=green
[npm-url]: https://npmjs.com/package/@fatesigner/img-compressor
[download-image]: https://img.shields.io/npm/dw/@fatesigner/img-compressor.svg?style=flat-square
[download-url]: https://npmjs.com/package/@fatesigner/img-compressor

> Web img compressor.

## 说明

- 该插件基于 [localResizeIMG](https://github.com/think2011/localResizeIMG/) ，添加了类型注释，增强了 API 的易用性。
- 由 typescript 编写，并编译为 [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [CommonJs](https://requirejs.org/docs/commonjs.html/) 、 [UMD](https://github.com/umdjs/umd) 的代码。
所以如果引入到您的项目中使用，需搭建好 [typescript](https://www.typescriptlang.org/) 或 [babel](https://babeljs.io/docs/en/) 编译环境。
- 借助于 Webpack 的 [dynamic import](https://webpack.docschina.org/guides/code-splitting/) 可以有效减少首屏加载时间。

## 安装

```bash
npm i -S @fatesigner/img-compressor
```

## 使用
```ts
import { CompressImg } from '@fatesigner/img-compressor';

let $input = document.getElementById('input');

// use async
let newFile: ICompressImgResponse = await CompressImg($input.files[0]);

// use promise
CompressImg($input.files[0]).then((newFile) => {
  console.log(newFile);
});
```

### UMD
```html
// 在 html 中依次导入
<script type="text/javascript" src="../dist/img-compressor.umd.js"></script>
<script type="text/javascript" src="../dist/img-compressor.chunk.umd.js"></script>

<input type="file" id="input" />

<script>
  let $input = document.getElementById('input');
  $input.onchange = function () {
    window.ImgCompressor.CompressImg($input.files[0]).then((newFile) => {
      console.log(newFile);
    });
  };
</script>
```

## API
### CompressImg(file, options) => [ICompressImgResponse](#ICompressImgResponse)
> 压缩指定图片.

| Param | Description |
| --- | --- |
| file | 图片, File 对象 |
| options | [ICompressImgOptions](#ICompressImgOptions) |

### ICompressImgOptions
| Param | default | Description |
| --- | --- | --- |
| quality  | 0.7 | 图片压缩质量，取值 0 - 1 |
| width | null | 图片最大不超过的宽度，默认为原图宽度，高度不设时会适应宽度  |
| height | null | 图片最大不超过的高度，默认为原图高度，宽度不设时会适应高度  |

### ICompressImgResponse
| Param | type | Description |
| --- | --- | --- |
| formData | any | 后端可处理的数据  |
| file | File | 压缩后的 file对象（默认已经丢在 rst.formData有一份了），需要注意的是如果压缩率太低的话，这个会是原始的 file对象  |
| fileLen | number | 生成后的图片的大小，后端可以通过此值来校验是否传输完整  |
| base64 | string | 生成后的图片 base64，后端可以处理此字符串为图片，也直接用于 img.src = base64  |
| base64Len | number | 生成后的 base64 的大小，后端可以通过此值来校验是否传输完整 (如果采用base64上传方式)  |
| origin | File | 原始的 file 对象，里面存了一些原始文件的信息，例如大小，日期等  |
