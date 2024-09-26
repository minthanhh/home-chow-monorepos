function filterArray(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Input phải là một mảng')
  }

  // Lọc mảng và gán lại giá trị cho arr
  arr.length = 0 // Xóa tất cả các phần tử hiện tại
  arr.push(...arr.filter((item) => item !== null && item !== undefined && typeof item === 'number'))
}

// Ví dụ sử dụng
var arr = [1, 2, 3, null, undefined, 5, 'hello', {}, []]
filterArray(arr)
console.log(arr) // [1, 2, 3, 5]
