#### 模块化css

React没有像vue那样使用scoped可以直接声明css作用域

##### CSS Modules

- css-loader配置

  ```js
  {
    test: /\.css$/, /* 对css文件进行处理 */
    use: [
      'css-loader?modules' /* 配置css-loader，加一个modules */
    ]
  }
  ```

  接着css文件就可以这么写

  ```css
  .text {
    color: blue; 
  }
  ```

  js文件中就可以通过style.xxx使用
  `import style from './style.css'`

  1. 通过配置css-loader，类名会被编译为全局唯一类名`_1WHQzhI7PwBzQ_NMib7jy6`，不容易找到具体对应的类名
  2. 自定义命名规则

     ```js
     {
        test: /\.css$/, /* 对css文件进行处理 */
        use: [
          'css-loader?modules', /* 配置css-loader，加一个modules */
          options:{
            modules: {
              /*
                [path][name]__[local] -> 开发环境，便于调试。可以直接通过 src-pages-cssModule-style 找到此类名对应的文件。
                [hash:base64:5] -> 生产环境，1WHQz 便于生产环境压缩类名。
              */
              localIdentName: "[path][name]__[local]--[hash:base64:5]",
            },
          }
        ],
      }
     ```

  3. 全局变量
     使用`:global(.xxx)`声明一个全局类名，不会被编译为哈希字符串

  4. 配置less或sass

    ```js
     {
        test: /\.less$/,, /* 对less文件进行处理 */
        use: [
           'css-loader?modules', /* 配置css-loader，加一个modules */
            options:{
              modules: {
                /*
                  [path][name]__[local] -> 开发环境，便于调试。可以直接通过 src-pages-cssModule-style 找到此类名对应的文件。
                  [hash:base64:5] -> 生产环境，1WHQz 便于生产环境压缩类名。
                */
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
            {
            // 可能是其他 loader, 不过不重要。
            },
            'less-loader'
        ],
      }
     ```

  5. 组件中引入classnames库

     ```js
      import classNames from 'classnames/bind';
      import styles from './index.module.less';
      const cx = classNames.bind(styles);

      className={cx('base-card', className)}
     ```

##### CSS IN JS

- css in js 比如 style-component 可以根据 js 模版，动态生成 style 标签插入到 head 中。
- 用js对象写style，更加灵活
- styled-components动态添加样式
- vscode-styled-components
