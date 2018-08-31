import lodash from 'lodash'

export function removeHtmlTags (str) {
  let newStr = lodash.trim(str)
  // 去除 html 标签
  newStr = newStr.replace(/(&lt;)(&#47;)?[^(&gt;)]*(&gt;)/g, '')
  newStr = newStr.replace(/<\/?[^>]*>/g, '')
  // 去除实体字符
  newStr = newStr.replace(/&[^;]+;/g, '')
  return newStr
}
