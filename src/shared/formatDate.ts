export function parseDateFromMMDDYYYY(dateString) {
  // Kiểm tra định dạng đầu vào
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (!regex.test(dateString)) {
    throw new Error("Invalid date format. Expected 'mm-dd-yyyy'.");
  }

  // Tách ngày, tháng, năm từ chuỗi
  let [month, day, year] = dateString.split('-').map(Number);

  // Khởi tạo đối tượng Date
  // Tháng bắt đầu từ 0 (0 = January, 11 = December)
  let date = new Date(year, month - 1, day);

  // Kiểm tra xem ngày có hợp lệ không
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error('Invalid date.');
  }

  return date;
}
