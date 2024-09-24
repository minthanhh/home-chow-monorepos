const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const uuid = 'c9c9e0f1-2b3c-4a5d-b6e7-8f9g1h2j3k4l' // UUID hợp lệ với đủ 36 ký tự

console.log('regex.test(uuid)', regex.test(uuid)) // Kết quả test
