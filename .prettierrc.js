// 配置文档 https://www.prettier.cn/docs/options.html
module.exports = {
	printWidth: 120, // 每行字符数
	useTabs: true, // 使用tab缩进
	semi: false, // 语句后一致使用分号
	singleQuote: true, // 使用单引号
	quoteProps: 'consistent', // 对象属性引号使用
	trailingComma: 'es5', // 尾随逗号 * v2.0.0 中的默认值从 更改none为es5 *
	bracketSpacing: true, // 在对象文字中的括号之间打印空格。 true- 示例：{ foo: bar }; false- 示例：{foo: bar}。
	bracketSameLine: false, //
	jsxBracketSameLine: false, // 将>多行 JSX 元素的 放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）。
	arrowParens: 'avoid', // 在唯一的箭头函数参数周围包含括号。(x) => x
	endOfLine: 'auto', // 行尾形式。 即\n（或LF换行）和\r\n（或回车+CRLF换行）。
};
