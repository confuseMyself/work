export default function add(a,b) {
  return a+b
}

export function reverse(str) {
  let res = ''
  for (let i=0;i<str.length;i++){
    res += str[str.length-i-1]
  }
  return res
}
