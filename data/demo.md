天码博客支持 [markdown](http://zh.wikipedia.org/zh-cn/Markdown) 语法，以一种文本方式来撰写博客。我们来看markdown的简洁之处吧！


## 引文

> 通过 `>` 即可声明该段为引文，引文可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长可以很长……

## 代码高亮


通过引入 [highlight.js](http://highlightjs.org)，天码博客可以高亮一百多种编程语言。只需要给出语言名称，例如`cpp`：

```cpp
#include <iostream>
#define ABS(x) (x > 0 ? x : -x)

// An annoying "Hello World" example
int main(int argc, char *argv[]) {
  for (auto i = 0; i < 0xFFFF; i++)
    cout << "Hello, World!" << endl;

    char c = '\n';
    return (int)c;
}
```

## 图片

![](/images/cat.jpeg)

## 列表

无序列表：
- 第一项
- 第二项
- 第三项

有序列表：
1. 第一项
2. 第二项