# hexo-asset-link
Convert **Markdown and HTML style(image only)** asset links to HTML style ones.
This plugin is inspired from and based on [liolok/hexo-asset-link](https://github.com/liolok/hexo-asset-link), but with new features added to support more "casual" syntax **just like editing markdown in Visual Studio Code**:
- support more path prefixs, `space(s),".\"` (Windows-stype path)
- insert image with HTML style links in HTML tags, e.g.: `<img src="a-post-folder/1.png" />`
- spaces in `[]` of the markdown image syntax

## Install

In Hexo blog instance directory:
```shell
$ npm i https://github.com/yaanggny/hexo-asset-link
```

If you have the old plugin installed, just replace the file `index.js` in `node_modules`.

## Config

**Find** (not *add*) and enable [`Post Asset Folders`](https://hexo.io/docs/asset-folders#Post-Asset-Folder) feature in the gloabl `_config.yml`:

```yml
# Writing
...
post_asset_folder: true
...
```

## Usage

For example, if you have these files in `source/_post/`:

```
+-- _posts/
|   +-- 2019-02-14-Test-Post.md
|   +-- 2019-02-14-Test-Post/
|       +-- Test-Image.png
|       +-- Test-Other-File.pdf
```

Then in `2019-02-14-Test-Post.md`:

### Images

```markdown
![Alt Text](./2019-02-14-Test-Post/Test-Image.png "Title Text")
![Alt Text](2019-02-14-Test-Post/Test-Image.png "Title Text")
![Alt Text](.\2019-02-14-Test-Post/1.png)
![Alt Text]( .\2019-02-14-Test-Post/1.png)
![Alt Text ]( ./2019-02-14-Test-Post/1.png)

<img src="./a-post-name/1.png" alt="picture-1-1" />

<figure align="center">​
  <img src="./a-post-name/2.png" title="convert training loop">​
  <figcaption>Pytorch-PytorchLightning training loop</figcaption>​
</figure>
```

### Other Files

```markdown
[Text](./2019-02-14-Test-Post/Test-Other-File.pdf)
[Text](2019-02-14-Test-Post/Test-Other-File.pdf)
[Text ]( .\2019-02-14-Test-Post/Test-Other-File.pdf)
```

After this we'll get the right asset path result in:

- Blog home page of `hexo server` preview;
- Blog post page of `hexo server` preview;
- Blog home page of online website;
- Blog post page of online website;

Now shall we just have fun writing!

## Reference

- [Filter | Hexo](https://hexo.io/api/filter "Filter | Hexo")
- [Posts | Hexo](https://hexo.io/api/posts "Posts | Hexo")
- [`new URL`](https://nodejs.org/docs/latest-v18.x/api/url.html#new-urlinput-base)
- [`url.pathname`](https://nodejs.org/docs/latest-v18.x/api/url.html#urlpathname)
- [RegExp - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp "RegExp - JavaScript | MDN")
