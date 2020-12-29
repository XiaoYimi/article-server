/* 使用说明
1. 请每次验证前都必须进行实例化 new Validator()
2. 通过验证类方法 addValidate() 验证字段 value, 并添加验证规则 rules [{ rule, tip }]
3. 使用验证类方法 check() 或 allCheck() 进行验证,
   返回 { checked: '', message: '' } 或 [ err1, err2 ...]

demo:
  const validator = new Validator();
  validator.check(value, [{ rule: 'number', tip: '必须是数字' }])
  validator.allCheck([
    { value: value1, rules: [{ rule: 'number', tip: '必须是数字' }] },
    { value: value2, rules: [{ rule: 'min:4', tip: '无效的手机号' }] }
  ])
*/

// 验证规则
const Rules = {
  // 是否为空
  empty (value, tip) {
    if (value === '') {
      return tip
    }
  },
  // 是否全为空格
  space (value, tip) {
    if (value.trim() === '') {
      return tip
    }
  },

  // 是否为数字
  number (value, tip) {
    const regexp = /^[0-9]+$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 是否为 Boolan
  boolean (value, tip) {
    if (value === true || value === false) {
      return tip
    }
  },

  // 是否为纯字母
  alpha (value, tip) {
    const regexp = /^[a-zA-Z]+$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值是否为字母和数字
  alphaNum (value, tip) {
    const regexp = /^[a-zA-Z0-9]+$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值是否为字母和数字，下划线 _ 及破折号 -
  alphaDash (value, tip) {
    const regexp = /^[a-zA-Z0-9(\-)(_)]+$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值只能是汉字
  chs (value, tip) {
    const regexp = /^[\u4e00-\u9fa5]{1,}$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值只能是汉字、字母
  chsAlpha (value, tip) {
    const regexp = /^[a-zA-Z\u4e00-\u9fa5]{1,}$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值只能是小写字符
  lower (value, tip) {
    const regexp = /^[a-z]{1,}$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值只能是大写字符
  upper (value, tip) {
    const regexp = /^[A-Z]{1,}$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值只能是十六进制字符串
  xdigit (value, tip) {
    const regexp = /^[a-fA-F]{1,}$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 支持验证 ipv4 格式的IP地址
  ip (value, tip) {
    const regexp = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值是否为有效的MAC地址
  mac (value, tip) {
    const regexp = /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值是否为有效的身份证格式
  idCard (value, tip) {
    const regexp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证手机
  mobile (value, tip) {
    const regexp = /^1[34578]\d{9}$/
    if (!regexp.test(value)) {
      return tip
    }
  },
  // 验证邮箱(php)
  email (value, tip) {
    const regexp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值是否为有效的中国邮政编码
  zip (value, tip) {
    const regexp = /[1-9]\d{5}(?!\d)/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值是否为有效的十六进制值
  color (value, tip) {
    const regexp = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值是否为有效的 URL 地址

  // 验证某个字段的值长度是否为有效的最小长度
  minlength (value, length, tip) {
    if (value.trim().length < length) {
      return tip
    }
  },

  // // 验证某个字段的值长度是否为有效的最大长度
  maxlength (value, length, tip) {
    if (value.trim().length > length) {
      return tip
    }
  },

  // 验证某个字段的值是否为指定保留 byte 位小数的金钱格式
  monoey (value, byte, tip) {
    let regxp
    switch (byte) {
      case 1:
        regxp = /^\d+((\.?)(\w{1}))?$/
        break
      case 2:
        regxp = /^\d+((\.?)(\w{2}))?$/
        break
      case 3:
        regxp = /^\d+((\.?)(\w{1}))?$/
        break
      case 4:
        regxp = /^\d+((\.?)(\w{4}))?$/
        break
      default:
        regxp = /^\d+((\.?)(\w*))?$/
        break
    }
    if (!regxp.test(value)) {
      return tip
    }
  },

  // 验证某个字段的值是否为指定格式的日期 (format: Y-m-d H-i-s)
  dateFormat (value, format, tip) {
    let regexp
    switch (format) {
      case 'Y-m-d H-i-s':
        regexp = /\d{4}-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)\s([01][0-9])|(2[0-3]):([0-5][0-9]):([0-5][0-9])$/
        break
      case 'Y-m-d':
        regexp = /^\d{4}-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/
        break
      case 'H-i-s':
        regexp = /^([01][0-9])|(2[0-3]):([0-5][0-9]):([0-5][0-9])$/
        break
      case 'Y-m':
        regexp = /^(\d{4})-(0?[1-9]|1[0-2])$/
        break
      case 'm-d':
        regexp = /^(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/
        break
      case 'H-i':
        regexp = /^([01][0-9])|(2[0-3]):([0-5][0-9])$/
        break
      case 'i-s':
        regexp = /^([0-5][0-9]):([0-5][0-9])$/
        break
      case 'Y':
        regexp = /^\d{4}$/
        break
      case 'm':
        regexp = /^(0?[1-9]|1[0-2])$/
        break
      case 'd':
        regexp = /^((0?[1-9])|((1|2)[0-9])|30|31)$/
        break
      case 'H':
        regexp = /^([01][0-9])|(2[0-3])$/
        break
      case 'i':
        regexp = /^([0-5][0-9])$/
        break
      case 's':
        regexp = /^([0-5][0-9])$/
    }
    if (!regexp.test(value)) {
      return tip
    }
  },

  // 比较类
  // 验证某个字段是否和另外一个字段的值一致
  same (value, target, tip) {
    if (value !== target) {
      return tip
    }
  }
}

// 验证类
class Validator {
  constructor () {
    this.validatorList = []
  }

  // 添加待验证规则
  addValidate (value, rules) {
    // 遍历验证规则
    for (let i = 0; i < rules.length; i++) {
      const { rule, tip } = rules[i]
      const args = rule.split(':')

      this.validatorList.push(() => {
        // 提取规则方法名
        const rulename = args.shift()
        // 提取方法需传递的参数
        args.unshift(value)
        args.push(tip)
        return Rules[rulename].apply({ value }, args)
      })
    }
  }

  // 执行验证规则
  execValidate () {
    const result = { checked: false, message: '' }
    for (let i = 0; i < this.validatorList.length; i++) {
      const tip = this.validatorList[i]()
      if (tip) {
        result.message = tip
        return result
      }
    }
    result.checked = true
    return result
  }

  // 单个验证方法
  check (value, rules) {
    const validator = new Validator()
    validator.addValidate(value, rules)
    return validator.execValidate()
  }

  // 统一验证方法
  allCheck (items) {
    let results = items.map(item => this.check(item.value, item.rules))
    results = results.filter(result => {
      if (!result.checked) { return result.message }
    })
    return results
  }
}

module.exports = Validator
