const defaultKeyDic = {
  value: 'value',
  label: 'label',
  children: 'children',
}

const defaultCheckFn = (item, value, keyDic = defaultKeyDic) => {
  return String(item[keyDic.value]) === String(value)
}

export function getPathFromTree(
  data,
  id,
  keyDic = defaultKeyDic,
  checkFn = defaultCheckFn,
  indexArray = [],
) {
  if (!data) return []
  const arr = Array.from(indexArray)
  for (let i = 0, len = data.length; i < len; i++) {
    arr.push(data[i])
    if (checkFn(data[i], id, keyDic)) {
      return arr
    }
    const children = data[i][keyDic.children]
    if (children && children.length) {
      const result = getPathFromTree(children, id, keyDic, checkFn, arr)
      if (result) return result
    }
    arr.pop()
  }
  return []
}

export function getItemFromTree(
  treeData,
  value,
  keyDic = defaultKeyDic,
  checkFn = defaultCheckFn,
) {
  keyDic = {
    ...defaultKeyDic,
    ...keyDic,
  }
  if (value === '' || !treeData?.length) return null
  let result = null
  for (let i = 0; i < treeData.length; i++) {
    const item = treeData[i]
    if (checkFn(item, value, keyDic)) {
      return item
    } else if (item[keyDic.children]) {
      result = getItemFromTree(item[keyDic.children], value, keyDic, checkFn)
      if (result) {
        return result
      }
    }
  }
  return result
}
