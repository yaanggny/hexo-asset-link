'use strict';

const chalk = require('chalk');

// Only work when post asset folder option enabled
if (hexo.config.post_asset_folder) hexo.extend.filter.register('before_post_render', convertLink);

function convertLink(data) {
  if (!data.asset_dir) return; // need asset_dir attribute available
  hexo.log.d('Post asset folder path:', chalk.magenta(data.asset_dir));
  // Split by path delimiter, filter out empty string, last one is asset folder's name.
  const asset_dir_name = data.asset_dir.split(/[\/\\]/).filter(i => i).pop();
  hexo.log.d('Post asset folder name:', chalk.magenta(asset_dir_name));
  // Asset paths in markdown start with './', '.\', spaces or not, then folder's name, end with '/'.
  const path_markdown = RegExp('(?<=!?\\\[.*\\\]\\\()\\s*\.?[\/\\\\]?' + asset_dir_name + '\/', 'g');
  const path_mkdown_html = RegExp('(?<=<img\\s+src=")\\s*\.?[\/\\\\]?' + asset_dir_name + '\/', 'g');

  if (!path_markdown.test(data.content) && !path_mkdown_html.test(data.content)) return; // no asset link found, do nothing

  // Permalink's pathname, supposed to start with '/'
  const pathname = new URL(data.permalink).pathname;
  hexo.log.d('Post html path name:', chalk.magenta(pathname));
  // Strip any suffix if exists, supposed to start and end with '/', this is where assets would be in html.
  const path_html = pathname.replace(/\.[^/.]+$/, '/');
  data.content = data.content.replace(path_markdown, path_html);
  data.content = data.content.replace(path_mkdown_html, path_html);
  hexo.log.i('Path converted:', chalk.yellow(path_markdown.toString()), '→', chalk.green(path_html));
  hexo.log.i('Path converted:', chalk.yellow(path_mkdown_html.toString()), '→', chalk.green(path_html));
}
