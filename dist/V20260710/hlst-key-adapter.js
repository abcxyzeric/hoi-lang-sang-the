(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;
  if (root.HLSTKeyAdapter) return;

  const canonicalToInternal = new Map([
    ['Thông tin thế giới', 'Thông_tin_thế_giới'],
    ['Lịch', 'Niên_lịch'],
    ['Thời gian', 'Thời_gian'],
    ['Vị trí', 'Vị_trí'],
    ['Đại lục', 'Đại_lục'],
    ['Khu vực', 'Khu_vực'],
    ['Địa điểm', 'Địa_điểm'],
    ['Cốt truyện thế giới', 'Cốt_truyện_thế_giới'],

    ['Danh sách nhiệm vụ', 'Danh_sách_nhiệm_vụ'],
    ['Bên ủy thác', 'Bên_ủy_thác'],
    ['Giới thiệu tóm tắt', 'Giới_thiệu_tóm_tắt'],
    ['Mục tiêu', 'Mục_tiêu'],
    ['Phần thưởng', 'Phần_thưởng'],
    ['Giao phó', 'Bàn_giao'],

    ['Người ở gần', 'Người_ở_gần'],
    ['Danh sách gắn kết', 'Danh_sách_ràng_buộc'],
    ['Nhân vật', 'Nhân_vật'],
    ['Tài sản cốt lõi', 'Tài_sản_cốt_lõi'],
    ['Bộ sưu tập quân cờ chủng tộc', 'Bộ_sưu_tập_quân_cờ_chủng_tộc'],
    ['Tin đồn', 'Tin_đồn'],
    ['Chiến đấu', 'Chiến_đấu'],
    ['Cấu hình hệ thống', 'Cấu_hình_hệ_thống'],
    ['Đồng hồ tận thế', 'Đồng_hồ_tận_thế'],

    ['Tên', 'Tên'],
    ['Tên gọi', 'Tên'],
    ['Chủng tộc', 'Chủng_tộc'],
    ['Nghề nghiệp', 'Nghề_nghiệp'],
    ['Thiết lập bối cảnh', 'Thiết_lập_bối_cảnh'],
    ['Đặc chất', 'Đặc_chất'],
    ['Cấp độ', 'Cấp_độ'],
    ['Tổng kinh nghiệm hiện tại', 'Tổng_kinh_nghiệm_hiện_tại'],
    ['Ngưỡng lên cấp', 'Ngưỡng_lên_cấp'],
    ['Ô đặc chất bổ sung', 'Ô_đặc_chất_bổ_sung'],
    ['Giới hạn HP', 'Giới_hạn_sinh_mệnh'],
    ['HP hiện tại', 'Sinh_mệnh_hiện_tại'],
    ['HP tạm thời', 'Sinh_mệnh_tạm_thời'],
    ['Thuộc tính chiến đấu', 'Thuộc_tính_chiến_đấu'],
    ['Tỷ lệ chí mạng', 'Tỷ_lệ_bạo_kích'],
    ['Sát thương chí mạng', 'Sát_thương_bạo_kích'],
    ['Ngưỡng chí mạng', 'Ngưỡng_bạo_kích'],
    ['Giảm sát thương vật lý', 'Giảm_sát_thương_vật_lý'],
    ['Giảm sát thương phép thuật', 'Giảm_sát_thương_ma_pháp'],
    ['Bảng vũ khí', 'Bảng_vũ_khí'],
    ['Thuộc tính', 'Thuộc_tính'],
    ['Sức mạnh', 'Sức_mạnh'],
    ['Nhanh nhẹn', 'Nhanh_nhẹn'],
    ['Thể chất', 'Thể_chất'],
    ['Trí lực', 'Trí_lực'],
    ['Cảm nhận', 'Cảm_nhận'],
    ['Sức hút', 'Sức_hấp_dẫn'],
    ['Điểm thuộc tính', 'Điểm_thuộc_tính'],

    ['Cây kỹ năng', 'Cây_kỹ_năng'],
    ['Danh sách kỹ năng', 'Danh_sách_kỹ_năng'],
    ['Tổng SP', 'Tổng_SP'],
    ['SP đã dùng', 'SP_đã_dùng'],
    ['Vật triệu hồi', 'Vật_triệu_hồi'],
    ['Ô kỹ năng chủ động', 'Ô_kỹ_năng_chủ_động'],
    ['Ô kỹ năng thức tỉnh', 'Ô_kỹ_năng_thức_tỉnh'],
    ['Ô tuyệt kỹ liên kết', 'Ô_tuyệt_kỹ_liên_kết'],
    ['Kỹ năng tài nguyên', 'Kỹ_năng_tài_nguyên'],
    ['Độ thuần thục', 'Độ_thành_thạo'],
    ['Đạo lộ', 'Đạo_đồ'],
    ['Tên đạo lộ', 'Tên_đạo_đồ'],
    ['Nguyên lực hiện tại', 'Nguyên_lực_hiện_tại'],
    ['Giới hạn nguyên lực', 'Giới_hạn_nguyên_lực'],
    ['Yếu tố', 'Yếu_tố'],
    ['Kỳ tích', 'Kỳ_tích'],
    ['Quyền năng', 'Quyền_năng'],
    ['Ảnh hưởng thế giới', 'Ảnh_hưởng_thế_giới'],
    ['Nhãn khái niệm', 'Nhãn_khái_niệm'],
    ['Hiệu ứng đặc biệt', 'Hiệu_ứng_đặc_biệt'],
    ['Năng lực đạo lộ', 'Năng_lực_đạo_đồ'],
    ['Hiệu ứng trạng thái', 'Hiệu_ứng_trạng_thái'],

    ['Túi đồ', 'Ba_lô'],
    ['Tiền tệ chung', 'Tiền_tệ_chung'],
    ['Vật phẩm', 'Vật_phẩm'],
    ['Danh sách trang bị', 'Danh_sách_trang_bị'],
    ['Danh vọng', 'Danh_vọng'],

    ['Loại hình', 'Loại'],
    ['Loại', 'Loại'],
    ['Vị trí trang bị', 'Vị_trí_trang_bị'],
    ['Vị trí trang bị gốc', 'Vị_trí_trang_bị_gốc'],
    ['Rương trang bị', 'Hòm_trang_bị'],
    ['Trạng thái trang bị', 'Trạng_thái_trang_bị'],
    ['Phẩm chất', 'Phẩm_chất'],
    ['Phẩm cấp', 'Hạng_phẩm'],
    ['Cấp cường hóa', 'Cấp_cường_hóa'],
    ['Thẻ', 'Nhãn'],
    ['Gia tăng thuộc tính', 'Cộng_thêm_thuộc_tính'],
    ['Hiệu quả', 'Hiệu_quả'],
    ['Mô tả', 'Mô_tả'],
    ['Xúc xắc sát thương', 'Xúc_xắc_sát_thương'],
    ['Hệ số cấp độ', 'Hệ_số_cấp_độ'],
    ['Sát thương cố định', 'Sát_thương_cố_định'],
    ['Lực phòng ngự', 'Lực_phòng_ngự'],

    ['Bậc', 'Bậc'],
    ['Tiến độ', 'Tiến_độ'],
    ['Ngưỡng thăng bậc', 'Ngưỡng_thăng_bậc'],
    ['Cấp kỹ năng', 'Cấp_kỹ_năng'],
    ['Đang hồi chiêu', 'Đang_hồi_chiêu'],
    ['Hồi chiêu', 'Hồi_chiêu'],
    ['Đếm hồi chiêu', 'Bộ_đếm_hồi_chiêu'],
    ['Hệ số sát thương', 'Hệ_số_sát_thương'],
    ['Tên vật triệu hồi', 'Tên_vật_triệu_hồi'],
    ['Thời gian duy trì', 'Thời_gian_duy_trì'],
    ['Số lần còn lại', 'Số_lần_còn_lại'],
    ['Giới hạn số lần', 'Giới_hạn_số_lần'],
    ['Điều kiện hồi phục', 'Điều_kiện_hồi_phục'],
    ['Tiêu hao', 'Tiêu_hao'],

    ['Giới tính', 'Giới_tính'],
    ['Ở gần', 'Ở_gần'],
    ['Ngoại hình', 'Ngoại_hình'],
    ['Trang phục', 'Trang_phục'],
    ['Độ thiện cảm', 'Độ_thiện_cảm'],
    ['Thệ ước đồng hành', 'Lời_thề_đồng_hành'],
    ['Tuyệt kỹ liên kết', 'Tuyệt_kỹ_liên_kết'],
    ['Suy nghĩ hiện tại', 'Suy_nghĩ_hiện_tại'],

    ['Lời đồn đường phố', 'Lời_đồn_đường_phố'],
    ['Giao dịch tình báo', 'Giao_dịch_tình_báo'],
    ['Cáo thị và hịch văn', 'Cáo_thị_và_hịch_văn'],
    ['Người kể chuyện', 'Người_kể_chuyện'],
    ['Nội dung', 'Nội_dung'],
    ['Độ tin cậy', 'Độ_tin_cậy'],
    ['Người bán', 'Người_bán'],
    ['Tóm tắt', 'Tóm_tắt'],
    ['Giá yêu cầu', 'Giá_yêu_cầu'],
    ['Người ban bố', 'Người_ban_bố'],
    ['Vị trí dán', 'Vị_trí_dán'],

    ['Tên tài sản', 'Tên_tài_sản'],
    ['Quy mô chủ thể', 'Quy_mô_chủ_thể'],
    ['Nơi tọa lạc', 'Nơi_tọa_lạc'],
    ['Trạng thái', 'Trạng_thái'],
    ['Chuỗi xây dựng', 'Chuỗi_xây_dựng'],
    ['Giai đoạn xây dựng', 'Giai_đoạn_xây_dựng'],
    ['Cơ sở cốt lõi', 'Cơ_sở_cốt_lõi'],
    ['Chức năng', 'Chức_năng'],
    ['Sản lượng', 'Sản_lượng'],
    ['Ngày sản xuất tiếp theo', 'Ngày_sản_lượng_kế_tiếp'],
    ['Nhân sự đồn trú', 'Nhân_sự_đồn_trú'],
    ['Sự kiện chờ xử lý', 'Sự_kiện_chờ_xử_lý'],

    ['Đang trong chiến đấu', 'Đang_chiến_đấu'],
    ['Lượt hiện tại', 'Lượt_hiện_tại'],
    ['Hiển thị tóm tắt chi tiết', 'Hiển_thị_tóm_tắt_chi_tiết'],
    ['Đường dẫn hiển thị tóm tắt', 'Đường_dẫn_hiển_thị_tóm_tắt'],
    ['Làm đẹp lời thoại', 'Làm_đẹp_lời_thoại'],
    ['Thế giới quan', 'Thế_giới_quan'],
    ['Hệ số kẻ địch', 'Hệ_số_kẻ_địch'],
    ['Lính thường', 'Lính_thường'],
    ['Tinh nhuệ', 'Tinh_nhuệ'],
    ['Thủ lĩnh', 'Thủ_lĩnh'],
    ['Lãnh chúa', 'Lãnh_chúa'],
    ['Huyền thoại', 'Huyền_thoại'],
    ['Hệ số HP', 'Hệ_số_HP'],

    ['Niên lịch bắt đầu', 'Niên_lịch_bắt_đầu'],
    ['Điểm hiện tại', 'Điểm_hiện_tại'],
    ['Số lần công tích', 'Số_lần_công_tích'],
    ['Công tích đã trấn áp', 'Công_tích_đã_trấn_áp'],
    ['Đã thanh trừ', 'Đã_thanh_trừ'],
    ['Ngày thanh trừ', 'Ngày_thanh_trừ'],
    ['Số đời còn sống', 'Số_đời_còn_sống']
  ]);

  const internalToCanonical = new Map();
  for (const [canonical, internal] of canonicalToInternal.entries()) {
    if (!internalToCanonical.has(internal)) internalToCanonical.set(internal, canonical);
  }
  internalToCanonical.set('Tiền_vàng', 'Tiền tệ chung');

  const isEquipmentContext = (path) => path.some(part => (
    part === 'Danh sách trang bị'
    || part === 'Danh_sách_trang_bị'
    || part === '\u88c5\u5907\u5217\u8868'
  ));

  const toInternalKey = (key) => {
    const text = String(key);
    if (canonicalToInternal.has(text)) return canonicalToInternal.get(text);
    if (internalToCanonical.has(text)) return text;
    return text.replace(/\s+/g, '_');
  };

  const toInternalKeyAt = (key, path = []) => {
    const text = String(key);
    if (text === 'Vị trí' && isEquipmentContext(path)) return 'Vị_trí_trang_bị';
    if (text === 'Vị trí gốc' && isEquipmentContext(path)) return 'Vị_trí_trang_bị_gốc';
    return toInternalKey(text);
  };

  const toCanonicalKey = (key) => {
    const text = String(key);
    if (internalToCanonical.has(text)) return internalToCanonical.get(text);
    if (canonicalToInternal.has(text)) return text;
    return text.replace(/_/g, ' ');
  };

  const toCanonicalKeyAt = (key, path = []) => {
    const text = String(key);
    if (text === 'Vị_trí_trang_bị') return 'Vị trí';
    if (text === 'Vị_trí_trang_bị_gốc') return 'Vị trí trang bị gốc';
    return toCanonicalKey(text);
  };

  const mapKeysDeep = (value, keyMapper, path = []) => {
    if (Array.isArray(value)) return value.map(item => mapKeysDeep(item, keyMapper, path));
    if (!value || typeof value !== 'object') return value;
    const next = {};
    Object.entries(value).forEach(([key, item]) => {
      const mappedKey = keyMapper(key, path);
      next[mappedKey] = mapKeysDeep(item, keyMapper, path.concat(mappedKey));
    });
    return next;
  };

  const clone = (value) => {
    if (value == null || typeof value !== 'object') return value;
    try {
      if (typeof structuredClone === 'function') return structuredClone(value);
    } catch (_) {}
    return JSON.parse(JSON.stringify(value));
  };

  const splitPatchPath = (path) => String(path || '')
    .split('/')
    .slice(1)
    .map(part => part.replace(/~1/g, '/').replace(/~0/g, '~'));

  const escapePatchPart = (part) => String(part).replace(/~/g, '~0').replace(/\//g, '~1');

  const mapPatchPath = (path, keyMapper) => {
    const parts = splitPatchPath(path);
    const mappedParts = [];
    parts.forEach(part => {
      mappedParts.push(keyMapper(part, mappedParts));
    });
    return '/' + mappedParts.map(escapePatchPart).join('/');
  };

  root.HLSTKeyAdapter = {
    toInternal(value) {
      return mapKeysDeep(clone(value), toInternalKeyAt);
    },
    toCanonical(value) {
      return mapKeysDeep(clone(value), toCanonicalKeyAt);
    },
    toInternalKey,
    toCanonicalKey,
    toInternalPath(path) {
      return mapPatchPath(path, toInternalKeyAt);
    },
    toCanonicalPath(path) {
      return mapPatchPath(path, toCanonicalKeyAt);
    }
  };
})();
