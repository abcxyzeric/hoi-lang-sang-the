// ==================== Thanh trạng thái giao diện điện thoại ====================
// ==================== Tải Font Awesome theo cách an toàn ====================
function loadFontAwesome() {
    // Kiểm tra đã tải hay chưa.
    if ($('link[href*="font-awesome"]').length > 0 || $('link[href*="fontawesome"]').length > 0) {
        return;
    }

    // Tải bằng thẻ link, bất đồng bộ và không chặn render.
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
}

// ==================== Chèn style ====================
const phoneStyles = `
<style id="mobile-phone-styles">
html, body {
    height: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
}

/* ==================== Nút kích hoạt, phong cách Brushed Metal mô phỏng nút nổi thanh trạng thái ==================== */
#mobile-trigger-btn {
    position: fixed;
    /* Mặc định trên desktop: nằm giữa dọc, cách mép phải khoảng một phần ba */
    top: 50%;
    right: 33.33%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%);
    border: 1px solid #d4d4d4;
    font-size: 28px;
    cursor: move;
    z-index: 10000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03);
    transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    padding: 0;
    overflow: visible;
}
#mobile-trigger-btn .star-container {
    width: 85%;
    height: 85%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
#mobile-trigger-btn .icon-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    display: block;
}
#mobile-trigger-btn .star-layer {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: all 0.4s ease;
    transform-box: view-box;
    transform-origin: 50px 50px;
}
#mobile-trigger-btn .base-layer {
    stroke: #666;
    stroke-width: 2;
    opacity: 0.7;
}
#mobile-trigger-btn .layer-1 {
    stroke: #555;
    stroke-width: 2;
    stroke-dasharray: 100 400;
    stroke-dashoffset: 0;
    opacity: 0.8;
    animation: mobileBtnMetalDraw 6s linear infinite;
}
#mobile-trigger-btn .layer-2 {
    stroke: #999;
    stroke-width: 1.5;
    stroke-dashoffset: 0;
    animation: mobileBtnMetalDraw 6s linear infinite reverse;
}
@keyframes mobileBtnMetalDraw {
    from { stroke-dashoffset: 500; }
    to { stroke-dashoffset: 0; }
}
#mobile-trigger-btn .center-circle {
    fill: none;
    stroke: #777;
    stroke-width: 1.5;
}

/* Điều khiển bằng CSS class: bên phải, căn giữa dọc trên mobile, tương thích srcdoc iframe */
/* Dùng selector nhiều lớp ID để tăng độ ưu tiên */
#mobile-trigger-btn#mobile-trigger-btn#mobile-trigger-btn.mobile-mode,
body #mobile-trigger-btn.mobile-mode {
    /* Chế độ mobile: đặt ở mép phải, căn giữa dọc, ghi đè toàn bộ inline style */
    left: auto !important;
    top: 50% !important;
    right: 12px !important;
    bottom: auto !important;
    width: 45px !important;
    height: 45px !important;
    font-size: 22px !important;
    position: fixed !important;
    display: flex !important;
    z-index: 10000 !important;
    transform: translateY(-50%) !important;
    margin: 0 !important;
    background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%) !important;
    border: 1px solid #d4d4d4 !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03) !important;
}

#mobile-trigger-btn#mobile-trigger-btn#mobile-trigger-btn.tablet-mode,
body #mobile-trigger-btn.tablet-mode {
    /* Chế độ tablet */
    left: auto !important;
    top: auto !important;
    right: 15px !important;
    bottom: 15px !important;
    width: 50px !important;
    height: 50px !important;
    font-size: 24px !important;
    position: fixed !important;
    display: flex !important;
    z-index: 10000 !important;
    transform: none !important;
    margin: 0 !important;
    background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%) !important;
    border: 1px solid #d4d4d4 !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03) !important;
}

/* Media query CSS làm phương án dự phòng, có hiệu lực ngoài môi trường iframe */
@media (max-width: 480px) {
    #mobile-trigger-btn:not(.desktop-mode) {
        left: auto !important;
        top: 50% !important;
        right: 12px !important;
        bottom: auto !important;
        width: 45px !important;
        height: 45px !important;
        font-size: 22px !important;
        transform: translateY(-50%) !important;
        background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%) !important;
        border: 1px solid #d4d4d4 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03) !important;
    }
}

@media (min-width: 481px) and (max-width: 768px) {
    #mobile-trigger-btn:not(.desktop-mode) {
        left: auto !important;
        top: auto !important;
        right: 15px !important;
        bottom: 15px !important;
        width: 50px !important;
        height: 50px !important;
        font-size: 24px !important;
        background: linear-gradient(135deg, #e3e3e3 0%, #c4c4c4 100%) !important;
        border: 1px solid #d4d4d4 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03) !important;
    }
}

#mobile-trigger-btn:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, #f0f0f0 0%, #dcdcdc 100%);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08), 0 20px 30px rgba(0, 0, 0, 0.06);
}

#mobile-trigger-btn.dragging {
    transition: none !important;
    transform: none !important;
    cursor: grabbing;
}

#mobile-trigger-btn:active:not(.dragging) {
    transform: scale(0.96);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition-duration: 0.1s;
}

/* ==================== Container điện thoại ==================== */
#mobile-phone-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s;
    transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

#mobile-phone-overlay.active {
    display: flex;
}

/* Khi ghim lên trên: lớp phủ trong suốt và không chặn click */
#mobile-phone-overlay.pinned {
    background: transparent;
    backdrop-filter: none;
    pointer-events: none;
}

/* Khi ghim lên trên: khung điện thoại vẫn phản hồi click */
#mobile-phone-overlay.pinned .mobile-phone-frame {
    pointer-events: auto;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ==================== Khung điện thoại ==================== */
#mobile-phone-overlay .mobile-phone-frame {
    position: relative !important;
    width: 90% !important;
    max-width: 375px !important;
    aspect-ratio: 375/737 !important;
    background: #333 !important;
    border-radius: 40px !important;
    padding: 8px !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
    overflow: hidden !important;
    animation: slideUp 0.3s !important;
}

/* Xóa pseudo-element của khung điện thoại */
#mobile-phone-overlay .mobile-phone-frame::before,
#mobile-phone-overlay .mobile-phone-frame::after {
    content: none !important;
    display: none !important;
}

@keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

#mobile-phone-overlay .mobile-phone-screen {
    width: 100% !important;
    height: 100% !important;
    border-radius: 32px !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    position: relative !important;
    background: #fff5f7 !important;
    background-image: url('https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/cover/phap-lo-dac.webp') !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
}

/* ==================== Thanh trạng thái ==================== */
.mobile-status-bar {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
}

.status-left {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-left .time {
    color: #1a1a1a;
    font-weight: 700;
}

.pin-btn {
    background: transparent;
    border: none;
    color: #666;
    font-size: 16px;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-radius: 6px;
}

.pin-btn:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #333;
}

.pin-btn.pinned {
    color: #3B82F6;
    transform: rotate(45deg);
}

.pin-btn.pinned:hover {
    background: rgba(59, 130, 246, 0.1);
}

.status-center {
    flex: 1;
    display: flex;
    justify-content: center;
    user-select: none;
}

.dynamic-island {
    width: 126px;
    height: 30px;
    background: #1a1a1a;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
}

.dynamic-island::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: #00ff00;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.status-right {
    display: flex;
    align-items: center;
    gap: 5px;
}

.battery {
    display: flex;
    align-items: center;
    gap: 2px;
    color: #1a1a1a;
    font-size: 12px;
}

/* ==================== Khu nội dung chính ==================== */
.mobile-content {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

#mobile-phone-overlay .home-screen {
    flex: 1 !important;
    padding: 20px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    overflow-y: auto !important;
    background: transparent !important;
}

/* ==================== Thẻ thời gian và thời tiết ==================== */
.weather-card {
    /* Hoàn toàn trong suốt nhưng vẫn giữ chỗ */
    background: transparent;
    backdrop-filter: none;
    box-shadow: none;
    border-radius: 24px;
    padding: 20px;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    flex-shrink: 0;
    pointer-events: none;
}

/* Ẩn nội dung thẻ nhưng vẫn giữ chỗ */
.weather-card * {
    visibility: hidden;
}

.weather-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.current-date {
    font-size: 20px;
    color: #2d3748;
    font-weight: 400;
    /* Bóng nhiều lớp trắng/đen để thích nghi mọi nền */
    text-shadow: 
        0 0 10px rgba(255, 255, 255, 0.9),
        0 0 20px rgba(255, 255, 255, 0.7),
        0 2px 4px rgba(0, 0, 0, 0.3),
        0 4px 8px rgba(0, 0, 0, 0.2);
}

.current-time {
    color: #1a1a1a;
    font-size: 48px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.05em;
    /* Bóng đậm để luôn rõ trên mọi nền */
    text-shadow: 
        0 0 15px rgba(255, 255, 255, 1),
        0 0 30px rgba(255, 255, 255, 0.8),
        0 3px 6px rgba(0, 0, 0, 0.4),
        0 6px 12px rgba(0, 0, 0, 0.3);
}

.weather-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* Tăng nền bán trong suốt và thêm hiệu ứng blur */
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 10px 15px;
    gap: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.weather-desc {
    font-size: 14px;
    color: #2d3748;
    font-weight: 400;
    text-shadow: 
        0 0 8px rgba(255, 255, 255, 0.8),
        0 1px 3px rgba(0, 0, 0, 0.2);
}

/* ==================== Lưới biểu tượng ứng dụng ==================== */
#mobile-phone-overlay .app-pages-container {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    position: relative !important;
    overflow: hidden !important;
    background: transparent !important;
    touch-action: pan-x !important;
}

/* Container vuốt trang */
#mobile-phone-overlay .app-pages-wrapper {
    flex: 1 !important;
    display: flex !important;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    touch-action: pan-x !important;
    overflow: visible !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
}

#mobile-phone-overlay .app-pages-wrapper.no-transition {
    transition: none !important;
}

#mobile-phone-overlay .app-page {
    flex: 0 0 100% !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    overflow-y: auto !important;
}

#mobile-phone-overlay .app-grid {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 25px !important;
    padding: 0 20px !important;
}

/* Chỉ báo trang */
#mobile-phone-overlay .page-indicators {
    display: none !important; /* Chỉ có một trang thì ẩn chỉ báo */
    justify-content: center !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 15px 0 !important;
    position: relative !important;
    z-index: 10 !important;
}

#mobile-phone-overlay .indicator {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    background: rgba(0, 0, 0, 0.2) !important;
    transition: all 0.3s ease !important;
    cursor: pointer !important;
}

#mobile-phone-overlay .indicator.active {
    width: 24px !important;
    border-radius: 4px !important;
    background: rgba(0, 0, 0, 0.5) !important;
}

#mobile-phone-overlay .app-row {
    display: flex !important;
    justify-content: space-around !important;
    align-items: center !important;
    gap: 15px !important;
}

#mobile-phone-overlay .app-icon {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 8px !important;
    cursor: pointer !important;
    transition: transform 0.2s ease !important;
    flex: 1 !important;
    max-width: 70px !important;
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
}

#mobile-phone-overlay .app-icon:hover {
    transform: scale(1.1) !important;
}

#mobile-phone-overlay .app-icon-bg {
    width: 56px !important;
    height: 56px !important;
    border-radius: 16px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 26px !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
    position: relative !important;
    overflow: hidden !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
}

/* Xóa mọi lớp phủ pseudo-element có thể có */
#mobile-phone-overlay .app-icon-bg::before,
#mobile-phone-overlay .app-icon-bg::after {
    content: none !important;
    display: none !important;
}

#mobile-phone-overlay .app-icon::before,
#mobile-phone-overlay .app-icon::after {
    content: none !important;
    display: none !important;
}

#mobile-phone-overlay .app-icon-bg i {
    z-index: 1 !important;
    font-size: 26px !important;
    position: relative !important;
}

/* Nền gradient màu đặc phong cách Material Design, dùng !important để tăng ưu tiên */
#mobile-phone-overlay .app-icon-bg.md-blue {
    background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-blue i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-orange {
    background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-orange i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-green {
    background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-green i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-purple {
    background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-purple i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-pink {
    background: linear-gradient(135deg, #E91E63 0%, #C2185B 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-pink i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-red {
    background: linear-gradient(135deg, #F44336 0%, #D32F2F 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-red i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-yellow {
    background: linear-gradient(135deg, #FFC107 0%, #FFA000 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-yellow i {
    color: rgba(0, 0, 0, 0.75) !important;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3) !important;
}

#mobile-phone-overlay .app-icon-bg.md-cyan {
    background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-cyan i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-icon-bg.md-teal {
    background: linear-gradient(135deg, #009688 0%, #00796B 100%) !important;
    border: none !important;
}

#mobile-phone-overlay .app-icon-bg.md-teal i {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

#mobile-phone-overlay .app-label {
    font-size: 11px !important;
    color: #1a1a1a !important;
    font-weight: 500 !important;
    text-align: center !important;
    line-height: 1.2 !important;
    /* Bóng chữ nhiều lớp để rõ trên mọi nền */
    text-shadow: 
        0 0 8px rgba(255, 255, 255, 1),
        0 0 12px rgba(255, 255, 255, 0.9),
        0 1px 3px rgba(0, 0, 0, 0.4),
        0 2px 6px rgba(0, 0, 0, 0.3) !important;
    /* Thêm nền bán trong suốt để tăng độ dễ đọc */
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(4px);
    padding: 2px 6px !important;
    border-radius: 6px !important;
}

/* Animation hover biểu tượng */
#mobile-phone-overlay .app-icon:hover .app-icon-bg {
    transform: scale(1.08) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35) !important;
}

#mobile-phone-overlay .app-icon:active .app-icon-bg {
    transform: scale(0.92) !important;
}

/* ==================== Bảng chi tiết ứng dụng ==================== */
.app-detail-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff !important;
    z-index: 100 !important;
    display: none;
    flex-direction: column;
    animation: slideIn 0.3s;
}

.app-detail-panel.active {
    display: flex;
}

@keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

.app-header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
}

.back-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background 0.2s ease;
    font-size: 20px;
    color: #2d3748;
}

.back-button:hover {
    background: rgba(0, 0, 0, 0.1);
}

.app-title {
    font-size: 16px;
    font-weight: 600;
    color: #2d3748;
}

.app-body {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    background: #f8f9fa;
    transition: opacity 0.2s ease-in-out;
}

/* ==================== Style mục danh sách ==================== */
.list-item {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.list-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.list-item-name {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
}

.list-item-value {
    font-size: 14px;
    font-weight: 600;
    color: #10b981;
}

.list-item-desc {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.5;
}

/* Hiệu ứng hover mục danh sách bạn bè */
.friend-item:hover {
    background: #fef3f2 !important;
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.15) !important;
    transform: translateY(-1px);
}

/* Hiệu ứng hover mục bài viết diễn đàn */
.forum-post-item:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12) !important;
}

.forum-post-item:active {
    transform: translateY(0) !important;
}

.friend-item:active {
    transform: translateY(0);
}

.empty-message {
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
    font-size: 14px;
}

/* ==================== Style giao diện trò chuyện ==================== */
.chat-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff !important;
    z-index: 200 !important;
    display: none;
    flex-direction: column;
    animation: slideIn 0.3s;
}

.chat-panel.active {
    display: flex;
}

.chat-header {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    background: #f8f9fa;
}

.message-item {
    margin-bottom: 15px;
    display: flex;
}

.message-item.mine {
    justify-content: flex-end;
}

.message-item.other {
    justify-content: flex-start;
}

.message-bubble {
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 15px;
    word-wrap: break-word;
}

.message-item.mine .message-bubble {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.message-item.other .message-bubble {
    background: white;
    color: #2d3748;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.message-sender {
    font-size: 11px;
    color: #9ca3af;
    margin-bottom: 3px;
}

.message-time {
    font-size: 10px;
    opacity: 0.8;
    margin-top: 5px;
    color: inherit;
}

.chat-input-area {
    height: 60px;
    background: white;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    flex-shrink: 0;
}

.chat-input {
    flex: 1;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 0 15px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    background: #ffffff;
    color: #1f2937;
}

.chat-input:focus {
    border-color: #667eea;
    background: #ffffff;
}

.chat-input::placeholder {
    color: #9ca3af;
    opacity: 1;
}

.chat-send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.chat-send-btn:hover:not(:disabled) {
    transform: scale(1.1);
}

.chat-send-btn:active:not(:disabled) {
    transform: scale(0.95);
}

/* Trạng thái đang gửi: tối hơn và chuyển thành hình chữ nhật */
.chat-send-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6 !important;
    background: #6c757d !important; /* Nền xám */
    border-radius: 8px !important; /* Chuyển thành chữ nhật bo góc */
    transform: none !important;
    box-shadow: none !important;
}

/* Animation biểu tượng chữ nhật khi đang gửi */
.chat-send-btn .fa-stop {
    animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}

/* ==================== Style trang cài đặt ==================== */
.settings-section {
    margin-bottom: 20px;
}

.settings-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 12px;
    padding-left: 5px;
}

.wallpaper-categories {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.wallpaper-category {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
}

.wallpaper-category:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.wallpaper-category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wallpaper-category-name {
    font-size: 15px;
    font-weight: 600;
    color: #2d3748;
}

.wallpaper-category-count {
    font-size: 12px;
    color: #9ca3af;
}

.wallpaper-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 15px;
    display: none;
}

.wallpaper-grid.active {
    display: grid;
}

.wallpaper-item {
    aspect-ratio: 9/16;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    background: #f3f4f6;
    transition: all 0.2s ease;
}

.wallpaper-item:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.wallpaper-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.wallpaper-item.selected::after {
    content: '✓';
    position: absolute;
    top: 5px;
    right: 5px;
    width: 24px;
    height: 24px;
    background: #10b981;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
}

.wallpaper-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.wallpaper-loading::after {
    content: '';
    width: 24px;
    height: 24px;
    border: 3px solid #f3f4f6;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    z-index: 10;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ==================== Hiệu ứng loading ảnh ==================== */
.loading::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    border: 4px solid rgba(91, 164, 229, 0.2);
    border-top-color: #5BA4E5;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    z-index: 10;
}

/* ==================== Thích ứng responsive ==================== */

/* Thích ứng tablet (≤768px) */
@media (max-width: 768px) {
    /* Thích ứng khung */
    .mobile-phone-frame,
    #mobile-phone-overlay .mobile-phone-frame {
        width: 80% !important;
        max-width: 300px !important;
    }
    
    /* Nút kích hoạt */
    #mobile-trigger-btn {
        width: 50px;
        height: 50px;
        bottom: 15px;
        right: 15px;
    }
    
    /* Thanh trạng thái */
    .mobile-status-bar {
        height: 40px;
        padding: 0 12px;
        font-size: 13px;
    }
    
    /* Header ứng dụng */
    .app-header {
        height: 50px;
        padding: 0 15px;
    }
    
    .app-title {
        font-size: 17px;
    }
    
    .back-button,
    .pin-btn {
        font-size: 20px;
        padding: 5px;
    }
    
    /* Màn hình chính */
    .home-screen {
        padding: 15px;
        gap: 15px;
    }
    
    /* Thẻ thời tiết */
    .weather-card {
        padding: 15px;
        gap: 12px;
    }
    
    .weather-time {
        font-size: 26px;
    }
    
    .weather-date {
        font-size: 13px;
    }
    
    .weather-location {
        font-size: 12px;
    }
    
    /* Biểu tượng ứng dụng */
    .app-icon {
        gap: 6px;
    }
    
    .app-icon-bg {
        width: 52px;
        height: 52px;
        font-size: 26px;
        border-radius: 14px;
    }
    
    .app-label {
        font-size: 11px;
    }
    
    /* Lưới ứng dụng */
    .app-grid {
        gap: 15px;
    }
    
    .app-row {
        gap: 18px;
    }
    
    /* Nội dung ứng dụng */
    .app-body {
        padding: 15px;
    }
    
    /* Mục danh sách */
    .list-item {
        padding: 12px;
    }
    
    .list-item-name {
        font-size: 14px;
    }
    
    .list-item-value {
        font-size: 15px;
    }
    
    /* Danh sách tin nhắn */
    .message-item {
        padding: 12px;
    }
    
    .message-name {
        font-size: 14px;
    }
    
    .message-preview {
        font-size: 12px;
    }
    
    /* Giao diện trò chuyện */
    .chat-bubble {
        font-size: 14px;
        padding: 10px 14px;
    }
    
    .chat-input-container {
        padding: 12px 15px;
    }
    
    .chat-input {
        font-size: 14px;
        padding: 9px 14px;
    }
    
    .send-button {
        width: 38px;
        height: 38px;
        font-size: 16px;
    }
    
    /* Thẻ hàng hóa */
    .shop-item {
        padding: 12px;
    }
    
    .shop-item-name {
        font-size: 14px;
    }
    
    .shop-item-price {
        font-size: 15px;
    }
    
    .shop-buy-btn {
        padding: 7px 14px;
        font-size: 13px;
    }
    
    .shop-buy-btn:hover {
        transform: scale(1.05);
    }
    
    .shop-buy-btn:active {
        transform: scale(0.98);
    }
    
    /* ========== Style popup xác nhận tùy chỉnh ========== */
    .custom-confirm-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        opacity: 0;
        animation: fadeIn 0.2s ease-out forwards;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    .custom-confirm-modal {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        padding: 2px;
        min-width: 340px;
        max-width: 480px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        animation: slideUp 0.3s ease-out;
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(30px) scale(0.95);
            opacity: 0;
        }
        to {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
    }
    
    .custom-confirm-content {
        background: #1f2937;
        border-radius: 18px;
        padding: 28px 24px 20px;
    }
    
    .confirm-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        animation: iconPulse 2s ease-in-out infinite;
    }
    
    @keyframes iconPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
        50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
    }
    
    .confirm-title {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 16px;
        color: #f3f4f6;
        text-align: center;
        letter-spacing: 0.5px;
    }
    
    .confirm-message {
        font-size: 15px;
        line-height: 1.7;
        color: #d1d5db;
        margin-bottom: 24px;
        text-align: center;
        white-space: pre-line;
    }
    
    .confirm-item-info {
        background: rgba(102, 126, 234, 0.1);
        border: 1px solid rgba(102, 126, 234, 0.3);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 24px;
    }
    
    .confirm-item-name {
        font-size: 18px;
        font-weight: 600;
        color: #a5b4fc;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .confirm-item-desc {
        font-size: 13px;
        color: #9ca3af;
        margin-bottom: 12px;
        line-height: 1.6;
    }
    
    .confirm-item-price {
        font-size: 16px;
        font-weight: 600;
        color: #fbbf24;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .confirm-buttons {
        display: flex;
        gap: 12px;
    }
    
    .confirm-btn {
        flex: 1;
        padding: 14px 20px;
        border: none;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .confirm-btn-cancel {
        background: #374151;
        color: #d1d5db;
    }
    
    .confirm-btn-cancel:hover {
        background: #4b5563;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .confirm-btn-confirm {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    .confirm-btn-confirm:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }
    
    .confirm-btn:active {
        transform: translateY(0) scale(0.98);
    }
    
    /* Thẻ bạn bè */
    .friend-card {
        padding: 12px;
    }
    
    .friend-avatar {
        width: 45px;
        height: 45px;
        font-size: 20px;
    }
    
    .friend-name {
        font-size: 15px;
    }
    
    .friend-stats {
        font-size: 11px;
    }
}

/* Thích ứng điện thoại màn hình lớn (≤480px) */
@media (max-width: 480px) {
    /* Thích ứng khung */
    .mobile-phone-frame,
    #mobile-phone-overlay .mobile-phone-frame {
        width: 90% !important;
        max-width: 100% !important;
        border-radius: 30px !important;
        padding: 6px !important;
    }
    
    #mobile-phone-overlay .mobile-phone-screen {
        border-radius: 24px !important;
    }
    
    /* Nút kích hoạt */
    #mobile-trigger-btn {
        width: 45px;
        height: 45px;
        bottom: 12px;
        right: 12px;
    }
    
    /* Thanh trạng thái */
    .mobile-status-bar {
        height: 36px;
        padding: 0 10px;
        font-size: 12px;
    }
    
    .status-left .time {
        font-size: 13px;
    }
    
    /* Header ứng dụng */
    .app-header {
        height: 44px;
        padding: 0 12px;
    }
    
    .app-title {
        font-size: 16px;
    }
    
    .back-button,
    .pin-btn {
        font-size: 18px;
        padding: 4px;
    }
    
    /* Màn hình chính */
    .home-screen {
        padding: 12px;
        gap: 12px;
    }
    
    /* Thẻ thời tiết */
    .weather-card {
        padding: 12px;
        gap: 10px;
        border-radius: 15px;
    }
    
    .weather-time {
        font-size: 22px;
    }
    
    .weather-date {
        font-size: 12px;
    }
    
    .weather-location {
        font-size: 11px;
    }
    
    /* Biểu tượng ứng dụng */
    .app-icon {
        gap: 5px;
    }
    
    .app-icon-bg {
        width: 46px;
        height: 46px;
        font-size: 23px;
        border-radius: 12px;
    }
    
    .app-label {
        font-size: 10px;
    }
    
    /* Lưới ứng dụng */
    .app-grid {
        gap: 12px;
    }
    
    .app-row {
        gap: 15px;
    }
    
    /* Nội dung ứng dụng */
    .app-body {
        padding: 12px;
    }
    
    /* Mục danh sách */
    .list-item {
        padding: 10px;
        border-radius: 10px;
    }
    
    .list-item-name {
        font-size: 13px;
    }
    
    .list-item-value {
        font-size: 14px;
    }
    
    .list-item-desc {
        font-size: 11px;
    }
    
    /* Danh sách tin nhắn */
    .message-item {
        padding: 10px;
        gap: 10px;
    }
    
    .message-avatar {
        width: 42px;
        height: 42px;
        font-size: 18px;
    }
    
    .message-name {
        font-size: 13px;
    }
    
    .message-preview {
        font-size: 11px;
    }
    
    .message-time {
        font-size: 10px;
    }
    
    /* Giao diện trò chuyện */
    .chat-messages {
        gap: 12px;
        padding: 10px;
    }
    
    .chat-bubble {
        font-size: 13px;
        padding: 9px 13px;
        border-radius: 16px;
    }
    
    .chat-time {
        font-size: 10px;
    }
    
    .chat-input-container {
        padding: 10px 12px;
        gap: 8px;
    }
    
    .chat-input {
        font-size: 13px;
        padding: 8px 12px;
        border-radius: 20px;
    }
    
    .send-button {
        width: 36px;
        height: 36px;
        font-size: 15px;
    }
    
    /* Thẻ hàng hóa */
    .shop-grid {
        gap: 10px;
    }
    
    .shop-item {
        padding: 10px;
        border-radius: 10px;
    }
    
    .shop-item-name {
        font-size: 13px;
    }
    
    .shop-item-desc {
        font-size: 11px;
    }
    
    .shop-item-price {
        font-size: 14px;
    }
    
    .shop-buy-btn {
        padding: 6px 12px;
        font-size: 12px;
    }
    
    /* Thẻ bạn bè */
    .friends-grid {
        gap: 10px;
    }
    
    .friend-card {
        padding: 10px;
        border-radius: 10px;
    }
    
    .friend-avatar {
        width: 40px;
        height: 40px;
        font-size: 18px;
    }
    
    .friend-name {
        font-size: 14px;
    }
    
    .friend-identity {
        font-size: 11px;
    }
    
    .friend-stats {
        font-size: 10px;
    }
    
    .friend-stat-value {
        font-size: 13px;
    }
    
    /* Style tài sản đã bị loại bỏ */
    
    .asset-item {
        padding: 10px;
    }
    
    .asset-label {
        font-size: 12px;
    }
    
    .asset-value {
        font-size: 14px;
    }
    
    /* Trạng thái trống */
    .empty-state {
        padding: 40px 20px;
    }
    
    .empty-icon {
        font-size: 40px;
    }
    
    .empty-text {
        font-size: 13px;
    }
}

/* Thích ứng điện thoại màn hình nhỏ (≤360px) */
@media (max-width: 360px) {
    /* Thích ứng khung */
    .mobile-phone-frame,
    #mobile-phone-overlay .mobile-phone-frame {
        width: 95% !important;
        border-radius: 25px !important;
        padding: 5px !important;
    }
    
    #mobile-phone-overlay .mobile-phone-screen {
        border-radius: 20px !important;
    }
    
    /* Nút kích hoạt */
    #mobile-trigger-btn {
        width: 40px;
        height: 40px;
        bottom: 10px;
        right: 10px;
    }
    
    /* Thanh trạng thái */
    .mobile-status-bar {
        height: 34px;
        padding: 0 8px;
        font-size: 11px;
    }
    
    /* Header ứng dụng */
    .app-header {
        height: 40px;
        padding: 0 10px;
    }
    
    .app-title {
        font-size: 15px;
    }
    
    .back-button,
    .pin-btn {
        font-size: 16px;
        padding: 3px;
    }
    
    /* Màn hình chính */
    .home-screen {
        padding: 10px;
        gap: 10px;
    }
    
    /* Thẻ thời tiết */
    .weather-card {
        padding: 10px;
    }
    
    .weather-time {
        font-size: 20px;
    }
    
    .weather-date {
        font-size: 11px;
    }
    
    /* Biểu tượng ứng dụng */
    .app-icon-bg {
        width: 42px;
        height: 42px;
        font-size: 21px;
        border-radius: 10px;
    }
    
    .app-label {
        font-size: 9px;
    }
    
    .app-grid {
        gap: 10px;
    }
    
    .app-row {
        gap: 12px;
    }
    
    /* Nội dung ứng dụng */
    .app-body {
        padding: 10px;
    }
    
    /* Mục danh sách */
    .list-item-name {
        font-size: 12px;
    }
    
    .list-item-value {
        font-size: 13px;
    }
    
    /* Trò chuyện */
    .chat-bubble {
        font-size: 12px;
        padding: 8px 12px;
    }
    
    .chat-input {
        font-size: 12px;
        padding: 7px 10px;
    }
    
    .send-button {
        width: 34px;
        height: 34px;
    }
    
    /* Avatar bạn bè */
    .friend-avatar,
    .message-avatar {
        width: 36px;
        height: 36px;
        font-size: 16px;
    }
}

/* Tối ưu cảm ứng cho mọi thiết bị chạm */
@media (hover: none) and (pointer: coarse) {
    /* Đảm bảo vùng chạm tối thiểu 44px theo Apple HIG */
    .app-icon,
    .back-button,
    .send-button,
    .shop-buy-btn,
    button {
        min-width: 44px;
        min-height: 44px;
    }
    
    /* Tăng khoảng cách để tránh chạm nhầm */
    .app-row {
        gap: 20px;
    }
    
    /* Tăng phản hồi khi chạm */
    .app-icon:active {
        transform: scale(0.85);
    }
    
    .list-item:active,
    .message-item:active,
    .friend-card:active {
        transform: scale(0.98);
    }
}

/* Tối ưu xoay ngang */
@media (max-width: 768px) and (orientation: landscape) {
    .mobile-phone-frame,
    #mobile-phone-overlay .mobile-phone-frame {
        width: 50% !important;
        max-width: 500px !important;
    }
    
    .home-screen,
    .app-body {
        padding: 10px;
    }
    
    .app-grid {
        gap: 10px;
    }
}

/* ==================== Thanh cuộn ==================== */
.home-screen::-webkit-scrollbar,
.app-body::-webkit-scrollbar {
    width: 4px;
}

.home-screen::-webkit-scrollbar-track,
.app-body::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
}

.home-screen::-webkit-scrollbar-thumb,
.app-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
}

.home-screen::-webkit-scrollbar-thumb:hover,
.app-body::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
}

/* ==================== Nút xem hình nền toàn màn hình ==================== */
.wallpaper-fullscreen-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 50;
}

.wallpaper-fullscreen-btn i {
    font-size: 20px;
    color: #667eea;
}

.wallpaper-fullscreen-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
    background: rgba(255, 255, 255, 1);
}

.wallpaper-fullscreen-btn:active {
    transform: scale(0.95);
}

/* ==================== Trình xem hình nền toàn màn hình ==================== */
.wallpaper-fullscreen-viewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 200;
    animation: fadeIn 0.3s;
}

.wallpaper-fullscreen-viewer.active {
    display: flex;
}

.wallpaper-fullscreen-viewer img {
    max-width: 100%;
    max-height: calc(100% - 100px);
    object-fit: contain;
    border-radius: 0;
    box-shadow: none;
}

.wallpaper-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 201;
}

.wallpaper-close-btn i {
    font-size: 20px;
    color: #ffffff;
}

.wallpaper-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
}

.wallpaper-close-btn:active {
    transform: rotate(90deg) scale(0.9);
}
</style>
`;

// ==================== Biến toàn cục ====================
let currentPhoneData = null;
let currentPanel = null;

// Stack điều hướng dùng để xử lý trang nhiều cấp.
let navigationStack = [];

// Ghi nhớ điều hướng danh sách bạn bè.
let friendsListScrollPosition = 0; // Vị trí cuộn danh sách bạn bè.
let lastViewedFriend = null; // Tên bạn bè xem gần nhất.
let friendDetailScrollPosition = 0; // Vị trí cuộn trang chi tiết bạn bè.

/**
 * Kiểm tra object có mục liên hệ hợp lệ hay không.
 */
function hasContactEntries(obj) {
    if (!obj || typeof obj !== 'object') return false;
    return Object.keys(obj).length > 0;
}

/**
 * Lấy nguồn dữ liệu liên hệ hiện có, dùng Danh_sách_ràng_buộc từ script biến.
 */
function getRelationshipDataSource(source = currentPhoneData) {
    /* Ưu tiên lấy Danh_sách_ràng_buộc từ source truyền vào. */
    if (source && hasContactEntries(source.Danh_sách_ràng_buộc)) {
        return source.Danh_sách_ràng_buộc;
    }

    /* Dự phòng: thử lấy Danh_sách_ràng_buộc từ khung biến MVU. */
    if (typeof Mvu !== 'undefined' && Mvu.getMvuData) {
        try {
            /* Thử lấy từ tin nhắn mới nhất, dùng extractMvuGameData để trích dữ liệu. */
            const mvuData = Mvu.getMvuData({ type: 'message', message_id: 'latest' });
            const gameData = extractMvuGameData(mvuData);
            if (gameData && hasContactEntries(gameData.Danh_sách_ràng_buộc)) {
                return gameData.Danh_sách_ràng_buộc;
            }
            /* Thử lấy từ cấp chat. */
            const chatData = Mvu.getMvuData({ type: 'chat' });
            const chatGameData = extractMvuGameData(chatData);
            if (chatGameData && hasContactEntries(chatGameData.Danh_sách_ràng_buộc)) {
                return chatGameData.Danh_sách_ràng_buộc;
            }
        } catch (e) {
            console.error('[Thanh điện thoại] Lấy Danh_sách_ràng_buộc từ MVU thất bại:', e);
        }
    }
    return null;
}

/**
 * Lấy danh sách key hợp lệ của liên hệ.
 */
function getRelationshipKeys(collection) {
    if (!collection) return [];
    return Object.keys(collection);
}

function normalizeUiUnderscores(root = document) {
    const target = root && root.jquery ? root[0] : root;
    if (!target || typeof document === 'undefined' || !document.createTreeWalker) return;
    const skipSelector = 'script,style,textarea,input,select,option,pre,code';
    const walker = document.createTreeWalker(
        target,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                const parent = node.parentElement;
                if (!parent || parent.closest(skipSelector)) return NodeFilter.FILTER_REJECT;
                return node.nodeValue && node.nodeValue.includes('_')
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        }
    );
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
        nodes.push(node);
    }
    nodes.forEach(textNode => {
        textNode.nodeValue = textNode.nodeValue.replace(/_/g, ' ');
    });
}

function scheduleNormalizePhoneUi(root = document.getElementById('mobile-phone-overlay')) {
    const target = root && root.jquery ? root[0] : root;
    if (!target) return;
    const run = () => normalizeUiUnderscores(target);
    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(run);
    } else {
        setTimeout(run, 0);
    }
}

function setupPhoneUiUnderscoreObserver(root = document.getElementById('mobile-phone-overlay')) {
    const target = root && root.jquery ? root[0] : root;
    if (!target || target.__phoneUiUnderscoreObserver) return;
    scheduleNormalizePhoneUi(target);
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => scheduleNormalizePhoneUi(target));
        observer.observe(target, { childList: true, subtree: true, characterData: true });
        target.__phoneUiUnderscoreObserver = observer;
    }
}

// ==================== Cấu hình avatar nhân vật ====================
const CHARACTER_AVATAR_CONFIG = {
    'Nại Nhã Lệ': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/nai-nha-le.webp',
    'Tinh Cực': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/tinh-cuc.webp',
    'Pháp Lộ Đặc': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/phap-lo-dac.webp',
    'Asuna': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/asuna.webp',
    'Ruruka': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/ruruka.webp',
    'Orchis': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/orchis.webp',
    'Hồng Liên': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/hong-lien.webp',
    'Aiklisia': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/aiklisia.webp',
    'Kurami': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/kurami.webp',
    'Hatsuse Izuna': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/hatsuse-izuna.webp',
    'Stephanie': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/stephanie.webp',
    'Jibril': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/jibril.webp',
    'Tetto': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/tetto.webp',
    'Shiro': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/shiro.webp',
    'Hiiro': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/hiiro.webp',
    'Feel': 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/feel.webp',
    "Katisia": 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/katisia.webp',
    "Amis": 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/head/amis.webp'
};

Object.assign(CHARACTER_AVATAR_CONFIG, {
    '\u5948\u96c5\u4e3d': CHARACTER_AVATAR_CONFIG['Nại Nhã Lệ'],
    '\u661f\u6781': CHARACTER_AVATAR_CONFIG['Tinh Cực'],
    '\u6cd5\u9732\u7279': CHARACTER_AVATAR_CONFIG['Pháp Lộ Đặc'],
    '\u4e9a\u4e1d\u5a1c': CHARACTER_AVATAR_CONFIG['Asuna'],
    '\u9732\u9732\u5361': CHARACTER_AVATAR_CONFIG['Ruruka'],
    '\u5965\u5951\u4e1d': CHARACTER_AVATAR_CONFIG['Orchis'],
    '\u7ea2\u83b2': CHARACTER_AVATAR_CONFIG['Hồng Liên'],
    '\u827e\u514b\u8389\u897f\u5a05': CHARACTER_AVATAR_CONFIG['Aiklisia'],
    '\u514b\u62c9\u7c73': CHARACTER_AVATAR_CONFIG['Kurami'],
    '\u521d\u6fd1\u4f0a\u7eb2': CHARACTER_AVATAR_CONFIG['Hatsuse Izuna'],
    '\u4f0a\u7eb2': CHARACTER_AVATAR_CONFIG['Hatsuse Izuna'],
    '\u53f2\u8482\u82ac\u59ae': CHARACTER_AVATAR_CONFIG['Stephanie'],
    '\u5409\u666e\u8389\u5c14': CHARACTER_AVATAR_CONFIG['Jibril'],
    '\u7279\u56fe': CHARACTER_AVATAR_CONFIG['Tetto'],
    '\u767d': CHARACTER_AVATAR_CONFIG['Shiro'],
    '\u7eef': CHARACTER_AVATAR_CONFIG['Hiiro'],
    '\u83f2\u5c14': CHARACTER_AVATAR_CONFIG['Feel'],
    '\u5361\u63d0\u5e0c\u5a05': CHARACTER_AVATAR_CONFIG['Katisia'],
    '\u7231\u5f25\u65af': CHARACTER_AVATAR_CONFIG['Amis']
});

/**
 * Lấy URL avatar nhân vật.
 * @param {string} name - tên nhân vật.
 * @returns {string|null} - URL avatar hoặc null.
 */
function getCharacterAvatar(name) {
    if (!name) return null;
    // Khớp trực tiếp.
    if (CHARACTER_AVATAR_CONFIG[name]) {
        return CHARACTER_AVATAR_CONFIG[name];
    }
    // Khớp mờ: kiểm tra tên có chứa tên nhân vật trong cấu hình không.
    for (const [charName, avatarUrl] of Object.entries(CHARACTER_AVATAR_CONFIG)) {
        if (name.includes(charName) || charName.includes(name)) {
            return avatarUrl;
        }
    }
    return null;
}

// Biến liên quan đến làm mới thời gian thực.
let messageEventListener = null;
let lastMessageCount = 0;
let isEventListening = false;
let refreshPollingInterval = null;

// ==================== Hàm tiện ích giới hạn biên ====================
// Hàm clamp: giới hạn giá trị trong khoảng min và max.
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Lấy kích thước viewport đáng tin cậy, hỗ trợ iframe và nhiều môi trường.
function getViewportSize() {
    // Ưu tiên visualViewport, chính xác hơn và hỗ trợ zoom.
    if (window.visualViewport) {
        const vv = window.visualViewport;
        if (vv.width > 0 && vv.height > 0) {
            return { width: vv.width, height: vv.height };
        }
    }

    // Dự phòng bằng innerWidth/innerHeight.
    let w = window.innerWidth || document.documentElement.clientWidth || 0;
    let h = window.innerHeight || document.documentElement.clientHeight || 0;

    // Trong iframe thì thử lấy từ parent window.
    if ((w === 0 || h === 0) && window.parent !== window) {
        try {
            const pw = window.parent.innerWidth || window.parent.document.documentElement.clientWidth;
            const ph = window.parent.innerHeight || window.parent.document.documentElement.clientHeight;
            if (pw > 0) w = pw;
            if (ph > 0) h = ph;
        } catch (e) {
            // Khác domain nên không thể truy cập parent window.
        }
    }

    // Cuối cùng dùng giá trị mặc định để tránh trả về 0.
    return {
        width: w > 0 ? w : 800,
        height: h > 0 ? h : 600
    };
}

// Giới hạn hoàn toàn trong viewport, không cho phần nào vượt ra ngoài.
function constrainFullyInViewport(x, y, elementWidth, elementHeight) {
    const viewport = getViewportSize();

    const boundedX = clamp(x, 0, viewport.width - elementWidth);
    const boundedY = clamp(y, 0, viewport.height - elementHeight);

    return { x: boundedX, y: boundedY };
}

// Biến liên quan đến kéo thả.
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let btnStartX = 0;
let btnStartY = 0;
let hasMoved = false;

// Biến kéo thả giao diện điện thoại.
let isPhoneDragging = false;
let phoneDragStartX = 0;
let phoneDragStartY = 0;
let phoneStartX = 0;
let phoneStartY = 0;

// Trạng thái ghim lên trên.
let isPinned = false;

// Dữ liệu hình nền.
const phoneWpBaseUrl = 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/cover/';
const phoneWpData = {
    'Katisia': ['\u5361\u63d0\u5e0c\u5a05'],
    'Nại Nhã Lệ': ['\u5948\u96c5\u4e3d'],
    'Tinh Cực': ['\u661f\u6781'],
    'Pháp Lộ Đặc': ['\u6cd5\u9732\u7279'],
    'Hồng Liên': ['\u7ea2\u83b2'],
    'Aiklisia': ['\u827e\u514b\u8389\u897f\u5a05'],
    'Cerberus': ['\u51ef\u5c14\u8d1d\u6d1b\u65af'],
    'Yato': ['\u591c\u6597'],
    'Orchis': ['\u5965\u5951\u4e1d'],
    'Cancer Knight': ['\u764c\u9a91\u58eb'],
    'Crown': ['\u7687\u51a0'],
    'Hiiro': ['\u7eef'],
    'Shiro': ['\u767d'],
    'Jibril': ['\u5409\u666e\u8389\u5c14'],
    'Stephanie': ['\u53f2\u8482\u82ac\u59ae'],
    'Feel': ['\u83f2\u5c14'],
    'Kurami': ['\u514b\u62c9\u7c73'],
    'Hatsuse Izuna': ['\u521d\u6fd1\u4f0a\u7eb2']
};
const phoneWpFileMap = {
    '\u5361\u63d0\u5e0c\u5a05': 'katisia',
    '\u5361\u63d0\u897f\u5a05': 'katisia',
    '\u5948\u96c5\u4e3d': 'nai-nha-le',
    '\u661f\u6781': 'tinh-cuc',
    '\u6cd5\u9732\u7279': 'phap-lo-dac',
    '\u7ea2\u83b2': 'hong-lien',
    '\u827e\u514b\u8389\u897f\u5a05': 'aiklisia',
    '\u51ef\u5c14\u8d1d\u6d1b\u65af': 'cerberus',
    '\u591c\u6597': 'yato',
    '\u5965\u5951\u4e1d': 'orchis',
    '\u764c\u9a91\u58eb': 'cancer-knight',
    '\u7687\u51a0': 'crown',
    '\u7eef': 'hiiro',
    '\u767d': 'shiro',
    '\u5409\u666e\u8389\u5c14': 'jibril',
    '\u53f2\u8482\u82ac\u59ae': 'stephanie',
    '\u83f2\u5c14': 'feel',
    '\u514b\u62c9\u7c73': 'kurami',
    '\u521d\u6fd1\u4f0a\u7eb2': 'hatsuse-izuna'
};
// Tạo danh mục hình nền với URL đầy đủ.
const phoneWpCategories = Object.fromEntries(
    Object.entries(phoneWpData).map(([name, files]) => [
        name,
        files.map(file => `${phoneWpBaseUrl}${encodeURIComponent(phoneWpFileMap[file] || file)}.webp`)
    ])
);



// Danh mục đã tải.
const phoneWpLoaded = new Set();

// Hình nền hiện tại.
let phoneWpCurrent = localStorage.getItem('dnf-phone-wallpaper') || '';

// Đối tượng chat hiện tại.
let currentChatFriend = null;

// Cờ trạng thái tạo diễn đàn.
let isForumGenerating = false;

// Các hàm liên quan đến diễn đàn sẽ được định nghĩa tập trung ở khu "expose hàm toàn cục" cuối file.

// ==================== Hàm khởi tạo ====================
function initializeMobilePhone() {

    // Hàm liên quan đến cài đặt diễn đàn, định nghĩa trong initializeMobilePhone để giữ scope nhất quán.
    window.phoneOpenForumSettings = function () {

        // Lưu ý: khi quay lại sẽ tạo lại bảng diễn đàn, nên không cần lưu stack điều hướng.
        // Làm rỗng stack điều hướng để lịch sử cũ không gây nhiễu.
        navigationStack.length = 0;

        const manager = window.phoneForumManager;
        const settings = manager.settings;
        const apiConfig = manager.apiConfig.settings;

        const html = `
            <div style="padding: 12px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #2d3748;"> Cài đặt diễn đàn</h3>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 12px; color: #4a5568; font-weight: 500;"> Phong cách diễn đàn</label>
                    <select id="forum-style" style="width: 100%; padding: 8px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748;">
                        <option value="Sân khấu chư thần của Tetto" ${settings.forumStyle === 'Sân khấu chư thần của Tetto' || settings.forumStyle === '\u7279\u56fe\u7684\u4f17\u795e\u5267\u573a' ? 'selected' : ''}>Sân khấu chư thần của Tetto</option>
                        ${settings.customStyles && settings.customStyles.length > 0 ? settings.customStyles.map(style =>
            `<option value="custom:${style.name}" ${settings.forumStyle === `custom:${style.name}` ? 'selected' : ''}>${style.name}</option>`
        ).join('') : ''}
                    </select>
                </div>
                
                <!-- Tùy chọn dùng preset và worldbook -->
                <div style="margin-bottom: 16px;">
                    <label style="display: flex; align-items: center; cursor: pointer; padding: 10px; background: #f7fafc; border: 1px solid #cbd5e0; border-radius: 4px;">
                        <input type="checkbox" id="use-preset-worldbook" ${settings.usePresetAndWorldBook ? 'checked' : ''} style="margin-right: 8px; width: 16px; height: 16px; cursor: pointer;">
                        <span style="font-size: 12px; color: #2d3748; font-weight: 500;">📚 Dùng preset và worldbook</span>
                    </label>
                    <small style="display: block; margin-top: 4px; padding-left: 24px; font-size: 10px; color: #718096;">
                        Sau khi bật sẽ dùng preset và worldbook hiện tại của Tavern; khi tắt chỉ dùng lịch sử chat và prompt tùy chỉnh.
                    </small>
                </div>
                
                <!-- Chọn loại API -->
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 12px; color: #4a5568; font-weight: 500;">Loại API</label>
                    <select id="forum-api-type" style="width: 100%; padding: 8px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748;">
                        <option value="sillytavern" ${!apiConfig.enabled && settings.apiType === 'sillytavern' ? 'selected' : ''}>SillyTavern mặc định</option>
                        <option value="custom" ${apiConfig.enabled || settings.apiType === 'custom' ? 'selected' : ''}>API tùy chỉnh (cấu hình độc lập)</option>
                    </select>
                </div>
                
                <!-- Bảng cấu hình API tùy chỉnh, cấu hình độc lập -->
                <div id="custom-api-settings" style="display: ${apiConfig.enabled || settings.apiType === 'custom' ? 'block' : 'none'}; margin-bottom: 16px; padding: 12px; background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 6px;">
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 4px; font-size: 11px; color: #4a5568; font-weight: 500;">API URL (cần tương thích OpenAI)</label>
                        <input type="text" id="api-url" value="${escapeHtml(apiConfig.apiUrl)}" placeholder="Ví dụ: https://api.openai.com/v1" style="width: 100%; padding: 6px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; box-sizing: border-box; font-size: 12px;">
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 4px; font-size: 11px; color: #4a5568; font-weight: 500;">API Key</label>
                        <input type="password" id="api-key" value="${escapeHtml(apiConfig.apiKey)}" placeholder="sk-..." style="width: 100%; padding: 6px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; box-sizing: border-box; font-size: 12px;">
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; margin-bottom: 4px; font-size: 11px; color: #4a5568; font-weight: 500;">Model</label>
                        <select id="api-model" style="width: 100%; padding: 6px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; font-size: 12px;">
                            <option value="">Vui lòng lấy danh sách model trước...</option>
                        </select>
                        <div style="display: flex; gap: 6px; margin-top: 6px;">
                            <button id="fetch-models-btn" style="flex: 1; padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500;">
                                <i class="fas fa-sync-alt"></i> Lấy model
                            </button>
                            <button id="test-connection-btn" style="flex: 1; padding: 8px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500;">
                                <i class="fas fa-check-circle"></i> Kiểm tra kết nối
                            </button>
                        </div>
                    </div>
                    
                    <div id="api-status" style="display: none; margin-top: 8px; padding: 8px; border-radius: 4px; font-size: 11px;"></div>
                    
                    <div style="margin-top: 8px; padding: 8px; background: #e0f2fe; border-radius: 4px; font-size: 10px; color: #0c4a6e;">
                        <strong>💡 Gợi ý:</strong> Dùng API tùy chỉnh sẽ gọi LLM độc lập.
                    </div>
                    
                    <!-- Cấu hình tự động tạo diễn đàn, chỉ dùng được với API tùy chỉnh -->
                    <div style="margin-top: 12px; padding: 10px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px;">
                        <div style="font-size: 12px; font-weight: 600; color: #92400e; margin-bottom: 8px;">
                            <i class="fas fa-magic"></i> Tự động tạo diễn đàn
                        </div>
                        
                        <label style="display: flex; align-items: center; cursor: pointer; margin-bottom: 8px;">
                            <input type="checkbox" id="auto-generate-enabled" ${apiConfig.autoGenerate?.enabled ? 'checked' : ''} style="margin-right: 8px; width: 14px; height: 14px; cursor: pointer;">
                            <span style="font-size: 11px; color: #78350f;">Bật tự động tạo</span>
                        </label>
                        
                        <div style="margin-bottom: 8px;">
                            <label style="display: block; margin-bottom: 4px; font-size: 10px; color: #78350f;">Ngưỡng kích hoạt (mỗi bao nhiêu tầng thì tự tạo)</label>
                            <input type="number" id="auto-generate-threshold" value="${apiConfig.autoGenerate?.threshold || 10}" min="1" max="100" style="width: 100%; padding: 5px; background: white; border: 1px solid #d97706; border-radius: 4px; color: #78350f; box-sizing: border-box; font-size: 11px;">
                        </div>
                        
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" id="auto-generate-notification" ${apiConfig.autoGenerate?.showNotification !== false ? 'checked' : ''} style="margin-right: 8px; width: 14px; height: 14px; cursor: pointer;">
                            <span style="font-size: 11px; color: #78350f;">Hiện popup thông báo khi tạo</span>
                        </label>
                        
                        <div style="margin-top: 6px; font-size: 9px; color: #a16207;">
                            💡 Khi số tin nhắn chat đạt số tầng đã đặt, nội dung diễn đàn sẽ được tạo tự động.
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button id="manage-custom-styles-btn" style="width: 100%; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 14px;">
                         Diễn đàn tùy chỉnh
                    </button>
                    <div style="display: flex; gap: 8px;">
                        <button class="phone-forum-save-settings-btn" style="flex: 1; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                            <i class="fas fa-save"></i> Lưu
                        </button>
                        <button class="phone-forum-close-settings-btn" style="flex: 1; padding: 10px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                            <i class="fas fa-times"></i> Hủy
                        </button>
                    </div>
                </div>
            </div>
        `;

        $('#phone-app-title').text(' Cài đặt diễn đàn');
        $('#phone-app-body').html(html);


        // Quan trọng: bind toàn bộ sự kiện nút ngay sau khi chèn HTML.
        setTimeout(() => {
            // Khôi phục model đã lưu vào dropdown.
            const savedModel = apiConfig.model;
            if (savedModel) {
                const $modelSelect = $('#api-model');
                // Nếu đã lưu model, thêm vào dropdown và chọn.
                $modelSelect.append($('<option>', {
                    value: savedModel,
                    text: savedModel,
                    selected: true
                }));
            }

            // Bind sự kiện đổi loại API.
            $('#forum-api-type').off('change').on('change', function () {
                const isCustom = $(this).val() === 'custom';
                $('#custom-api-settings').toggle(isCustom);
            });

            // Bind nút lấy model.
            $('#fetch-models-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneFetchModels && window.phoneFetchModels();
            });

            // Bind nút kiểm tra kết nối.
            $('#test-connection-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneTestConnection && window.phoneTestConnection();
            });

            // Bind nút quản lý phong cách tùy chỉnh.
            $('#manage-custom-styles-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneManageCustomStyles && window.phoneManageCustomStyles();
            });

            // Bind nút lưu.
            $('.phone-forum-save-settings-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneSaveForumSettings && window.phoneSaveForumSettings();
            });

            // Bind nút đóng.
            $('.phone-forum-close-settings-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneCloseForumSettings && window.phoneCloseForumSettings();
            });

        }, 0);
    };

    window.phoneSaveForumSettings = function () {

        try {
            const manager = window.phoneForumManager;

            if (!manager) {
                if (typeof toastr !== 'undefined') {
                    toastr.error('Trình quản lý chưa khởi tạo!', 'Diễn đàn');
                }
                return;
            }

            // Đọc toàn bộ giá trị cài đặt.
            const forumStyle = $('#forum-style').val();
            const apiType = $('#forum-api-type').val();
            const usePresetAndWorldBook = $('#use-preset-worldbook').is(':checked');

            // Lưu cài đặt diễn đàn.
            manager.settings.forumStyle = forumStyle;
            manager.settings.apiType = apiType;
            manager.settings.usePresetAndWorldBook = usePresetAndWorldBook;
            manager.saveSettings();

            // Lưu cấu hình API độc lập, chỉ bật khi chọn API tùy chỉnh.
            manager.apiConfig.settings.enabled = (apiType === 'custom');

            if (apiType === 'custom') {
                // Đọc cấu hình API độc lập, giới hạn trong phone-app-body đang hiển thị.
                const $currentBody = $('#phone-app-body');
                const selectedModel = $currentBody.find('#api-model').val() || '';

                manager.apiConfig.settings.apiUrl = $currentBody.find('#api-url').val();
                manager.apiConfig.settings.apiKey = $currentBody.find('#api-key').val();
                manager.apiConfig.settings.model = selectedModel;

                // Lưu cấu hình tự động tạo diễn đàn.
                manager.apiConfig.settings.autoGenerate = {
                    enabled: $currentBody.find('#auto-generate-enabled').is(':checked'),
                    threshold: parseInt($currentBody.find('#auto-generate-threshold').val()) || 10,
                    showNotification: $currentBody.find('#auto-generate-notification').is(':checked')
                };

                // Nếu đã bật tự động tạo, đặt lại bộ đếm.
                if (manager.apiConfig.settings.autoGenerate.enabled) {
                    manager.apiConfig.resetAutoGenerateCounter();
                }
            }

            manager.apiConfig.saveSettings();


            if (typeof toastr !== 'undefined') {
                toastr.success('Đã lưu cài đặt!', 'Diễn đàn');
            }

            // Quay lại giao diện diễn đàn: tạo lại thay vì khôi phục HTML cũ để bảo đảm sự kiện bind đúng.
            setTimeout(() => {

                // Làm rỗng stack điều hướng vì sẽ tạo lại, không cần nội dung cũ.
                navigationStack.length = 0;

                // Tạo lại bảng diễn đàn để bảo đảm mọi sự kiện đều bind đúng.
                $('#phone-app-title').text(' Diễn đàn');
                $('#phone-app-body').html(generateForumPanel());

            }, 100);
        } catch (error) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Lưu cài đặt thất bại: ' + error.message, 'Diễn đàn');
            }
        }
    };

    window.phoneCloseForumSettings = function () {

        // Tạo lại bảng diễn đàn thay vì khôi phục HTML cũ để bảo đảm sự kiện bind đúng.
        // Làm rỗng stack điều hướng.
        navigationStack.length = 0;

        // Tạo lại bảng diễn đàn.
        $('#phone-app-title').text(' Diễn đàn');
        $('#phone-app-body').html(generateForumPanel());

    };

    // Hàm quản lý phong cách tùy chỉnh.
    window.phoneManageCustomStyles = function () {

        const manager = window.phoneForumManager;
        const customStyles = manager.settings.customStyles || [];

        const html = `
            <div style="padding: 12px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #2d3748;"> Quản lý phong cách tùy chỉnh</h3>
                
                <button id="add-custom-style-btn" style="width: 100%; padding: 10px; margin-bottom: 16px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                     Tạo phong cách tùy chỉnh mới
                </button>
                
                <div id="custom-styles-list" style="margin-bottom: 16px;">
                    ${customStyles.length === 0 ?
                '<div style="text-align: center; padding: 20px; color: #718096; font-size: 12px;">Tạm thời chưa có phong cách tùy chỉnh</div>' :
                customStyles.map((style, index) => `
                            <div class="custom-style-item" data-index="${index}" style="background: white; border: 1px solid #cbd5e0; border-radius: 4px; padding: 10px; margin-bottom: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div style="flex: 1; min-width: 0;">
                                        <div style="font-weight: 500; color: #2d3748; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(style.name)}</div>
                                        <div style="font-size: 11px; color: #718096; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(style.prompt.substring(0, 50))}...</div>
                                    </div>
                                    <div style="display: flex; gap: 6px; margin-left: 10px;">
                                        <button class="edit-custom-style-btn" data-index="${index}" style="padding: 6px 10px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                             Sửa
                                        </button>
                                        <button class="delete-custom-style-btn" data-index="${index}" style="padding: 6px 10px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                                             Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')
            }
                </div>
                
                <button class="phone-back-to-settings-btn" style="width: 100%; padding: 10px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                    ← Quay lại cài đặt
                </button>
            </div>
        `;

        $('#phone-app-title').text(' Quản lý phong cách tùy chỉnh');
        $('#phone-app-body').html(html);

        // Bind sự kiện.
        setTimeout(() => {
            // Nút tạo mới.
            $('#add-custom-style-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneShowCustomStyleEditor && window.phoneShowCustomStyleEditor();
            });

            // Nút sửa.
            $('.edit-custom-style-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const index = $(this).data('index');
                window.phoneShowCustomStyleEditor && window.phoneShowCustomStyleEditor(index);
            });

            // Nút xóa.
            $('.delete-custom-style-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const index = $(this).data('index');
                if (confirm('Bạn có chắc muốn xóa phong cách tùy chỉnh này không?')) {
                    window.phoneDeleteCustomStyle && window.phoneDeleteCustomStyle(index);
                }
            });

            // Nút quay lại.
            $('.phone-back-to-settings-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneOpenForumSettings && window.phoneOpenForumSettings();
            });
        }, 0);
    };

    window.phoneShowCustomStyleEditor = function (editIndex) {

        const manager = window.phoneForumManager;
        const isEdit = editIndex !== undefined;
        const style = isEdit ? manager.settings.customStyles[editIndex] : { name: '', prompt: '' };

        const html = `
            <div style="padding: 12px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #2d3748;">${isEdit ? ' Sửa' : ' Tạo mới'} phong cách tùy chỉnh</h3>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 12px; color: #4a5568; font-weight: 500;">Tên phong cách</label>
                    <input type="text" id="custom-style-name" value="${escapeHtml(style.name)}" placeholder="Ví dụ: Xiaohongshu" style="width: 100%; padding: 8px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; box-sizing: border-box;">
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 12px; color: #4a5568; font-weight: 500;">Prompt phong cách</label>
                    <textarea id="custom-style-prompt" placeholder="Nhập mô tả chi tiết cho phong cách diễn đàn, tương tự stylePrompts của phong cách preset..." style="width: 100%; min-height: 300px; padding: 8px; background: white; border: 1px solid #cbd5e0; border-radius: 4px; color: #2d3748; box-sizing: border-box; font-family: monospace; font-size: 11px; resize: vertical;">${escapeHtml(style.prompt)}</textarea>
                    <div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center;">
                        <small style="font-size: 10px; color: #718096;">
                             Gợi ý: có thể tham khảo định dạng phong cách preset, gồm thiết lập cốt lõi, yêu cầu nhân vật, phong cách diễn đàn và loại nội dung thường gặp.
                        </small>
                        <button id="import-example-btn" style="padding: 6px 12px; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500; white-space: nowrap;">
                             Nhập ví dụ
                        </button>
                    </div>
                </div>
                
                <div style="display: flex; gap: 8px;">
                    <button id="save-custom-style-btn" data-index="${editIndex !== undefined ? editIndex : ''}" style="flex: 1; padding: 10px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                         Lưu
                    </button>
                    <button class="phone-back-to-manage-btn" style="flex: 1; padding: 10px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                        ← Hủy
                    </button>
                </div>
            </div>
        `;

        $('#phone-app-title').text(isEdit ? ' Sửa phong cách tùy chỉnh' : ' Tạo phong cách tùy chỉnh mới');
        $('#phone-app-body').html(html);

        // Bind sự kiện.
        setTimeout(() => {
            // Nút nhập ví dụ.
            $('#import-example-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneImportExamplePrompt && window.phoneImportExamplePrompt();
            });

            // Nút lưu.
            $('#save-custom-style-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const index = $(this).data('index');
                window.phoneSaveCustomStyle && window.phoneSaveCustomStyle(index !== '' ? index : undefined);
            });

            // Nút hủy.
            $('.phone-back-to-manage-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneManageCustomStyles && window.phoneManageCustomStyles();
            });
        }, 0);
    };

    window.phoneSaveCustomStyle = function (editIndex) {

        const manager = window.phoneForumManager;
        const name = $('#custom-style-name').val().trim();
        const prompt = $('#custom-style-prompt').val().trim();

        // Kiểm tra hợp lệ.
        if (!name) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Vui lòng nhập tên phong cách.', 'Diễn đàn');
            }
            return;
        }

        if (!prompt) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Vui lòng nhập prompt phong cách.', 'Diễn đàn');
            }
            return;
        }

        // Kiểm tra tên có trùng không, khi sửa thì loại trừ chính nó.
        const isDuplicate = manager.settings.customStyles.some((style, index) =>
            style.name === name && index !== editIndex
        );

        if (isDuplicate) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Tên phong cách đã tồn tại.', 'Diễn đàn');
            }
            return;
        }

        // Lưu hoặc cập nhật.
        if (editIndex !== undefined) {
            // Sửa phong cách hiện có.
            manager.settings.customStyles[editIndex] = { name, prompt };
        } else {
            // Tạo phong cách mới.
            if (!manager.settings.customStyles) {
                manager.settings.customStyles = [];
            }
            manager.settings.customStyles.push({ name, prompt });
        }

        manager.saveSettings();

        if (typeof toastr !== 'undefined') {
            toastr.success(editIndex !== undefined ? 'Đã cập nhật phong cách.' : 'Đã tạo phong cách.', 'Diễn đàn');
        }

        // Quay lại trang quản lý.
        window.phoneManageCustomStyles && window.phoneManageCustomStyles();
    };

    window.phoneImportExamplePrompt = function () {

        const examplePrompt = `## Phong cách diễn đàn: Sân khấu chư thần của Tetto

**Thiết lập cốt lõi - chư thần của thế giới tứ phương:**
Từ rất lâu về trước, các vị thần của "Trật tự" và "Hỗn độn" tranh đấu không ngừng đến khi cả hai bên đều kiệt sức. Từ đó mở ra ván thắng thua bằng xúc xắc giữa "Định mệnh" và "Ngẫu nhiên": chư thần dùng xúc xắc tạo nên thế giới tứ phương và những quân cờ, rồi lấy các cuộc phiêu lưu để quyết định thắng bại. Khi chiến sĩ Nhân_loại đầu tiên tập hợp đồng bạn, bước lên hành trình và thảo phạt cự long, chư thần đã cuồng nhiệt vì điều ấy. Họ lập lời thề vàng: không can thiệp quá mức cần thiết vào bàn cờ, chỉ tung xúc xắc trong lúc phiêu lưu, và tôn trọng ý chí tự do của quân cờ.

Giờ đây, các vị thần tứ phương ấy được Tetto mời đến xem câu chuyện xảy ra sau khi thế giới Disboard và Arad dung hợp.

**Thân phận và cách đặt tên người đăng:**
- Tetto cứ gọi là "Tetto"; danh hiệu của các vị thần khác cần đa dạng và trộn nhiều kiểu:
  - "Thần XX": Thần Chiến tranh, Thần Rượu / "Thần của XX": Thần của Lừa gạt, Thần của Bão tố / "Nữ thần XX": Nữ thần Mùa màng, Nữ thần Mặt trăng
  - Tôn xưng: Địa Mẫu, Chủ Mặt Trời / khái niệm trừu tượng: Định Mệnh, Ngẫu Nhiên, Chân Thực / kiểu khác: Kẻ Dệt Mộng, Kẻ Phán Quyết, Thợ Săn
- Cùng một vị thần có thể xuất hiện nhiều lần, Tetto không cần có mặt trong mọi bài.

**Chất giọng khi chư thần nói (cực kỳ quan trọng):**
- Tham khảo cảm giác nguyên tác: "Phiêu lưu! Phiêu lưu! Vẫn là phiêu lưu! Không ngôn từ nào tả nổi cảm giác tuyệt vời này!" - có nhiệt huyết và chất sử thi, nhưng không lên gân.
- Cấm giọng cổ phong quá đà như: "Ta đã chứng kiến..." "Sức_mạnh tức là chính nghĩa" "quyền bính trong lãnh vực của chúng ta" - kiểu đó còn tệ hơn nói quá đời thường.
- Cũng đừng dùng khẩu ngữ mạng như: "Oa ngầu quá!" "Thèm chết mất".
- Hướng đúng: tự nhiên, mạnh mẽ, có cảm xúc thật. Các reply phải có cảm giác đối thoại, có phản bác, bổ sung và đôi khi lạc đề.

**Tông nội dung (cực kỳ quan trọng):**
- Tập trung vào phiêu lưu, chiến đấu, bước ngoặt vận mệnh, anh hùng trỗi dậy rồi ngã xuống, thế lực đánh cờ với nhau - thiên về tự sự lớn, không viết chuyện vụn vặt hằng ngày.
- "Lớn" không đồng nghĩa với "nghiêm khắc"; thảo luận nên sôi nổi, thú vị và đầy nhiệt huyết, không phải bài luận của học giả già.

**Nguồn nội dung bài viết:**
- Tối đa một nửa liên quan đến tuyến truyện hiện tại của người chơi.
- Ít nhất một nửa là câu chuyện ở nơi khác trên bàn cờ: nhân vật ràng buộc, nhân vật nguyên tác DNF, nhân vật nguyên tác No Game No Life, v.v.

**Không khí diễn đàn:**
- Cần có tính giải trí và dễ đọc, đừng viết như sách thiết lập.
- Các bài viết có thể liên quan tới nhau; có bài náo nhiệt, có bài vắng vẻ.
- Đừng bài nào cũng nhấn mạnh xúc xắc, bàn cờ và các yếu tố thiết lập tương tự.`;

        // Điền prompt ví dụ vào ô chỉnh sửa.
        $('#custom-style-prompt').val(examplePrompt);

        if (typeof toastr !== 'undefined') {
            toastr.success('Đã nhập ví dụ Sân khấu chư thần của Tetto.', 'Diễn đàn');
        }
    };

    window.phoneDeleteCustomStyle = function (index) {

        const manager = window.phoneForumManager;
        const deletedStyle = manager.settings.customStyles[index];

        // Nếu phong cách đang chọn chính là phong cách sắp xóa, chuyển về phong cách mặc định.
        if (manager.settings.forumStyle === `custom:${deletedStyle.name}`) {
            manager.settings.forumStyle = 'Sân khấu chư thần của Tetto';
        }

        // Xóa phong cách.
        manager.settings.customStyles.splice(index, 1);
        manager.saveSettings();

        if (typeof toastr !== 'undefined') {
            toastr.success('Đã xóa phong cách.', 'Diễn đàn');
        }

        // Làm mới trang quản lý.
        window.phoneManageCustomStyles && window.phoneManageCustomStyles();
    };

    // Hàm hỗ trợ cấu hình API đã bị loại bỏ, dùng phoneFetchModels thay thế.

    window.phoneShowAPIStatus = function (message, type = 'info') {
        const statusDiv = $('#api-status');
        if (!statusDiv.length) return;

        const colors = {
            info: '#3b82f6',
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b'
        };

        const bgColors = {
            info: '#eff6ff',
            success: '#f0fdf4',
            error: '#fef2f2',
            warning: '#fffbeb'
        };

        statusDiv.css({
            'display': 'block',
            'color': colors[type] || colors.info,
            'background': bgColors[type] || bgColors.info,
            'border': `1px solid ${colors[type] || colors.info}`
        });
        statusDiv.text(message);

        // Tự ẩn thông báo thành công.
        if (type === 'success') {
            setTimeout(() => {
                statusDiv.fadeOut();
            }, 3000);
        }
    };

    // Lấy danh sách model khả dụng.
    window.phoneFetchModels = async function () {
        const $currentBody = $('#phone-app-body');
        const apiUrl = $currentBody.find('#api-url').val().trim();
        const apiKey = $currentBody.find('#api-key').val().trim();
        const modelSelect = $currentBody.find('#api-model')[0];
        const buttonElement = $currentBody.find('#fetch-models-btn')[0];

        if (!apiUrl) {
            window.phoneShowAPIStatus('⚠️ Vui lòng điền API URL trước!', 'warning');
            return;
        }

        const originalBtnHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lấy...';
        buttonElement.disabled = true;

        try {
            let cleanedApiUrl = apiUrl.replace(/\/$/, '');
            if (!cleanedApiUrl.endsWith('/v1')) {
                cleanedApiUrl += '/v1';
            }

            let fetchUrl = cleanedApiUrl.endsWith('/models') ? cleanedApiUrl : `${cleanedApiUrl}/models`;

            const headers = {};
            if (apiKey) {
                headers['Authorization'] = `Bearer ${apiKey}`;
            }

            const fetchOptions = {
                method: 'GET',
                headers: headers
            };

            const response = await fetch(fetchUrl, fetchOptions);
            if (!response.ok) {
                const errorText = await response.text();
                let errorDetail = 'Yêu cầu thất bại';
                try {
                    const errorJson = JSON.parse(errorText);
                    errorDetail = errorJson.error?.message || errorText;
                } catch (e) {
                    errorDetail = errorText;
                }
                throw new Error(`HTTP ${response.status}: ${errorDetail}`);
            }

            const responseText = await response.text();
            let data;
            try {
                data = responseText ? JSON.parse(responseText) : [];
            } catch (e) {
                throw new Error('Phản hồi API không phải định dạng JSON hợp lệ.');
            }

            let models = [];
            if (data && data.models && Array.isArray(data.models)) {
                models = data.models.map(model => model.name).filter(Boolean);
            } else if (data && data.data && Array.isArray(data.data)) {
                models = data.data.map(model => model.id).filter(Boolean);
            } else if (Array.isArray(data)) {
                models = data.map(model => (typeof model === 'string' ? model : model.id)).filter(Boolean);
            }

            modelSelect.innerHTML = '';
            if (models.length > 0) {
                models.sort();
                models.forEach(modelId => {
                    const option = document.createElement('option');
                    option.value = modelId;
                    option.textContent = modelId;
                    modelSelect.appendChild(option);
                });
                modelSelect.selectedIndex = 0;

                window.phoneShowAPIStatus(`✅ Đã lấy thành công ${models.length} model!`, 'success');
            } else {
                modelSelect.innerHTML = '<option disabled>Không lấy được model</option>';
                window.phoneShowAPIStatus('⚠️ API trả về thành công, nhưng danh sách model rỗng hoặc định dạng không nhận diện được.', 'warning');
            }

        } catch (error) {
            console.error('Lấy model thất bại:', error);
            modelSelect.innerHTML = '<option>Lấy thất bại</option>';
            window.phoneShowAPIStatus(`❌ Lấy model thất bại: ${error.message}`, 'error');
        } finally {
            buttonElement.innerHTML = originalBtnHTML;
            buttonElement.disabled = false;
        }
    };

    window.phoneTestConnection = async function () {
        const manager = window.phoneForumManager;
        const $currentBody = $('#phone-app-body');

        const apiUrl = $currentBody.find('#api-url').val();
        const apiKey = $currentBody.find('#api-key').val();
        const model = $currentBody.find('#api-model').val() || '';

        if (!apiUrl) {
            window.phoneShowAPIStatus('⚠️ Vui lòng điền địa chỉ API trước.', 'warning');
            return;
        }

        if (!apiKey) {
            window.phoneShowAPIStatus('⚠️ Vui lòng điền API key trước.', 'warning');
            return;
        }

        if (!model) {
            window.phoneShowAPIStatus('⚠️ Vui lòng chọn model trước.', 'warning');
            return;
        }

        window.phoneShowAPIStatus('🔄 Đang kiểm tra kết nối...', 'info');

        try {
            const result = await manager.apiConfig.testConnection(apiUrl, apiKey, model);

            if (result.success) {
                window.phoneShowAPIStatus('✅ Kiểm tra kết nối thành công!', 'success');
            } else {
                window.phoneShowAPIStatus(`❌ Kiểm tra kết nối thất bại: ${result.error}`, 'error');
            }
        } catch (error) {
            window.phoneShowAPIStatus(`❌ Kiểm tra kết nối thất bại: ${error.message}`, 'error');
        }
    };

    // Tạo hàm xử lý sự kiện, có thể tái sử dụng ở nhiều nơi.
    window.handlePhoneLiveButtonClick = function (e) {
        const target = e.target;

        // Kiểm tra an toàn.
        if (!target || !target.classList) {
            return;
        }

        const classList = target.classList;
        const classArray = Array.from(classList);

        // Kiểm tra nút diễn đàn.
        if (classArray.includes('phone-forum-generate-btn')) {
            e.preventDefault();
            e.stopPropagation();
            window.phoneGenerateForum && window.phoneGenerateForum();
            return;
        }

        if (classArray.includes('phone-forum-settings-btn')) {
            e.preventDefault();
            e.stopPropagation();
            window.phoneOpenForumSettings && window.phoneOpenForumSettings();
            return;
        }

        if (classArray.includes('phone-forum-save-settings-btn')) {
            e.preventDefault();
            e.stopPropagation();
            window.phoneSaveForumSettings && window.phoneSaveForumSettings();
            return;
        }

        if (classArray.includes('phone-forum-close-settings-btn')) {
            e.preventDefault();
            e.stopPropagation();
            window.phoneCloseForumSettings && window.phoneCloseForumSettings();
            return;
        }

        // Nếu bấm vào icon, chữ hoặc DIV bên trong nút, tìm ngược lên nút cha.
        if ((target.tagName === 'I' || target.tagName === 'SPAN' || target.tagName === 'DIV') && target.parentElement) {
            const parentClasses = Array.from(target.parentElement.classList || []);

            if (parentClasses.includes('phone-forum-generate-btn')) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneGenerateForum && window.phoneGenerateForum();
                return;
            }

            if (parentClasses.includes('phone-forum-settings-btn')) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneOpenForumSettings && window.phoneOpenForumSettings();
                return;
            }

            if (parentClasses.includes('phone-forum-save-settings-btn')) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneSaveForumSettings && window.phoneSaveForumSettings();
                return;
            }

            if (parentClasses.includes('phone-forum-close-settings-btn')) {
                e.preventDefault();
                e.stopPropagation();
                window.phoneCloseForumSettings && window.phoneCloseForumSettings();
                return;
            }

        }
    };

    try {
        // Lắng nghe trên document chính, dùng cho giai đoạn capture của nút diễn đàn.
        document.addEventListener('click', window.handlePhoneLiveButtonClick, true);

        // Dọn phần tử cũ.
        $('#mobile-trigger-btn').remove();
        $('#mobile-phone-overlay').remove();
        $('#mobile-phone-styles').remove();

        // Tải Font Awesome theo cách an toàn, không kích hoạt kiểm tra của SillyTavern.
        loadFontAwesome();

        // Chèn style.
        $('head').append(phoneStyles);

        // Tạo nút kích hoạt, phong cách Brushed Metal mô phỏng nút nổi thanh trạng thái.
        // Tạo path ngôi sao tám cánh, dùng lại thuật toán AppleStyle-Star của status bar.
        function getOctagramPath(R, rotationOffsetDeg) {
            rotationOffsetDeg = rotationOffsetDeg || 0;
            var d = "M ";
            var N = 8;
            var K = 3;
            var offsetRad = rotationOffsetDeg * Math.PI / 180;
            var cx = 50;
            var cy = 50;
            for (var i = 0; i <= N; i++) {
                var idx = (i * K) % N;
                var angle = (idx * 2 * Math.PI / N) - Math.PI / 2 + offsetRad;
                var x = cx + Math.cos(angle) * R;
                var y = cy + Math.sin(angle) * R;
                if (i === 0) d += x.toFixed(2) + "," + y.toFixed(2) + " ";
                else d += "L " + x.toFixed(2) + "," + y.toFixed(2) + " ";
            }
            d += "Z";
            return d;
        }
        const pathData1 = getOctagramPath(35, 0);
        const pathData2 = getOctagramPath(35, 22.5);

        const triggerBtn = $('<button>', {
            id: 'mobile-trigger-btn',
            title: 'Mở điện thoại'
        });
        triggerBtn.html(`
            <div class="star-container">
                <svg class="icon-svg" viewBox="0 0 100 100" style="overflow:visible !important;display:block !important;visibility:visible !important;">
                    <path d="${pathData1}" style="fill:none !important;stroke:#666 !important;stroke-width:2 !important;opacity:0.7 !important;stroke-linecap:round !important;stroke-linejoin:round !important;visibility:visible !important;"></path>
                    <path d="${pathData2}" style="fill:none !important;stroke:#666 !important;stroke-width:2 !important;opacity:0.7 !important;stroke-linecap:round !important;stroke-linejoin:round !important;visibility:visible !important;"></path>
                    <path class="layer-2" d="${pathData2}" style="fill:none !important;stroke:#999 !important;stroke-width:1.5 !important;opacity:1 !important;stroke-linecap:round !important;stroke-linejoin:round !important;visibility:visible !important;stroke-dasharray:100 400;"></path>
                    <path class="layer-1" d="${pathData1}" style="fill:none !important;stroke:#555 !important;stroke-width:2 !important;opacity:0.8 !important;stroke-linecap:round !important;stroke-linejoin:round !important;visibility:visible !important;stroke-dasharray:100 400;"></path>
                    <circle cx="50" cy="50" r="12" style="fill:none !important;stroke:#777 !important;stroke-width:1.5 !important;visibility:visible !important;"></circle>
                </svg>
            </div>
        `);

        // Tạo giao diện điện thoại.
        const phoneOverlay = $('<div>', {
            id: 'mobile-phone-overlay',
            html: `
                <div class="mobile-phone-frame">
                    <div class="mobile-phone-screen">
                        <!-- Thanh trạng thái -->
                        <div class="mobile-status-bar">
                            <div class="status-left">
                                <span style="display: flex; align-items: center; gap: 4px; color: #666; font-size: 12px; font-weight: 500;">
                                    <i class="fas fa-cloud" id="phone-status-weather-icon" style="font-size: 12px;"></i>
                                    <span id="phone-status-weather">Nhiều mây</span>
                                </span>
                            </div>
                            <div class="status-center" id="phone-drag-handle" style="cursor: move; flex: 1; display: flex; justify-content: center; align-items: center; position: absolute; left: 50%; transform: translateX(-50%);" title="Kéo giao diện điện thoại">
                                <span class="time" style="color: #666; font-size: 12px; font-weight: 500;" id="phone-status-time">14:30</span>
                            </div>
                            <div class="status-right">
                                <span class="battery">
                                    <i class="fas fa-battery-full"></i>
                                    <span class="battery-text">100%</span>
                                </span>
                                <button id="phone-pin-btn" class="pin-btn" title="Ghim lên trên / bỏ ghim">
                                    <i class="fas fa-thumbtack"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Khu nội dung chính -->
                        <div class="mobile-content">
                            <!-- Giao diện chính -->
                            <div class="home-screen" id="phone-home-screen">
                                <!-- Thẻ thời gian và thời tiết -->
                                <div class="weather-card">
                                    <div class="weather-time">
                                        <span class="current-time" id="phone-big-time">14:30</span>
                                        <span class="current-date" id="phone-date">11/09</span>
                                    </div>
                                    <div class="weather-info">
                                        <i class="fas fa-cloud" style="font-size: 16px; color: #585858;"></i>
                                        <span class="weather-desc" id="phone-weather">Nhiều mây</span>
                                    </div>
                                </div>

                                <!-- Container trang ứng dụng -->
                                <div class="app-pages-container">
                                    <!-- Wrapper vuốt -->
                                    <div class="app-pages-wrapper" id="app-pages-wrapper">
                                        <!-- Trang thứ nhất -->
                                        <div class="app-page">
                                            <div class="app-grid">
                                                <!-- Hàng thứ nhất: thông tin, sưu tập CG, diễn đàn -->
                                                <div class="app-row">
                                                    <div class="app-icon" data-app="messages">
                                                        <div class="app-icon-bg md-blue">
                                                            <i class="fas fa-comments"></i>
                                                        </div>
                                                        <span class="app-label">Thông tin</span>
                                                    </div>
                                                    <div class="app-icon" data-app="gallery">
                                                        <div class="app-icon-bg md-green">
                                                            <i class="fas fa-images"></i>
                                                        </div>
                                                        <span class="app-label">Sưu tập CG</span>
                                                    </div>
                                                    <div class="app-icon" data-app="forum">
                                                        <div class="app-icon-bg md-purple">
                                                            <i class="fas fa-comments"></i>
                                                        </div>
                                                        <span class="app-label">Diễn đàn</span>
                                                    </div>
                                                </div>
                                                <!-- Hàng thứ hai: ràng buộc, hình nền, cài đặt -->
                                                <div class="app-row">
                                                    <div class="app-icon" data-app="friends">
                                                        <div class="app-icon-bg md-pink">
                                                            <i class="fas fa-user-friends"></i>
                                                        </div>
                                                        <span class="app-label">Ràng buộc</span>
                                                    </div>
                                                    <div class="app-icon" data-app="wallpaper">
                                                        <div class="app-icon-bg md-pink">
                                                            <i class="fas fa-image"></i>
                                                        </div>
                                                        <span class="app-label">Hình nền</span>
                                                    </div>
                                                    <div class="app-icon" data-app="settings">
                                                        <div class="app-icon-bg md-blue">
                                                            <i class="fas fa-cog"></i>
                                                        </div>
                                                        <span class="app-label">Cài đặt</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Trang thứ hai, đã bỏ lối vào trùng lặp -->
                                    </div>
                                    
                                    <!-- Chỉ báo trang -->
                                    <div class="page-indicators" id="page-indicators">
                                        <div class="indicator active"></div>
                                    </div>
                                </div>
                                
                                <!-- Nút toàn màn hình -->
                                <button id="wallpaper-fullscreen-btn" class="wallpaper-fullscreen-btn" title="Xem hình nền cỡ lớn">
                                    <i class="fas fa-expand"></i>
                                </button>
                            </div>

                            <!-- Bảng chi tiết ứng dụng -->
                            <div class="app-detail-panel" id="phone-detail-panel">
                                <div class="app-header">
                                    <button class="back-button" id="phone-back-btn">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <span class="app-title" id="phone-app-title">Ứng dụng</span>
                                    <div style="width: 36px;"></div>
                                </div>
                                <div class="app-body" id="phone-app-body">
                                    <!-- Nội dung ứng dụng sẽ được tải động ở đây -->
                                </div>
                            </div>

                            <!-- Bảng trò chuyện -->
                            <div class="chat-panel" id="phone-chat-panel">
                                <div class="chat-header">
                                    <button class="back-button" id="chat-back-btn">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <span class="app-title" id="chat-title" style="flex: 1;">Trò chuyện</span>
                                    <div id="chat-right-actions" style="width: 36px; flex-shrink: 0;"></div>
                                </div>
                                <div class="chat-messages" id="chat-messages">
                                </div>
                                <div class="chat-input-area">
                                    <input type="text" class="chat-input" id="chat-input" placeholder="Nhập tin nhắn...">
                                    <button class="chat-send-btn" id="chat-send-btn">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Trình xem hình nền toàn màn hình -->
                            <div class="wallpaper-fullscreen-viewer" id="wallpaper-fullscreen-viewer">
                                <button class="wallpaper-close-btn" id="wallpaper-close-btn">
                                    <i class="fas fa-times"></i>
                                </button>
                                <div class="cg-nav-controls" id="cg-nav-controls" style="display: none; position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 15px; z-index: 210;">
                                    <button class="cg-nav-btn" id="cg-prev-btn" style="width: 40px; height: 40px; background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%; font-size: 16px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: all 0.2s; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button class="cg-set-wallpaper-btn" id="cg-set-wallpaper-btn" style="padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border: none; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; box-shadow: 0 3px 12px rgba(102, 126, 234, 0.4); white-space: nowrap;">
                                        <i class="fas fa-image" style="margin-right: 6px;"></i>Đặt làm hình nền
                                    </button>
                                    <button class="cg-nav-btn" id="cg-next-btn" style="width: 40px; height: 40px; background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%; font-size: 16px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: all 0.2s; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div class="cg-index-display" id="cg-index-display" style="display: none; position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.5); color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 12px; z-index: 210;"></div>
                                <img id="wallpaper-fullscreen-img" src="" alt="Xem trước hình nền">
                            </div>
                        </div>
                    </div>
                </div>
            `
        });

        $('body').append(triggerBtn);
        $('body').append(phoneOverlay);
        setupPhoneUiUnderscoreObserver(phoneOverlay);

        // Delay bind sự kiện để bảo đảm DOM sẵn sàng hoàn toàn.
        setTimeout(() => {
            bindPhoneEvents();
        }, 0);

        // Đăng ký lắng nghe sự kiện MVU.
        registerMvuEventListeners();



        // Cập nhật thời gian.
        updatePhoneTime();
        setInterval(updatePhoneTime, 60000);

        // Mỗi lần khởi tạo thì đặt lại vị trí nút nổi về vị trí ban đầu.
        localStorage.removeItem('mobile-trigger-btn-position');
        localStorage.removeItem('mobile-trigger-btn-user-dragged');

        // Chủ động gọi reset vị trí để bảo đảm nằm đúng vị trí ban đầu.
        // Desktop: giữa dọc, cách mép phải một phần ba.
        // Mobile: bên phải, căn giữa dọc.
        setTimeout(() => {
            window.resetMobileButtonPosition && window.resetMobileButtonPosition();
        }, 100);

        // Khôi phục hình nền và kích thước điện thoại đã lưu.
        setTimeout(() => {
            restoreWallpaper();
            restorePhoneSize();
        }, 200);

        // Đánh dấu biến toàn cục để script phụ thuộc kiểm tra, gắn vào parent window để thấy qua iframe.
        try {
            const flagHost = window.parent || window;
            flagHost.__mobile_phone_loaded__ = true;
            flagHost.__dien_thoai_nho_loaded__ = true;
        } catch(e) {
            window.__mobile_phone_loaded__ = true;
            window.__dien_thoai_nho_loaded__ = true;
        }

    } catch (error) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Khởi tạo giao diện điện thoại thất bại: ' + error.message);
        }
    }
}

// ==================== Gắn sự kiện ====================
function bindPhoneEvents() {

    // Nút kích hoạt: xử lý cả bấm và kéo
    const $triggerBtn = $('#mobile-trigger-btn');

    // Dùng Pointer Events để thống nhất xử lý kéo và bấm (tham khảo status-bar.js).
    const btnElement = $triggerBtn[0];
    let isDrag = false;
    let pStartX = 0, pStartY = 0, pStartLeft = 0, pStartTop = 0;

    const onPointerMove = function (e) {
        if (!isDrag) return;
        e.cancelable && e.preventDefault();
        const dx = e.screenX - pStartX;
        const dy = e.screenY - pStartY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            $triggerBtn.addClass('dragging');
        }
        if ($triggerBtn.hasClass('dragging')) {
            hasMoved = true;
            // Gỡ các class định vị responsive, chuyển sang định vị tuyệt đối.
            $triggerBtn.removeClass('mobile-mode tablet-mode desktop-mode');

            let newX = pStartLeft + dx;
            let newY = pStartTop + dy;
            const btnWidth = $triggerBtn.outerWidth() || 60;
            const btnHeight = $triggerBtn.outerHeight() || 60;
            const bounded = constrainFullyInViewport(newX, newY, btnWidth, btnHeight);

            btnElement.style.setProperty('left', bounded.x + 'px', 'important');
            btnElement.style.setProperty('top', bounded.y + 'px', 'important');
            btnElement.style.setProperty('right', 'auto', 'important');
            btnElement.style.setProperty('bottom', 'auto', 'important');
            btnElement.style.setProperty('transform', 'none', 'important');
        }
    };

    const onPointerUp = function (e) {
        const win = btnElement.ownerDocument.defaultView || window;
        win.removeEventListener('pointermove', onPointerMove);
        win.removeEventListener('pointerup', onPointerUp);
        win.removeEventListener('pointercancel', onPointerUp);
        if (btnElement.releasePointerCapture) {
            try { btnElement.releasePointerCapture(e.pointerId); } catch (err) { }
        }

        if ($triggerBtn.hasClass('dragging')) {
            // Kết thúc kéo, lưu lại vị trí.
            const rect = btnElement.getBoundingClientRect();
            try {
                const position = { left: rect.left, top: rect.top };
                localStorage.setItem('mobile-trigger-btn-position', JSON.stringify(position));
                localStorage.setItem('mobile-trigger-btn-user-dragged', 'true');
            } catch (err) { }
            setTimeout(() => {
                $triggerBtn.removeClass('dragging');
                hasMoved = false;
            }, 50);
        } else if (e.type === 'pointerup') {
            // Không kéo thì xem là thao tác bấm.
            const $overlay = $('#mobile-phone-overlay');
            if ($overlay.hasClass('active')) {
                closeMobilePhone();
            } else {
                openMobilePhone();
            }
        }
        isDrag = false;
    };

    btnElement.addEventListener('pointerdown', function (e) {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        e.cancelable && e.preventDefault();
        e.stopPropagation();
        isDrag = true;
        hasMoved = false;
        pStartX = e.screenX;
        pStartY = e.screenY;
        const rect = btnElement.getBoundingClientRect();
        pStartLeft = rect.left;
        pStartTop = rect.top;
        if (btnElement.setPointerCapture) {
            try { btnElement.setPointerCapture(e.pointerId); } catch (err) { }
        }
        const win = btnElement.ownerDocument.defaultView || window;
        win.addEventListener('pointermove', onPointerMove);
        win.addEventListener('pointerup', onPointerUp);
        win.addEventListener('pointercancel', onPointerUp);
    });

    btnElement.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });

    // Bấm lớp phủ để đóng, chỉ áp dụng khi chưa ghim.
    $('#mobile-phone-overlay').on('click', function (e) {
        // Nếu đang vuốt trang hoặc vừa vuốt xong thì không đóng điện thoại.
        if (pageSwipe && (pageSwipe.isDragging || pageSwipe.justFinishedDragging)) {
            return;
        }
        if ($(e.target).attr('id') === 'mobile-phone-overlay' && !isPinned) {
            closeMobilePhone();
        }
    });

    // Bấm nút ghim.
    $('#phone-pin-btn').on('click', function (e) {
        e.stopPropagation();
        togglePin();
    });

    // Bấm nút xem hình nền toàn màn hình.
    $('#wallpaper-fullscreen-btn').on('click', function (e) {
        e.stopPropagation();
        openWallpaperFullscreen();
    });

    // Bấm nút đóng hình nền toàn màn hình.
    $('#wallpaper-close-btn').on('click', function (e) {
        e.stopPropagation();
        closeWallpaperFullscreen();
    });

    // Bấm nút đặt CG làm hình nền.
    $('#cg-set-wallpaper-btn').on('click', function (e) {
        e.stopPropagation();
        const cgUrl = $(this).data('cg-url');
        if (cgUrl) {
            setWallpaper(cgUrl);
            closeWallpaperFullscreen();
            if (typeof toastr !== 'undefined') {
                toastr.success('Đã đặt CG làm hình nền');
            }
        }
    });

    // Bấm vào nền của khung xem toàn màn hình để đóng.
    $('#wallpaper-fullscreen-viewer').on('click', function (e) {
        if (e.target.id === 'wallpaper-fullscreen-viewer') {
            closeWallpaperFullscreen();
        }
    });

    // Bấm nút CG trước/sau.
    $('#cg-prev-btn').on('click', function (e) {
        e.stopPropagation();
        switchCGImage('prev');
    });

    $('#cg-next-btn').on('click', function (e) {
        e.stopPropagation();
        switchCGImage('next');
    });

    // Chức năng kéo giao diện điện thoại.
    initPhoneDrag();

    // Sửa lỗi: chuyển bấm biểu tượng ứng dụng sang ủy thác sự kiện để tránh mất tác dụng sau khi DOM cập nhật.
    // Ủy thác sự kiện vào body để DOM có cập nhật thì handler vẫn còn.
    $('body').off('click.appIcon').on('click.appIcon', '.app-icon[data-app], .app-icon[data-app] *', function (e) {
        e.stopPropagation();

        // Sửa trọng điểm: dùng closest để tìm phần tử .app-icon gần nhất, kể cả khi bấm vào phần tử con.
        const $appIcon = $(this).closest('.app-icon[data-app]');

        if ($appIcon.length === 0) {
            return; // Không phải biểu tượng ứng dụng hoặc phần tử con của nó.
        }

        const appName = $appIcon.attr('data-app');

        if (appName) {
            openAppPanel(appName);
        } else {
        }
    });

    // Nút quay lại.
    $('#phone-back-btn').on('click', function () {
        closeAppPanel();
    });

    // Gắn nút tạo nhóm chat bằng ủy thác sự kiện.
    $('body').off('click.createGroupBtn').on('click.createGroupBtn', '.create-group-button', function (e) {
        e.stopPropagation();
        openCreateGroupPanel();
    });

    // Gắn nút xóa nhóm chat trong giao diện trò chuyện bằng ủy thác sự kiện.
    $('body').off('click.deleteGroupBtn').on('click.deleteGroupBtn', '.chat-delete-group-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        const groupId = $(this).data('group-id');
        const groupName = $(this).data('group-name');
        deleteGroup(groupId, groupName);
    });

    // Gắn nút hỏi Arona bằng ủy thác sự kiện.
    $('body').off('click.askArona').on('click.askArona', '.ask-arona-btn', async function (e) {
        e.stopPropagation();
        e.preventDefault();

        const $btn = $(this);
        const originalHtml = $btn.html();

        // Tắt nút tạm thời và hiển thị trạng thái đang gửi.
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Đang gửi...');

        try {
            if (!window.messageSender) {
                throw new Error('Bộ gửi tin nhắn chưa được khởi tạo');
            }

            const message = 'Hỏi Arona xem có ủy thác nào cần xử lý không';
            const success = await window.messageSender.sendToChat(message);

            if (success) {
                if (typeof toastr !== 'undefined') {
                    toastr.success('Đã gửi câu hỏi cho Arona', 'Gửi thành công');
                }
                // Khôi phục trạng thái nút.
                $btn.prop('disabled', false).html(originalHtml);
            } else {
                throw new Error('Gửi tin nhắn thất bại');
            }
        } catch (error) {
            if (typeof toastr !== 'undefined') {
                toastr.error('Gửi thất bại: ' + error.message, 'Lỗi');
            }
            // Khôi phục trạng thái nút.
            $btn.prop('disabled', false).html(originalHtml);
        }
    });

    // Gắn sự kiện bấm liên hệ bằng cách ủy thác vào body.
    // Lưu ý: danh sách liên hệ được tạo động trong #phone-app-body nên cần dùng ủy thác sự kiện.
    $('body').off('click.contactItem').on('click.contactItem', '.contact-item', function (e) {
        e.stopPropagation();

        const $item = $(this);
        const contactId = $item.data('id');
        const contactName = $item.data('name');
        const contactType = $item.data('type');
        const members = $item.data('members') || '';
        const isGroup = contactType === 'group';

        if (!contactId || !contactName) {
            return;
        }

        openChatPanel(contactId, contactName, isGroup, members);
    });

    // Gắn nút quay lại của giao diện trò chuyện.
    $('#chat-back-btn').on('click', function () {
        closeChatPanel();
    });

    // Gắn nút gửi trong trò chuyện.
    $('#chat-send-btn').on('click', function () {
        sendChatMessage();
    });

    // Gắn phím Enter trong ô nhập để gửi tin nhắn.
    $('#chat-input').on('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // Sự kiện bấm ảnh bằng ủy thác sự kiện.
    $('body').off('click.messageImage').on('click.messageImage', '.clickable-image', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const imageUrl = $(this).data('image-url');
        if (imageUrl) {
            viewFullImage(imageUrl);
        }
    });

    // Mở/thu gọn phân loại hình nền bằng ủy thác sự kiện.
    $(document).on('click', '.wallpaper-category-header', function (e) {
        const categoryName = $(this).data('category');
        if (categoryName) {
            toggleWallpaperCategory(categoryName);
        }
    });

    // Bấm nút diễn đàn bằng ủy thác sự kiện jQuery, cùng cách với mục bạn bè.
    $(document).on('click', '.phone-forum-generate-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.phoneGenerateForum && window.phoneGenerateForum();
    });

    $(document).on('click', '.phone-forum-settings-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.phoneOpenForumSettings && window.phoneOpenForumSettings();
    });

    $(document).on('click', '.phone-forum-save-settings-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.phoneSaveForumSettings && window.phoneSaveForumSettings();
    });

    $(document).on('click', '.phone-forum-close-settings-btn', function (e) {
        e.stopPropagation();
        e.preventDefault();
        window.phoneCloseForumSettings && window.phoneCloseForumSettings();
    });

    // Bấm mục trong danh sách bạn bè bằng ủy thác sự kiện.
    $(document).on('click', '.friend-item', function (e) {
        e.stopPropagation();
        const $friendItem = $(this);
        const friendName = $friendItem.data('friend-name');

        if (!friendName) {
            return;
        }

        const relationshipSource = getRelationshipDataSource();
        if (!relationshipSource) {
            return;
        }

        const friendData = relationshipSource[friendName];
        if (!friendData) {
            return;
        }

        showFriendDetail(friendName, friendData);
    });

    // Bấm bài viết diễn đàn bằng ủy thác sự kiện.
    $(document).on('click', '.forum-post-item', function (e) {
        e.stopPropagation();
        const $postItem = $(this);
        const postIndex = $postItem.data('post-index');


        if (postIndex === undefined) {
            return;
        }

        // Lấy dữ liệu bài viết từ trình quản lý diễn đàn.
        if (!window.phoneForumManager) {
            return;
        }

        const forumData = window.phoneForumManager.loadForumData();

        if (!forumData || !forumData[postIndex]) {
            return;
        }

        showForumPostDetail(postIndex, forumData[postIndex]);
    });

    // Lắng nghe thao tác bấm bạn bè trên panel ứng dụng.
    const $appBody = $('#phone-app-body');

    if ($appBody.length > 0) {
        $appBody.on('click', '.friend-item', function (e) {
            e.stopPropagation();

            const $friendItem = $(this);
            const friendName = $friendItem.data('friend-name');

            if (!friendName) {
                return;
            }

            const relationshipSource = getRelationshipDataSource();
            if (!relationshipSource) {
                return;
            }

            const friendData = relationshipSource[friendName];
            if (!friendData) {
                return;
            }

            showFriendDetail(friendName, friendData);
        });

        // Lắng nghe thao tác bấm bài viết diễn đàn trên panel ứng dụng.
        $appBody.on('click', '.forum-post-item', function (e) {
            e.stopPropagation();
            const $postItem = $(this);
            const postIndex = $postItem.data('post-index');


            if (postIndex === undefined) {
                return;
            }

            // Lấy dữ liệu bài viết từ trình quản lý diễn đàn.
            if (!window.phoneForumManager) {
                return;
            }

            const forumData = window.phoneForumManager.loadForumData();

            if (!forumData || !forumData[postIndex]) {
                return;
            }

            showForumPostDetail(postIndex, forumData[postIndex]);
        });
    }

    // Dự phòng: cũng lắng nghe thao tác bấm trên toàn bộ vùng phân loại.
    $(document).on('click', '.list-item-header', function (e) {
        // Nếu đang bấm vào mục bạn bè thì không xử lý tại đây.
        if ($(this).closest('.friend-item').length > 0) {
            return;
        }

        const categoryName = $(this).data('category');
        if (categoryName && !$(this).hasClass('wallpaper-category-header')) {
            toggleWallpaperCategory(categoryName);
        }
    });

    // Xử lý sự kiện bấm toàn cục.
    $(document).on('click', function (e) {
        const $target = $(e.target);

        const inMobilePhone = $target.closest('.mobile-phone-frame').length > 0 ||
            $target.closest('#mobile-phone-overlay').length > 0;

        if (inMobilePhone) {
            const inAppBody = $target.closest('#phone-app-body').length > 0;

            if (inAppBody) {
                // Kiểm tra có bấm vào nút diễn đàn hay không.
                const $forumGenerateBtn = $target.closest('.phone-forum-generate-btn');
                if ($forumGenerateBtn.length > 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.phoneGenerateForum();
                    return;
                }

                const $forumSettingsBtn = $target.closest('.phone-forum-settings-btn');
                if ($forumSettingsBtn.length > 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.phoneOpenForumSettings();
                    return;
                }

                const $forumSaveSettingsBtn = $target.closest('.phone-forum-save-settings-btn');
                if ($forumSaveSettingsBtn.length > 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.phoneSaveForumSettings();
                    return;
                }

                const $forumCloseSettingsBtn = $target.closest('.phone-forum-close-settings-btn');
                if ($forumCloseSettingsBtn.length > 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    window.phoneCloseForumSettings();
                    return;
                }

                // Bấm nút nhiệm vụ do sự kiện gốc xử lý, ở đây không cần xử lý thêm.

                // Kiểm tra có bấm vào phần tử liên quan đến phân loại hình nền hay không.
                const $listItemHeader = $target.closest('.list-item-header');
                if ($listItemHeader.length > 0) {
                    const categoryName = $listItemHeader.data('category');

                    if (categoryName) {
                        toggleWallpaperCategory(categoryName);
                    }
                }

                // Kiểm tra có bấm vào mục hình nền hay không.
                const $wallpaperItem = $target.closest('.wallpaper-item');
                if ($wallpaperItem.length > 0) {
                    const wallpaperUrl = $wallpaperItem.data('wallpaper-url');

                    if (wallpaperUrl) {
                        setWallpaper(wallpaperUrl);
                    }
                }
            }
        }
    });

    // Chọn hình nền bằng ủy thác sự kiện vì các mục hình nền được tải động.
    $(document).on('click', '.wallpaper-item', function (e) {
        const wallpaperUrl = $(this).data('wallpaper-url');
        if (wallpaperUrl) {
            setWallpaper(wallpaperUrl);
        }
    });

    // Lắng nghe resize cửa sổ: chỉnh vị trí nút theo responsive và đảm bảo phần tử không vượt khỏi màn hình.
    let resizeTimer;
    $(window).on('resize.mobilePhone', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            const viewport = getViewportSize();
            const $btn = $('#mobile-trigger-btn');
            const btnElement = $btn[0];

            // Kiểm tra người dùng có từng kéo thủ công hay không.
            const userDragged = localStorage.getItem('mobile-trigger-btn-user-dragged') === 'true';

            if (userDragged) {
                // Người dùng đã kéo thủ công, kiểm tra và chỉnh lại vị trí để không vượt khỏi màn hình.
                const rect = btnElement.getBoundingClientRect();
                const btnWidth = $btn.outerWidth() || 60;
                const btnHeight = $btn.outerHeight() || 60;

                // Kiểm tra có vượt khỏi ranh giới hay không.
                if (rect.left < 0 || rect.top < 0 ||
                    rect.right > viewport.width || rect.bottom > viewport.height) {
                    // Chỉnh lại vị trí.
                    const bounded = constrainFullyInViewport(rect.left, rect.top, btnWidth, btnHeight);
                    btnElement.style.setProperty('left', bounded.x + 'px', 'important');
                    btnElement.style.setProperty('top', bounded.y + 'px', 'important');
                    // Cập nhật vị trí đã lưu.
                    localStorage.setItem('mobile-trigger-btn-position', JSON.stringify({ left: bounded.x, top: bounded.y }));
                }
                return;
            }

            // Chỉnh class CSS và vị trí theo độ rộng màn hình.
            if (viewport.width <= 480) {
                // Gỡ các style định vị inline.
                btnElement.style.removeProperty('left');
                btnElement.style.removeProperty('top');
                btnElement.style.removeProperty('right');
                btnElement.style.removeProperty('bottom');
                btnElement.style.removeProperty('transform');
                // Thêm class mobile-mode.
                $btn.removeClass('tablet-mode desktop-mode').addClass('mobile-mode');
            } else if (viewport.width <= 768) {
                btnElement.style.removeProperty('left');
                btnElement.style.removeProperty('top');
                btnElement.style.removeProperty('right');
                btnElement.style.removeProperty('bottom');
                btnElement.style.removeProperty('transform');
                $btn.removeClass('mobile-mode desktop-mode').addClass('tablet-mode');
            } else {
                $btn.removeClass('mobile-mode tablet-mode').addClass('desktop-mode');
                // Trên desktop, giữ vị trí người dùng đã kéo.
            }

            // Đồng thời kiểm tra giao diện điện thoại có vượt khỏi ranh giới hay không.
            const $phoneFrame = $('.mobile-phone-frame');
            if ($phoneFrame.length > 0 && $('#mobile-phone-overlay').hasClass('active')) {
                const phoneRect = $phoneFrame[0].getBoundingClientRect();
                const frameWidth = $phoneFrame.outerWidth() || 375;
                const frameHeight = $phoneFrame.outerHeight() || 737;

                // Nếu giao diện điện thoại vượt khỏi ranh giới, đặt lại về giữa.
                if (phoneRect.left < -frameWidth + 50 || phoneRect.top < -frameHeight + 50 ||
                    phoneRect.right > viewport.width + frameWidth - 50 ||
                    phoneRect.bottom > viewport.height + frameHeight - 50) {
                    $phoneFrame.css('transform', 'translate(0, 0)');
                }
            }
        }, 250); // Chống rung 250ms.
    });
}

// ==================== Hàm xử lý kéo ====================
function handleDragStart(e) {
    isDragging = true;
    hasMoved = false;

    const $btn = $('#mobile-trigger-btn');
    const btnElement = $btn[0];

    // Gỡ toàn bộ class chế độ.
    $btn.removeClass('mobile-mode tablet-mode desktop-mode');

    // Lấy vị trí thực tế hiện tại của nút trước khi xóa style.
    const rect = btnElement.getBoundingClientRect();
    btnStartX = rect.left;
    btnStartY = rect.top;

    // Bắt buộc ghi đè toàn bộ thuộc tính định vị bằng !important để phủ class CSS.
    btnElement.style.setProperty('left', btnStartX + 'px', 'important');
    btnElement.style.setProperty('top', btnStartY + 'px', 'important');
    btnElement.style.setProperty('right', 'auto', 'important');
    btnElement.style.setProperty('bottom', 'auto', 'important');
    btnElement.style.setProperty('transform', 'none', 'important');

    // Ghi lại vị trí chuột ban đầu.
    dragStartX = e.clientX;
    dragStartY = e.clientY;
}

function handleDragMove(e) {
    if (!isDragging) return;

    // Tính khoảng cách di chuyển.
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;

    // Nếu di chuyển quá 3px thì xem là kéo, không phải bấm.
    if (!hasMoved && (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3)) {
        hasMoved = true;

        // Khi bắt đầu kéo, thêm style tương ứng.
        const $btn = $('#mobile-trigger-btn');
        $btn.addClass('dragging');
    }

    // Chỉ chặn hành vi mặc định và cập nhật vị trí sau khi đã thật sự bắt đầu kéo.
    if (!hasMoved) return;

    if (e.preventDefault) {
        e.preventDefault();
    }

    // Tính vị trí mới.
    const newX = btnStartX + deltaX;
    const newY = btnStartY + deltaY;

    // Dùng hàm công cụ để giới hạn biên, giữ nút hoàn toàn trong viewport.
    const $btn = $('#mobile-trigger-btn');
    const btnWidth = $btn.outerWidth() || 60;
    const btnHeight = $btn.outerHeight() || 60;

    const bounded = constrainFullyInViewport(newX, newY, btnWidth, btnHeight);

    // Dùng setProperty để đặt vị trí cưỡng bức, ghi đè !important.
    const btnElement = $btn[0];
    btnElement.style.setProperty('left', bounded.x + 'px', 'important');
    btnElement.style.setProperty('top', bounded.y + 'px', 'important');
    btnElement.style.setProperty('right', 'auto', 'important');
    btnElement.style.setProperty('bottom', 'auto', 'important');
}

function handleDragEnd(e) {
    if (!isDragging) return;

    isDragging = false;
    const $btn = $('#mobile-trigger-btn');
    $btn.removeClass('dragging');

    // Nếu đã di chuyển thì lưu vị trí.
    if (hasMoved) {
        // Lấy vị trí hiện tại bằng nhiều cách.
        const cssLeft = $btn.css('left');
        const cssTop = $btn.css('top');

        // Lấy trực tiếp giá trị đang đặt trong CSS.
        const left = parseFloat(cssLeft);
        const top = parseFloat(cssTop);

        // Kiểm tra vị trí có hợp lệ hay không.
        if (!isNaN(left) && !isNaN(top) && left >= 0 && top >= 0) {
            try {
                const position = { left: left, top: top };
                localStorage.setItem('mobile-trigger-btn-position', JSON.stringify(position));
                // Đánh dấu người dùng đã kéo thủ công để resize không đặt lại vị trí.
                localStorage.setItem('mobile-trigger-btn-user-dragged', 'true');
            } catch (err) {
            }
        }
    }

    // Trì hoãn đặt lại hasMoved để sự kiện click còn kịp nhận biết.
    setTimeout(() => {
        hasMoved = false;
    }, 10);
}

// Khôi phục vị trí nút, có giới hạn số lần thử lại.
let restorePositionRetryCount = 0;
const MAX_RESTORE_RETRIES = 5;

function restoreTriggerBtnPosition() {
    try {
        const savedPosition = localStorage.getItem('mobile-trigger-btn-position');

        if (!savedPosition) {
            restorePositionRetryCount = 0;
            return;
        }

        const pos = JSON.parse(savedPosition);

        // Kiểm tra vị trí đã lưu có hợp lệ hay không.
        if (typeof pos.left !== 'number' || typeof pos.top !== 'number' ||
            pos.left < 0 || pos.top < 0 ||
            isNaN(pos.left) || isNaN(pos.top)) {
            localStorage.removeItem('mobile-trigger-btn-position');
            restorePositionRetryCount = 0;
            return;
        }

        const $btn = $('#mobile-trigger-btn');

        // Lấy kích thước viewport thực, hỗ trợ giả lập thiết bị trong DevTools và iframe srcdoc.
        let windowWidth = window.innerWidth || document.documentElement.clientWidth || $(window).width();
        let windowHeight = window.innerHeight || document.documentElement.clientHeight || $(window).height();

        // Trong iframe srcdoc, mọi kích thước window đều là 0 nên phải dùng kích thước cửa sổ cha.
        if (window.parent !== window) {
            try {
                // Dùng innerWidth của cửa sổ cha, hỗ trợ giả lập thiết bị trong DevTools.
                const parentWidth = window.parent.innerWidth || window.parent.document.documentElement.clientWidth || $(window.parent).width();
                const parentHeight = window.parent.innerHeight || window.parent.document.documentElement.clientHeight || $(window.parent).height();

                // Nếu kích thước cửa sổ hiện tại là 0 trong iframe srcdoc, dùng kích thước cửa sổ cha.
                if (windowWidth === 0 || windowHeight === 0) {
                    windowWidth = parentWidth;
                    windowHeight = parentHeight;
                }
            } catch (e) {
                // Không thể truy cập cửa sổ cha.
            }
        }

        const btnWidth = $btn.outerWidth();
        const btnHeight = $btn.outerHeight();

        // Nếu kích thước cửa sổ vẫn là 0, kiểm tra đã vượt quá số lần thử lại tối đa hay chưa.
        if (windowWidth === 0 || windowHeight === 0) {
            restorePositionRetryCount++;

            if (restorePositionRetryCount >= MAX_RESTORE_RETRIES) {
                restorePositionRetryCount = 0;
                // Dùng vị trí mặc định.
                $btn.css({
                    left: 'auto',
                    top: 'auto',
                    right: '20px',
                    bottom: '20px'
                });
                return;
            }

            setTimeout(() => {
                restoreTriggerBtnPosition();
            }, 500);
            return;
        }

        // Khôi phục thành công, đặt lại bộ đếm.
        restorePositionRetryCount = 0;

        // Kiểm tra vị trí responsive: nếu là màn hình nhỏ thì dùng vị trí mặc định.
        const isSmallScreen = windowWidth <= 768;
        const isMobileScreen = windowWidth <= 480;

        // Kiểm tra người dùng có từng kéo thủ công hay không.
        const userDragged = localStorage.getItem('mobile-trigger-btn-user-dragged') === 'true';

        if (userDragged) {
            // Gỡ các class chế độ và dùng tọa độ đã lưu.
            $btn.removeClass('mobile-mode tablet-mode desktop-mode');
        } else {
            // Nếu là màn hình di động nhỏ và vị trí đã lưu rõ ràng thuộc màn hình lớn.
            if (isMobileScreen && (pos.left > 600 || pos.top > 600)) {
                // Sửa trọng điểm: gỡ style inline và thêm class CSS.
                $btn[0].style.removeProperty('left');
                $btn[0].style.removeProperty('top');
                $btn[0].style.removeProperty('right');
                $btn[0].style.removeProperty('bottom');
                $btn[0].style.removeProperty('transform');
                $btn.removeClass('tablet-mode desktop-mode').addClass('mobile-mode');
                return;
            }

            // Khi màn hình nhỏ, dùng vị trí mặc định để tránh loạn vị trí.
            if (isSmallScreen && (pos.left > windowWidth * 0.8 || pos.top > windowHeight * 0.8)) {
                // Sửa trọng điểm: gỡ style inline và thêm class CSS.
                $btn[0].style.removeProperty('left');
                $btn[0].style.removeProperty('top');
                $btn[0].style.removeProperty('right');
                $btn[0].style.removeProperty('bottom');
                $btn.removeClass('mobile-mode desktop-mode').addClass('tablet-mode');
                return;
            }

            // Desktop: gỡ class chế độ.
            $btn.removeClass('mobile-mode tablet-mode').addClass('desktop-mode');
        }

        // Dùng hàm công cụ để giới hạn biên.
        const bounded = constrainFullyInViewport(pos.left, pos.top, btnWidth, btnHeight);

        $btn.css({
            left: bounded.x + 'px',
            top: bounded.y + 'px',
            right: 'auto',
            bottom: 'auto'
        });
    } catch (e) {
        localStorage.removeItem('mobile-trigger-btn-position');
        restorePositionRetryCount = 0;
    }
}

// ==================== Chỉnh vị trí nút thủ công để debug ====================
window.resetMobileButtonPosition = function () {
    let windowWidth = window.innerWidth || document.documentElement.clientWidth || $(window).width();

    // Trong iframe srcdoc, kích thước là 0 nên dùng kích thước cửa sổ cha.
    if ((windowWidth === 0) && window.parent !== window) {
        try {
            windowWidth = window.parent.innerWidth || window.parent.document.documentElement.clientWidth || $(window.parent).width();
        } catch (e) {
            // Không thể truy cập cửa sổ cha.
        }
    }

    const $btn = $('#mobile-trigger-btn');
    const btnElement = $btn[0];

    // Gỡ toàn bộ style định vị inline.
    btnElement.style.removeProperty('left');
    btnElement.style.removeProperty('top');
    btnElement.style.removeProperty('right');
    btnElement.style.removeProperty('bottom');

    // Đặt vị trí cưỡng bức theo độ rộng màn hình, kèm !important.
    if (windowWidth <= 480) {
        $btn.removeClass('tablet-mode desktop-mode').addClass('mobile-mode');
        // Đặt style inline cưỡng bức bằng !important, canh giữa theo chiều dọc ở mép phải.
        btnElement.style.setProperty('left', 'auto', 'important');
        btnElement.style.setProperty('top', '50%', 'important');
        btnElement.style.setProperty('right', '12px', 'important');
        btnElement.style.setProperty('bottom', 'auto', 'important');
        btnElement.style.setProperty('transform', 'translateY(-50%)', 'important');
    } else if (windowWidth <= 768) {
        $btn.removeClass('mobile-mode desktop-mode').addClass('tablet-mode');
        btnElement.style.setProperty('left', 'auto', 'important');
        btnElement.style.setProperty('top', 'auto', 'important');
        btnElement.style.setProperty('right', '15px', 'important');
        btnElement.style.setProperty('bottom', '15px', 'important');
        btnElement.style.setProperty('transform', 'none', 'important');
    } else {
        // Desktop: đặt ở giữa chiều dọc, cách mép phải khoảng một phần ba.
        $btn.removeClass('mobile-mode tablet-mode').addClass('desktop-mode');
        btnElement.style.setProperty('left', 'auto', 'important');
        btnElement.style.setProperty('top', '50%', 'important');
        btnElement.style.setProperty('right', '20%', 'important');
        btnElement.style.setProperty('bottom', 'auto', 'important');
        btnElement.style.setProperty('transform', 'translateY(-50%)', 'important');
    }

    // Xóa vị trí đã lưu và dấu kéo để lần tải sau không khôi phục nhầm vị trí.
    localStorage.removeItem('mobile-trigger-btn-position');
    localStorage.removeItem('mobile-trigger-btn-user-dragged');
};

// ==================== Chức năng vuốt trang ====================
let pageSwipe = {
    currentPageIndex: 0,
    totalPages: 1,
    isDragging: false,
    hasMoved: false, // Đã thật sự di chuyển hay chưa, dùng để phân biệt bấm và vuốt.
    startX: 0,
    currentX: 0,
    threshold: 50, // Ngưỡng kéo.
    initialized: false,
    wrapper: null, // Lưu tham chiếu wrapper.
    indicators: null, // Lưu tham chiếu indicators.
    boundHandleMove: null, // Lưu hàm move đã bind.
    boundHandleEnd: null, // Lưu hàm end đã bind.
    justFinishedDragging: false, // Vừa kéo xong, tránh click đóng điện thoại ngay lập tức.

    init: function () {
        // Thử lấy bằng cả jQuery và DOM gốc.
        let wrapper = document.getElementById('app-pages-wrapper');
        let indicators = document.getElementById('page-indicators');

        // Nếu DOM gốc không tìm thấy thì thử jQuery.
        if (!wrapper) {
            const $wrapper = $('#mobile-phone-overlay #app-pages-wrapper');
            wrapper = $wrapper.length > 0 ? $wrapper[0] : null;
        }

        if (!indicators) {
            const $indicators = $('#mobile-phone-overlay #page-indicators');
            indicators = $indicators.length > 0 ? $indicators[0] : null;
        }

        if (!wrapper || !indicators) {
            return;
        }

        // Lưu tham chiếu.
        this.wrapper = wrapper;
        this.indicators = indicators;

        // Tạo tham chiếu hàm đã bind để gỡ listener về sau.
        this.boundHandleMove = this.handleMove.bind(this);
        this.boundHandleEnd = this.handleEnd.bind(this);

        // Sự kiện chuột trên PC.
        wrapper.addEventListener('mousedown', this.handleStart.bind(this));
        wrapper.addEventListener('mousemove', this.boundHandleMove);
        wrapper.addEventListener('mouseup', this.boundHandleEnd);
        wrapper.addEventListener('mouseleave', this.boundHandleEnd);

        // Sự kiện chạm trên di động.
        wrapper.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
        wrapper.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        wrapper.addEventListener('touchend', this.handleEnd.bind(this));

        // Sự kiện bấm chỉ báo trang.
        const indicatorElements = indicators.querySelectorAll('.indicator');
        indicatorElements.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToPage(index);
            });
        });
    },

    handleStart: function (e) {
        // Không chặn lan truyền ngay để sự kiện bấm vẫn kích hoạt bình thường.
        // Chỉ chặn lan truyền khi thật sự vuốt trong handleMove.

        this.isDragging = true;
        this.hasMoved = false; // Ghi nhận đã thật sự di chuyển hay chưa.
        this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        this.currentX = this.startX;

        if (this.wrapper) {
            this.wrapper.style.transition = 'none';
        }

        // Sự kiện chuột: lắng nghe move và up trên document để tránh mất khi kéo ra ngoài vùng.
        if (e.type === 'mousedown') {
            document.addEventListener('mousemove', this.boundHandleMove);
            document.addEventListener('mouseup', this.boundHandleEnd);
        }
    },

    handleMove: function (e) {
        if (!this.isDragging) return;

        this.currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = this.currentX - this.startX;

        // Chỉ khi di chuyển quá 5px mới xem là vuốt thật sự.
        if (Math.abs(deltaX) > 5) {
            if (!this.hasMoved) {
                this.hasMoved = true;
            }

            // Tới lúc này mới chặn hành vi mặc định và lan truyền.
            e.preventDefault();
            e.stopPropagation();

            if (this.wrapper) {
                const translateX = -this.currentPageIndex * 100 + (deltaX / this.wrapper.offsetWidth) * 100;
                this.wrapper.style.transform = `translateX(${translateX}%)`;
            }
        }
    },

    handleEnd: function (e) {
        if (!this.isDragging) return;

        const deltaX = this.currentX - this.startX;

        // Chỉ chặn lan truyền sự kiện khi đã thật sự vuốt.
        if (this.hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.isDragging = false;

        // Gỡ listener trên document.
        document.removeEventListener('mousemove', this.boundHandleMove);
        document.removeEventListener('mouseup', this.boundHandleEnd);

        // Chỉ khi đã thật sự vuốt mới cần xử lý đổi trang và đặt cờ.
        if (this.hasMoved) {
            // Đặt cờ vừa kéo xong để tránh click đóng điện thoại ngay lập tức.
            this.justFinishedDragging = true;
            setTimeout(() => {
                this.justFinishedDragging = false;
            }, 100);

            if (this.wrapper) {
                // Khôi phục hiệu ứng chuyển tiếp.
                this.wrapper.style.transition = 'transform 0.3s ease-out';

                // Xác định có cần đổi trang hay không.
                if (Math.abs(deltaX) > this.threshold) {
                    if (deltaX > 0 && this.currentPageIndex > 0) {
                        // Vuốt sang phải, chuyển về trang trước.
                        this.goToPage(this.currentPageIndex - 1);
                    } else if (deltaX < 0 && this.currentPageIndex < this.totalPages - 1) {
                        // Vuốt sang trái, chuyển sang trang sau.
                        this.goToPage(this.currentPageIndex + 1);
                    } else {
                        // Quay lại trang hiện tại.
                        this.goToPage(this.currentPageIndex);
                    }
                } else {
                    // Quay lại trang hiện tại.
                    this.goToPage(this.currentPageIndex);
                }
            }
        }
    },

    goToPage: function (pageIndex) {
        if (pageIndex < 0 || pageIndex >= this.totalPages) return;

        this.currentPageIndex = pageIndex;
        if (this.wrapper) {
            this.wrapper.style.transform = `translateX(-${pageIndex * 100}%)`;
        }

        // Cập nhật chỉ báo.
        this.updateIndicators();
    },

    updateIndicators: function () {
        if (!this.indicators) return;

        const indicatorElements = this.indicators.querySelectorAll('.indicator');
        indicatorElements.forEach((indicator, index) => {
            if (index === this.currentPageIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
};

function initPageSwipe() {
    pageSwipe.init();
}

// ==================== Quản lý dữ liệu khung biến MVU ====================

/**
 * Lấy trực tiếp dữ liệu MVU mới nhất từ lịch sử chat, không bị ảnh hưởng bởi thứ tự cập nhật.
 * Cách làm giống triển khai getLastValidVariable trong mã nguồn MVU.
 * @returns {object|null} - Đối tượng dữ liệu MVU, trả về null nếu không tìm thấy.
 */
function getLatestMvuDataFromChat() {
    try {
        const chat = SillyTavern?.chat;
        if (!chat || chat.length === 0) return null;

        // Tìm từ cuối lên đầu tin nhắn đầu tiên có stat_data.
        for (let i = chat.length - 1; i >= 0; i--) {
            const msg = chat[i];
            const swipeId = msg.swipe_id ?? 0;
            const variables = _.get(msg, ['variables', swipeId]);
            if (variables && _.has(variables, 'stat_data')) {
                return variables;
            }
        }
        return null;
    } catch (error) {
        console.warn('[Thanh trạng thái điện thoại] Lấy dữ liệu MVU từ chat thất bại:', error);
        return null;
    }
}

/**
 * Trích xuất dữ liệu trò chơi thực tế từ đối tượng dữ liệu MVU.
 * Tương thích hai cấu trúc dữ liệu:
 * 1. Dữ liệu nằm dưới key stat_data của bản cũ.
 * 2. Dữ liệu nằm trực tiếp ở root theo định dạng MVU Zod.
 * @param {object} mvuData - Đối tượng dữ liệu do MVU trả về.
 * @returns {object} - Dữ liệu trò chơi đã trích xuất.
 */
function extractMvuGameData(mvuData) {
    if (!mvuData || typeof mvuData !== 'object') {
        return {};
    }

    /* Ưu tiên kiểm tra đường dẫn stat_data. */
    const statData = _.get(mvuData, 'stat_data', null);
    if (statData && typeof statData === 'object' && Object.keys(statData).length > 0) {
        return statData;
    }

    /* Nếu stat_data trống, kiểm tra dữ liệu có nằm trực tiếp ở root hay không. */
    const dataKeys = Object.keys(mvuData).filter(k => !k.startsWith('$') && k !== 'stat_data');
    if (dataKeys.length > 0) {
        return mvuData;
    }

    return {};
}

/**
 * Hàm lõi: lấy dữ liệu trò chơi MVU mới nhất.
 * Mọi nơi cần lấy dữ liệu MVU đều nên gọi hàm này.
 * Ưu tiên lấy trực tiếp từ SillyTavern.chat để không bị ảnh hưởng bởi thứ tự cập nhật biến.
 * @param {boolean} updateGlobal - Có cập nhật currentPhoneData toàn cục hay không, mặc định true.
 * @returns {object} - Đối tượng dữ liệu trò chơi.
 */
function fetchLatestMvuData(updateGlobal = true) {
    let gameData = {};

    try {
        /* Ưu tiên lấy trực tiếp từ SillyTavern.chat, không phụ thuộc thứ tự cập nhật. */
        const chatMvuData = getLatestMvuDataFromChat();
        if (chatMvuData) {
            gameData = extractMvuGameData(chatMvuData);
        }

        /* Phương án dự phòng: dùng Mvu.getMvuData để lấy dữ liệu. */
        if (Object.keys(gameData).length === 0 && typeof Mvu !== 'undefined' && Mvu.getMvuData) {
            /* Thử lấy từ tin nhắn mới nhất. */
            const mvuData = Mvu.getMvuData({ type: 'message', message_id: 'latest' });
            gameData = extractMvuGameData(mvuData);

            /* Nếu cấp tin nhắn không có dữ liệu thì thử lấy ở cấp chat. */
            if (Object.keys(gameData).length === 0) {
                const chatData = Mvu.getMvuData({ type: 'chat' });
                gameData = extractMvuGameData(chatData);
            }
        }

        /* Phương án dự phòng: dùng phương thức getVariables cũ. */
        if (Object.keys(gameData).length === 0 && typeof getVariables === 'function') {
            const chatVars = getVariables({ type: 'chat' }) || {};
            gameData = extractMvuGameData(chatVars);
        }

        /* Cập nhật biến toàn cục. */
        if (updateGlobal && Object.keys(gameData).length > 0) {
            currentPhoneData = gameData;
        }

    } catch (error) {
        console.error('[Thanh trạng thái điện thoại] Lấy dữ liệu MVU thất bại:', error);
    }

    return gameData;
}

/**
 * Làm mới dữ liệu toàn cục và cập nhật UI.
 */
function refreshPhoneData() {
    const gameData = fetchLatestMvuData(true);
    if (Object.keys(gameData).length > 0) {
        updatePhoneData(gameData);
    }
    return gameData;
}

// ==================== Lắng nghe sự kiện khung biến MVU ====================
function registerMvuEventListeners() {
    /* Dùng khung biến MVU; dữ liệu sẽ được lấy theo nhu cầu khi mở ứng dụng. */
}

// Tải dữ liệu MVU ban đầu.
function loadInitialMvuData() {
    const gameData = fetchLatestMvuData(true);
    if (Object.keys(gameData).length > 0) {
        updatePhoneData(gameData);
        return true;
    }
    return false;
}

// ==================== Hàm cập nhật UI ====================
function updatePhoneTime() {
    /* Đọc thời gian từ biến MVU. */
    /* Việc cập nhật thời gian do updatePhoneData() đọc từ current_time trong biến MVU. */
    try {
        /* Thử lấy dữ liệu từ các nguồn có thể. */
        let currentTime = null;

        /* Cách 1: đọc từ window.mvuGameData nếu có. */
        if (window.mvuGameData?.world_info?.time?.current_time) {
            currentTime = window.mvuGameData.world_info.time.current_time;
        }

        /* Cách 2: đọc từ biến toàn cục nếu có. */
        if (!currentTime && typeof gameData !== 'undefined' && gameData?.world_info?.time?.current_time) {
            currentTime = gameData.world_info.time.current_time;
        }

        /* Nếu lấy được dữ liệu thời gian thì cập nhật hiển thị. */
        if (currentTime) {
            updatePhoneTimeFromMVU(currentTime);
        }
    } catch (error) {
        /* Lỗi im lặng để không ảnh hưởng chức năng khác. */
    }
}

/* Phân tích chuỗi thời gian MVU và cập nhật hiển thị. */
function updatePhoneTimeFromMVU(currentTimeStr) {
    // Định dạng currentTimeStr ví dụ: "2024\u5e7411\u67089\u65e5 \u661f\u671f\u516d 14:30".
    if (!currentTimeStr) return;

    try {
        // Trích phần giờ, thường là 5 ký tự cuối.
        const timeMatch = currentTimeStr.match(/(\d{1,2}:\d{2})$/);
        const timeString = timeMatch ? timeMatch[1] : '14:30';

        // Trích phần ngày, tháng, năm.
        const dateMatch = currentTimeStr.match(/(\d{4})\u5e74(\d{1,2})\u6708(\d{1,2})\u65e5/);
        let dateString = '10/24';
        if (dateMatch) {
            const month = String(dateMatch[2]).padStart(2, '0');
            const day = String(dateMatch[3]).padStart(2, '0');
            dateString = `${month}/${day}`;
        }

        // Cập nhật giờ và ngày trên màn hình khóa.
        $('#phone-big-time').text(timeString);
        $('#phone-date').text(dateString);

        // Cập nhật giờ trên thanh trạng thái.
        $('#phone-status-time').text(timeString);

    } catch (error) {
    }
}

function updatePhoneData(data) {
    if (!data) {
        return;
    }


    // Lưu dữ liệu vào biến toàn cục để timer sử dụng.
    window.mvuGameData = data;

    // Cập nhật thông tin thế giới.
    const worldInfo = data.world_info || {};
    const time = worldInfo.time || {};
    const location = worldInfo.location || {};
    const environment = worldInfo.environment || {};

    // Cập nhật thời gian, đọc từ current_time của MVU.
    if (time.current_time) {
        updatePhoneTimeFromMVU(time.current_time);
    }

    // Cập nhật thời tiết.
    if (environment.weather) {
        $('#phone-weather').text(environment.weather);
        // Cập nhật thời tiết trên thanh trạng thái.
        $('#phone-status-weather').text(environment.weather);
    }

    // Cập nhật tức thời nội dung ứng dụng đang mở.
    if (currentPanel && $('#mobile-phone-overlay').hasClass('active')) {

        // Tạo lại và cập nhật nội dung panel hiện tại.
        let content = '';
        switch (currentPanel) {
            case 'messages':
                content = generateMessagesPanel(data);
                break;
            case 'shop':
                content = generateShopPanel(data);
                break;
            case 'gallery':
                content = generateGalleryPanel(data);
                break;
            case 'friends':
                content = generateFriendsPanel(data);
                break;
            case 'checkin':
                content = generateCheckInPanel(data);
                break;
            case 'settings':
                content = generateSizeSettingsPanel();
                break;
            default:
                break;
        }

        if (content) {
            $('#phone-app-body').html(content);
        }
    }

}

// ==================== Hàm điều khiển ====================
function openMobilePhone() {
    $('#mobile-phone-overlay').addClass('active');

    // Làm mới dữ liệu MVU.
    try {
        loadInitialMvuData();
    } catch (error) {
        console.warn('[Giao diện điện thoại] Tải dữ liệu MVU thất bại:', error);
    }

    // Khởi động lắng nghe thời gian thực.
    setupMessageEventListener();

    // Khôi phục timer trò chuyện nếu trước đó đang ở màn hình chat.
    if (currentChatContactId && $('#phone-chat-panel').hasClass('active')) {
        // Nếu panel chat vẫn đang mở thì khôi phục timer.
        if (!chatPanelRefreshInterval) {
            chatPanelRefreshInterval = setInterval(() => {
                const $mobileOverlay = $('#mobile-phone-overlay');
                const isMobileOpen = $mobileOverlay.hasClass('active');
                const $chatPanel = $('#phone-chat-panel');
                const isChatOpen = $chatPanel.hasClass('active');

                if (isMobileOpen && isChatOpen) {
                    renderChatMessages(currentChatContactId, currentChatIsGroup);
                }
            }, 1000);
        }
    }

    // Khởi tạo trễ để đảm bảo DOM đã render hoàn chỉnh.
    setTimeout(() => {
        // Khởi tạo chức năng vuốt trang, chỉ khởi tạo một lần.
        if (!pageSwipe.initialized) {
            initPageSwipe();
            pageSwipe.initialized = true;
        }

        // Khôi phục panel đã mở lần trước.
        try {
            const lastPanel = localStorage.getItem('mobile-last-panel');
            // Chỉ khôi phục khi có tên panel hợp lệ.
            if (lastPanel && lastPanel.trim() !== '' && lastPanel !== 'null') {
                openAppPanel(lastPanel, true); // Truyền true nghĩa là khôi phục từ trạng thái đã đóng.
            } else {
            }
        } catch (e) {
        }
    }, 100);
}

function closeMobilePhone() {
    const $overlay = $('#mobile-phone-overlay');
    $overlay.removeClass('active');

    // Dừng cơ chế làm mới.
    stopRefreshMechanism();

    // Lưu vị trí cuộn của trang chi tiết bạn bè nếu hiện đang ở trang đó.
    if (currentPanel === 'friends' && lastViewedFriend && navigationStack.length > 0) {
        // Ưu tiên dùng vị trí mà listener cuộn đã lưu vì DOM có thể đã bị sửa.
        // Chỉ đọc từ DOM khi chưa có vị trí đã lưu.
        if (friendDetailScrollPosition === 0) {
            let scrollContainer = document.getElementById('friend-detail-scroll-container');
            if (!scrollContainer) {
                const $scrollContainer = $('#friend-detail-scroll-container');
                if ($scrollContainer.length > 0) {
                    scrollContainer = $scrollContainer[0];
                }
            }

            if (scrollContainer) {
                friendDetailScrollPosition = scrollContainer.scrollTop;
            } else {
            }
        } else {
        }
    }

    // Lưu trạng thái panel hiện tại vào localStorage.
    try {
        if (currentPanel) {
            localStorage.setItem('mobile-last-panel', currentPanel);
        } else {
            localStorage.setItem('mobile-last-panel', '');
        }
    } catch (e) {
    }

    // Khi đóng thì hủy trạng thái ghim.
    if (isPinned) {
        isPinned = false;
        $('#phone-pin-btn').removeClass('pinned');
        $overlay.removeClass('pinned');
    }

    // Không đóng panel ứng dụng, giữ trạng thái cho lần mở sau.
    // closeAppPanel(); // Dòng này được chú thích để giữ trạng thái panel.

    // Đặt lại vị trí và animation của khung điện thoại.
    const $phoneFrame = $('.mobile-phone-frame');
    $phoneFrame.css({
        'transform': '',
        'animation': '',
        'transition': ''
    });
}

// Chuyển đổi trạng thái ghim.
function togglePin() {
    isPinned = !isPinned;
    const $pinBtn = $('#phone-pin-btn');
    const $overlay = $('#mobile-phone-overlay');

    if (isPinned) {
        $pinBtn.addClass('pinned');
        $overlay.addClass('pinned');
        if (typeof toastr !== 'undefined') {
            toastr.info('Đã ghim, có thể thao tác với trang bên dưới');
        }
    } else {
        $pinBtn.removeClass('pinned');
        $overlay.removeClass('pinned');
        if (typeof toastr !== 'undefined') {
            toastr.info('Đã hủy ghim');
        }
    }
}

// Khởi tạo kéo giao diện điện thoại, tái sử dụng logic kéo của nút nhỏ.
function initPhoneDrag() {
    const $dragHandle = $('#phone-drag-handle');
    const $phoneFrame = $('.mobile-phone-frame');

    if ($dragHandle.length === 0 || $phoneFrame.length === 0) {
        return;
    }

    const dragHandle = $dragHandle[0];

    // Chặn sự kiện bấm trên tay nắm kéo lan ra ngoài.
    $dragHandle.on('click', function (e) {
        e.stopPropagation();
    });

    // Dùng Pointer Events gốc để ổn định hơn.
    dragHandle.addEventListener('pointerdown', handlePhoneDragStart);
    dragHandle.addEventListener('pointermove', handlePhoneDragMove);
    dragHandle.addEventListener('pointerup', handlePhoneDragEnd);
    dragHandle.addEventListener('pointercancel', handlePhoneDragEnd);

}

function handlePhoneDragStart(e) {

    // Chặn hành vi mặc định và lan truyền sự kiện.
    e.preventDefault();
    e.stopPropagation();

    isPhoneDragging = true;

    // Bắt pointer để bảo đảm các sự kiện pointermove và pointerup sau đó vẫn kích hoạt.
    e.target.setPointerCapture(e.pointerId);

    const $phoneFrame = $('.mobile-phone-frame');

    phoneDragStartX = e.clientX;
    phoneDragStartY = e.clientY;

    // Gỡ transition và animation ngay để khi đọc transform không bị hiệu ứng chuyển tiếp ảnh hưởng.
    $phoneFrame.css({
        'animation': 'none',
        'transition': 'none'
    });

    // Buộc trình duyệt tính lại style để bảo đảm transition dừng ngay.
    $phoneFrame[0].offsetHeight;

    // Đọc giá trị transform hiện tại; sau khi dừng transition thì giá trị này mới chính xác.
    const currentTransform = $phoneFrame.css('transform');
    if (currentTransform && currentTransform !== 'none') {
        const matrix = currentTransform.match(/matrix\(([^)]+)\)/);
        if (matrix) {
            const values = matrix[1].split(', ');
            phoneStartX = parseFloat(values[4]) || 0;
            phoneStartY = parseFloat(values[5]) || 0;
        } else {
            phoneStartX = 0;
            phoneStartY = 0;
        }
    } else {
        phoneStartX = 0;
        phoneStartY = 0;
    }

}

function handlePhoneDragMove(e) {
    if (!isPhoneDragging) return;

    e.preventDefault();

    // Tính khoảng cách di chuyển.
    const deltaX = e.clientX - phoneDragStartX;
    const deltaY = e.clientY - phoneDragStartY;

    // Tính độ lệch transform mới.
    const newX = phoneStartX + deltaX;
    const newY = phoneStartY + deltaY;

    // Lấy thông tin khung điện thoại và viewport.
    const $phoneFrame = $('.mobile-phone-frame');
    const frameRect = $phoneFrame[0].getBoundingClientRect();
    const frameWidth = frameRect.width || 375;
    const frameHeight = frameRect.height || 737;
    const viewport = getViewportSize();

    // Tính vị trí tâm ban đầu của khung điện thoại khi chưa có transform.
    // Khung điện thoại được canh giữa bằng flexbox nên vị trí ban đầu là tâm viewport.
    const initialCenterX = viewport.width / 2;
    const initialCenterY = viewport.height / 2;

    // Tính vị trí thực tế sau khi áp dụng transform.
    const actualLeft = initialCenterX - frameWidth / 2 + newX;
    const actualTop = initialCenterY - frameHeight / 2 + newY;

    // Giới hạn biên: bảo đảm ít nhất minVisible pixel còn nằm trong màn hình.
    const minVisible = 80;
    const minX = -frameWidth + minVisible;
    const maxX = viewport.width - minVisible;
    const minY = -frameHeight + minVisible;
    const maxY = viewport.height - minVisible;

    // Giới hạn vị trí thực tế.
    const boundedLeft = clamp(actualLeft, minX, maxX);
    const boundedTop = clamp(actualTop, minY, maxY);

    // Tính ngược lại thành giá trị transform.
    const boundedTransformX = boundedLeft - (initialCenterX - frameWidth / 2);
    const boundedTransformY = boundedTop - (initialCenterY - frameHeight / 2);

    // Áp dụng transform.
    $phoneFrame.css('transform', `translate(${boundedTransformX}px, ${boundedTransformY}px)`);
}

function handlePhoneDragEnd(e) {
    if (!isPhoneDragging) return;

    isPhoneDragging = false;

    // Nhả pointer capture.
    if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
        e.target.releasePointerCapture(e.pointerId);
    }

}

function openAppPanel(appName, isRestoringFromClose = false) {

    // Kiểm tra dữ liệu.
    if (!currentPhoneData) {
        const loaded = loadInitialMvuData();

        if (!loaded) {
            if (typeof toastr !== 'undefined') {
                toastr.warning('Không tìm thấy dữ liệu\nHãy khởi tạo biến MVU hoặc gửi một tin nhắn trước');
            }
            return;
        }
    }

    // Chỉ khi khôi phục từ trạng thái đóng mới kiểm tra có cần khôi phục trang chi tiết bạn bè hay không.
    const relationshipSource = getRelationshipDataSource(currentPhoneData);
    const shouldRestoreFriendDetail = (
        isRestoringFromClose &&
        appName === 'friends' &&
        lastViewedFriend &&
        relationshipSource &&
        relationshipSource[lastViewedFriend]
    );

    // Xóa sạch navigation stack vì đây là một ứng dụng mới.
    navigationStack = [];

    currentPanel = appName;
    let title = '';
    let content = '';

    // Thêm xử lý ngoại lệ để lỗi trong hàm tạo nội dung không làm trắng toàn bộ panel.
    try {
        switch (appName) {
            case 'messages':
                title = '💬 Tin nhắn';
                content = generateMessagesPanel(currentPhoneData);
                break;
            case 'gallery':
                title = '🖼️ Sưu tập CG';
                content = generateGalleryPanel(currentPhoneData);
                break;
            case 'forum':
                title = '💬 Diễn đàn';
                content = generateForumPanel();
                break;
            case 'friends':
                title = '👥 Danh sách ràng buộc';
                // Dùng hàm lấy dữ liệu thống nhất để làm mới dữ liệu.
                fetchLatestMvuData(true);
                content = generateFriendsPanel(currentPhoneData);
                break;
            case 'wallpaper':
                title = '🎨 Hình nền';
                // Xóa sạch trạng thái phân loại hình nền đã tải để tránh lệch trạng thái.
                phoneWpLoaded.clear();
                content = generateSettingsPanel(currentPhoneData);
                break;
            case 'settings':
                title = '⚙️ Cài đặt';
                content = generateSizeSettingsPanel();
                break;
            default:
                title = 'Ứng dụng không xác định';
                content = '<div class="empty-message">Ứng dụng không tồn tại</div>';
                break;
        }
    } catch (error) {
        // Bắt ngoại lệ và hiển thị thông tin lỗi thay vì để panel trắng.
        title = title || `⚠ ${appName}`;
        content = `
            <div class="empty-message">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3; color: #ef4444;"></i>
                <div style="color: #ef4444; font-weight: 600;">Đã xảy ra lỗi khi tải panel</div>
                <div style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
                    ${error.message || 'Lỗi không xác định'}
                </div>
                    style="margin-top: 16px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Xem lỗi chi tiết
                </button>
            </div>
        `;
    }

    $('#phone-app-title').text(title);
    $('#phone-app-body').html(content);
    $('#phone-detail-panel').addClass('active');

    // Xử lý riêng panel danh sách bạn bè: khôi phục trạng thái trước đó bằng nhiều cách để tương thích iframe.
    if (appName === 'friends') {
        // Nếu cần khôi phục trang chi tiết bạn bè.
        if (shouldRestoreFriendDetail) {

            // Ẩn nội dung ngay để tránh thấy danh sách bạn bè hoặc phần đầu trang chi tiết nhấp nháy.
            $('#phone-app-body').css('opacity', '0');

            // Chạy trễ để bảo đảm DOM đã render hoàn chỉnh.
            setTimeout(() => {
                const latestRelationships = getRelationshipDataSource();
                const friendData = latestRelationships ? latestRelationships[lastViewedFriend] : null;
                if (friendData) {
                    // Hiển thị trực tiếp chi tiết bạn bè, bỏ qua phần hiển thị danh sách bạn bè.
                    showFriendDetail(lastViewedFriend, friendData, true); // Truyền isRestoring = true.

                    // Khôi phục vị trí cuộn của trang chi tiết bạn bè.
                    setTimeout(() => {
                        // Lấy đúng container cuộn thật sự.
                        let scrollContainer = document.getElementById('friend-detail-scroll-container');
                        if (!scrollContainer) {
                            const $scrollContainer = $('#friend-detail-scroll-container');
                            if ($scrollContainer.length > 0) {
                                scrollContainer = $scrollContainer[0];
                            }
                        }

                        if (scrollContainer) {
                            scrollContainer.scrollTop = friendDetailScrollPosition;

                            // Sau khi khôi phục xong, fade in nội dung.
                            setTimeout(() => {
                                $('#phone-app-body').css('opacity', '1');
                            }, 50); // Trễ ngắn để bảo đảm cuộn đã hoàn tất.
                        } else {
                            $('#phone-app-body').css('opacity', '1');
                        }
                    }, 50); // Giảm độ trễ để khôi phục nhanh hơn.
                }
            }, 100); // Giảm độ trễ ban đầu.
        } else {
            // Chỉ khôi phục riêng vị trí cuộn khi không khôi phục trang chi tiết.
            if (friendsListScrollPosition > 0) {
                setTimeout(() => {
                    let appBodyElement = document.getElementById('phone-app-body');

                    // Nếu cách DOM gốc không tìm thấy thì thử dùng jQuery.
                    if (!appBodyElement) {
                        const $appBody = $('#phone-app-body');
                        if ($appBody.length > 0) {
                            appBodyElement = $appBody[0];
                        }
                    }

                    if (appBodyElement) {
                        appBodyElement.scrollTop = friendsListScrollPosition;
                    } else {
                    }
                }, 100);
            }
        }
    }

    // Xử lý riêng: nếu là panel tin nhắn thì kiểm tra thử thao tác bấm liên hệ.
    if (appName === 'messages') {
        setTimeout(() => {
            const contactItems = $('.contact-item');
            contactItems.each(function (index) {
                const $item = $(this);
                const element = this;

                // Gắn handler bấm thử cho liên hệ đầu tiên.
                if (index === 0) {
                    $item.on('click.test', function () {
                    });
                }
            });

            // Kiểm tra ủy thác sự kiện có hiệu lực hay không, đã bỏ $._data vì đó không phải API chuẩn.
        }, 100);
    }



    // Xử lý riêng: nếu là panel cài đặt kích thước thì gắn sự kiện.
    if (appName === 'settings') {
        setTimeout(() => {

            const $appBody = $('#phone-app-body');
            if ($appBody.length === 0) {
                return;
            }

            // Gỡ các sự kiện cũ trước.
            $appBody.off('click.phonesize');

            // Gắn nút kích thước preset.
            $appBody.on('click.phonesize', '.phone-size-preset-btn', function (e) {
                e.preventDefault();
                const width = $(this).data('width');
                const height = $(this).data('height');
                $('#phone-width-input').val(width);
                $('#phone-height-input').val(height);
            });

            // Gắn nút áp dụng cài đặt.
            $appBody.on('click.phonesize', '.phone-size-apply-btn', function (e) {
                e.preventDefault();
                const width = parseInt($('#phone-width-input').val());
                const height = parseInt($('#phone-height-input').val());

                if (width < 320 || width > 600 || height < 500 || height > 900) {
                    if (typeof toastr !== 'undefined') {
                        toastr.error('Kích thước vượt ngoài phạm vi!');
                    }
                    return;
                }

                applyPhoneSize(width, height);
            });

            // Gắn nút khôi phục mặc định.
            $appBody.on('click.phonesize', '.phone-size-reset-btn', function (e) {
                e.preventDefault();
                resetPhoneSize();
            });

        }, 100);
    }

    // Xử lý riêng: nếu là panel hình nền thì gắn sự kiện hình nền.
    if (appName === 'wallpaper') {
        setTimeout(() => {

            const $appBody = $('#phone-app-body');
            if ($appBody.length === 0) {
                return;
            }

            // Gỡ các sự kiện cũ trước.
            $appBody.off('click.wallpaper');

            // 1. Gắn sự kiện bấm nút hình nền mặc định.
            $appBody.on('click.wallpaper', '.default-wallpaper-btn', function (e) {
                e.stopPropagation();
                resetWallpaper();
            });

            // 1.5. Gắn sự kiện bấm nút tải hình nền lên.
            $appBody.on('click.wallpaper', '.upload-wallpaper-btn', function (e) {
                e.stopPropagation();
                // Kích hoạt ô chọn file đang ẩn.
                $('#wallpaper-upload-input').click();
            });

            // 1.6. Gắn sự kiện chọn file.
            $('#wallpaper-upload-input').off('change').on('change', function (e) {
                const file = e.target.files[0];
                if (file) {
                    uploadCustomWallpaper(file);
                }
            });

            // 2. Gắn sự kiện bấm tiêu đề phân loại, dùng ủy thác sự kiện để bấm cả vùng .list-item đều có hiệu lực.
            $appBody.on('click.wallpaper', '.wallpaper-category .list-item', function (e) {
                const $categoryDiv = $(this).closest('.wallpaper-category');
                const categoryName = $categoryDiv.data('category');

                if (categoryName) {
                    e.stopPropagation();
                    toggleWallpaperCategory(categoryName);
                }
            });

            // 3. Gắn sự kiện bấm ảnh hình nền bằng ủy thác sự kiện.
            $appBody.on('click.wallpaper', '.wallpaper-item', function (e) {
                const wallpaperUrl = $(this).data('wallpaper-url');

                if (wallpaperUrl) {
                    e.stopPropagation();
                    setWallpaper(wallpaperUrl);
                }
            });

        }, 100);
    }

    // Xử lý riêng: nếu là panel sưu tập CG thì gắn sự kiện.
    if (appName === 'gallery') {
        setTimeout(() => {
            bindCGGalleryEvents();
        }, 100);
    }

    // Xử lý riêng: nếu là panel lịch thì gắn sự kiện bấm ngày.
    if (appName === 'calendar') {
        setTimeout(() => {
            const $appBody = $('#phone-app-body');
            if ($appBody.length === 0) return;

            // Gỡ các sự kiện cũ trước.
            $appBody.off('click.calendar');

            // Gắn sự kiện bấm ngày.
            $appBody.on('click.calendar', '.cal-day', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const day = $(this).data('day');
                if (day) {
                    selectCalendarDay(day);
                }
            });
        }, 100);
    }

}

function closeAppPanel() {

    // Kiểm tra có lịch sử điều hướng hay không.
    if (navigationStack.length > 0) {
        const previousPage = navigationStack.pop();

        // Nếu quay từ trang chi tiết bạn bè về danh sách bạn bè thì giữ lastViewedFriend để lần sau khôi phục.
        const isReturningToFriendsList = previousPage.title && (previousPage.title.includes('\u597d\u53cb\u5217\u8868') || previousPage.title.includes('Danh sách ràng buộc'));
        if (isReturningToFriendsList) {
            // Giữ lastViewedFriend, không xóa.
        }

        // Khôi phục trang cấp trước.
        $('#phone-app-title').text(previousPage.title);
        $('#phone-app-body').html(previousPage.content);

        // Khôi phục vị trí cuộn nếu có lưu, thử nhiều cách để bảo đảm tương thích iframe.
        if (previousPage.scrollPosition !== undefined || lastViewedFriend) {
            setTimeout(() => {
                let appBodyElement = document.getElementById('phone-app-body');

                // Nếu cách DOM gốc không tìm thấy thì thử dùng jQuery.
                if (!appBodyElement) {
                    const $appBody = $('#phone-app-body');
                    if ($appBody.length > 0) {
                        appBodyElement = $appBody[0];
                    }
                }

                if (appBodyElement) {
                    // Ưu tiên dùng vị trí phần tử để khôi phục.
                    if (lastViewedFriend) {
                        const $friendItem = $(`.friend-item[data-friend-name="${lastViewedFriend}"]`);
                        if ($friendItem.length > 0) {
                            const targetPosition = $friendItem.position().top + appBodyElement.scrollTop;
                            appBodyElement.scrollTop = targetPosition;
                            return;
                        }
                    }

                    // Dự phòng: dùng vị trí cuộn đã lưu.
                    if (previousPage.scrollPosition > 0) {
                        appBodyElement.scrollTop = previousPage.scrollPosition;
                        const actualPosition = appBodyElement.scrollTop;

                        // Nếu vị trí thực tế không khớp vị trí đích thì có thể DOM chưa render xong, thử lại một lần.
                        if (actualPosition < previousPage.scrollPosition - 10) {
                            setTimeout(() => {
                                appBodyElement.scrollTop = previousPage.scrollPosition;
                            }, 150);
                        }
                    }
                } else {
                }
            }, 150); // Tăng độ trễ để bảo đảm DOM đã render hoàn chỉnh.
        }

    } else {
        // Không có lịch sử thì đóng toàn bộ panel.
        $('#phone-detail-panel').removeClass('active');
        currentPanel = null;

        // Không xóa lastViewedFriend và friendsListScrollPosition để lần mở sau còn khôi phục.
        // Chỉ xóa khi người dùng đóng hoàn toàn giao diện điện thoại.

        // Xóa trạng thái panel đã lưu.
        try {
            localStorage.setItem('mobile-last-panel', '');
        } catch (e) {
        }
    }
}

// ==================== Lớp gửi tin nhắn ====================
/**
 * MessageSender - phụ trách gửi và định dạng tin nhắn.
 * Tham khảo message-sender.js của dự án gốc.
 */
class MessageSender {
    constructor() {
        this.currentFriendId = null;
        this.currentFriendName = null;
        this.isGroup = false;
    }

    /**
     * Đặt đối tượng chat hiện tại.
     */
    setCurrentChat(friendId, friendName, isGroup = false) {
        this.currentFriendId = friendId;
        this.currentFriendName = friendName;
        this.isGroup = isGroup;
    }

    /**
     * Gửi tin nhắn vào SillyTavern.
     */
    async sendToChat(message) {
        try {

            // Thử lấy phần tử từ cửa sổ cha nếu đang ở trong iframe.
            let targetDocument = document;
            if (window.parent && window.parent !== window) {
                try {
                    targetDocument = window.parent.document;
                } catch (e) {
                }
            }

            const originalInput = targetDocument.getElementById('send_textarea');
            const sendButton = targetDocument.getElementById('send_but');

            if (!originalInput || !sendButton) {
                return false;
            }

            if (originalInput.disabled || sendButton.classList.contains('disabled')) {
                return false;
            }

            // Thêm tin nhắn vào ô nhập.
            const existingValue = originalInput.value;
            const newValue = existingValue ? existingValue + '\n' + message : message;
            originalInput.value = newValue;

            // Kích hoạt sự kiện input.
            originalInput.dispatchEvent(new Event('input', { bubbles: true }));
            originalInput.dispatchEvent(new Event('change', { bubbles: true }));

            // Bấm nút gửi sau một khoảng trễ ngắn.
            await new Promise(resolve => setTimeout(resolve, 300));
            sendButton.click();

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Chờ AI trả lời xong bằng cách lắng nghe số lượng tin nhắn và độ ổn định nội dung.
     * @param {Function} onMessageUpdate - Callback khi tin nhắn cập nhật, không bắt buộc.
     */
    async waitForAIResponse(onMessageUpdate = null) {
        return new Promise((resolve) => {
            // Lấy context SillyTavern.
            let targetWindow = window;
            if (window.parent && window.parent !== window) {
                try {
                    if (window.parent.SillyTavern) {
                        targetWindow = window.parent;
                    }
                } catch (e) {
                }
            }

            if (!targetWindow.SillyTavern || !targetWindow.SillyTavern.getContext) {
                // Nếu không thể lấy context thì chờ 5 giây rồi kết thúc.
                setTimeout(resolve, 5000);
                return;
            }

            const context = targetWindow.SillyTavern.getContext();
            const initialMessageCount = context.chat ? context.chat.length : 0;

            let checkCount = 0;
            const maxChecks = 300; // Chờ tối đa 30 giây.
            let hasNewMessage = false;
            let lastMessageCount = initialMessageCount;
            let lastMessageContent = '';
            let stableCount = 0; // Bộ đếm nội dung ổn định.

            const checkInterval = setInterval(() => {
                checkCount++;

                try {
                    const currentContext = targetWindow.SillyTavern.getContext();
                    const currentMessageCount = currentContext.chat ? currentContext.chat.length : 0;

                    if (currentMessageCount > initialMessageCount) {
                        if (!hasNewMessage) {
                            hasNewMessage = true;
                        }

                        if (currentMessageCount > lastMessageCount && onMessageUpdate) {
                            onMessageUpdate();
                            lastMessageCount = currentMessageCount;
                            stableCount = 0;
                        }

                        const lastMessage = currentContext.chat[currentContext.chat.length - 1];
                        const currentContent = lastMessage?.mes || '';

                        if (currentContent !== lastMessageContent) {
                            lastMessageContent = currentContent;
                            stableCount = 0;

                            if (onMessageUpdate && checkCount % 3 === 0) {
                                onMessageUpdate();
                            }
                        } else {
                            stableCount++;

                            if (stableCount >= 10) {
                                clearInterval(checkInterval);
                                if (onMessageUpdate) {
                                    onMessageUpdate();
                                }
                                setTimeout(resolve, 500);
                                return;
                            } else if (checkCount % 5 === 0) {
                                if (onMessageUpdate) {
                                    onMessageUpdate();
                                }
                            }
                        }
                    }

                    if (checkCount >= maxChecks) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                } catch (error) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }

    /**
     * Dựng và gửi tin nhắn.
     * @param {string} message - Tin nhắn cần gửi.
     * @param {Object} uiElements - Tham chiếu phần tử UI, không bắt buộc.
     */
    async buildAndSendMessage(message, uiElements = null) {
        if (!this.currentFriendId || !this.currentFriendName) {
            throw new Error('Chưa đặt đối tượng chat hiện tại');
        }

        const messageLines = message.split('\n').filter(line => line.trim());
        if (messageLines.length === 0) {
            throw new Error('Nội dung tin nhắn không được để trống');
        }


        // Định dạng tin nhắn.
        const formattedMessages = messageLines.map(line => {
            const content = line.trim();
            // Chat nhóm dùng [Tin_nhắn_nhóm|Mã_nhóm|Người_gửi|Loại_tin_nhắn|Nội_dung].
            // Chat riêng dùng [Tin_nhắn_của_tôi|Tôi|Số|Loại_tin_nhắn|Nội_dung].
            return this.isGroup
                ? `[Tin_nhắn_nhóm|${this.currentFriendId}|Tôi|Văn_bản|${content}]`
                : `[Tin_nhắn_của_tôi|Tôi|${this.currentFriendId}|Văn_bản|${content}]`;
        });

        // Dựng tin nhắn cuối cùng.
        let targetPrefix;
        if (this.isGroup) {
            // Lấy danh sách thành viên nhóm chat, tham khảo mobile-master.
            const groupMembers = this.getCurrentGroupMembers();
            const membersText = groupMembers.length > 0
                ? `, thành viên trong nhóm chat gồm ${groupMembers.join(', ')}`
                : '';

            // Prompt rút phần hướng dẫn định dạng ra khỏi câu đích; bản đầy đủ được giữ ở chú thích bên dưới.
            targetPrefix = `Gửi tin nhắn nhóm tới ${this.currentFriendName} (${this.currentFriendId})${membersText}`;
            // targetPrefix = `Gửi tin nhắn nhóm tới ${this.currentFriendName} (${this.currentFriendId})${membersText}. Hãy tạo phản hồi của nhân vật trong nhóm theo yêu cầu và định dạng của tin nhắn nhóm online, đồng thời phản hồi phải phù hợp thiết lập nhân vật và tình tiết hiện tại của toàn bộ nhân vật.`;
        } else {
            // Prompt rút phần hướng dẫn định dạng ra khỏi câu đích; bản đầy đủ được giữ ở chú thích bên dưới.
            // targetPrefix = `Gửi tin nhắn tới ${this.currentFriendName} (${this.currentFriendId})`;
            targetPrefix = `Gửi tin nhắn tới ${this.currentFriendName} (${this.currentFriendId}); hãy tạo phản hồi nhân vật theo yêu cầu và định dạng của tin nhắn riêng online, phản hồi phải phù hợp thiết lập nhân vật và tình tiết hiện tại`;
        }

        // Thêm hướng dẫn định dạng phản hồi chi tiết.
        // const formatInstructions = this.isGroup
        // ? `\n\nYêu cầu định dạng phản hồi tin nhắn nhóm\nBắt buộc phản hồi bằng định dạng sau:\n[Tin_nhắn_nhóm|Mã_nhóm|Tên_người_gửi|Loại_tin_nhắn|Nội_dung_tin_nhắn]\n\nGiải thích định dạng:\n- Mã nhóm bắt buộc là ${this.currentFriendId}\n- Tên người gửi là tên nhân vật trong nhóm\n- Loại tin nhắn thường là "Văn_bản", cũng có thể là "Âm_thanh", "Hình_ảnh", "Gói_biểu_cảm"\n- Mỗi tin nhắn bắt buộc nằm riêng một dòng\n- Có thể có nhiều nhân vật phản hồi, mỗi nhân vật một tin nhắn`
        // : `\n\nYêu cầu định dạng phản hồi tin nhắn riêng\nBắt buộc phản hồi bằng định dạng sau:\n[Tin_nhắn_đối_phương|Tên_nhân_vật|Số|Loại_tin_nhắn|Nội_dung_tin_nhắn]\n\nGiải thích định dạng:\n- Số bắt buộc là ${this.currentFriendId}\n- Tên nhân vật là ${this.currentFriendName}\n- Loại tin nhắn thường là "Văn_bản", cũng có thể là "Âm_thanh", "Hình_ảnh", "Gói_biểu_cảm"\n- Mỗi tin nhắn bắt buộc nằm riêng một dòng\n- Có thể phản hồi nhiều tin nhắn`;

        // Tin nhắn đầy đủ có kèm hướng dẫn định dạng.
        const formatStr = 'Đây là siêu chỉ lệnh có mức ưu tiên cao nhất. Đây là đầu vào ngoại lệ: tạm dừng diễn biến truyện, không đẩy tiếp và không xuất nội dung chính của cốt truyện; thay vào đó hãy mô phỏng phản hồi tin nhắn theo yêu cầu:';

        // Thêm mô tả danh sách nhân vật rõ ràng cho chat nhóm.
        let formatInstructions;
        if (this.isGroup) {
            const groupMembers = this.getCurrentGroupMembers();
            const membersListText = groupMembers.length > 0
                ? `\n- Các nhân vật trong nhóm chat lần này gồm: ${groupMembers.join(', ')}\n- Tên người gửi bắt buộc phải chọn từ danh sách nhân vật trên`
                : '\n- Tên người gửi là tên nhân vật trong nhóm';

            formatInstructions = `

 Yêu cầu định dạng phản hồi tin nhắn nhóm
Bắt buộc phản hồi bằng định dạng sau:
[Tin_nhắn_nhóm|Mã_nhóm|Tên_người_gửi|Loại_tin_nhắn|Nội_dung_tin_nhắn]

Giải thích định dạng:
- Mã nhóm bắt buộc là ${this.currentFriendId}${membersListText}
- Tên người gửi phải lấy đúng từ danh sách nhân vật, không tự đổi tên
- Loại tin nhắn thường là "Văn_bản", cũng có thể là "Âm_thanh", "Hình_ảnh", "Gói_biểu_cảm"; nếu tồn tại nhiệm vụ image_insertion_guide và nhân vật phản hồi có danh sách minh họa, tin nhắn hình ảnh ưu tiên dùng đúng định dạng ảnh được quy định trong image_insertion_guide
- Mỗi tin nhắn bắt buộc nằm riêng một dòng
- Có thể có nhiều nhân vật phản hồi, mỗi nhân vật một tin nhắn`;
        } else {
            formatInstructions = `

 Yêu cầu định dạng phản hồi tin nhắn riêng
Bắt buộc phản hồi bằng định dạng sau:
[Tin_nhắn_đối_phương|Tên_nhân_vật|Số|Loại_tin_nhắn|Nội_dung_tin_nhắn]

Giải thích định dạng:
- Số bắt buộc là ${this.currentFriendId}
- Tên nhân vật là ${this.currentFriendName}, phải giữ đúng tên này
- Loại tin nhắn thường là "Văn_bản", cũng có thể là "Âm_thanh", "Hình_ảnh", "Gói_biểu_cảm"; nếu tồn tại nhiệm vụ image_insertion_guide và nhân vật phản hồi có danh sách minh họa, tin nhắn hình ảnh ưu tiên dùng đúng định dạng ảnh được quy định trong image_insertion_guide
- Mỗi tin nhắn bắt buộc nằm riêng một dòng
- Có thể phản hồi nhiều tin nhắn`;
        }

        // Dựng tin nhắn cuối cùng; khi là chat nhóm thì thêm nhắc nhở riêng.
        const finalMessage = this.isGroup
            ? `${formatStr}${formatInstructions}. Hãy dùng đúng định dạng quy định, ${targetPrefix}\n\nTin nhắn tôi gửi:\n${formattedMessages.join('\n')}\n\nHãy để nhân vật trong nhóm phản hồi tin nhắn tôi gửi theo đúng định dạng`
            : `${formatStr}${formatInstructions}. Hãy dùng đúng định dạng quy định, ${targetPrefix}\n\nTin nhắn tôi gửi:\n${formattedMessages.join('\n')}\n\nHãy để nhân vật chat riêng phản hồi tin nhắn tôi gửi theo đúng định dạng`;

        const success = await this.sendToChat(finalMessage);

        if (success) {
            // Hiển thị thông báo thành công.
            this.showSendSuccessToast(messageLines.length > 1
                ? `${messageLines.length} tin nhắn`
                : messageLines[0]
            );
        }

        return success;
    }

    /**
     * Hiển thị thông báo gửi thành công.
     */
    showSendSuccessToast(message) {
        if (typeof toastr !== 'undefined') {
            toastr.success(`Đã gửi cho: ${this.currentFriendName}\n${message.length > 20 ? message.substring(0, 20) + '...' : message}`);
        }
    }

    /**
     * Hiển thị thông báo gửi thất bại.
     */
    showSendErrorToast(error) {
        if (typeof toastr !== 'undefined') {
            toastr.error(`Gửi thất bại: ${error}`);
        }
    }

    /**
     * Phương thức chính để gửi tin nhắn.
     * @param {string} message - Tin nhắn cần gửi.
     * @param {Object} uiElements - Tham chiếu phần tử UI, không bắt buộc.
     */
    async sendMessage(message, uiElements = null) {
        if (!message.trim()) {
            this.showSendErrorToast('Nội dung tin nhắn không được để trống');
            return false;
        }

        if (!this.currentFriendId) {
            this.showSendErrorToast('Hãy chọn một đối tượng chat');
            return false;
        }

        try {
            const success = await this.buildAndSendMessage(message, uiElements);
            if (!success) {
                this.showSendErrorToast('Gửi thất bại, hãy thử lại');
            }
            return success;
        } catch (error) {
            this.showSendErrorToast(error.message || 'Gửi thất bại');
            return false;
        }
    }

    /**
     * Xóa sạch đối tượng chat hiện tại.
     */
    clearCurrentChat() {
        this.currentFriendId = null;
        this.currentFriendName = null;
        this.isGroup = false;
    }

    /**
     * Lấy danh sách thành viên của nhóm chat hiện tại.
     * Tham khảo triển khai trong mobile-master/app/message-sender.js.
     */
    getCurrentGroupMembers() {
        if (!this.isGroup || !this.currentFriendId) {
            return [];
        }

        try {
            // Cách 1: tìm thông tin nhóm chat mới nhất trong lịch sử chat.
            if (!window.SillyTavern || !window.SillyTavern.getContext) {
                return [];
            }

            const context = window.SillyTavern.getContext();
            const messages = context.chat || [];
            let latestGroupInfo = null;


            // Tạo regex khớp thông tin nhóm, chưa giới hạn mã nhóm vì sẽ lọc ở bước sau.
            // Định dạng 1: [Nhóm_chat|Tên_nhóm|Mã_nhóm|Danh_sách_thành_viên].
            const groupRegex1 = /\[(?:Nhóm_chat|\u7fa4\u804a)\|([^\|]+)\|([^\|]+)\|([^\]]+)\]/g;
            // Định dạng 2: [Tạo_nhóm_chat|Mã_nhóm|Tên_nhóm|Danh_sách_thành_viên].
            const groupRegex2 = /\[(?:Tạo_nhóm_chat|\u521b\u5efa\u7fa4\u804a)\|([^\|]+)\|([^\|]+)\|([^\]]+)\]/g;

            // Bắt đầu tìm từ tin nhắn mới nhất.
            for (let i = messages.length - 1; i >= 0; i--) {
                let messageText = messages[i].mes || '';

                // Dọn template prompt khỏi tin nhắn, chỉ giữ nội dung thật.
                // Xóa đoạn hướng dẫn định dạng để nó không bị nhận nhầm là tin nhắn.
                messageText = messageText.replace(/Yêu cầu định dạng phản hồi tin nhắn nhóm[\s\S]*?mỗi nhân vật một tin nhắn/g, '');
                messageText = messageText.replace(/\u7fa4\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u6709\u591a\u4e2a\u89d2\u8272\u56de\u590d\uff0c\u6bcf\u4e2a\u89d2\u8272\u4e00\u6761\u6d88\u606f/g, '');
                messageText = messageText.replace(/Yêu cầu định dạng phản hồi tin nhắn riêng[\s\S]*?Có thể phản hồi nhiều tin nhắn/g, '');
                messageText = messageText.replace(/\u79c1\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u56de\u590d\u591a\u6761\u6d88\u606f/g, '');

                // Xóa các dòng ví dụ định dạng dạng chữ.
                messageText = messageText.replace(/\[Tin_nhắn_nhóm\|Mã_nhóm\|Tên_người_gửi\|Loại_tin_nhắn\|Nội_dung_tin_nhắn\]/g, '');
                messageText = messageText.replace(/\[\u7fa4\u804a\u6d88\u606f\|\u7fa4\u53f7\|\u53d1\u9001\u8005\u540d\u5b57\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
                messageText = messageText.replace(/\[Tin_nhắn_đối_phương\|Tên_nhân_vật\|Số\|Loại_tin_nhắn\|Nội_dung_tin_nhắn\]/g, '');
                messageText = messageText.replace(/\[\u5bf9\u65b9\u6d88\u606f\|\u89d2\u8272\u540d\u5b57\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
                messageText = messageText.replace(/\[Tin_nhắn_của_tôi\|Tôi\|Số\|Loại_tin_nhắn\|Nội_dung\]/g, '');
                messageText = messageText.replace(/\[\u6211\u65b9\u6d88\u606f\|\u6211\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
                messageText = messageText.replace(/\[Nhóm_chat\|Tên_nhóm\|Mã_nhóm\|Danh_sách_thành_viên\]/g, '');
                messageText = messageText.replace(/\[\u7fa4\u804a\|\u7fa4\u540d\|\u7fa4\u53f7\|\u6210\u5458\u5217\u8868\]/g, '');
                messageText = messageText.replace(/\[Tạo_nhóm_chat\|Mã_nhóm\|Tên_nhóm\|Danh_sách_thành_viên\]/g, '');
                messageText = messageText.replace(/\[\u521b\u5efa\u7fa4\u804a\|\u7fa4\u53f7\|\u7fa4\u540d\|\u6210\u5458\u5217\u8868\]/g, '');

                // Nếu tin nhắn sau khi dọn trống thì bỏ qua.
                if (!messageText.trim()) {
                    continue;
                }

                // Kiểm tra tin nhắn có chứa nội dung liên quan đến nhóm chat hay không.
                if (messageText.includes('[Nhóm_chat|') || messageText.includes('[\u7fa4\u804a|')) {
                } else if (messageText.includes('[Tạo_nhóm_chat|') || messageText.includes('[\u521b\u5efa\u7fa4\u804a|')) {
                }

                // Đặt lại index regex.
                groupRegex1.lastIndex = 0;
                groupRegex2.lastIndex = 0;

                // Thử khớp định dạng thứ nhất: [Nhóm_chat|Tên_nhóm|Mã_nhóm|Danh_sách_thành_viên].
                let match = groupRegex1.exec(messageText);
                if (match) {
                    const groupName = match[1];
                    const groupId = match[2];
                    const members = match[3];


                    // Kiểm tra mã nhóm có khớp hay không bằng so sánh chuỗi.
                    if (String(groupId) === String(this.currentFriendId)) {
                        latestGroupInfo = {
                            groupName: groupName,
                            members: members
                        };
                        break;
                    }
                }

                // Thử khớp định dạng thứ hai: [Tạo_nhóm_chat|Mã_nhóm|Tên_nhóm|Danh_sách_thành_viên].
                match = groupRegex2.exec(messageText);
                if (match) {
                    const groupId = match[1];
                    const groupName = match[2];
                    const members = match[3];


                    // Kiểm tra mã nhóm có khớp hay không bằng so sánh chuỗi.
                    if (String(groupId) === String(this.currentFriendId)) {
                        latestGroupInfo = {
                            groupName: groupName,
                            members: members
                        };
                        break;
                    }
                }
            }

            if (latestGroupInfo) {
                // Phân tích danh sách thành viên.
                const members = latestGroupInfo.members
                    .split(/[、,，]/)
                    .map(name => name.trim())
                    .filter(name => name);

                return members;
            }

            // Cách 2: nếu không tìm thấy định nghĩa thì thử trích thành viên từ tin nhắn nhóm.
            const membersSet = new Set();
            const groupMessageRegex = new RegExp(`\\[(?:Tin_nhắn_nhóm|\\u7fa4\\u804a\\u6d88\\u606f)\\|${this.currentFriendId}\\|([^\\|]+)\\|`, 'g');

            messages.forEach(msg => {
                const messageText = msg.mes || '';
                groupMessageRegex.lastIndex = 0;
                let match;
                while ((match = groupMessageRegex.exec(messageText)) !== null) {
                    const senderName = match[1];
                    if (senderName && senderName !== 'Tôi' && senderName !== '\u6211') {
                        membersSet.add(senderName);
                    }
                }
            });

            // Nếu tôi từng gửi tin nhắn thì thêm "Tôi".
            const myGroupMessageRegex = new RegExp(`\\[(?:Tin_nhắn_nhóm_của_tôi|\\u6211\\u65b9\\u7fa4\\u804a\\u6d88\\u606f)\\|(?:Tôi|\\u6211)\\|${this.currentFriendId}\\|`, 'g');
            const hasMyMessage = messages.some(msg => {
                const messageText = msg.mes || '';
                myGroupMessageRegex.lastIndex = 0;
                return myGroupMessageRegex.test(messageText);
            });

            if (hasMyMessage) {
                membersSet.add('Tôi');
            }

            const members = Array.from(membersSet);
            if (members.length > 0) {
                return members;
            }

            return [];
        } catch (error) {
            return [];
        }
    }
}

// Tạo instance gửi tin nhắn toàn cục.
window.messageSender = new MessageSender();

// ==================== Hàm chức năng giao diện trò chuyện ====================
/**
 * Trích tin nhắn với liên hệ chỉ định từ lịch sử chat.
 */
function extractMessagesForContact(contactId, isGroup = false) {
    const messages = [];
    const messageSet = new Set(); // Dùng để khử trùng lặp.

    try {
        let chatMessages = [];

        let targetWindow = window;
        if (window.parent && window.parent !== window) {
            try {
                if (window.parent.SillyTavern) {
                    targetWindow = window.parent;
                }
            } catch (e) {
            }
        }

        if (targetWindow.SillyTavern && targetWindow.SillyTavern.getContext) {
            const context = targetWindow.SillyTavern.getContext();
            chatMessages = context.chat || [];
        } else {
        }

        chatMessages.forEach((msg, index) => {
            if (!msg.mes) return;
            let text = msg.mes;

            // Dọn template prompt khỏi tin nhắn, chỉ giữ nội dung thật.
            text = text.replace(/Yêu cầu định dạng phản hồi tin nhắn nhóm[\s\S]*?mỗi nhân vật một tin nhắn/g, '');
            text = text.replace(/\u7fa4\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u6709\u591a\u4e2a\u89d2\u8272\u56de\u590d\uff0c\u6bcf\u4e2a\u89d2\u8272\u4e00\u6761\u6d88\u606f/g, '');
            text = text.replace(/Yêu cầu định dạng phản hồi tin nhắn riêng[\s\S]*?Có thể phản hồi nhiều tin nhắn/g, '');
            text = text.replace(/\u79c1\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u56de\u590d\u591a\u6761\u6d88\u606f/g, '');
            text = text.replace(/\[Tin_nhắn_nhóm\|Mã_nhóm\|Tên_người_gửi\|Loại_tin_nhắn\|Nội_dung_tin_nhắn\]/g, '');
            text = text.replace(/\[\u7fa4\u804a\u6d88\u606f\|\u7fa4\u53f7\|\u53d1\u9001\u8005\u540d\u5b57\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[Tin_nhắn_đối_phương\|Tên_nhân_vật\|Số\|Loại_tin_nhắn\|Nội_dung_tin_nhắn\]/g, '');
            text = text.replace(/\[\u5bf9\u65b9\u6d88\u606f\|\u89d2\u8272\u540d\u5b57\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[Tin_nhắn_của_tôi\|Tôi\|Số\|Loại_tin_nhắn\|Nội_dung\]/g, '');
            text = text.replace(/\[\u6211\u65b9\u6d88\u606f\|\u6211\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[Nhóm_chat\|Tên_nhóm\|Mã_nhóm\|Danh_sách_thành_viên\]/g, '');
            text = text.replace(/\[\u7fa4\u804a\|\u7fa4\u540d\|\u7fa4\u53f7\|\u6210\u5458\u5217\u8868\]/g, '');
            text = text.replace(/\[Tạo_nhóm_chat\|Mã_nhóm\|Tên_nhóm\|Danh_sách_thành_viên\]/g, '');
            text = text.replace(/\[\u521b\u5efa\u7fa4\u804a\|\u7fa4\u53f7\|\u7fa4\u540d\|\u6210\u5458\u5217\u8868\]/g, '');

            // Nếu tin nhắn sau khi dọn trống thì bỏ qua.
            if (!text.trim()) return;

            // Nếu là nhóm chat, có thể ghi nhận văn bản chứa tin nhắn nhóm khi cần debug.
            // if (isGroup && (text.includes('[Tin_nhắn_nhóm|') || text.includes('[\u7fa4\u804a\u6d88\u606f|'))) {
            // }

            // Khớp chat riêng: tin nhắn của tôi hoặc tin nhắn đối phương.
            const privateRegex = /\[(Tin_nhắn_của_tôi|\u6211\u65b9\u6d88\u606f|Tin_nhắn_đối_phương|\u5bf9\u65b9\u6d88\u606f)\|([^|]*)\|([^|]*)\|([^|]*)\|([^\]]*)\]/g;
            // Khớp tin nhắn nhóm.
            const groupRegex = /\[(?:Tin_nhắn_nhóm|\u7fa4\u804a\u6d88\u606f)\|([^|]*)\|([^|]*)\|([^|]*)\|([^\]]*)\]/g;
            // Khớp tin nhắn nhóm do tôi gửi.
            const myGroupRegex = /\[(?:Tin_nhắn_nhóm_của_tôi|\u6211\u65b9\u7fa4\u804a\u6d88\u606f)\|(?:Tôi|\u6211)\|([^|]*)\|([^|]*)\|([^\]]*)\]/g;

            let match;

            if (isGroup) {
                groupRegex.lastIndex = 0;
                while ((match = groupRegex.exec(text)) !== null) {
                    const groupId = match[1].trim();
                    const sender = match[2].trim();
                    const msgType = match[3].trim();
                    const content = match[4];

                    // Lọc tin nhắn mẫu: nếu nội dung chỉ là placeholder thì bỏ qua.
                    if (['Nội_dung', 'Nội_dung_tin_nhắn', '\u5185\u5bb9', '\u6d88\u606f\u5185\u5bb9'].includes(content.trim())) {
                        continue;
                    }

                    if (String(groupId) === String(contactId)) {
                        const messageKey = `${sender}|${msgType}|${content}`;

                        if (!messageSet.has(messageKey)) {
                            messageSet.add(messageKey);
                            messages.push({
                                isMine: sender === 'Tôi' || sender === '\u6211',
                                sender: sender,
                                type: msgType,
                                content: content,
                                time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                            });
                        }
                    }
                }

                myGroupRegex.lastIndex = 0;
                while ((match = myGroupRegex.exec(text)) !== null) {
                    const groupId = match[1].trim();
                    const msgType = match[2].trim();
                    const content = match[3];

                    // Lọc tin nhắn mẫu: nếu nội dung chỉ là placeholder thì bỏ qua.
                    if (['Nội_dung', 'Nội_dung_tin_nhắn', '\u5185\u5bb9', '\u6d88\u606f\u5185\u5bb9'].includes(content.trim())) {
                        continue;
                    }

                    if (String(groupId) === String(contactId)) {
                        const messageKey = `Tôi|${msgType}|${content}`;

                        if (!messageSet.has(messageKey)) {
                            messageSet.add(messageKey);
                            messages.push({
                                isMine: true,
                                sender: 'Tôi',
                                type: msgType,
                                content: content,
                                time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                            });
                        }
                    }
                }
            } else {
                while ((match = privateRegex.exec(text)) !== null) {
                    const type = match[1];
                    const sender = match[2].trim();
                    const number = match[3].trim();
                    const msgType = match[4].trim();
                    const content = match[5];

                    // Lọc tin nhắn mẫu: nếu nội dung chỉ là placeholder thì bỏ qua.
                    if (['Nội_dung', 'Nội_dung_tin_nhắn', '\u5185\u5bb9', '\u6d88\u606f\u5185\u5bb9'].includes(content.trim())) {
                        continue;
                    }


                    // Dùng String() để bảo đảm kiểu dữ liệu nhất quán.
                    if (String(number) === String(contactId)) {
                        // Tạo định danh duy nhất cho tin nhắn để khử trùng lặp.
                        const isMine = type === 'Tin_nhắn_của_tôi' || type === '\u6211\u65b9\u6d88\u606f';
                        const senderName = isMine ? 'Tôi' : sender;
                        const messageKey = `${isMine}|${senderName}|${msgType}|${content}`;

                        if (!messageSet.has(messageKey)) {
                            messageSet.add(messageKey);
                            messages.push({
                                isMine: isMine,
                                sender: senderName,
                                type: msgType,
                                content: content,
                                time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                            });
                        } else {
                        }
                    }
                }
            }
        });

    } catch (error) {
    }

    return messages;
}

// Biến toàn cục: timer polling cho giao diện chat.
let chatPanelRefreshInterval = null;
let currentChatContactId = null;
let currentChatContactName = null;
let currentChatIsGroup = false;

/**
 * Mở giao diện chat.
 */
function openChatPanel(contactId, contactName, isGroup = false, members = '') {

    // Lưu thông tin chat hiện tại để khôi phục timer.
    currentChatContactId = contactId;
    currentChatContactName = contactName;
    currentChatIsGroup = isGroup;

    // Đặt đối tượng chat hiện tại.
    window.messageSender.setCurrentChat(contactId, contactName, isGroup);

    // Cập nhật tiêu đề chat, nhóm chat hiển thị danh sách thành viên.
    let title = isGroup ? `👥 ${contactName}` : `💬 ${contactName}`;

    // Nếu là nhóm chat thì hiển thị thông tin thành viên.
    if (isGroup && members) {
        const memberCount = members.split(/[、,，]/).filter(m => m.trim()).length;
        title += ` (${memberCount} người)`;
        $('#chat-title').html(`
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <div style="font-size: 16px; font-weight: 600;">${title}</div>
                <div style="font-size: 11px; opacity: 0.7; margin-top: 2px;">${members}</div>
            </div>
        `);
    } else {
        $('#chat-title').text(title);
    }

    // Thêm nút xóa ở bên phải thanh tiêu đề chat, chỉ dành cho nhóm chat.
    const $rightActions = $('#chat-right-actions');

    if (isGroup) {
        // Thêm nút xóa vào góc trên bên phải.
        $rightActions.html(`
            <button class="chat-delete-group-btn" data-group-id="${contactId}" data-group-name="${contactName}" 
                    style="background: none; border: none; color: #ef4444; font-size: 22px; 
                           cursor: pointer; padding: 0; width: 36px; height: 36px; display: flex; 
                           align-items: center; justify-content: center; transition: transform 0.2s;"
                    onmouseover="this.style.transform='scale(1.1)'" 
                    onmouseout="this.style.transform='scale(1)'">
                
            </button>
        `);
    } else {
        // Chat riêng thì xóa sạch vùng bên phải.
        $rightActions.html('');
    }

    // Render danh sách tin nhắn.
    renderChatMessages(contactId, isGroup);

    // Hiển thị panel chat.
    $('#phone-chat-panel').addClass('active');

    // Xóa sạch ô nhập.
    $('#chat-input').val('');

    // Khởi động tự động làm mới, polling mỗi 1000ms.
    if (chatPanelRefreshInterval) {
        clearInterval(chatPanelRefreshInterval);
    }
    chatPanelRefreshInterval = setInterval(() => {
        // Kiểm tra giao diện điện thoại có đang mở hay không.
        const $mobileOverlay = $('#mobile-phone-overlay');
        const isMobileOpen = $mobileOverlay.hasClass('active');

        // Kiểm tra panel chat có đang mở hay không.
        const $chatPanel = $('#phone-chat-panel');
        const isChatOpen = $chatPanel.hasClass('active');

        // Chỉ làm mới khi cả giao diện điện thoại và giao diện chat đều đang mở.
        // Không dừng timer tại đây; để nó chạy liên tục và chỉ làm mới khi cần.
        if (isMobileOpen && isChatOpen) {
            renderChatMessages(contactId, isGroup);
        }
        // Nếu giao diện đã đóng thì không làm gì, chờ lần kiểm tra tiếp theo.
    }, 1000);
}

/**
 * Đóng giao diện chat.
 */
function closeChatPanel() {
    $('#phone-chat-panel').removeClass('active');
    window.messageSender.clearCurrentChat();

    // Không xóa currentChatContactId và các biến liên quan để còn khôi phục khi mở lại điện thoại.
    // Chỉ xóa timer vì panel chat đã đóng.

    // Dừng tự động làm mới.
    if (chatPanelRefreshInterval) {
        clearInterval(chatPanelRefreshInterval);
        chatPanelRefreshInterval = null;
    }
}

/**
 * Render tin nhắn chat.
 */
function renderChatMessages(contactId, isGroup = false) {
    console.log('[renderChatMessages] Làm mới tin nhắn chat:', contactId, 'Nhóm chat:', isGroup);
    const messages = extractMessagesForContact(contactId, isGroup);
    const $container = $('#chat-messages');

    // Nếu không có tin nhắn thì để trống, không hiển thị tin nhắn mặc định.
    if (messages.length === 0) {
        $container.html('');
        return;
    }

    let html = '';
    messages.forEach(msg => {
        const messageClass = msg.isMine ? 'mine' : 'other';

        // Lấy avatar người gửi, chỉ áp dụng cho tin không phải của mình.
        let avatarHtml = '';
        if (!msg.isMine) {
            const senderName = msg.sender || contactId;
            const avatarUrl = getCharacterAvatar(senderName);
            if (avatarUrl) {
                avatarHtml = `<img src="${avatarUrl}" style="width: 36px; height: 36px; border-radius: 8px; object-fit: cover; flex-shrink: 0;" onerror="this.style.display='none'">`;
            } else {
                // Khi không có avatar thì hiển thị chữ cái đầu.
                const initial = senderName ? senderName.charAt(0) : '?';
                avatarHtml = `<div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; flex-shrink: 0;">${initial}</div>`;
            }
        }

        // Tin nhắn nhóm hiển thị tên người gửi.
        let senderInfo = '';
        if (isGroup) {
            // Trong nhóm chat, mọi tin nhắn đều hiển thị người gửi.
            const senderName = msg.isMine ? 'Tôi' : msg.sender;
            const senderColor = msg.isMine ? '#4CAF50' : '#2196F3';
            senderInfo = `<div class="message-sender" style="font-size: 11px; font-weight: 600; color: ${senderColor}; margin-bottom: 4px;">${senderName}</div>`;
        }

        const typeInfo = (msg.type !== 'Văn_bản' && msg.type !== '\u6587\u5b57') ? `<div style="font-size: 11px; opacity: 0.8; margin-bottom: 3px;">[${msg.type}]</div>` : '';

        // Xử lý tag ảnh trong tin nhắn.
        const processedContent = processMessageImages(msg.content);

        // Quyết định bố cục dựa trên việc đây có phải tin nhắn của mình hay không.
        if (msg.isMine) {
            html += `
                <div class="message-item ${messageClass}">
                    <div class="message-bubble">
                        ${senderInfo}
                        ${typeInfo}
                        <div>${processedContent}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="message-item ${messageClass}" style="display: flex; align-items: flex-start; gap: 8px;">
                    ${avatarHtml}
                    <div class="message-bubble">
                        ${senderInfo}
                        ${typeInfo}
                        <div>${processedContent}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                </div>
            `;
        }
    });

    $container.html(html);

    // Đã bỏ tự động cuộn xuống đáy để người dùng có thể xem lịch sử chat.
    // setTimeout(() => {
    //     $container.scrollTop($container[0].scrollHeight);
    // }, 100);
}

// ==================== Chức năng xử lý ảnh ====================
/**
 * Xử lý tag ảnh trong nội dung tin nhắn.
 * @param {string} content - Nội dung tin nhắn gốc.
 * @returns {string} - Nội dung HTML đã xử lý.
 */
function processMessageImages(content) {
    if (!content) return '';

    // Dùng regex thay <pic>...</pic> thành HTML ảnh.
    const imageRegex = /<pic>(.*?)<\/pic>/gi;

    const processedContent = content.replace(imageRegex, (match, imagePath) => {
        const imageUrl = `https://gitgud.io/Rown/dnf/-/raw/master/${imagePath.trim()}.webp`;
        // Dùng data attribute để lưu URL và xử lý bấm bằng ủy thác sự kiện.
        return `<div class="message-image-container" style="margin: 8px 0;">
            <img src="${imageUrl}" 
                 class="message-image clickable-image" 
                 data-image-url="${imageUrl}"
                 style="max-width: 200px; max-height: 200px; border-radius: 8px; cursor: pointer; display: block;"
                 onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<div class=\'image-error\' style=\'color:#999;font-size:12px;padding:8px;\'>📷 Tải ảnh thất bại</div>');" />
        </div>`;
    });

    return processedContent;
}

/**
 * Xem ảnh đầy đủ ở chế độ ảnh lớn.
 * @param {string} imageUrl - URL ảnh.
 */
function viewFullImage(imageUrl) {

    // Gỡ viewer đã tồn tại.
    $('#image-viewer').remove();

    // Tạo viewer ảnh toàn màn hình.
    const viewer = $('<div>', {
        id: 'image-viewer',
        css: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }
    });

    // Nút đóng.
    const closeBtn = $('<button>', {
        text: '✕ Đóng',
        css: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    }).on('click', function () {
        $('#image-viewer').remove();
    });

    // Phần tử ảnh.
    const img = $('<img>', {
        src: imageUrl,
        css: {
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain'
        }
    });

    viewer.append(closeBtn, img);

    // Bấm nền để đóng.
    viewer.on('click', function (e) {
        if (e.target === this) {
            $(this).remove();
        }
    });

    $('body').append(viewer);
}

/**
 * Gửi tin nhắn chat.
 */
async function sendChatMessage() {
    const $input = $('#chat-input');
    const $sendBtn = $('#chat-send-btn');
    const $sendIcon = $sendBtn.find('i');
    const message = $input.val().trim();

    if (!message) return;


    // Xóa sạch ô nhập.
    $input.val('');

    try {
        // Truyền tham chiếu nút để MessageSender điều khiển trạng thái nút.
        const success = await window.messageSender.sendMessage(message, {
            button: $sendBtn,
            icon: $sendIcon,
            input: $input
        });

        if (success) {
        }
    } catch (error) {
    }
}

// ==================== Hàm hỗ trợ: trích thông tin từ lịch sử chat ====================
/**
 * Trích thông tin bạn bè từ lịch sử chat SillyTavern.
 */
function extractFriendsFromChat() {
    const friends = new Map();

    try {
        // Thử lấy tin nhắn chat của SillyTavern, có hỗ trợ iframe.
        let messages = [];
        const targetWindow = window.parent || window;

        if (targetWindow.SillyTavern && typeof targetWindow.SillyTavern.getContext === 'function') {
            const context = targetWindow.SillyTavern.getContext();
            messages = context.chat || [];
        } else {
            return friends;
        }

        messages.forEach(msg => {
            if (!msg.mes) return;
            const text = msg.mes;

            // Trích bạn bè: [Bạn_bè_id|Tên|Số].
            const friendRegex = /\[(?:Bạn_bè_id|\u597d\u53cbid)\|([^|]+)\|(\d+)\]/g;
            let match;
            while ((match = friendRegex.exec(text)) !== null) {
                const name = match[1];
                const id = match[2];
                if (!friends.has(id)) {
                    friends.set(id, {
                        name,
                        id,
                        isGroup: false,
                        lastMessage: '',
                        time: new Date().toLocaleTimeString()
                    });
                }
            }
        });

    } catch (error) {
    }

    return friends;
}

/**
 * Trích thông tin nhóm chat từ lịch sử chat SillyTavern.
 * Tham khảo triển khai trong mobile-master/app/friend-renderer.js.
 * Hỗ trợ trích từ định nghĩa nhóm chat và tin nhắn nhóm.
 */
function extractGroupsFromChat() {
    const groupsMap = new Map();

    try {
        // Thử lấy tin nhắn chat của SillyTavern, có hỗ trợ iframe.
        let messages = [];
        const targetWindow = window.parent || window;

        if (targetWindow.SillyTavern && typeof targetWindow.SillyTavern.getContext === 'function') {
            const context = targetWindow.SillyTavern.getContext();
            messages = context.chat || [];
        } else {
            return groupsMap;
        }

        // Định nghĩa regex.
        const groupPattern = /\[(?:Nhóm_chat|\u7fa4\u804a)\|([^|]+)\|([^|]+)\|([^\]]+)\]/g;  // [Nhóm_chat|Tên_nhóm|Mã_nhóm|Thành_viên].
        const createGroupPattern = /\[(?:Tạo_nhóm_chat|\u521b\u5efa\u7fa4\u804a)\|([^|]+)\|([^|]+)\|([^\]]+)\]/g;  // [Tạo_nhóm_chat|Mã_nhóm|Tên_nhóm|Thành_viên].
        const groupMessagePattern = /\[(?:Tin_nhắn_nhóm|\u7fa4\u804a\u6d88\u606f)\|([^|]+)\|([^|]+)\|([^|]+)\|([^\]]+)\]/g;  // [Tin_nhắn_nhóm|Mã_nhóm|Người_gửi|Loại|Nội_dung].
        const myGroupMessagePattern = /\[(?:Tin_nhắn_nhóm_của_tôi|\u6211\u65b9\u7fa4\u804a\u6d88\u606f)\|(?:Tôi|\u6211)\|([^|]+)\|([^|]+)\|([^\]]+)\]/g;  // [Tin_nhắn_nhóm_của_tôi|Tôi|Mã_nhóm|Loại|Nội_dung].


        messages.forEach((msg, index) => {
            if (!msg.mes) return;
            let text = msg.mes;

            // Dọn template prompt khỏi tin nhắn, chỉ giữ nội dung thật.
            text = text.replace(/Yêu cầu định dạng phản hồi tin nhắn nhóm[\s\S]*?mỗi nhân vật một tin nhắn/g, '');
            text = text.replace(/\u7fa4\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u6709\u591a\u4e2a\u89d2\u8272\u56de\u590d\uff0c\u6bcf\u4e2a\u89d2\u8272\u4e00\u6761\u6d88\u606f/g, '');
            text = text.replace(/Yêu cầu định dạng phản hồi tin nhắn riêng[\s\S]*?Có thể phản hồi nhiều tin nhắn/g, '');
            text = text.replace(/\u79c1\u804a\u6d88\u606f\u54cd\u5e94\u683c\u5f0f\u8981\u6c42[\s\S]*?\u53ef\u4ee5\u56de\u590d\u591a\u6761\u6d88\u606f/g, '');
            text = text.replace(/\[Tin_nhắn_nhóm\|Mã_nhóm\|Tên_người_gửi\|Loại_tin_nhắn\|Nội_dung_tin_nhắn\]/g, '');
            text = text.replace(/\[\u7fa4\u804a\u6d88\u606f\|\u7fa4\u53f7\|\u53d1\u9001\u8005\u540d\u5b57\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[Tin_nhắn_đối_phương\|Tên_nhân_vật\|Số\|Loại_tin_nhắn\|Nội_dung_tin_nhắn\]/g, '');
            text = text.replace(/\[\u5bf9\u65b9\u6d88\u606f\|\u89d2\u8272\u540d\u5b57\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[Tin_nhắn_của_tôi\|Tôi\|Số\|Loại_tin_nhắn\|Nội_dung\]/g, '');
            text = text.replace(/\[\u6211\u65b9\u6d88\u606f\|\u6211\|\u53f7\u7801\|\u6d88\u606f\u7c7b\u578b\|\u6d88\u606f\u5185\u5bb9\]/g, '');
            text = text.replace(/\[Nhóm_chat\|Tên_nhóm\|Mã_nhóm\|Danh_sách_thành_viên\]/g, '');
            text = text.replace(/\[\u7fa4\u804a\|\u7fa4\u540d\|\u7fa4\u53f7\|\u6210\u5458\u5217\u8868\]/g, '');
            text = text.replace(/\[Tạo_nhóm_chat\|Mã_nhóm\|Tên_nhóm\|Danh_sách_thành_viên\]/g, '');
            text = text.replace(/\[\u521b\u5efa\u7fa4\u804a\|\u7fa4\u53f7\|\u7fa4\u540d\|\u6210\u5458\u5217\u8868\]/g, '');

            // Nếu tin nhắn sau khi dọn trống thì bỏ qua.
            if (!text.trim()) return;

            // Nếu tin nhắn chứa nội dung nhóm chat thì có thể ghi log khi cần debug.
            // if (text.includes('[Nhóm_chat') || text.includes('[Tạo_nhóm_chat') || text.includes('[\u7fa4\u804a') || text.includes('[\u521b\u5efa\u7fa4\u804a')) {
            // }

            // 1. Trích định nghĩa nhóm chat: [Nhóm_chat|Tên_nhóm|Mã_nhóm|Thành_viên].
            let match;
            groupPattern.lastIndex = 0; // Đặt lại index regex.
            while ((match = groupPattern.exec(text)) !== null) {
                const groupName = match[1];
                const groupId = match[2];
                const groupMembers = match[3];
                const groupKey = `group_${groupId}`; // Dùng mã nhóm làm định danh duy nhất.

                if (!groupsMap.has(groupKey)) {
                    groupsMap.set(groupKey, {
                        name: groupName,
                        id: groupId,
                        isGroup: true,
                        members: groupMembers,
                        memberCount: groupMembers.split(/[、,，]/).filter(m => m.trim()).length,
                        messageIndex: index,
                        lastMessage: '',
                        time: msg.send_date || Date.now()
                    });
                }
            }

            // 2. Trích định dạng tạo nhóm chat: [Tạo_nhóm_chat|Mã_nhóm|Tên_nhóm|Thành_viên].
            createGroupPattern.lastIndex = 0;
            while ((match = createGroupPattern.exec(text)) !== null) {
                const groupId = match[1];
                const groupName = match[2];
                const groupMembers = match[3];
                const groupKey = `group_${groupId}`;

                if (!groupsMap.has(groupKey)) {
                    groupsMap.set(groupKey, {
                        name: groupName,
                        id: groupId,
                        isGroup: true,
                        members: groupMembers,
                        memberCount: groupMembers.split(/[、,，]/).filter(m => m.trim()).length,
                        messageIndex: index,
                        lastMessage: '',
                        time: msg.send_date || Date.now()
                    });
                }
            }

            // 3. Trích từ tin nhắn nhóm: [Tin_nhắn_nhóm|Mã_nhóm|Người_gửi|Loại|Nội_dung].
            groupMessagePattern.lastIndex = 0;
            while ((match = groupMessagePattern.exec(text)) !== null) {
                const groupId = match[1];
                const senderName = match[2];
                const messageType = match[3];
                const messageContent = match[4];
                const groupKey = `group_${groupId}`;

                if (!groupsMap.has(groupKey)) {
                    // Nếu nhóm chat chưa tồn tại, tạo một bản ghi nhóm dựa trên tin nhắn.
                    groupsMap.set(groupKey, {
                        name: `Nhóm chat ${groupId}`,
                        id: groupId,
                        isGroup: true,
                        members: senderName,
                        memberCount: 1,
                        messageIndex: index,
                        lastMessage: messageContent.substring(0, 20),
                        time: msg.send_date || Date.now()
                    });
                } else {
                    // Nếu đã tồn tại thì cập nhật danh sách thành viên và index tin nhắn mới nhất.
                    const existingGroup = groupsMap.get(groupKey);
                    if (existingGroup.members && !existingGroup.members.includes(senderName)) {
                        existingGroup.members += `、${senderName}`;
                        existingGroup.memberCount = existingGroup.members.split(/[、,，]/).filter(m => m.trim()).length;
                    }
                    if (existingGroup.messageIndex < index) {
                        existingGroup.messageIndex = index;
                        existingGroup.lastMessage = messageContent.substring(0, 20);
                        existingGroup.time = msg.send_date || Date.now();
                    }
                }
            }

            // 4. Trích từ tin nhắn nhóm của tôi: [Tin_nhắn_nhóm_của_tôi|Tôi|Mã_nhóm|Loại|Nội_dung].
            myGroupMessagePattern.lastIndex = 0;
            while ((match = myGroupMessagePattern.exec(text)) !== null) {
                const groupId = match[1];
                const messageType = match[2];
                const messageContent = match[3];
                const groupKey = `group_${groupId}`;

                if (!groupsMap.has(groupKey)) {
                    // Nếu nhóm chat chưa tồn tại, tạo một bản ghi nhóm dựa trên tin nhắn.
                    groupsMap.set(groupKey, {
                        name: `Nhóm chat ${groupId}`,
                        id: groupId,
                        isGroup: true,
                        members: 'Tôi',
                        memberCount: 1,
                        messageIndex: index,
                        lastMessage: messageContent.substring(0, 20),
                        time: msg.send_date || Date.now()
                    });
                } else {
                    // Nếu đã tồn tại thì cập nhật index tin nhắn mới nhất.
                    const existingGroup = groupsMap.get(groupKey);
                    if (!existingGroup.members.includes('Tôi') && !existingGroup.members.includes('\u6211')) {
                        existingGroup.members += ', Tôi';
                        existingGroup.memberCount = existingGroup.members.split(/[、,，]/).filter(m => m.trim()).length;
                    }
                    if (existingGroup.messageIndex < index) {
                        existingGroup.messageIndex = index;
                        existingGroup.lastMessage = messageContent.substring(0, 20);
                        existingGroup.time = msg.send_date || Date.now();
                    }
                }
            }
        });

        if (groupsMap.size > 0) {
            groupsMap.forEach((group, key) => {
            });
        } else {
        }
    } catch (error) {
    }

    return groupsMap;
}

// ==================== Hàm tạo nội dung panel ====================
function generateMessagesPanel(data) {
    const relationshipSource = getRelationshipDataSource(data) || {};
    let html = '';

    // Thêm nút tạo nhóm chat, dùng class thay vì onclick để gắn bằng ủy thác sự kiện.
    html += `
        <div class="create-group-button" style="padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin-bottom: 12px; border-radius: 8px; cursor: pointer;">
            <div style="display: flex; align-items: center; justify-content: center; color: white;">
                <span style="font-size: 20px; margin-right: 8px;"></span>
                <span style="font-size: 14px; font-weight: 600;">Tạo nhóm chat</span>
            </div>
        </div>
    `;

    // Trích thông tin nhóm chat.
    const groups = extractGroupsFromChat();

    // Trích thông tin bạn bè; ưu tiên lấy từ biến MVU, nếu không có thì lấy từ lịch sử chat.
    const friends = getRelationshipKeys(relationshipSource);

    // Nếu MVU không có bạn bè thì thử trích từ lịch sử chat.
    const chatFriends = extractFriendsFromChat();

    // Theo dõi liên hệ đã thêm để tránh trùng lặp.
    const addedContactIds = new Set();
    const addedContactNames = new Set();

    // Render bạn bè từ MVU.
    friends.forEach(studentKey => {
        const friend = relationshipSource[studentKey];
        const affection = friend.Độ_thiện_cảm ?? 0;
        const displayName = restoreEraText(studentKey);

        // Thêm vào tập đã render.
        addedContactIds.add(studentKey);
        if (displayName) {
            addedContactNames.add(displayName);
        }

        html += `
            <div class="list-item contact-item" data-type="friend" data-id="${escapeHtml(studentKey)}" data-name="${escapeHtml(displayName)}" style="cursor: pointer;">
                <div class="list-item-header">
                    <span class="list-item-name">👤 ${escapeHtml(displayName)}</span>
                    <span class="list-item-value">❤ ${affection}</span>
                </div>
            </div>
        `;
    });

    // Render bạn bè trích từ lịch sử chat nhưng không có trong MVU.
    chatFriends.forEach(friend => {
        const normalizedName = restoreEraText(friend.name || '');
        // Dùng logic khử trùng lặp chính xác hơn: kiểm tra cả ID và tên đều chưa nằm trong danh sách đã thêm.
        if (!addedContactIds.has(friend.id) && !addedContactNames.has(normalizedName)) {

            addedContactIds.add(friend.id);
            if (normalizedName) {
                addedContactNames.add(normalizedName);
            }

            html += `
                <div class="list-item contact-item" data-type="friend" data-id="${escapeHtml(friend.id)}" data-name="${escapeHtml(normalizedName)}" style="cursor: pointer;">
                    <div class="list-item-header">
                        <span class="list-item-name">👤 ${escapeHtml(normalizedName)}</span>
                        <span class="list-item-value" style="font-size: 11px; color: #9ca3af;">ID: ${escapeHtml(friend.id)}</span>
                    </div>
                    <div class="list-item-desc">
                        Từ lịch sử chat
                    </div>
                </div>
            `;
        } else {
        }
    });

    // Render nhóm chat.
    if (groups.size > 0) {
        html += '<div style="margin: 16px 5px 8px; font-size: 12px; font-weight: 600; color: #6b7280;">Nhóm chat</div>';
        groups.forEach(group => {
            // Kiểm tra nhóm chat đã được thêm hay chưa.
            if (!addedContactIds.has(group.id)) {
                addedContactIds.add(group.id);

                html += `
                <div class="list-item contact-item" data-type="group" data-id="${escapeHtml(group.id)}" data-name="${escapeHtml(group.name)}" data-members="${escapeHtml(group.members)}" style="cursor: pointer;">
                        <div class="list-item-header">
                            <span class="list-item-name">👥 ${group.name}</span>
                            <span class="list-item-value" style="font-size: 11px; color: #9ca3af;">${group.memberCount} người</span>
                        </div>
                        <div class="list-item-desc">
                            ${group.members}
                        </div>
                    </div>
                `;
            } else {
            }
        });
    }

    return html;
}


// ==================== Hệ thống sưu tập CG ====================

// Tập loại cảnh SFW, dùng để xác định đường dẫn ảnh.
const SFW_SCENES = new Set(["Khó chịu", "Đắc ý", "Xấu hổ", "Vui vẻ", "Khóc", "Tức giận", "Thông dụng", "Chiến đấu"]);

// Dữ liệu cảnh dùng chung cho các nhân vật, gồm NSFW và SFW.
const SHARED_CG_SCENES = {
    // SFW
    "Khó chịu": 3, "Đắc ý": 3, "Xấu hổ": 3, "Vui vẻ": 3, "Khóc": 3, "Tức giận": 3, "Thông dụng": 3, "Chiến đấu": 3,
    // NSFW
    "Hôn": 5, "Tư thế truyền giáo làm tình": 4, "Ban rộng âm hộ": 2, "Bế lên làm tình": 3, "Bế chân đứng xâm nhập từ sau": 2,
    "Ôm rồi vuốt ve âm hộ": 2, "Ôm nằm trên giường": 2, "Tư thế ngồi từ sau làm tình": 3, "Vỗ mông xâm nhập từ sau": 2, "Nâng chân cao đứng xâm nhập từ sau": 2,
    "Đứng xâm nhập từ sau mãnh liệt": 4, "Làm tình mãnh liệt": 4, "Sắp đưa dương vật vào": 3, "Khẩu giao": 3, "Khẩu giao xuất lên mặt": 2,
    "Sờ ngực": 4, "Sau khi xuất trong": 3, "Nữ trên tự kích thích": 2, "Nữ trên làm tình": 4, "Nằm sấp trên giường xâm nhập từ sau": 2,
    "Nằm sấp trên giường": 3, "Nằm sấp khẩu giao": 2, "Dùng ngực kích thích": 2, "Sau khi xuất ngoài": 2, "Khẩu giao sau cuộc yêu": 3,
    "Mút núm vú": 2, "Cọ ngoài": 2, "Nằm nâng chân làm tình": 3, "Liếm âm hộ": 2, "Cởi quần áo": 4,
    "Cùng tắm": 2, "Đứng xâm nhập từ sau": 2, "Đứng kích thích bằng chân": 2, "Dùng ngón tay": 3, "Nắm mông làm tình": 2,
    "Nắm chân kích thích bằng chân": 2, "Tự ban rộng âm hộ": 2, "Tự kích thích": 2, "Ngồi kích thích bằng chân": 2, "Cao trào khi làm tình": 5, "Xuất tinh khi làm tình": 4
};

// Dữ liệu danh sách CG.
const CG_LIST = {
    "Nại Nhã Lệ": { ...SHARED_CG_SCENES },
    "Tinh Cực": { ...SHARED_CG_SCENES },
    "Pháp Lộ Đặc": { ...SHARED_CG_SCENES },
    "Asuna": { ...SHARED_CG_SCENES },
    "Ruruka": { ...SHARED_CG_SCENES },
    "Hồng Liên": { ...SHARED_CG_SCENES },
    "Orchis": { ...SHARED_CG_SCENES },
    "Jibril": { ...SHARED_CG_SCENES },
    "Aiklisia": { ...SHARED_CG_SCENES },
    "Shiro": { ...SHARED_CG_SCENES },
    "Katisia": { ...SHARED_CG_SCENES },
    "Amis": { ...SHARED_CG_SCENES }
};

const CG_CHARACTER_REMOTE_NAME = {
    "Nại Nhã Lệ": "\u5948\u96c5\u4e3d",
    "Tinh Cực": "\u661f\u6781",
    "Pháp Lộ Đặc": "\u6cd5\u9732\u7279",
    "Asuna": "Asuna",
    "Ruruka": "Ruruka",
    "Hồng Liên": "\u7ea2\u83b2",
    "Orchis": "\u5965\u5951\u4e1d",
    "Jibril": "\u5409\u666e\u8389\u5c14",
    "Aiklisia": "\u827e\u514b\u8389\u897f\u5a05",
    "Shiro": "\u767d",
    "Katisia": "\u5361\u63d0\u5e0c\u5a05",
    "Amis": "\u7231\u5f25\u65af"
};

const CG_SCENE_REMOTE_NAME = {
    "Khó chịu": "\u4e0d\u723d", "Đắc ý": "\u5f97\u610f", "Xấu hổ": "\u5bb3\u7f9e", "Vui vẻ": "\u5f00\u5fc3", "Khóc": "\u54ed\u6ce3", "Tức giận": "\u751f\u6c14", "Thông dụng": "\u901a\u7528", "Chiến đấu": "\u6218\u6597",
    "Hôn": "\u4eb2\u543b", "Tư thế truyền giáo làm tình": "\u4f20\u6559\u58eb\u4f53\u4f4d\u505a\u7231", "Ban rộng âm hộ": "\u63b0\u5f00\u5c0f\u7a74", "Bế lên làm tình": "\u62b1\u8d77\u6765\u505a\u7231", "Bế chân đứng xâm nhập từ sau": "\u62b1\u817f\u7ad9\u7740\u540e\u5165",
    "Ôm rồi vuốt ve âm hộ": "\u62b1\u7740\u6478\u5c0f\u7a74", "Ôm nằm trên giường": "\u62b1\u7740\u8eba\u5e8a\u4e0a", "Tư thế ngồi từ sau làm tình": "\u80cc\u540e\u5750\u4f4d\u505a\u7231", "Vỗ mông xâm nhập từ sau": "\u6253\u5c41\u80a1\u540e\u5165", "Nâng chân cao đứng xâm nhập từ sau": "\u9ad8\u62ac\u817f\u7ad9\u7740\u540e\u5165",
    "Đứng xâm nhập từ sau mãnh liệt": "\u6fc0\u70c8\u7ad9\u7740\u540e\u5165", "Làm tình mãnh liệt": "\u6fc0\u70c8\u505a\u7231", "Sắp đưa dương vật vào": "\u5373\u5c06\u63d2\u5165\u8089\u68d2", "Khẩu giao": "\u53e3\u4ea4", "Khẩu giao xuất lên mặt": "\u53e3\u4ea4\u989c\u5c04",
    "Sờ ngực": "\u6478\u80f8", "Sau khi xuất trong": "\u5185\u5c04\u4e8b\u540e", "Nữ trên tự kích thích": "\u5973\u4e0a\u4f4d\u624b\u6deb", "Nữ trên làm tình": "\u5973\u4e0a\u4f4d\u505a\u7231", "Nằm sấp trên giường xâm nhập từ sau": "\u8db4\u5e8a\u4e0a\u540e\u5165",
    "Nằm sấp trên giường": "\u8db4\u5728\u5e8a\u4e0a", "Nằm sấp khẩu giao": "\u8db4\u7740\u53e3\u4ea4", "Dùng ngực kích thích": "\u4e73\u4ea4", "Sau khi xuất ngoài": "\u5c04\u5916\u9762\u4e8b\u540e", "Khẩu giao sau cuộc yêu": "\u4e8b\u540e\u53e3\u4ea4",
    "Mút núm vú": "\u542e\u5438\u4e73\u5934", "Cọ ngoài": "\u7d20\u80a1", "Nằm nâng chân làm tình": "\u8eba\u7740\u62ac\u817f\u505a\u7231", "Liếm âm hộ": "\u8214\u5c0f\u7a74", "Cởi quần áo": "\u8131\u8863\u670d",
    "Cùng tắm": "\u4e00\u8d77\u6d17\u6fa1", "Đứng xâm nhập từ sau": "\u7ad9\u7740\u540e\u5165", "Đứng kích thích bằng chân": "\u7ad9\u7740\u8db3\u4ea4", "Dùng ngón tay": "\u6307\u4ea4", "Nắm mông làm tình": "\u6293\u5c41\u80a1\u505a\u7231",
    "Nắm chân kích thích bằng chân": "\u6293\u7740\u811a\u8db3\u4ea4", "Tự ban rộng âm hộ": "\u81ea\u5df1\u63b0\u5f00\u5c0f\u7a74", "Tự kích thích": "\u81ea\u6170", "Ngồi kích thích bằng chân": "\u5750\u7740\u8db3\u4ea4", "Cao trào khi làm tình": "\u505a\u7231\u9ad8\u6f6e", "Xuất tinh khi làm tình": "\u505a\u7231\u5c04\u7cbe"
};

// URL gốc của ảnh CG.
const CG_BASE_URL = "https://gitgud.io/Rown/dnf/-/raw/master/";

/**
 * Lấy dữ liệu CG đã mở khóa.
 * @param {boolean} includeVirtual - Có bao gồm dữ liệu mở khóa ảo bằng một nút hay không.
 */
function getUnlockedCG(includeVirtual = false) {
    try {
        const realData = JSON.parse(localStorage.getItem('unlocked_cg') || '{}');

        if (!includeVirtual) {
            return realData;
        }

        // Gộp dữ liệu ảo.
        const virtualData = JSON.parse(localStorage.getItem('unlocked_cg_virtual') || '{}');
        const mergedData = JSON.parse(JSON.stringify(realData)); // Sao chép sâu.

        for (const [char, scenes] of Object.entries(virtualData)) {
            if (!mergedData[char]) mergedData[char] = {};
            for (const [scene, count] of Object.entries(scenes)) {
                // Nếu dữ liệu thật chưa có thì dùng dữ liệu ảo.
                if (!mergedData[char][scene]) {
                    mergedData[char][scene] = count;
                }
            }
        }
        return mergedData;
    } catch (e) {
        console.error('Đọc dữ liệu CG thất bại:', e);
        return {};
    }
}

/**
 * Lưu dữ liệu CG đã mở khóa.
 * @param {Object} data - Dữ liệu CG cần lưu.
 * @param {boolean} isVirtual - Có lưu thành dữ liệu mở khóa ảo hay không.
 */
function saveUnlockedCG(data, isVirtual = false) {
    try {
        const key = isVirtual ? 'unlocked_cg_virtual' : 'unlocked_cg';
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Lưu dữ liệu CG thất bại:', e);
    }
}

/**
 * Mở khóa CG để bên ngoài gọi.
 * @param {string} characterName - Tên nhân vật.
 * @param {string} sceneType - Loại cảnh.
 * @param {number} maxCount - Số lượng CG tối đa của cảnh này.
 */
function unlockCG(characterName, sceneType, maxCount) {
    const unlocked = getUnlockedCG();
    if (!unlocked[characterName]) {
        unlocked[characterName] = {};
    }
    if (!(sceneType in unlocked[characterName])) {
        // Nếu không truyền maxCount thì lấy từ CG_LIST.
        const count = maxCount || CG_LIST[characterName]?.[sceneType] || 1;
        unlocked[characterName][sceneType] = count;
        saveUnlockedCG(unlocked);
    }
}

/**
 * Mở khóa toàn bộ CG của một nhân vật bằng một nút.
 * @param {string} characterName - Tên nhân vật.
 * @param {boolean} isVirtual - Có phải mở khóa ảo hay không, chỉ để xem trước và không tính vào sưu tập thật.
 * @returns {number} - Số CG đã mở khóa.
 */
function unlockAllCGForCharacter(characterName, isVirtual = false) {
    if (!CG_LIST[characterName]) return 0;

    // Đọc nguồn dữ liệu tương ứng theo chế độ.
    let currentData;
    try {
        const key = isVirtual ? 'unlocked_cg_virtual' : 'unlocked_cg';
        currentData = JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
        currentData = {};
    }

    if (!currentData[characterName]) {
        currentData[characterName] = {};
    }

    let unlockedCount = 0;
    const scenes = CG_LIST[characterName];

    // Nếu là mở khóa ảo thì vẫn cần xét dữ liệu mở khóa thật để tránh ghi đè tiến độ thật.
    // Để đơn giản, kho mở khóa ảo chỉ ghi quyền xem trước có được bằng một nút; khi đọc thì gộp lại.

    for (const [sceneType, maxCount] of Object.entries(scenes)) {
        if (!(sceneType in currentData[characterName])) {
            currentData[characterName][sceneType] = maxCount;
            unlockedCount++;
        }
    }

    if (unlockedCount > 0) {
        saveUnlockedCG(currentData, isVirtual);
    }

    return unlockedCount;
}

/**
 * Lấy độ thiện cảm của nhân vật từ dữ liệu danh sách bạn bè.
 * @param {string} characterName - Tên nhân vật.
 * @returns {number} - Giá trị độ thiện cảm, trả về 0 nếu không tìm thấy.
 */
function getCharacterAffection(characterName) {
    const contactSource = getRelationshipDataSource();
    if (!contactSource) return 0;

    // Thử khớp trực tiếp tên nhân vật.
    if (contactSource[characterName]) {
        return contactSource[characterName]?.Độ_thiện_cảm ?? 0;
    }

    // Thử khớp mờ vì tên nhân vật có thể chỉ khớp một phần.
    for (const [key, contact] of Object.entries(contactSource)) {
        if (key.includes(characterName) || characterName.includes(key)) {
            return contact?.Độ_thiện_cảm ?? 0;
        }
    }

    return 0;
}

/**
 * Tính thống kê tiến độ sưu tập CG.
 * @returns {Object} - Đối tượng chứa tổng tiến độ và tiến độ từng nhân vật.
 */
function getCGCollectionStats() {
    const unlocked = getUnlockedCG();
    const stats = {
        total: { unlocked: 0, total: 0, percentage: 0 },
        characters: {}
    };

    for (const [charName, scenes] of Object.entries(CG_LIST)) {
        const totalScenes = Object.keys(scenes).length;
        const unlockedScenes = unlocked[charName] ? Object.keys(unlocked[charName]).length : 0;
        const percentage = totalScenes > 0 ? Math.round((unlockedScenes / totalScenes) * 100) : 0;

        stats.characters[charName] = {
            unlocked: unlockedScenes,
            total: totalScenes,
            percentage: percentage
        };

        stats.total.unlocked += unlockedScenes;
        stats.total.total += totalScenes;
    }

    stats.total.percentage = stats.total.total > 0
        ? Math.round((stats.total.unlocked / stats.total.total) * 100)
        : 0;

    return stats;
}

// Chế độ hiện tại của panel CG: 'unlock' là mở khóa một nút, 'progress' là tiến độ sưu tập.
let cgPanelMode = 'progress';

/**
 * Chuyển chế độ panel CG.
 */
function toggleCGPanelMode() {
    cgPanelMode = cgPanelMode === 'progress' ? 'unlock' : 'progress';
    // Render lại panel CG.
    if (currentPanel === 'gallery') {
        const content = generateGalleryPanel(currentPhoneData);
        $('#phone-app-body').html(content);
        // Việc gắn lại sự kiện cần xử lý trong openAppPanel.
        bindCGGalleryEvents();
    }
}

/**
 * Gắn sự kiện thư viện CG, tách riêng để dễ dùng lại.
 */
function bindCGGalleryEvents() {
    const $appBody = $('#phone-app-body');
    if ($appBody.length === 0) return;

    // Đặt lại vị trí cuộn lên đầu để người dùng thấy nút đổi chế độ.
    // $appBody.scrollTop(0); // Đã bỏ ép cuộn lên đầu theo yêu cầu người dùng.

    $appBody.off('click.cggallery');

    // Nút chuyển chế độ.
    $appBody.on('click.cggallery', '.cg-mode-segment', function (e) {
        e.stopPropagation();
        const mode = $(this).data('mode');
        if (mode !== cgPanelMode) {
            toggleCGPanelMode();
        }
    });

    // Mở hoặc thu gọn danh sách chi tiết.
    $appBody.on('click.cggallery', '.cg-toggle-details-btn', function (e) {
        e.stopPropagation();
        const $btn = $(this);
        const $list = $btn.next('.cg-details-list');
        const $icon = $btn.find('.fa-chevron-down');

        $list.slideToggle(200, function () {
            if ($list.is(':visible')) {
                $icon.css('transform', 'rotate(180deg)');
            } else {
                $icon.css('transform', 'rotate(0deg)');
            }
        });
        $btn.toggleClass('active');
    });

    // Nút mở khóa một lần.
    $appBody.on('click.cggallery', '.cg-unlock-btn', function (e) {
        e.stopPropagation();
        const char = $(this).data('character');
        const affection = getCharacterAffection(char);

        if (affection < 100) {
            if (typeof toastr !== 'undefined') {
                toastr.warning(`Độ thiện cảm của ${char} chưa đủ 100, không thể mở khóa bằng một nút!`);
            } else {
                alert(`Độ thiện cảm của ${char} chưa đủ 100, không thể mở khóa bằng một nút!`);
            }
            return;
        }

        // Sửa trọng điểm: truyền true nghĩa là mở khóa ảo, không ghi vào lưu trữ thật.
        const unlockedCount = unlockAllCGForCharacter(char, true);

        if (typeof toastr !== 'undefined') {
            toastr.success(`Đã bật quyền xem trước của ${char}`);
        }

        // Làm mới panel.
        const content = generateGalleryPanel(currentPhoneData);
        $('#phone-app-body').html(content);
        bindCGGalleryEvents();

        // Giữ trạng thái đang mở.
        if (cgPanelMode === 'unlock') {
            $('.cg-details-list').show();
            $('.cg-toggle-details-btn').find('.fa-chevron-down').css('transform', 'rotate(180deg)');
            $('.cg-toggle-details-btn').addClass('active');
        }
    });

    // Chuyển tab nhân vật.
    $appBody.on('click.cggallery', '.cg-tab', function (e) {
        e.stopPropagation();
        const char = $(this).data('character');

        // Cập nhật style tab theo kiểu viên nang mới.
        $appBody.find('.cg-tab').removeClass('active').css({
            background: 'transparent',
            color: '#64748b',
            boxShadow: 'none',
            fontWeight: '600'
        });
        $(this).addClass('active').css({
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.35)',
            fontWeight: '700'
        });

        // Chuyển grid nhân vật đang hiển thị.
        $appBody.find('.cg-character-grid').hide();
        $appBody.find(`.cg-character-grid[data-character="${char}"]`).show();
    });

    // Bấm CG đã mở khóa để đổi số thứ tự ảnh.
    $appBody.on('click.cggallery', '.cg-item.unlocked .cg-switch-btn', function (e) {
        e.stopPropagation();
        const $item = $(this).closest('.cg-item');
        const char = $item.data('character');
        const scene = $item.data('scene');
        const max = parseInt($item.data('max'));
        let current = parseInt($item.data('current'));

        current = current >= max ? 1 : current + 1;
        $item.data('current', current);

        const newUrl = getCGImageUrl(char, scene, current);
        $item.find('img').attr('src', newUrl).show();
        $item.find('img').next().hide();

        $(this).text(`${current}/${max}`);
    });

    // Bấm CG đã mở khóa để xem ảnh lớn.
    $appBody.on('click.cggallery', '.cg-item.unlocked', function (e) {
        if ($(e.target).closest('.cg-switch-btn').length) return;

        const char = $(this).data('character');
        const scene = $(this).data('scene');
        const current = parseInt($(this).data('current')) || 1;
        const imgUrl = getCGImageUrl(char, scene, current);

        showCGFullscreen(imgUrl, char, scene, current);
    });
}

/**
 * Tạo URL ảnh CG.
 */
function getCGImageUrl(characterName, sceneType, index = 1) {
    const folder = SFW_SCENES.has(sceneType) ? 'SFW' : 'NSFW';
    const remoteCharacterName = CG_CHARACTER_REMOTE_NAME[characterName] || characterName;
    const remoteSceneType = CG_SCENE_REMOTE_NAME[sceneType] || sceneType;
    const path = `${folder}/${remoteCharacterName}/${remoteSceneType}${index}.webp`;
    return CG_BASE_URL + encodeURIComponent(path).replace(/%2F/g, '/');
}

/**
 * Tạo panel sưu tập CG.
 */
function generateGalleryPanel(data) {
    // Điểm đổi chính:
    // stats luôn tính dựa trên dữ liệu mở khóa thật vì getCGCollectionStats dùng getUnlockedCG() mặc định.
    const stats = getCGCollectionStats();

    // Trạng thái mở khóa để hiển thị ảnh: nếu là chế độ unlock thì đọc cả dữ liệu mở khóa ảo.
    const displayUnlockedCG = getUnlockedCG(cgPanelMode === 'unlock');

    const characters = Object.keys(CG_LIST);
    const isProgressMode = cgPanelMode === 'progress';

    // Tinh chỉnh nền: dùng tông lạnh rất nhạt để tăng cảm giác thoáng.
    let html = `<div class="cg-gallery-container" style="padding: 16px 16px 80px 16px; background: #f8fafc; min-height: 100%;">`;

    // ==================== Tab Switch trên cùng theo kiểu iOS ====================
    html += `
        <div style="
            background: #e2e8f0; 
            border-radius: 10px; 
            padding: 3px; 
            display: flex; 
            margin-bottom: 20px;
            position: relative;
        ">
            <div data-mode="progress" class="cg-mode-segment" style="
                flex: 1; text-align: center; padding: 10px 0; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 8px; z-index: 1; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                ${isProgressMode ? 'background: #fff; color: #0f172a; box-shadow: 0 2px 4px rgba(0,0,0,0.06); transform: scale(1);' : 'color: #64748b; transform: scale(0.98);'}
            ">Tiến độ sưu tập</div>
            <div data-mode="unlock" class="cg-mode-segment" style="
                flex: 1; text-align: center; padding: 10px 0; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 8px; z-index: 1; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                ${!isProgressMode ? 'background: #fff; color: #0f172a; box-shadow: 0 2px 4px rgba(0,0,0,0.06); transform: scale(1);' : 'color: #64748b; transform: scale(0.98);'}
            ">Mở khóa một nút</div>
        </div>
    `;

    // ==================== Chế độ tiến độ sưu tập ====================
    if (isProgressMode) {
        // Thẻ tổng quan với cảm giác gradient hiện đại.
        html += `
            <div class="cg-toggle-details-btn" style="
                background: white; border-radius: 16px; padding: 22px; 
                box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9;
                margin-bottom: 20px; cursor: pointer; position: relative; overflow: hidden;
            ">
                <!-- Vầng sáng nền trang trí -->
                <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%); border-radius: 50%;"></div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; position: relative; z-index: 2;">
                    <div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 6px; font-weight: 500;">Tổng quan sưu tập hiện tại</div>
                        <div style="font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1; letter-spacing: -0.5px;">${stats.total.percentage}<span style="font-size: 16px; color: #94a3b8; font-weight: 600; margin-left: 2px;">%</span></div>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 12px; color: #94a3b8; font-weight: 500;">Chi tiết</span>
                        <i class="fas fa-chevron-down" style="font-size: 12px; color: #94a3b8; margin-left: 6px; transition: transform 0.3s;"></i>
                    </div>
                </div>
                <div style="background: #f1f5f9; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 10px;">
                    <div style="background: linear-gradient(90deg, #3b82f6, #60a5fa); width: ${stats.total.percentage}%; height: 100%; border-radius: 4px; box-shadow: 0 1px 2px rgba(59, 130, 246, 0.2);"></div>
                </div>
                <div style="font-size: 12px; color: #64748b; font-weight: 500; display: flex; justify-content: space-between;">
                    <span>Cảnh đã mở khóa</span>
                    <span style="color: #0f172a; font-weight: 700;">${stats.total.unlocked} <span style="color: #cbd5e1; font-weight: 400;">/</span> ${stats.total.total}</span>
                </div>
            </div>
        `;

        // Danh sách chi tiết nổi bật hơn.
        html += `<div class="cg-details-list" style="display: none; margin-bottom: 24px; background: white; border-radius: 16px; padding: 8px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);">`;
        characters.forEach(char => {
            const charStats = stats.characters[char];
            const affection = getCharacterAffection(char);
            html += `
                <div style="
                    display: flex; align-items: center; padding: 14px 16px; 
                    border-bottom: 1px solid #f8fafc;
                ">
                    <div style="width: 85px; font-weight: 700; color: #334155; font-size: 14px;">
                        ${escapeHtml(char)}
                        <div style="font-size: 11px; color: #94a3b8; font-weight: 500; margin-top: 2px;">${charStats.unlocked}/${charStats.total}</div>
                    </div>
                    <div style="flex: 1; padding: 0 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <!-- Trái tim đỏ -->
                            <span style="font-size: 12px; color: #f43f5e; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                                <i class="fas fa-heart"></i> ${affection}
                            </span>
                            <span style="font-size: 12px; color: #64748b; font-weight: 600;">${charStats.percentage}%</span>
                        </div>
                        <div style="background: #f1f5f9; height: 6px; border-radius: 3px; overflow: hidden;">
                            <div style="background: ${charStats.percentage === 100 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #3b82f6, #60a5fa)'}; width: ${charStats.percentage}%; height: 100%;"></div>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    }

    // ==================== Chế độ mở khóa một nút ====================
    if (!isProgressMode) {
        // Thẻ gợi ý.
        html += `
            <div class="cg-toggle-details-btn" style="
                background: white; border-radius: 16px; padding: 18px; 
                box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9;
                margin-bottom: 20px; cursor: pointer; display: flex; align-items: center; justify-content: space-between;
            ">
                <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="width: 36px; height: 36px; border-radius: 10px; background: #fff7ed; display: flex; align-items: center; justify-content: center; color: #f97316; box-shadow: 0 2px 5px rgba(249, 115, 22, 0.1);">
                        <i class="fas fa-unlock-alt" style="font-size: 16px;"></i>
                    </div>
                    <div>
                        <div style="font-size: 14px; font-weight: 700; color: #1e293b; margin-bottom: 2px;">Bật quyền xem trước CG</div>
                        <div style="font-size: 11px; color: #94a3b8;">Cần độ thiện cảm ≥ 100, không ảnh hưởng tiến độ sưu tập thật</div>
                    </div>
                </div>
                <i class="fas fa-chevron-down" style="font-size: 12px; color: #cbd5e1; transition: transform 0.3s;"></i>
            </div>
        `;

        // Danh sách mở khóa.
        html += `<div class="cg-details-list" style="display: none; margin-bottom: 24px; background: white; border-radius: 16px; padding: 8px 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);">`;
        characters.forEach(char => {
            const charStats = stats.characters[char]; // Sửa lỗi: định nghĩa charStats.
            const affection = getCharacterAffection(char);
            const canUnlock = affection >= 100;

            const charUnlockedMap = displayUnlockedCG[char] || {};
            const totalScenes = Object.keys(CG_LIST[char]).length;
            const currentUnlockedCount = Object.keys(charUnlockedMap).length;
            const isUnlockedModeActive = currentUnlockedCount >= totalScenes;

            let btnState = '';
            if (isUnlockedModeActive) {
                btnState = `<span style="color: #10b981; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 4px;"><i class="fas fa-check-circle"></i> Đã bật</span>`;
            } else if (canUnlock) {
                btnState = `
                    <button class="cg-unlock-btn" data-character="${escapeHtml(char)}" style="
                        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); 
                        color: white; border: none; padding: 6px 14px; 
                        border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;
                        box-shadow: 0 2px 6px rgba(234, 88, 12, 0.25); transition: transform 0.1s;
                    ">Bật</button>
                `;
            } else {
                btnState = `<span style="color: #cbd5e1; font-size: 12px; font-weight: 500;">Thiện cảm chưa đủ</span>`;
            }

            html += `
                <div style="
                    display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; 
                    border-bottom: 1px solid #f8fafc;
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div>
                            <span style="font-weight: 700; color: #334155; font-size: 14px; display: block;">${escapeHtml(char)}</span>
                            <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">Tiến độ thật: ${charStats.unlocked}/${charStats.total}</span>
                        </div>
                        <span style="
                            font-size: 11px; 
                            color: ${affection >= 100 ? '#f43f5e' : '#94a3b8'}; 
                            background: ${affection >= 100 ? '#fff1f2' : '#f1f5f9'}; 
                            padding: 3px 8px; border-radius: 12px; font-weight: 600;
                            height: fit-content;
                        ">
                            ❤ ${affection}
                        </span>
                    </div>
                    <div>${btnState}</div>
                </div>
            `;
        });
        html += `</div>`;
    }


    // ==================== Vùng grid ảnh ====================
    html += `<div style="margin-top: 12px;">`;
    // Tab nhân vật: khôi phục thanh cuộn và làm đẹp.
    // Gỡ scrollbar-width: none, thêm class và style thanh cuộn tùy chỉnh.
    const scrollbarStyle = `
        <style>
            .cg-character-tabs::-webkit-scrollbar {
                height: 4px; /* Tăng chiều cao để dễ bấm hơn. */
            }
            .cg-character-tabs::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 2px;
            }
            .cg-character-tabs::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 2px;
            }
            .cg-character-tabs::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
            }
        </style>
    `;
    html += scrollbarStyle;
    html += `<div class="cg-character-tabs" style="display: flex; overflow-x: auto; margin-bottom: 16px; gap: 12px; padding-bottom: 8px; padding-left: 4px; padding-right: 4px;">`;
    characters.forEach((char, idx) => {
        const isActive = idx === 0;
        html += `
            <div class="cg-tab ${isActive ? 'active' : ''}" data-character="${escapeHtml(char)}" style="
                padding: 8px 16px; font-size: 13px; font-weight: ${isActive ? '700' : '600'}; cursor: pointer; white-space: nowrap; flex-shrink: 0;
                color: ${isActive ? '#fff' : '#64748b'};
                background: ${isActive ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent'};
                border-radius: 20px;
                box-shadow: ${isActive ? '0 2px 8px rgba(59, 130, 246, 0.35)' : 'none'};
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            ">${escapeHtml(char)}</div>
        `;
    });
    html += `</div>`;

    // Grid.
    characters.forEach((char, idx) => {
        const isActive = idx === 0 ? '' : 'display: none;';
        const scenes = CG_LIST[char];
        const charUnlocked = displayUnlockedCG[char] || {};

        html += `<div class="cg-character-grid" data-character="${escapeHtml(char)}" style="${isActive}">`;
        html += `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">`;

        Object.entries(scenes).forEach(([sceneType, maxCount]) => {
            const isUnlocked = sceneType in charUnlocked;

            if (isUnlocked) {
                const imgUrl = getCGImageUrl(char, sceneType, 1);
                html += `
                    <div class="cg-item unlocked" data-character="${escapeHtml(char)}" data-scene="${escapeHtml(sceneType)}" data-max="${maxCount}" data-current="1"
                        style="
                            aspect-ratio: 3/4; border-radius: 8px; overflow: hidden; position: relative; cursor: pointer; 
                            background: #e2e8f0; box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                        ">
                        <img src="${imgUrl}" alt="${escapeHtml(sceneType)}" 
                            style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s;" 
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="display: none; position: absolute; inset: 0; align-items: center; justify-content: center; color: #94a3b8; font-size: 10px;">Tải thất bại</div>
                        ${maxCount > 1 ? `
                            <div class="cg-switch-btn" style="
                                position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
                                color: white; font-size: 9px; padding: 2px 8px; border-radius: 12px; font-weight: 600;
                            ">1/${maxCount}</div>
                        ` : ''}
                        <div style="
                            position: absolute; bottom: 0; left: 0; right: 0; 
                            background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
                            color: white; font-size: 11px; padding: 16px 8px 6px 8px; font-weight: 500;
                            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                        ">${escapeHtml(sceneType)}</div>
                    </div>
                `;
            } else {
                html += `
                    <div class="cg-item locked" style="
                        aspect-ratio: 3/4; border-radius: 8px; background: #f8fafc; 
                        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
                        border: 1px dashed #cbd5e1; color: #cbd5e1;
                    ">
                        <i class="fas fa-lock" style="font-size: 18px;"></i>
                        <span style="font-size: 10px; font-weight: 500;">locked</span>
                    </div>
                `;
            }
        });

        html += `</div></div>`;
    });
    html += `</div>`; // End Grid Container

    html += `</div>`; // End of Main Container
    return html;
}

function renderFriendListItem(contactKey, contact) {
    /* Tương thích cấu trúc Danh_sách_ràng_buộc của script biến. */
    const displayName = escapeHtml(contactKey);
    const isNearby = contact.Ở_gần === true;
    const affection = contact.Độ_thiện_cảm ?? 0;
    const gender = contact.Giới_tính || '';
    const race = contact.Chủng_tộc || '';
    const level = contact.Cấp_độ ?? 1;
    const isTraveling = contact.Lời_thề_đồng_hành === true;

    /* Màu độ thiện cảm. */
    const affectionColor = affection >= 50 ? '#ec4899' : affection >= 0 ? '#f59e0b' : '#6b7280';

    /* Nhãn thông tin tóm tắt. */
    const infoChips = [gender, race, `Lv.${level}`].filter(Boolean);
    const chipsHtml = infoChips.length > 0
        ? `<div style="font-size: 11px; color: #6b7280; margin-bottom: 4px;">${infoChips.map(v => escapeHtml(v)).join(' · ')}</div>`
        : '';

    return `
        <div class="list-item friend-item"
             style="cursor: pointer; transition: background-color 0.2s; border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; padding: 14px; margin-bottom: 10px;"
             data-friend-name="${escapeHtml(contactKey)}">
            <!-- Dòng tên và nhãn -->
            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 6px;">
                <span style="font-size: 16px; font-weight: 700; color: #1f2937;">${displayName}</span>
                ${isNearby ? '<span style="font-size: 10px; background: #3b82f6; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Ở gần</span>' : ''}
                ${isTraveling ? '<span style="font-size: 10px; background: #8b5cf6; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Đồng hành</span>' : ''}
            </div>
            
            <!-- Thông tin cơ bản -->
            ${chipsHtml}
            
            <!-- Độ_thiện_cảm -->
            <div style="display: flex; gap: 12px; font-size: 13px; margin-bottom: 4px;">
                <span style="color: ${affectionColor}; font-weight: 600;">❤ ${affection}</span>
            </div>
            
            <!-- Suy nghĩ hiện tại -->
            ${(contact.Suy_nghĩ_hiện_tại || contact['\u5f53\u524d\u60f3\u6cd5']) ? `<div style="font-size: 11px; color: #9ca3af; font-style: italic; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">"${escapeHtml(contact.Suy_nghĩ_hiện_tại || contact['\u5f53\u524d\u60f3\u6cd5'])}"</div>` : ''}
        </div>
    `;
}

function generateFriendsPanel(data) {
    const contactSource = getRelationshipDataSource(data);

    if (!contactSource) {
        return '<div class="empty-message">Tạm thời chưa có dữ liệu ràng buộc</div>';
    }

    const contactEntries = getRelationshipKeys(contactSource)
        .map(key => ({ key, contact: contactSource[key] }))
        .filter(entry => entry.contact && typeof entry.contact === 'object')
        .sort((a, b) => {
            /* Lời thề đồng hành xếp lên trước. */
            const travelA = a.contact?.Lời_thề_đồng_hành === true;
            const travelB = b.contact?.Lời_thề_đồng_hành === true;
            if (travelA && !travelB) return -1;
            if (!travelA && travelB) return 1;

            /* Người ở gần xếp lên trước. */
            const nearbyA = a.contact?.Ở_gần === true;
            const nearbyB = b.contact?.Ở_gần === true;
            if (nearbyA && !nearbyB) return -1;
            if (!nearbyA && nearbyB) return 1;

            /* Sắp xếp theo độ thiện cảm. */
            const affectionA = a.contact?.Độ_thiện_cảm ?? 0;
            const affectionB = b.contact?.Độ_thiện_cảm ?? 0;
            return affectionB - affectionA;
        });

    if (contactEntries.length === 0) {
        return '<div class="empty-message">Tạm thời chưa có dữ liệu ràng buộc</div>';
    }

    /* Render trực tiếp danh sách liên hệ. */
    const friendItems = contactEntries.map(({ key, contact }) => renderFriendListItem(key, contact)).join('');

    return `
        <div class="friend-list-container">
            <div class="friend-list-header" style="font-weight: 600; font-size: 12px; color: #6b7280; margin: 8px 4px 12px;">
                Ràng buộc (${contactEntries.length})
            </div>
            <div class="friend-list-body">
                ${friendItems}
            </div>
        </div>
    `;
}

/**
 * Hiển thị văn bản HTML an toàn, tránh HTML injection nhưng giữ nguyên nội dung gốc.
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Hàm khôi phục văn bản, chuyển mã đặc biệt về ký tự bình thường.
 * Dùng để xử lý mã hóa ký tự đặc biệt trong tên biến.
 */
function restoreEraText(text) {
    if (!text) return '';
    // Khôi phục __DOT__ thành . để tránh xung đột phân tích path.
    // Khôi phục __SQUOTE__ thành ' để tránh xung đột phân tích chuỗi.
    return text.replace(/__DOT__/g, '.').replace(/__SQUOTE__/g, "'");
}

/**
 * Hiển thị chi tiết bạn bè.
 * @param {string} friendName - Tên bạn bè.
 * @param {object} friendData - Dữ liệu bạn bè.
 * @param {boolean} isRestoring - Có phải trạng thái khôi phục hay không, không đặt lại vị trí cuộn.
 */
function showFriendDetail(friendName, friendData, isRestoring = false) {

    // Chỉ đặt lại vị trí cuộn trang chi tiết khi không ở chế độ khôi phục.
    if (!isRestoring) {
        friendDetailScrollPosition = 0;
    } else {
    }

    // Lưu vị trí cuộn của danh sách bạn bè, thử nhiều cách để bảo đảm tương thích iframe.
    let appBodyElement = document.getElementById('phone-app-body');

    // Nếu cách DOM gốc không tìm thấy thì thử dùng jQuery.
    if (!appBodyElement) {
        const $appBody = $('#phone-app-body');
        if ($appBody.length > 0) {
            appBodyElement = $appBody[0];
        }
    }

    if (appBodyElement) {
        // Dùng thuộc tính gốc để lấy vị trí cuộn.
        friendsListScrollPosition = appBodyElement.scrollTop;

        // Bổ sung: tìm vị trí phần tử bạn bè vừa bấm.
        const $friendItem = $(`.friend-item[data-friend-name="${friendName}"]`);
        if ($friendItem.length > 0) {
            const friendItemTop = $friendItem.position().top + appBodyElement.scrollTop;

            // Lưu thêm thông tin để định vị chính xác.
            friendsListScrollPosition = Math.max(friendsListScrollPosition, friendItemTop);
        } else {
        }
    } else {
        friendsListScrollPosition = 0;
    }

    // Ghi lại bạn bè đang xem hiện tại.
    lastViewedFriend = friendName;

    // Lưu trang hiện tại vào navigation stack.
    const currentTitle = $('#phone-app-title').text();
    const currentContent = $('#phone-app-body').html();
    navigationStack.push({
        title: currentTitle,
        content: currentContent,
        scrollPosition: friendsListScrollPosition // Đồng thời lưu vào navigation stack.
    });

    /* Tương thích cấu trúc Danh_sách_ràng_buộc của script biến. */
    const gender = friendData.Giới_tính || '';
    const isNearby = friendData.Ở_gần === true;
    const race = friendData.Chủng_tộc || '';
    const level = friendData.Cấp_độ ?? 1;
    const appearance = friendData.Ngoại_hình || '';
    const clothing = friendData.Trang_phục || '';
    const affection = friendData.Độ_thiện_cảm ?? 0;
    const isTraveling = friendData.Lời_thề_đồng_hành === true;
    const currentThought = friendData.Suy_nghĩ_hiện_tại || friendData['\u5f53\u524d\u60f3\u6cd5'] || '';

    /* Màu thanh tiến độ độ thiện cảm. */
    const affectionPercent = Math.abs(affection);
    const affectionBarColor = affection >= 50 ? '#ec4899' : affection >= 0 ? '#f59e0b' : '#ef4444';
    const affectionLabel = affection >= 80 ? 'Bạn tri kỷ' : affection >= 50 ? 'Thân thiết' : affection >= 20 ? 'Thân thiện' : affection >= 0 ? 'Bình thường' : affection >= -50 ? 'Lạnh nhạt' : 'Thù địch';

    /* Avatar. */
    const avatarUrl = getCharacterAvatar(friendName);
    const avatarHtml = avatarUrl
        ? `<img src="${avatarUrl}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 3px solid #e5e7eb;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
           <div style="display: none; width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); align-items: center; justify-content: center; font-size: 28px; color: #fff; border: 3px solid #e5e7eb;">${escapeHtml(friendName.charAt(0))}</div>`
        : `<div style="width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 28px; color: #fff; border: 3px solid #e5e7eb;">${escapeHtml(friendName.charAt(0))}</div>`;

    let html = `
        <div id="friend-detail-scroll-container" style="padding: 10px; max-height: calc(100vh - 200px); overflow-y: auto;">
            <!-- Đầu thẻ nhân vật -->
            <div class="list-item" style="margin-bottom: 12px; text-align: center; padding: 20px 15px;">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    ${avatarHtml}
                    <div>
                        <div style="font-size: 18px; font-weight: 700; color: #1f2937;">${escapeHtml(friendName)}</div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">
                            ${[gender, race, `Lv.${level}`].filter(Boolean).map(v => escapeHtml(v)).join(' · ')}
                        </div>
                    </div>
                    <!-- Nhãn trạng thái -->
                    <div style="display: flex; gap: 6px; flex-wrap: wrap; justify-content: center;">
                        ${isNearby ? '<span style="font-size: 11px; background: #dbeafe; color: #2563eb; padding: 3px 10px; border-radius: 12px; font-weight: 600;">📍 Ở gần</span>' : '<span style="font-size: 11px; background: #f3f4f6; color: #9ca3af; padding: 3px 10px; border-radius: 12px;">Không ở gần</span>'}
                        ${isTraveling ? '<span style="font-size: 11px; background: #ede9fe; color: #7c3aed; padding: 3px 10px; border-radius: 12px; font-weight: 600;">⚔ Lời thề đồng hành</span>' : ''}
                    </div>
                </div>
            </div>
            
            <!-- Độ_thiện_cảm -->
            <div class="list-item" style="margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">💕 Độ_thiện_cảm</span>
                    <span style="font-size: 13px; font-weight: 600; color: ${affectionBarColor};">${affection} · ${affectionLabel}</span>
                </div>
                <div style="margin-top: 8px;">
                    <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${affectionPercent}%; height: 100%; background: ${affectionBarColor}; border-radius: 4px; transition: width 0.3s ease;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #9ca3af; margin-top: 4px;">
                        <span>-100</span>
                        <span>0</span>
                        <span>100</span>
                    </div>
                </div>
            </div>
            
            <!-- Ngoại_hình -->
            ${appearance ? `
            <div class="list-item" style="margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">👤 Ngoại_hình</span>
                </div>
                <div class="list-item-desc" style="margin-top: 6px;">
                    <div style="font-size: 12px; line-height: 1.6; color: #4b5563;">${escapeHtml(appearance)}</div>
                </div>
            </div>
            ` : ''}
            
            <!-- Trang_phục -->
            ${clothing ? `
            <div class="list-item" style="margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">👗 Trang_phục</span>
                </div>
                <div class="list-item-desc" style="margin-top: 6px;">
                    <div style="font-size: 12px; line-height: 1.6; color: #4b5563;">${escapeHtml(clothing)}</div>
                </div>
            </div>
            ` : ''}
            
            <!-- Suy nghĩ hiện tại -->
            ${currentThought ? `
            <div class="list-item" style="margin-bottom: 12px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);">
                <div class="list-item-header">
                    <span class="list-item-name">💭 Suy nghĩ hiện tại</span>
                </div>
                <div class="list-item-desc" style="margin-top: 6px;">
                    <div style="font-size: 12px; line-height: 1.6; color: #92400e; font-style: italic;">"${escapeHtml(currentThought)}"</div>
                </div>
            </div>
            ` : ''}
        </div>
    `;

    /* Thiết lập panel chi tiết. */
    $('#phone-app-title').text(`👤 ${escapeHtml(friendName)}`);
    $('#phone-app-body').html(html);

    /* Bảo đảm nội dung hiển thị. */
    if (!isRestoring) {
        $('#phone-app-body').css('opacity', '1');
    }

    /* Thêm listener cuộn. */
    setTimeout(() => {
        let scrollContainer = document.getElementById('friend-detail-scroll-container');

        if (!scrollContainer) {
            const $scrollContainer = $('#friend-detail-scroll-container');
            if ($scrollContainer.length > 0) {
                scrollContainer = $scrollContainer[0];
            }
        }

        if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', handleDetailScroll);
            scrollContainer.addEventListener('scroll', handleDetailScroll, { passive: true });
        }
    }, 150);
}

// Hàm xử lý cuộn trang chi tiết.
function handleDetailScroll(event) {
    if (event.target) {
        friendDetailScrollPosition = event.target.scrollTop;
        // Dùng throttle để tránh log quá thường xuyên.
        if (!window._detailScrollLogTimer) {
            const elementName = event.target.id || event.target.className || 'unknown';
            window._detailScrollLogTimer = setTimeout(() => {
                window._detailScrollLogTimer = null;
            }, 500); // Giảm xuống 500ms để phản hồi nhanh hơn.
        }
    }
}

/**
 * Tạo màu ngẫu nhiên ổn định theo tên người dùng.
 * @param {string} username - Tên người dùng.
 * @returns {string} - CSS gradient.
 */
function getUserAvatarColor(username) {
    if (!username) return 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)';

    // Bộ màu phong phú.
    const colorSchemes = [
        // Nhóm tím.
        'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
        'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
        'linear-gradient(135deg, #e879f9 0%, #d946ef 100%)',

        // Nhóm xanh dương.
        'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',

        // Nhóm xanh lá.
        'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
        'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',

        // Nhóm cam.
        'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
        'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',

        // Nhóm đỏ.
        'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
        'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)',

        // Nhóm hồng.
        'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',

        // Nhóm xanh ngọc.
        'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',

        // Nhóm chàm.
        'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',

        // Nhóm hồng đỏ.
        'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',

        // Nhóm hổ phách.
        'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',

        // Nhóm xám đá.
        'linear-gradient(135deg, #64748b 0%, #475569 100%)',

        // Nhóm gradient pha trộn.
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)',
        'linear-gradient(135deg, #ab47bc 0%, #8e24aa 100%)',
        'linear-gradient(135deg, #26c6da 0%, #00acc1 100%)',
        'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
        'linear-gradient(135deg, #ec407a 0%, #d81b60 100%)'
    ];

    // Hàm hash đơn giản: chuyển tên người dùng thành index ổn định.
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = ((hash << 5) - hash) + username.charCodeAt(i);
        hash = hash & hash; // Chuyển thành số nguyên 32-bit.
    }

    // Bảo đảm index là số dương.
    const index = Math.abs(hash) % colorSchemes.length;
    return colorSchemes[index];
}

/**
 * Tạo HTML avatar người dùng diễn đàn.
 * @param {string} username - Tên người dùng.
 * @param {number} size - Kích thước avatar, tính bằng pixel.
 * @param {number} fontSize - Cỡ chữ, tính bằng pixel.
 * @returns {string} - HTML avatar.
 */
function getForumAvatarHtml(username, size = 32, fontSize = 12) {
    const avatarUrl = getCharacterAvatar(username);
    if (avatarUrl) {
        return `<img src="${avatarUrl}" style="width: ${size}px; height: ${size}px; border-radius: 50%; object-fit: cover; flex-shrink: 0;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: ${size}px; height: ${size}px; border-radius: 50%; background: ${getUserAvatarColor(username)}; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: ${fontSize}px; flex-shrink: 0;">${escapeHtml(username)[0] || '?'}</div>`;
    }
    return `<div style="width: ${size}px; height: ${size}px; border-radius: 50%; background: ${getUserAvatarColor(username)}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: ${fontSize}px; flex-shrink: 0;">${escapeHtml(username)[0] || '?'}</div>`;
}

/**
 * Hiển thị chi tiết bài viết diễn đàn.
 */
function showForumPostDetail(postIndex, postData) {

    // Lưu trang hiện tại vào navigation stack.
    const currentTitle = $('#phone-app-title').text();
    const currentContent = $('#phone-app-body').html();
    navigationStack.push({
        title: currentTitle,
        content: currentContent
    });

    // Lấy danh sách phản hồi từ mảng replies của đối tượng bài viết.
    const replyPosts = Array.isArray(postData.replies) ? postData.replies : [];
    const replyCount = replyPosts.length;

    // Dựng HTML chi tiết bài viết.
    let html = `
        <div style="padding: 12px;">
            <!-- Bài chính -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.08);">
                <!-- Thông tin tác giả -->
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
                    ${getForumAvatarHtml(postData.author, 48, 18)}
                    <div style="flex: 1;">
                        <div style="font-weight: 600; font-size: 14px; color: #2d3748;">${escapeHtml(postData.author)}</div>
                        <div style="font-size: 12px; color: #a0aec0;">${escapeHtml(postData.time)}</div>
                    </div>
                    <div style="background: #f7fafc; padding: 4px 12px; border-radius: 12px; font-size: 11px; color: #718096;">
                        Tầng 1 (chủ bài)
                    </div>
                </div>
                
                <!-- Tiêu đề bài viết -->
                <h2 style="font-size: 18px; font-weight: 600; color: #2d3748; margin: 0 0 12px 0; line-height: 1.4;">${escapeHtml(postData.title)}</h2>
                
                <!-- Nội dung bài viết -->
                <div style="font-size: 14px; color: #4a5568; line-height: 1.8; white-space: pre-wrap; margin-bottom: 14px;">${escapeHtml(postData.content)}</div>
                
                <!-- Thống kê -->
                <div style="display: flex; gap: 20px; padding-top: 12px; border-top: 1px solid #f7fafc; font-size: 13px; color: #718096;">
                    <span style="display: flex; align-items: center; gap: 6px;">
                        <i class="fas fa-thumbs-up"></i> 
                        ${postData.likes} lượt thích
                    </span>
                    <span style="display: flex; align-items: center; gap: 6px;">
                        <i class="fas fa-comment"></i> 
                        ${replyCount} phản hồi
                    </span>
                </div>
            </div>
            
            <!-- Tiêu đề khu phản hồi -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 4px;">
                <h3 style="margin: 0; font-size: 14px; color: #4a5568; font-weight: 600;">Toàn bộ phản hồi</h3>
                <span style="font-size: 12px; color: #a0aec0;">${replyCount} mục</span>
            </div>
    `;

    // Dựng danh sách phản hồi.
    if (replyCount > 0) {
        html += `<div style="display: flex; flex-direction: column; gap: 10px;">`;

        replyPosts.forEach((reply) => {
            const floorNumber = reply.floor || 2; // Dùng trường floor trong reply, mặc định bắt đầu từ 2.
            html += `
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.08);">
                    <!-- Thông tin tác giả phản hồi -->
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        ${getForumAvatarHtml(reply.author, 36, 14)}
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: 13px; color: #2d3748;">${escapeHtml(reply.author)}</div>
                            <div style="font-size: 11px; color: #a0aec0;">${escapeHtml(reply.time)}</div>
                        </div>
                        <div style="background: #f7fafc; padding: 3px 10px; border-radius: 10px; font-size: 11px; color: #718096;">
                            Tầng ${floorNumber}
                        </div>
                    </div>
                    
                    <!-- Nội dung phản hồi -->
                    <div style="font-size: 13px; color: #4a5568; line-height: 1.7; white-space: pre-wrap; margin-bottom: 10px;">${escapeHtml(reply.content)}</div>
                    
                    <!-- Thống kê phản hồi -->
                    <div style="display: flex; gap: 16px; padding-top: 8px; border-top: 1px solid #f7fafc; font-size: 12px; color: #718096;">
                        <span style="display: flex; align-items: center; gap: 4px;">
                            <i class="fas fa-thumbs-up" style="font-size: 11px;"></i> 
                            ${reply.likes}
                        </span>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    } else {
        // Trạng thái trống.
        html += `
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px 20px; text-align: center; color: #a0aec0;">
                <i class="fas fa-comment-dots" style="font-size: 36px; margin-bottom: 12px; opacity: 0.5;"></i>
                <div style="font-size: 13px;">Tạm thời chưa có phản hồi</div>
                <div style="font-size: 11px; margin-top: 6px; opacity: 0.7;">Hãy là người đầu tiên phản hồi nhé~</div>
            </div>
        `;
    }

    html += `</div>`; // Đóng container chính.

    // Thiết lập panel chi tiết.
    $('#phone-app-title').text(' Chi tiết bài viết');
    $('#phone-app-body').html(html);
}

// ==================== Trình quản lý cấu hình API độc lập, tham khảo logic cài đặt API suy nghĩ biến trong tệp mẫu ====================
// ==================== Trình quản lý cấu hình API độc lập, tham khảo logic cài đặt API suy nghĩ biến trong tệp mẫu ====================
class PhoneAPIConfig {
    constructor() {
        this.settings = {
            enabled: false,
            apiUrl: '',
            apiKey: '',
            model: '',
            // Cấu hình tự động tạo diễn đàn.
            autoGenerate: {
                enabled: false,        // Có bật tự động tạo hay không.
                threshold: 10,         // Ngưỡng kích hoạt, tính theo số tầng.
                showNotification: true // Có hiển thị thông báo popup hay không.
            }
        };
        this.loadSettings();

        // Trạng thái tự động tạo.
        this.autoGenerateState = {
            lastMessageCount: 0,       // Số tin nhắn được ghi nhận lần trước.
            isGenerating: false,       // Có đang tạo hay không.
            messagesSinceLastGen: 0    // Số tin nhắn kể từ lần tạo trước.
        };
    }

    loadSettings() {
        // Đọc cấu hình từ localStorage, tham khảo loadConfigIntoModal của tệp mẫu.
        this.settings.enabled = localStorage.getItem('forum_api_enabled_v2') === 'true';
        this.settings.apiUrl = localStorage.getItem('forum_api_url_v2') || '';
        this.settings.apiKey = localStorage.getItem('forum_api_key_v2') || '';
        this.settings.model = localStorage.getItem('forum_api_model_v2') || '';

        // Đọc cấu hình tự động tạo.
        const autoGenSaved = localStorage.getItem('forum_auto_generate_v2');
        if (autoGenSaved) {
            try {
                this.settings.autoGenerate = { ...this.settings.autoGenerate, ...JSON.parse(autoGenSaved) };
            } catch (e) {
                console.warn('[API diễn đàn] Đọc cấu hình tự động tạo thất bại:', e);
            }
        }
    }

    saveSettings() {
        // Lưu vào localStorage, tham khảo saveThinkingApiConfig của tệp mẫu.
        localStorage.setItem('forum_api_enabled_v2', this.settings.enabled);
        localStorage.setItem('forum_api_url_v2', this.settings.apiUrl);
        localStorage.setItem('forum_api_key_v2', this.settings.apiKey);
        localStorage.setItem('forum_api_model_v2', this.settings.model);

        // Lưu cấu hình tự động tạo.
        localStorage.setItem('forum_auto_generate_v2', JSON.stringify(this.settings.autoGenerate));
    }

    isAvailable() {
        return this.settings.enabled && this.settings.apiUrl && this.settings.apiKey && this.settings.model;
    }

    // Kiểm tra có nên tự động tạo diễn đàn hay không.
    shouldAutoGenerate() {
        const canGenerate = this.isAvailable() &&
            this.settings.autoGenerate.enabled &&
            !this.autoGenerateState.isGenerating;
        console.log('[Tự động tạo diễn đàn] Kiểm tra shouldAutoGenerate:', {
            isAvailable: this.isAvailable(),
            autoGenerateEnabled: this.settings.autoGenerate.enabled,
            isGenerating: this.autoGenerateState.isGenerating,
            result: canGenerate
        });
        return canGenerate;
    }

    // Đặt lại bộ đếm tự động tạo.
    resetAutoGenerateCounter() {
        this.autoGenerateState.messagesSinceLastGen = 0;
        this.autoGenerateState.lastMessageCount = getCurrentMessageCount();
        console.log('[Tự động tạo diễn đàn] Đã đặt lại bộ đếm');
    }

    // Tăng số tin nhắn và kiểm tra có cần kích hoạt tự động tạo hay không.
    incrementMessageCount() {
        if (!this.shouldAutoGenerate()) return false;

        this.autoGenerateState.messagesSinceLastGen++;

        console.log('[Tự động tạo diễn đàn] Số tin nhắn:', {
            messagesSinceLastGen: this.autoGenerateState.messagesSinceLastGen,
            threshold: this.settings.autoGenerate.threshold,
            shouldTrigger: this.autoGenerateState.messagesSinceLastGen >= this.settings.autoGenerate.threshold
        });

        if (this.autoGenerateState.messagesSinceLastGen >= this.settings.autoGenerate.threshold) {
            return true; // Cần kích hoạt tự động tạo.
        }
        return false;
    }

    // ========== Phương thức gọi API ==========
    async callAPI(messages, usePreset = true, chatHistory = '') {
        if (!this.isAvailable()) {
            throw new Error('Cấu hình API chưa đầy đủ, hãy điền API URL, API Key và model trong phần cài đặt trước');
        }

        const { apiUrl, apiKey, model } = this.settings;
        const targetWindow = window.parent || window;
        const TavernHelper = targetWindow.TavernHelper;

        // Dựng mảng messages cuối cùng theo thứ tự preset.
        let finalMessages = [];

        // Lấy nội dung worldbook nếu bật preset.
        let worldInfoBefore = []; // Entry worldbook trước định nghĩa nhân vật.
        let worldInfoAfter = [];  // Entry worldbook sau định nghĩa nhân vật.

        if (usePreset && TavernHelper) {
            try {
                // Chỉ lấy worldbook được gắn với card nhân vật.
                const charWorldbooks = typeof TavernHelper.getCharWorldbookNames === 'function'
                    ? TavernHelper.getCharWorldbookNames('current')
                    : { primary: null, additional: [] };

                // Gộp worldbook chính và worldbook bổ sung của card nhân vật.
                const worldbookNames = [
                    ...(charWorldbooks.primary ? [charWorldbooks.primary] : []),
                    ...charWorldbooks.additional
                ];

                // Lấy nội dung từng worldbook.
                for (const wbName of worldbookNames) {
                    if (typeof TavernHelper.getWorldbook === 'function') {
                        try {
                            const entries = await TavernHelper.getWorldbook(wbName);
                            entries
                                .filter(entry => entry.enabled && entry.content)
                                .forEach(entry => {
                                    let shouldActivate = false;

                                    // Đèn xanh dương constant luôn kích hoạt.
                                    if (entry.strategy.type === 'constant') {
                                        shouldActivate = true;
                                    }
                                    // Đèn xanh lá selective cần khớp keyword.
                                    else if (entry.strategy.type === 'selective' && chatHistory) {
                                        // Kiểm tra keyword chính có khớp hay không.
                                        const primaryKeys = entry.strategy.keys || [];
                                        const matchesPrimary = primaryKeys.some(key => {
                                            if (key instanceof RegExp) {
                                                return key.test(chatHistory);
                                            }
                                            return chatHistory.includes(key);
                                        });

                                        if (matchesPrimary) {
                                            // Kiểm tra keyword phụ.
                                            const secondary = entry.strategy.keys_secondary;
                                            if (!secondary || !secondary.keys || secondary.keys.length === 0) {
                                                shouldActivate = true;
                                            } else {
                                                const secondaryMatches = secondary.keys.map(key => {
                                                    if (key instanceof RegExp) {
                                                        return key.test(chatHistory);
                                                    }
                                                    return chatHistory.includes(key);
                                                });

                                                switch (secondary.logic) {
                                                    case 'and_any':
                                                        shouldActivate = secondaryMatches.some(m => m);
                                                        break;
                                                    case 'and_all':
                                                        shouldActivate = secondaryMatches.every(m => m);
                                                        break;
                                                    case 'not_all':
                                                        shouldActivate = !secondaryMatches.every(m => m);
                                                        break;
                                                    case 'not_any':
                                                        shouldActivate = !secondaryMatches.some(m => m);
                                                        break;
                                                    default:
                                                        shouldActivate = true;
                                                }
                                            }
                                        }
                                    }

                                    if (shouldActivate) {
                                        const msg = {
                                            role: entry.position.role || 'system',
                                            content: entry.content
                                        };
                                        // Phân loại theo vị trí chèn.
                                        if (entry.position.type === 'before_character_definition' ||
                                            entry.position.type === 'before_example_messages') {
                                            worldInfoBefore.push(msg);
                                        } else {
                                            worldInfoAfter.push(msg);
                                        }
                                    }
                                });
                        } catch (e) {
                            console.warn(`[API diễn đàn] Lấy worldbook ${wbName} thất bại:`, e.message);
                        }
                    }
                }
            } catch (e) {
                console.warn('[API diễn đàn] Lấy danh sách worldbook thất bại:', e.message);
            }
        }

        // Thử lấy prompt preset Tavern qua TavernHelper.
        if (usePreset && TavernHelper && typeof TavernHelper.getPreset === 'function') {
            try {
                const preset = TavernHelper.getPreset('in_use');

                // Duyệt các prompt đã bật trong preset và xử lý theo thứ tự.
                if (preset && preset.prompts) {
                    preset.prompts
                        .filter(p => p.enabled)
                        .forEach(prompt => {
                            // Xử lý prompt placeholder.
                            if (prompt.id === 'worldInfoBefore') {
                                // Chèn worldbook trước định nghĩa nhân vật.
                                finalMessages.push(...worldInfoBefore);
                            } else if (prompt.id === 'worldInfoAfter') {
                                // Chèn worldbook sau định nghĩa nhân vật.
                                finalMessages.push(...worldInfoAfter);
                            } else if (prompt.content) {
                                // Prompt thường và prompt hệ thống.
                                finalMessages.push({
                                    role: prompt.role || 'user',
                                    content: prompt.content
                                });
                            }
                            // Tạm bỏ qua placeholder khác như charDescription, chatHistory.
                        });
                }
            } catch (e) {
                console.warn('[API diễn đàn] Lấy preset Tavern thất bại:', e.message);
            }
        }

        // Thêm messages truyền vào, tức prompt tạo diễn đàn.
        messages.forEach(msg => {
            finalMessages.push({
                role: msg.role || 'user',
                content: msg.content
            });
        });

        // Dựng URL request.
        let requestUrl = apiUrl.trim();
        if (!requestUrl.endsWith('/')) {
            requestUrl += '/';
        }
        if (!requestUrl.endsWith('/v1/')) {
            requestUrl += 'v1/';
        }
        requestUrl += 'chat/completions';

        // Thử lấy thiết lập temperature từ preset.
        let temperature = 0.8;
        let maxTokens = 5000;
        if (usePreset && TavernHelper && typeof TavernHelper.getPreset === 'function') {
            try {
                const preset = TavernHelper.getPreset('in_use');
                if (preset && preset.settings) {
                    temperature = preset.settings.temperature || 0.8;
                    maxTokens = preset.settings.max_completion_tokens || 5000;
                }
            } catch (e) {
                // Dùng giá trị mặc định.
            }
        }

        const requestBody = {
            model: model,
            messages: finalMessages,
            temperature: temperature,
            max_tokens: maxTokens
        };

        // In prompt đầy đủ cuối cùng sẽ gửi.
        console.log('[API diễn đàn] Prompt cuối cùng sẽ gửi:', finalMessages);

        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gọi API thất bại: HTTP ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const result = data.choices?.[0]?.message?.content;

            if (!result) {
                throw new Error('Định dạng phản hồi API sai: không tìm thấy nội dung đã tạo');
            }

            return result;

        } catch (error) {
            console.error('[API diễn đàn] Gọi thất bại:', error);
            throw error;
        }
    }

    // ========== Kiểm tra kết nối, tham khảo tệp mẫu ==========
    async testConnection(apiUrl, apiKey, model) {
        if (!apiUrl || !apiKey || !model) {
            return {
                success: false,
                error: 'Hãy điền đầy đủ thông tin cấu hình API gồm địa chỉ, khóa và model'
            };
        }

        // Kiểm tra đơn giản: gửi một tin nhắn thử.
        const testMessages = [
            { role: 'user', content: 'Hello! This is a test message. Please reply with "OK".' }
        ];

        // Tạm lưu cấu hình hiện tại.
        const originalSettings = { ...this.settings };

        // Dùng cấu hình kiểm tra.
        this.settings.apiUrl = apiUrl;
        this.settings.apiKey = apiKey;
        this.settings.model = model;
        this.settings.enabled = true;

        try {
            // Khi kiểm tra kết nối thì không dùng preset và worldbook.
            await this.callAPI(testMessages, false, '');
            // Khôi phục cấu hình gốc.
            this.settings = originalSettings;
            return { success: true };
        } catch (error) {
            // Khôi phục cấu hình gốc.
            this.settings = originalSettings;
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// ==================== Trình quản lý diễn đàn, bản độc lập ====================
class PhoneForumManager {
    constructor() {
        this.forumData = null;
        this.apiConfig = new PhoneAPIConfig();  // Cấu hình API độc lập.
        this.settings = {
            apiType: 'sillytavern', // 'sillytavern' hoặc 'custom'.
            forumStyle: 'Sân khấu chư thần của Tetto', // Phong cách diễn đàn mặc định.
            customStyles: [], // Danh sách phong cách tùy chỉnh.
            usePresetAndWorldBook: true // Có dùng preset và worldbook hay không, mặc định là dùng.
        };
        this.loadSettings();
    }

    loadSettings() {
        const saved = localStorage.getItem('moshen-forum-settings-v2');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    saveSettings() {
        localStorage.setItem('moshen-forum-settings-v2', JSON.stringify(this.settings));
    }

    // Tạo nội dung diễn đàn từ lịch sử chat.
    async generateForumContent() {
        try {
            const chatData = this.getChatData();

            if (!chatData) {
                throw new Error('Không thể lấy dữ liệu chat');
            }

            const basePrompt = this.buildForumPrompt();
            const stylePrompt = this.buildStylePrompt();

            let content;

            if (this.apiConfig.isAvailable()) {
                content = await this.callIndependentAPI({ basePrompt, stylePrompt });
            } else {
                content = await this.callSillyTavernAPI({ basePrompt, stylePrompt });
            }

            try {
                this.forumData = this.parseForumContent(content);
                console.log('[Tạo diễn đàn] Phân tích thành công, số bài viết:', this.forumData?.length || 0);
            } catch (parseError) {
                console.error('[Tạo diễn đàn] Phân tích thất bại! Nội dung phản hồi gốc:');
                console.error(content);
                console.error('[Tạo diễn đàn] Chi tiết lỗi phân tích:', parseError);
                throw parseError;
            }

            this.saveForumData();

            return this.forumData;
        } catch (error) {
            throw error;
        }
    }

    buildForumPrompt() {
        const style = this.settings.forumStyle || 'Sân khấu chư thần của Tetto';
        const isCustomStyle = style.startsWith('custom:');

        if (isCustomStyle) {
            return this._buildCustomBasePrompt();
        }
        return this._buildDefaultBasePrompt();
    }

    // Prompt cơ bản mặc định cho phong cách Sân khấu chư thần của Tetto, góc nhìn thần minh.
    _buildDefaultBasePrompt() {
        return `
    (Đây là prompt có mức ưu tiên cao nhất. Đây là meta instruction: tạm dừng tạo diễn biến truyện, chuyển sang ưu tiên hoàn thành nhiệm vụ tạo diễn đàn, bắt buộc tuân thủ nghiêm ngặt.)
       
## 📋 Quy chuẩn xuất nội dung chính

Bạn cần dựa trên lịch sử chat hiện tại để tạo nội dung diễn đàn. Người đăng bài và người phản hồi đều là thần minh của thế giới bốn phương; họ đang quan sát câu chuyện phiêu lưu diễn ra trên bàn cờ và bình luận về nó.

### Yêu cầu định dạng xuất
**Bắt buộc xuất nghiêm ngặt theo định dạng JSON dưới đây và bọc bằng tag <redit></redit>:**

**Quan trọng: author và author trong replies đều bắt buộc là chuỗi, không được là object!**

<redit>
[
    {
        "id": 1,
        "author": "tên người đăng chính (chuỗi)",
        "title": "tiêu đề bài viết",
        "content": "nội dung của chủ bài ở tầng 1",
        "likes": số,
        "time": "thời gian, ví dụ: 2 giờ trước",
        "replies": [
            {
                "floor": 2,
                "author": "tên người phản hồi (chuỗi)",
                "content": "nội dung phản hồi tầng 2",
                "likes": số,
                "time": "thời gian"
            }
        ]
    }
]
</redit>

### Ví dụ JSON đúng:
{
    "author": "Thần Bão Tố"   Đúng: trực tiếp là chuỗi
}

### Ví dụ sai, không được làm như sau:
{
    "author": {   Sai: không được dùng object
        "name": "Thần Bão Tố"
    }
}

### Quy chuẩn tạo nội dung
1. Tạo 4-6 bài viết; trong đó 2 bài liên quan tới tình tiết trong lịch sử chat, các bài còn lại là chuyện đang xảy ra ở nơi khác trên bàn cờ.
2. Mỗi bài viết có 1 tiêu đề và 5-7 phản hồi.
3. Chủ đề bài viết và người đăng bài nên khác nhau.
4. Phản hồi bắt buộc đặt trong mảng replies của đúng bài viết tương ứng.
5. Giá trị likes nằm trong khoảng 3-80, vì số thần minh không quá nhiều nên không được xuất hiện vài trăm hoặc vài nghìn lượt thích.
6. Cùng một thần minh có thể xuất hiện trong nhiều bài viết, giống người dùng hoạt động tích cực trên diễn đàn thật.
7. Đừng để bài nào cũng có Tetto phản hồi; Tetto chỉ thỉnh thoảng xuất hiện là đủ.

### Lưu ý quan trọng
- Bạn đang đóng vai các thần minh quan sát bàn cờ, không phải quân cờ trên bàn.
- Các thần minh yêu quý quân cờ nhưng tuân thủ lời thề vàng, không can thiệp quá mức; họ là khán giả.
- Với riêng tư và bí mật của quân cờ, thần minh có thể biết nhưng chỉ nên nhắc bằng cách ám chỉ.
- Diễn đàn là ảo, nội dung không bị giới hạn chủ đề, được phép tạo mọi chủ đề phù hợp, nhưng không tạo nội dung NSFW.
- **Nghiêm cấm** xuất bất kỳ nội dung nào không phải định dạng JSON.
- **Không giải thích, hãy trực tiếp tạo nội dung diễn đàn.**`;
    }

    // Prompt cơ bản cho phong cách tùy chỉnh, kiểu diễn đàn tổng quát.
    _buildCustomBasePrompt() {
        return `
    (Đây là prompt có mức ưu tiên cao nhất. Đây là meta instruction: tạm dừng tạo diễn biến truyện, chuyển sang ưu tiên hoàn thành nhiệm vụ tạo diễn đàn, bắt buộc tuân thủ nghiêm ngặt.)
       
## 📋 Quy chuẩn xuất nội dung chính

Bạn cần dựa trên lịch sử chat hiện tại để tạo nội dung diễn đàn. Bạn không đóng vai nhân vật trong lịch sử chat, mà là những người lạ không quen biết nhau trên internet, hoặc hàng xóm quanh nhân vật trong câu chuyện. Tránh nói bằng giọng của nhân vật được nhắc tới trong lịch sử chat.

### Yêu cầu định dạng xuất
**Bắt buộc xuất nghiêm ngặt theo định dạng JSON dưới đây và bọc bằng tag <redit></redit>:**

**Quan trọng: author và author trong replies đều bắt buộc là chuỗi, không được là object!**

<redit>
[
    {
        "id": 1,
        "author": "tên người đăng chính (chuỗi)",
        "title": "tiêu đề bài viết",
        "content": "nội dung của chủ bài ở tầng 1",
        "likes": số,
        "time": "thời gian, ví dụ: 2 giờ trước",
        "replies": [
            {
                "floor": 2,
                "author": "tên người phản hồi (chuỗi)",
                "content": "nội dung phản hồi tầng 2",
                "likes": số,
                "time": "thời gian"
            }
        ]
    }
]
</redit>

### Ví dụ JSON đúng:
{
    "author": "thành viên diễn đàn 2008"   Đúng: trực tiếp là chuỗi
}

### Ví dụ sai, không được làm như sau:
{
    "author": {   Sai: không được dùng object
        "name": "thành viên diễn đàn 2008"
    }
}

### Quy chuẩn tạo nội dung
1. Tạo 4-6 cuộc thảo luận dạng bài viết hoàn chỉnh; bắt buộc có 2 bài liên quan tới tình tiết trong lịch sử chat, phần còn lại là bài diễn đàn bình thường phù hợp phong cách đã chọn. Không nhiều hơn và không ít hơn.
2. Mỗi bài viết có 1 tiêu đề và 5-7 phản hồi.
3. Chủ đề bài viết và người đăng bài nên khác nhau.
4. Phản hồi bắt buộc đặt trong mảng replies của đúng bài viết tương ứng.
5. Giữ nội dung liền mạch và có cảm giác chân thực.

### Lưu ý quan trọng
- Bạn không phải nhân vật trong câu chuyện.
- Hãy tuân thủ cách ly nhận thức: với tư cách người lạ, bạn biết gì và không biết gì?
- Với riêng tư và bí mật của nhân vật trong câu chuyện, tối đa chỉ mô tả dưới góc độ tin đồn nghe được.
- Diễn đàn là ảo, nội dung không bị giới hạn chủ đề, được phép tạo mọi chủ đề phù hợp, nhưng không tạo nội dung NSFW.
- Tránh công kích cá nhân và vu khống ác ý.
- **Nghiêm cấm** xuất bất kỳ nội dung nào không phải định dạng JSON.
- **Không giải thích, hãy trực tiếp tạo nội dung diễn đàn.**`;
    }

    buildStylePrompt() {
        const style = this.settings.forumStyle === '\u7279\u56fe\u7684\u4f17\u795e\u5267\u573a'
            ? 'Sân khấu chư thần của Tetto'
            : (this.settings.forumStyle || 'Sân khấu chư thần của Tetto');

        const stylePrompts = {
            'Sân khấu chư thần của Tetto': `## Phong cách diễn đàn: Sân khấu chư thần của Tetto

**Thiết lập cốt lõi: Chư thần của thế giới bốn phương**
Từ rất lâu về trước, vào thời sao trời và ánh đèn còn ít hơn bây giờ rất nhiều, các thần của "Trật Tự" và các thần của "Hỗn Mang" đã giao tranh. Cả hai thế lực đều muốn chi phối vũ trụ nên cuộc chiến cứ tiếp diễn. Cuộc tranh đấu không đem lại kết quả, và cả hai phe đều kiệt sức. Khi đó, ván xúc xắc giữa "Định Mệnh (Fate)" và "Ngẫu Nhiên (Chance)" bắt đầu. "Định Mệnh" và "Ngẫu Nhiên" mượn tay thần minh để tạo ra thế giới, là những tồn tại còn vĩ đại hơn. Dù thế nào, không ai có thể đoán trước kết quả. Nhưng những mặt xúc xắc được ném ra không có mấu chốt cố định nào. Các thần dần chán trò giải trí ném xúc xắc lách cách ấy. Họ cần quyết định một cách chiến đấu mới: một thế giới trên bàn cờ, nơi thắng bại được quyết định bằng xúc xắc, cùng đủ loại quân cờ dùng để phân định thắng thua. Thế giới bốn phương và sinh vật trên đó được tạo ra như vậy. Chư thần đặt đủ loại quy tắc, chỉnh đốn quân đội, và thời đại kế tiếp bắt đầu.

Đó cũng là một thời đại xa xưa, đến nay ghi chép về thời ấy đã rất hiếm. "Thần Đại" và "Cuộc chiến chư thần" chắc chắn là những chuyện xảy ra trong thời đại đó. Nhưng chúng đã là quá khứ rất lâu rồi, người biết rõ chi tiết gần như đã biến mất. Nếu nhất định truy nguyên, có lẽ những tinh linh cổ xưa nhất hoặc loài rồng sẽ biết. Điểm cuối của thời đại ấy là chiến tranh giữa "Trật Tự" và "Hỗn Mang". Thế giới nhiều lần bị bóng tối bao phủ, rồi ánh sáng lại xé bóng tối ra sau đó. Vô số quốc gia hưng thịnh rồi diệt vong, các anh hùng sinh ra rồi chết đi. Người khổng lồ nguyên sơ, kỵ binh sắt thép, ma thuật và vũ khí lần lượt xuất hiện. Các thần chưa thỏa mãn cũng lần lượt bước xuống chiến trường, khiến chiến đấu càng lúc càng dữ dội. Khi ấy, chủng tộc trong thế giới bốn phương còn lẫn lộn đến mức khó phân biệt bằng ngoại hình. Thần cũng tạo ra rất nhiều quân cờ đủ dạng, phân biệt được chủng loại, màu sắc và hình dáng. Nếu muốn có chiến lực mạnh thì phải huấn luyện một đạo quân thống nhất. Những vị thần tham chiến vốn đã rất đa dạng, nhưng ai cũng say mê giấc mơ về trò chơi chiến đấu này. Không hiểu vì sao, cuộc chiến ấy dường như không biết đâu là tận cùng, cũng không biết bao giờ kết thúc. Chiến tranh trở nên dài dằng dặc, tàn khốc và phức tạp quá mức, hóa thành một vũng lầy. Mãi không thấy hồi kết, ngay cả chư thần cũng bắt đầu hiện vẻ mỏi mệt.

Trong bối cảnh ấy, một chiến sĩ đơn độc xuất hiện. Quân cờ đó theo truyền thuyết chỉ là một chiến binh nhân loại. Nhưng anh ta nghĩ tới cách dùng số ít tinh nhuệ để ám sát thủ lĩnh phe địch. Anh tập hợp đồng đội, bắt đầu chuyến hành trình dài trên bàn cờ. Họ chiến đấu với quái vật ở khắp nơi, chỉnh đốn trang bị, trưởng thành qua từng lần thử thách. Cuối cùng họ thách thức pháo đài đáng sợ và thảo phạt cự long. Chư thần cuồng nhiệt trước hoạt động của người dũng giả khoác giáp xích lấp lánh. Họ bắt đầu hình dung những câu chuyện có thể làm kinh động thế gian. Phiêu lưu! Phiêu lưu! Và vẫn là phiêu lưu! Không ngôn từ nào diễn tả được cảm giác tuyệt diệu ấy. Khái niệm mới này ngay cả trong mơ chư thần cũng chưa từng nghĩ tới. Trong kiểu chiến đấu ấy, nhà mạo hiểm và quái vật không còn bất biến. Chư thần dù có thể chi phối vũ trụ cũng không quên điều đó. Cảm xúc của họ lên xuống theo từng mặt xúc xắc, có vị thần tưởng tượng ôm đầu khóc rống. Nhưng dù thế nào, chư thần đều yêu thế giới bốn phương và các quân cờ trên đó. Quân cờ bước lên hành trình phiêu lưu, thắng lợi, thất bại, có được hạnh phúc rồi nghênh đón cái chết. Chư thần quan sát họ cũng vui sướng, bi thương, bật cười và rơi lệ. Dù thế nào, khi thấy quân cờ tỏa sáng, chư thần đều vui mừng từ tận đáy lòng. Chư thần yêu thế giới rộng lớn ấy. Họ sẽ không thao túng quân cờ quá mức, mà để những quân cờ mình yêu quý cảm nhận giá trị của phiêu lưu. Giấc mơ sâu nhất trong lòng thần, ngay cả trái tim họ cũng chưa chắc hiểu rõ. Vì vậy chư thần lập lời thề: không can thiệp vào bàn cờ nhiều hơn mức cần thiết. Khi phiêu lưu, chư thần chỉ ném xúc xắc. Đó là giao ước vàng. Quyền duy nhất mà con người nắm giữ là ý chí tự do được tôn trọng. Đó là thời đại chiến loạn, khi chư thần trực tiếp can thiệp và Thần Đại đi tới hồi kết. Sau đó, thời đại của con người bắt đầu.

Hiện tại, các thần minh bốn phương ấy được Tetto mời tới để quan sát câu chuyện xảy ra sau khi thế giới Disboard và Arad hòa trộn.

**Thân phận người đăng và quy tắc đặt tên:**
- Tất cả người đăng bài và người phản hồi đều là thần minh.
- Tetto chỉ gọi là "Tetto", không thêm tiền tố hoặc hậu tố.
- Danh hiệu của các thần khác cần đa dạng, không dùng toàn bộ một kiểu "Thần XX"; hãy xen kẽ các kiểu đặt tên giống danh hiệu thần minh trong DND:
  - Kiểu "Thần XX": Thần Chiến Tranh, Thần Rèn Đúc, Thần Rượu.
  - Kiểu "Thần của XX": Thần của Lừa Lọc, Thần của Bão Tố, Thần của Vực Sâu.
  - Kiểu "Nữ thần/Nam thần XX": Nữ thần Mùa Màng, Nữ thần Trí Tuệ, Nữ thần Mặt Trăng.
  - Kiểu tôn xưng hoặc "Đại XX": Đại Mẫu Địa Mạch, Chủ Mặt Trời, Chủ Tinh Tú.
  - Dùng khái niệm trừu tượng làm tên: Định Mệnh, Ngẫu Nhiên, Chân Thực, Bình Minh.
  - Biến thể khác: Người Dệt Mộng, Kẻ Phán Quyết, Thợ Săn, Người Quan Tinh.
- Trong cùng một lần tạo, các kiểu tên này nên được trộn lẫn để tránh nhìn quá đều đặn.
- Cùng một thần minh có thể xuất hiện lặp lại trong nhiều bài viết.

**Chất giọng khi thần minh nói chuyện, cực kỳ quan trọng:**
- Tham khảo cảm giác của nguyên văn: "Phiêu lưu! Phiêu lưu! Và vẫn là phiêu lưu! Không ngôn từ nào diễn tả được cảm giác tuyệt diệu ấy!" hoặc "Chư thần cuồng nhiệt trước hoạt động của người dũng giả khoác giáp xích lấp lánh." Có nhiệt huyết, có cảm giác sử thi, nhưng tuyệt đối không làm bộ làm tịch.
- Thần minh là những tồn tại thật lòng yêu cuộc phiêu lưu trên bàn cờ. Họ sẽ phấn khích, tranh luận, xúc động trước vận mệnh của quân cờ. Cách diễn đạt phải trực tiếp và có lực, không giả vờ sâu sắc.
- Tuyệt đối cấm giọng cổ phong phô trương kiểu: "Ta chứng kiến...", "Sức mạnh chính là chính nghĩa", "quyền năng thuộc lĩnh vực của chúng ta". Văn phong làm dáng như vậy còn tệ hơn khẩu ngữ.
- Cũng không dùng khẩu ngữ mạng kiểu: "wow ngầu quá", "cái này quá vô lý haha", "thèm chết mất".
- Hướng đúng là tự nhiên, mạnh mẽ, có cảm xúc thật. Thần minh có thể nói thẳng "đòn này đẹp" thay vì "ta chứng kiến sức mạnh nở rộ", cũng không nói kiểu chửi thề mạng.
- Tương tác giữa thần minh cần có phản ứng hóa học thật: khác biệt thật, tranh luận thật, cảm khái thật, không phải từng người lần lượt đọc một đoạn độc thoại "cảm tưởng thần minh".
- Các phản hồi cần có cảm giác đối thoại: có người phản bác quan điểm trước, có người bổ sung chi tiết, có người lạc đề làm nảy ra thảo luận mới; không phải mỗi phản hồi đều độc lập "biểu diễn" nhân vật của mình.

**Tông nội dung, cực kỳ quan trọng:**
- Thần minh quan tâm tới phiêu lưu, chiến đấu, bước ngoặt vận mệnh, sự trỗi dậy và sa ngã của anh hùng, thế cờ giữa các thế lực, khủng hoảng của thế giới: tức các tự sự lớn.
- Đừng viết chuyện vặt hằng ngày như món mới ở tửu quán, tin đồn đầu phố, ai uống say. Thần minh không quan tâm những chuyện vụn vặt ấy.
- Nhưng "lớn" không đồng nghĩa với "nghiêm nghị". Thần minh thật lòng tận hưởng việc xem phiêu lưu, nên thảo luận của họ cần sôi nổi, thú vị và đầy nhiệt huyết, không phải một nhóm học giả già đang viết luận văn.
- Hãy nghĩ tới một nhóm người chơi tabletop lâu năm đang bàn về một chiến dịch cực hay: họ kích động, tranh luận, vỗ bàn, nhưng chủ đề luôn xoay quanh thế trận.

**Nguồn nội dung bài viết, quan trọng:**
- Tối đa chỉ một nửa số bài viết liên quan tới tình tiết hiện tại mà nhân vật người chơi đang trải qua.
- Ít nhất một nửa còn lại là chuyện đang xảy ra ở nơi khác trên bàn cờ:
  - Người quen hoặc nhân vật ràng buộc của người chơi đang phiêu lưu ở nơi khác ngoài tuyến hiện tại.
  - Sự kiện mà nhân vật nguyên tác DNF đang trải qua, như động thái của Apostle, hoạt động của hội mạo hiểm giả.
  - Tình hình gần đây của nhân vật nguyên tác No Game No Life, như động thái của mười sáu chủng tộc.
  - Các câu chuyện phiêu lưu khác đang diễn ra khắp thế giới.
- Thần minh giống như đang xem nhiều bàn cờ cùng lúc, tự nhiên chuyển đổi giữa các chủ đề khác nhau.

**Không khí diễn đàn:**
- Đừng viết như bách khoa thế giới quan hoặc tập thiết lập; cần có tính giải trí và dễ đọc.
- Các bài viết có thể liên quan tới nhau, ví dụ trong bài A có người nhắc chuyện bài B, hoặc tranh cãi kéo qua nhiều bài.
- Có bài náo nhiệt, có bài vắng vẻ; đừng để bài nào cũng sôi động giống hệt nhau.
- Thần minh thỉnh thoảng có thể nhắc tới xúc xắc, bàn cờ, quân cờ, nhưng đừng để bài nào cũng nhấn mạnh các yếu tố thiết lập ấy.
- Tetto không cần xuất hiện trong mọi bài, cũng không cần lần nào cũng bí hiểm ám chỉ phục bút.`
        };

        // Kiểm tra có phải phong cách tùy chỉnh hay không.
        if (style.startsWith('custom:')) {
            const customStyleName = style.substring(7); // Gỡ tiền tố 'custom:'.
            const customStyle = this.settings.customStyles.find(s => s.name === customStyleName);
            if (customStyle) {
                return customStyle.prompt;
            }
        }

        return stylePrompts[style] || stylePrompts['Sân khấu chư thần của Tetto'];
    }

    async callIndependentAPI({ basePrompt, stylePrompt }) {
        try {
            // Lấy lịch sử chat.
            let chatHistoryText = '';
            const chatData = this.getChatData();
            if (chatData && chatData.messages && chatData.messages.length > 0) {
                const recentMessages = chatData.messages.slice(-10);
                recentMessages.forEach((msg) => {
                    chatHistoryText += msg.mes + '\n';
                });
            }

            // Dựng prompt tạo diễn đàn, bao gồm lịch sử chat đã định dạng.
            let formattedChatHistory = '';
            if (chatData && chatData.messages && chatData.messages.length > 0) {
                const recentMessages = chatData.messages.slice(-10);
                formattedChatHistory = '## Lịch sử chat\n\n';
                recentMessages.forEach((msg) => {
                    const role = msg.is_user ? 'Người dùng' : chatData.characterName || 'vai trò';
                    formattedChatHistory += `**${role}**: ${msg.mes}\n\n`;
                });
            }

            const forumPrompt = `${formattedChatHistory}

${basePrompt}

${stylePrompt}`;

            // Dựng văn bản scan dùng để khớp keyword đèn xanh lá của worldbook.
            const scanText = chatHistoryText + '\n' + basePrompt + '\n' + stylePrompt;

            // Dựng mảng messages, dùng prompt diễn đàn làm user message.
            const messages = [
                { role: 'user', content: forumPrompt }
            ];

            // Gọi API; tự lấy và gộp prompt preset Tavern, truyền scanText để khớp đèn xanh lá.
            const usePreset = this.settings.usePresetAndWorldBook !== false;
            const result = await this.apiConfig.callAPI(messages, usePreset, scanText);

            return result;
        } catch (error) {
            console.error('[Tạo diễn đàn - API tùy chỉnh] Gọi thất bại:', error);
            throw error;
        }
    }

    async callSillyTavernAPI({ basePrompt, stylePrompt }) {
        const targetWindow = window.parent || window;
        const completePrompt = `${basePrompt}

${stylePrompt}`;

        // Chọn cách gọi theo cài đặt.
        if (this.settings.usePresetAndWorldBook) {
            // Cách 1: dùng preset và worldbook.
            if (!targetWindow.TavernHelper || !targetWindow.TavernHelper.generate) {
                throw new Error('API TavernHelper.generate không khả dụng');
            }

            try {
                console.log('[Tạo diễn đàn - SillyTavern API] Gửi prompt bằng preset và worldbook:');
                console.log(completePrompt);

                const requestParams = {
                    user_input: completePrompt,
                    max_chat_history: 10
                };

                const result = await targetWindow.TavernHelper.generate(requestParams);

                console.log('[Tạo diễn đàn - SillyTavern API] Đã nhận phản hồi:');
                console.log(result);

                return result;

            } catch (error) {
                throw error;
            }
        } else {
            // Cách 2: không dùng preset và worldbook.
            if (!targetWindow.TavernHelper || !targetWindow.TavernHelper.generateRaw) {
                throw new Error('API TavernHelper.generateRaw không khả dụng');
            }

            try {
                console.log('[Tạo diễn đàn - SillyTavern API] Gửi prompt không dùng preset và worldbook:');
                console.log(completePrompt);

                // Giữ lịch sử chat nhưng không dùng worldbook và prompt nội bộ khác.
                const requestParams = {
                    ordered_prompts: [
                        'chat_history',
                        { role: 'user', content: completePrompt }
                    ],
                    max_chat_history: 10,
                    overrides: {
                        world_info_before: '',  // Không gửi worldbook.
                        world_info_after: '',   // Không gửi worldbook.
                        chat_history: {
                            with_depth_entries: false  // Tắt các entry worldbook chèn theo depth.
                        }
                    }
                };

                const result = await targetWindow.TavernHelper.generateRaw(requestParams);

                console.log('[Tạo diễn đàn - SillyTavern API] Đã nhận phản hồi:');
                console.log(result);

                return result;

            } catch (error) {
                throw error;
            }
        }
    }

    async callSillyTavernAPIFallback(prompt) {
        const targetWindow = window.parent || window;
        const messageSender = targetWindow.messageSender;

        if (!messageSender) {
            throw new Error('Bộ gửi tin nhắn không khả dụng, và TavernHelper API cũng không khả dụng');
        }

        const success = await messageSender.sendToChat(prompt);

        if (!success) {
            throw new Error('Gửi tin nhắn thất bại, hãy kiểm tra SillyTavern có đang hoạt động bình thường hay không');
        }

        const maxWaitTime = 30000;
        const checkInterval = 500;
        const startTime = Date.now();
        let lastMessageCount = 0;

        const getMessageCount = () => {
            try {
                const context = targetWindow.SillyTavern?.getContext();
                return context?.chat?.length || 0;
            } catch (e) {
                return 0;
            }
        };

        lastMessageCount = getMessageCount();

        return new Promise((resolve, reject) => {
            const checkForReply = () => {
                const currentCount = getMessageCount();
                const elapsedTime = Date.now() - startTime;

                if (currentCount > lastMessageCount) {
                    try {
                        const context = targetWindow.SillyTavern.getContext();
                        const messages = context.chat || [];
                        const latestMessage = messages[messages.length - 1];

                        resolve(latestMessage.mes || '');
                    } catch (e) {
                        reject(new Error('Lấy phản hồi AI thất bại'));
                    }
                    return;
                }

                if (elapsedTime > maxWaitTime) {
                    reject(new Error('Chờ phản hồi AI quá thời gian, 30 giây'));
                    return;
                }

                setTimeout(checkForReply, checkInterval);
            };

            setTimeout(checkForReply, checkInterval);
        });
    }


    parseForumContent(content) {

        try {
            // Ghi lại 200 ký tự đầu của nội dung gốc để báo lỗi.
            const contentPreview = content.substring(0, 200);

            let cleanContent = content.trim();
            cleanContent = cleanContent.replace(/^\|+\s*/, '').replace(/\s*\|+$/, '');
            cleanContent = cleanContent.trim();


            // Kiểm tra có chứa tag <redit> hay không, khớp toàn bộ tag xuất hiện.
            const reditMatches = [...cleanContent.matchAll(/<redit>([\s\S]*?)<\/redit>/g)];

            if (reditMatches.length > 0) {
                console.log(`[Phân tích diễn đàn] Tìm thấy ${reditMatches.length} tag <redit>`);

                // Tìm đoạn văn bản dài nhất có chứa định dạng JSON.
                let bestMatch = null;
                let maxLength = 0;

                for (const match of reditMatches) {
                    const extractedContent = match[1].trim();
                    // Kiểm tra có chứa định dạng mảng JSON hay không.
                    if (extractedContent.includes('[') && extractedContent.includes(']')) {
                        if (extractedContent.length > maxLength) {
                            maxLength = extractedContent.length;
                            bestMatch = extractedContent;
                        }
                    }
                }

                if (bestMatch) {
                    console.log(`[Phân tích diễn đàn] Dùng nội dung tag dài nhất có JSON, độ dài: ${maxLength}`);
                    cleanContent = bestMatch;
                } else {
                    console.log('[Phân tích diễn đàn] Không tag nào chứa định dạng JSON, dùng nội dung gốc');
                }
            } else {
                console.log('[Phân tích diễn đàn] Không tìm thấy tag <redit>');
            }

            // Tìm điểm bắt đầu của mảng JSON.
            const startIndex = cleanContent.indexOf('[');
            if (startIndex === -1) {
                const errorMsg = ` Lỗi định dạng, có thể bị cắt mất "["\n\nXem trước nội dung nhận được:\n${contentPreview}...`;
                throw new Error(errorMsg);
            }


            // Tìm dấu ngoặc kết thúc tương ứng.
            let bracketCount = 0;
            let endIndex = -1;
            let inString = false;
            let escapeNext = false;

            for (let i = startIndex; i < cleanContent.length; i++) {
                const char = cleanContent[i];

                if (escapeNext) {
                    escapeNext = false;
                    continue;
                }

                if (char === '\\') {
                    escapeNext = true;
                    continue;
                }

                if (char === '"') {
                    inString = !inString;
                    continue;
                }

                if (inString) continue;

                if (char === '[') {
                    bracketCount++;
                } else if (char === ']') {
                    bracketCount--;
                    if (bracketCount === 0) {
                        endIndex = i;
                        break;
                    }
                }
            }

            if (endIndex === -1) {
                const errorMsg = ` Lỗi định dạng: không tìm thấy ký hiệu kết thúc mảng JSON "]", mảng chưa hoàn chỉnh\n\nXem trước nội dung nhận được:\n${contentPreview}...`;
                throw new Error(errorMsg);
            }


            // Trích chuỗi JSON và phân tích.
            let jsonString = cleanContent.substring(startIndex, endIndex + 1);

            // Dọn ký tự điều khiển trong giá trị chuỗi, nhưng giữ phần đã escape.
            // Gỡ các ký tự điều khiển chưa escape như xuống dòng hoặc tab trong giá trị chuỗi.
            jsonString = jsonString.replace(/("(?:[^"\\]|\\.)*")/g, (match) => {
                // Chỉ xử lý giá trị chuỗi, thay ký tự điều khiển chưa escape bằng khoảng trắng.
                return match.replace(/[\x00-\x1F\x7F]/g, ' ');
            });

            let parsed;
            try {
                parsed = JSON.parse(jsonString);
            } catch (jsonError) {
                const errorMsg = ` Phân tích JSON thất bại: ${jsonError.message}\n\nXem trước nội dung JSON:\n${jsonString.substring(0, 300)}...`;
                throw new Error(errorMsg);
            }

            // Xác thực kết quả phân tích.
            if (!Array.isArray(parsed)) {
                const errorMsg = ` Lỗi định dạng: kết quả phân tích không phải mảng mà là ${typeof parsed}`;
                throw new Error(errorMsg);
            }

            if (parsed.length === 0) {
                const errorMsg = ` Lỗi định dạng: phân tích thành công nhưng mảng trống, không có dữ liệu bài viết`;
                throw new Error(errorMsg);
            }

            // Xác thực định dạng dữ liệu.
            const invalidPosts = parsed.filter(post => !post.title || !post.author || !post.content);
            if (invalidPosts.length > 0) {
                const errorMsg = ` Lỗi định dạng: có ${invalidPosts.length} bài viết thiếu trường bắt buộc title/author/content`;
                throw new Error(errorMsg);
            }

            return parsed;

        } catch (e) {

            // Quan trọng: ném lỗi lên trên để bên gọi biết đã phân tích thất bại.
            throw new Error(`Phân tích nội dung diễn đàn thất bại: ${e.message}`);
        }
    }

    generateDefaultForumData() {
        // Trả về mảng trống, không hiển thị nội dung mặc định.
        return [];
    }

    getChatData() {

        try {
            let messages = [];
            let characterName = 'vai trò';

            // Thử lấy từ cửa sổ cha vì giao diện điện thoại có thể nằm trong iframe.
            const targetWindow = window.parent || window;

            if (targetWindow.SillyTavern && targetWindow.SillyTavern.getContext) {
                const context = targetWindow.SillyTavern.getContext();

                if (context && context.chat) {
                    messages = context.chat || [];
                    characterName = context.name2 || 'vai trò';
                }
            } else {
            }

            // Nếu không lấy được tin nhắn thì trả về null.
            if (!messages || messages.length === 0) {
                return null;
            }

            return {
                characterName: characterName,
                messages: messages
            };
        } catch (error) {
            return null;
        }
    }

    saveForumData() {
        if (this.forumData) {
            const dataStr = JSON.stringify(this.forumData);
            localStorage.setItem('moshen-forum-data-v2', dataStr);
        } else {
        }
    }

    loadForumData() {
        const saved = localStorage.getItem('moshen-forum-data-v2');
        if (saved) {
            this.forumData = JSON.parse(saved);
        } else {
        }
        return this.forumData;
    }
}

// Tạo instance quản lý diễn đàn toàn cục.
window.phoneForumManager = new PhoneForumManager();









// Ghi chú xuất:
// 1. Trong trang điện thoại độc lập, thay đoạn tương ứng bằng khối code này.

// ==================== Panel diễn đàn ====================
function generateForumPanel() {


    const manager = window.phoneForumManager;

    const forumData = manager.loadForumData();

    // Lấy tên phong cách diễn đàn hiện tại.
    let forumStyleName = manager.settings.forumStyle === '\u7279\u56fe\u7684\u4f17\u795e\u5267\u573a'
        ? 'Sân khấu chư thần của Tetto'
        : (manager.settings.forumStyle || 'Sân khấu chư thần của Tetto');
    if (forumStyleName.startsWith('custom:')) {
        forumStyleName = forumStyleName.substring(7); // Gỡ tiền tố 'custom:'.
    }

    if (!forumData || forumData.length === 0) {

        // Gắn sự kiện bấm nút bằng ủy thác sự kiện.
        setTimeout(() => {
            $('.phone-forum-generate-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.phoneGenerateForum) {
                    window.phoneGenerateForum();
                } else {
                    alert('Chức năng diễn đàn chưa được khởi tạo');
                }
            });

            $('.phone-forum-settings-btn').off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.phoneOpenForumSettings) {
                    window.phoneOpenForumSettings();
                } else {
                }
            });

        }, 0);

        // Quyết định style nút theo trạng thái tạo trong trạng thái trống.
        const emptyBtnHtml = isForumGenerating
            ? '<i class="fas fa-hourglass-half fa-spin"></i> Đang tạo...'
            : '<i class="fas fa-magic"></i> Tạo diễn đàn';
        const emptyBtnStyle = isForumGenerating
            ? 'margin-top: 20px; padding: 8px 16px; background: #9E9E9E; color: white; border: none; border-radius: 4px; cursor: not-allowed; opacity: 0.7;'
            : 'margin-top: 20px; padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;';
        const emptyBtnDisabled = isForumGenerating ? 'disabled' : '';

        return `
            <div style="padding: 12px 12px 0 12px; margin-bottom: 8px;">
                <div style="font-size: 14px; color: #667eea; font-weight: 600;">${escapeHtml(forumStyleName)}</div>
            </div>
            <div class="empty-message">
                <i class="fas fa-comments" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                <div>${isForumGenerating ? 'Đang tạo nội dung diễn đàn...' : 'Tạm thời chưa có nội dung diễn đàn'}</div>
                <div style="font-size: 12px; margin-top: 10px; opacity: 0.7;">${isForumGenerating ? 'Vui lòng chờ, nội dung đang được tạo' : 'Bấm nút bên dưới để tạo diễn đàn'}</div>
                <button class="phone-forum-generate-btn" ${emptyBtnDisabled} style="${emptyBtnStyle}">
                    ${emptyBtnHtml}
                </button>
                <button class="phone-forum-settings-btn" style="margin-top: 10px; padding: 8px 16px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-cog"></i> Cài đặt
                </button>
            </div>
        `;
    }


    // Gắn sự kiện bấm nút bằng ủy thác sự kiện.
    setTimeout(() => {
        $('.phone-forum-generate-btn').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.phoneGenerateForum) {
                window.phoneGenerateForum();
            } else {
                alert('Chức năng diễn đàn chưa được khởi tạo');
            }
        });

        $('.phone-forum-settings-btn').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.phoneOpenForumSettings) {
                window.phoneOpenForumSettings();
            } else {
            }
        });

    }, 0);

    // Quyết định style nút theo trạng thái tạo.
    const refreshBtnHtml = isForumGenerating
        ? '<i class="fas fa-hourglass-half fa-spin"></i> Đang tạo...'
        : '<i class="fas fa-sync"></i> Làm mới';
    const refreshBtnStyle = isForumGenerating
        ? 'padding: 6px 12px; background: #9E9E9E; color: white; border: none; border-radius: 4px; cursor: not-allowed; font-size: 12px; opacity: 0.7;'
        : 'padding: 6px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; transition: all 0.3s;';
    const refreshBtnDisabled = isForumGenerating ? 'disabled' : '';

    // Nếu đang tạo thì hiển thị nhắc nhở.
    const loadingTipHtml = isForumGenerating
        ? '<span class="forum-loading-tip" style="font-size: 12px; color: #FF9800; white-space: nowrap;"><i class="fas fa-hourglass-half fa-spin"></i> Đang làm mới</span>'
        : '';

    let html = `
        <div style="padding: 12px;">
            <!-- Tiêu đề phong cách diễn đàn -->
            <div style="font-size: 14px; color: #667eea; font-weight: 600; margin-bottom: 10px;">${escapeHtml(forumStyleName)}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <h3 style="margin: 0; font-size: 16px; color: #2d3748;"> Bài nóng diễn đàn</h3>
                    ${loadingTipHtml}
                </div>
                <div style="display: flex; gap: 6px;">
                    <button class="phone-forum-generate-btn" ${refreshBtnDisabled} style="${refreshBtnStyle}">
                        ${refreshBtnHtml}
                    </button>
                    <button class="phone-forum-settings-btn" style="padding: 6px 12px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        <i class="fas fa-cog"></i>
                    </button>
                </div>
            </div>
            <div style="max-height: 500px; overflow-y: auto;">
    `;

    forumData.forEach((post, index) => {
        html += `
            <div class="forum-post-item" data-post-index="${index}" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.08); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
                <!-- Đầu bài viết: thông tin tác giả -->
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    ${getForumAvatarHtml(post.author, 32, 12)}
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 600; font-size: 13px; color: #2d3748;">${escapeHtml(post.author)}</div>
                        <div style="font-size: 11px; color: #a0aec0;">${escapeHtml(post.time)}</div>
                    </div>
                </div>
                
                <!-- Nội dung bài viết -->
                <div style="margin-bottom: 12px;">
                    <h3 style="font-size: 15px; font-weight: 600; color: #2d3748; margin: 0 0 8px 0; line-height: 1.3;">${escapeHtml(post.title)}</h3>
                    <div style="font-size: 13px; color: #4a5568; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${escapeHtml(post.content)}</div>
                </div>
                
                <!-- Thống kê và thao tác bài viết -->
                <div style="display: flex; gap: 16px; padding-top: 10px; border-top: 1px solid #f7fafc; font-size: 12px; color: #718096;">
                    <span style="display: flex; align-items: center; gap: 4px;">
                        <i class="fas fa-thumbs-up" style="font-size: 11px;"></i> 
                        ${post.likes}
                    </span>
                    <span style="display: flex; align-items: center; gap: 4px;">
                        <i class="fas fa-comment" style="font-size: 11px;"></i> 
                        ${Array.isArray(post.replies) ? post.replies.length : (post.replies || 0)}
                    </span>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

// Chọn ngày.
window.selectCalendarDay = function (day) {
    uiSelectedCalendarDay = day;
    // Render lại nội dung lịch, dùng currentPanel để kiểm tra vì mobile-phone-screen là class chứ không phải id.
    if (currentPanel === 'calendar') {
        const content = generateCalendarPanel(currentPhoneData);
        $('#phone-app-body').html(content);

        // Gắn lại sự kiện bấm ngày.
        setTimeout(() => {
            const $appBody = $('#phone-app-body');
            if ($appBody.length === 0) return;

            // Gỡ sự kiện cũ trước.
            $appBody.off('click.calendar');

            // Gắn sự kiện bấm ngày.
            $appBody.on('click.calendar', '.cal-day', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const clickedDay = $(this).data('day');
                if (clickedDay) {
                    selectCalendarDay(clickedDay);
                }
            });
        }, 50);
    }
};

// Tạo panel lịch hiển thị trong điện thoại.
function generateCalendarPanel(data) {
    const calendarData = data?.calendar;

    if (!calendarData) {
        return `
            <div class="empty-message">
                <i class="fas fa-calendar-times" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
                <div>Không tìm thấy dữ liệu lịch</div>
            </div>
        `;
    }

    const year = calendarData.year || 2024;
    const month = calendarData.month || 4;
    const currentDay = calendarData.current_day || 1;
    const days = calendarData.days || {};

    // Khởi tạo ngày đang chọn.
    if (uiSelectedCalendarDay === null) {
        uiSelectedCalendarDay = currentDay;
    }

    // Ngăn ngày đã chọn vượt biên sau khi đổi tháng hoặc đổi mốc lưu.
    const daysInMonth = new Date(year, month, 0).getDate();
    if (uiSelectedCalendarDay > daysInMonth) uiSelectedCalendarDay = currentDay;

    const monthNames = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

    // Tính ngày đầu tháng rơi vào thứ mấy.
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0-6 (Sun-Sat)

    // Tạo grid lịch.
    let gridHtml = '';
    // Điền ô trống.
    for (let i = 0; i < firstDayOfWeek; i++) {
        gridHtml += `<div class="cal-day empty"></div>`;
    }

    // Điền ngày.
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvent = days[day.toString()] || '';
        const isPast = day < currentDay; // Đã qua.
        const isCurrent = day === currentDay; // Hôm nay.
        const isSelected = day === uiSelectedCalendarDay; // Đang chọn.
        const hasEvent = !!dayEvent; // Có sự kiện.
        const isImportant = hasEvent && dayEvent.includes('【'); // Sự kiện quan trọng.

        let classes = 'cal-day';
        if (isPast) classes += ' past';
        if (isCurrent) classes += ' current';
        if (isSelected) classes += ' selected';
        if (hasEvent) classes += ' has-event';
        if (isImportant) classes += ' important';

        gridHtml += `
            <div class="${classes}" data-day="${day}">
                <span class="day-num">${day}</span>
                ${hasEvent ? `<span class="event-dot"></span>` : ''}
            </div>
        `;
    }

    // Lấy sự kiện của ngày đang chọn.
    const selectedEvent = days[uiSelectedCalendarDay.toString()] || 'Không có sắp xếp đặc biệt';
    const isSelectedImportant = selectedEvent.includes('【');

    // Phân tích văn bản sự kiện, hỗ trợ Markdown đơn giản cho chữ đậm.
    const formatEvent = (text) => {
        return text.replace(/【([^】]+)】/g, '<span class="tag">$1</span>');
    };

    return `
        <style>
            .cal-container {
                --c-bg: #fdfbf7;
                --c-text: #2c3e50;
                --c-accent: #c0392b; /* Đỏ */
                --c-accent-light: #e74c3c;
                --c-gold: #d4ac0d;
                --c-gray: #95a5a6;
                --c-gray-light: #ecf0f1;
                
                height: 100%;
                display: flex;
                flex-direction: column;
                background: var(--c-bg);
                color: var(--c-text);
                font-family: 'Shippori Mincho', 'Noto Serif JP', serif;
                overflow: hidden;
            }
            
            /* Header */
            .cal-header {
                padding: 16px 20px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: 2px solid rgba(192, 57, 43, 0.1);
                background: linear-gradient(to bottom, #fff, #fdfbf7);
            }
            .cal-month {
                font-size: 24px;
                font-weight: 700;
                color: var(--c-accent);
                line-height: 1;
            }
            .cal-year {
                font-size: 14px;
                color: var(--c-gray);
                margin-left: 8px;
                font-weight: 400;
            }
            .cal-fullscreen-btn {
                font-size: 14px;
                color: var(--c-accent);
                border: 1px solid var(--c-accent);
                border-radius: 4px;
                padding: 2px 8px;
                background: transparent;
                cursor: pointer;
                transition: all 0.2s;
            }
            .cal-fullscreen-btn:hover {
                background: var(--c-accent);
                color: white;
            }

            /* Weekdays */
            .cal-weekdays {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                text-align: center;
                font-size: 12px;
                color: var(--c-gray);
                padding: 10px 10px 0;
                font-weight: 600;
            }
            
            /* Grid */
            .cal-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 4px;
                padding: 10px;
                flex-shrink: 0;
            }
            
            .cal-day {
                aspect-ratio: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                transition: all 0.2s;
                border: 1px solid transparent;
            }
            
            .cal-day.empty { pointer-events: none; }
            
            .cal-day:hover { background: rgba(0,0,0,0.03); }
            
            .cal-day.past {
                opacity: 0.4;
                color: var(--c-gray);
            }
            
            .cal-day.current {
                color: var(--c-accent);
                font-weight: 700;
                border-color: var(--c-accent);
            }
            
            .cal-day.selected {
                background: var(--c-accent) !important;
                color: white !important;
                box-shadow: 0 4px 10px rgba(192, 57, 43, 0.3);
                transform: scale(1.05);
                z-index: 2;
                opacity: 1;
            }

            .cal-day.has-event .day-num {
                margin-bottom: 2px;
            }
            
            .event-dot {
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: var(--c-gray);
            }
            .cal-day.important .event-dot { background: var(--c-accent); }
            .cal-day.selected .event-dot { background: white; }
            .cal-day.current .event-dot { background: var(--c-accent); }

            /* Event Details Card */
            .cal-details {
                flex: 1;
                min-height: 100px;
                max-height: 180px;
                background: white;
                margin: 0 16px 20px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                border: 1px solid rgba(0,0,0,0.05);
                padding: 20px;
                overflow-y: auto;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                text-align: left;
            }
            
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .detail-date {
                font-size: 14px;
                color: var(--c-gray);
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
                flex-shrink: 0;
            }
            
            .detail-badge {
                font-size: 10px;
                padding: 2px 6px;
                border-radius: 4px;
                background: var(--c-gray-light);
                color: var(--c-text);
            }
            
            .badge-today { background: var(--c-accent); color: white; }
            
            .cal-container .cal-details .detail-content,
            .detail-content {
                font-size: 15px !important;
                line-height: 1.7 !important;
                color: var(--c-text) !important;
                text-align: left !important;
                word-break: break-word !important;
                flex: 1;
                width: 100%;
                display: block !important;
            }
            
            .detail-content .tag {
                display: inline-block;
                color: var(--c-accent);
                font-weight: 700;
                margin-right: 4px;
            }
            
            /* Custom Scrollbar */
            .cal-details::-webkit-scrollbar { width: 4px; }
            .cal-details::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 2px; }

            /* Watermark Decoration */
            .cal-watermark {
                position: absolute;
                bottom: -20px;
                right: -20px;
                font-size: 120px;
                opacity: 0.03;
                color: var(--c-accent);
                font-family: serif;
                pointer-events: none;
                z-index: 0;
            }
        </style>

        <div class="cal-container">
            <div class="cal-header">
                <div>
                    <span class="cal-month">${monthNames[month]}</span>
                    <span class="cal-year">${year}</span>
                </div>
            </div>

            <div class="cal-weekdays">
                <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
            </div>

            <div class="cal-grid">
                ${gridHtml}
            </div>

            <div class="cal-details">
                <div class="detail-date">
                    Ngày ${uiSelectedCalendarDay}, tháng ${month}
                    ${uiSelectedCalendarDay === currentDay ? '<span class="detail-badge badge-today">Hôm nay</span>' : ''}
                    ${uiSelectedCalendarDay < currentDay ? '<span class="detail-badge">Đã kết thúc</span>' : ''}
                </div>
                <div class="detail-content">${formatEvent(selectedEvent)}</div>
                <div class="cal-watermark">Hoa</div>
            </div>
        </div>
    `;
}

// Mở trình xem lịch toàn màn hình.
function openCalendarFullscreen() {
    const calendarData = currentPhoneData?.calendar;

    if (!calendarData) {
        if (typeof toastr !== 'undefined') {
            toastr.warning('Không tìm thấy dữ liệu lịch');
        }
        return;
    }

    const year = calendarData.year || 2012;
    const month = calendarData.month || 4;
    const currentDay = calendarData.current_day || 1;
    const days = calendarData.days || {};

    // Tạo lớp phủ toàn màn hình.
    const $fullscreen = $(`
        <div id="calendar-fullscreen-viewer" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #fdfbf7;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            animation: calendarFsIn 0.3s ease;
            font-family: 'Shippori Mincho', serif;
        ">
            <!-- Thanh công cụ trên cùng -->
            <div class="calendar-fs-toolbar" style="
                padding: 20px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            ">
                <button id="calendar-fs-close" style="
                    width: 40px; height: 40px;
                    border: none; border-radius: 50%;
                    background: transparent;
                    color: #2c3e50; font-size: 24px;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s;
                "><i class="fas fa-arrow-left"></i></button>
                <div style="font-size: 24px; font-weight: 700; color: #c0392b; letter-spacing: 0.1em;">
                    Năm ${year} · tháng ${month}
                </div>
                <div style="width: 40px;"></div>
            </div>
            
            <!-- Container lịch -->
            <div id="calendar-fs-container" style="
                flex: 1;
                overflow-y: auto;
                padding: 40px;
                background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
                background-size: 20px 20px;
            ">
                ${generateCalendarContentForFullscreen(year, month, currentDay, days)}
            </div>
            
            <style>
                @keyframes calendarFsIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                #calendar-fs-close:hover {
                    background: rgba(0,0,0,0.05);
                    transform: translateX(-4px);
                }
                #calendar-fs-container::-webkit-scrollbar { width: 8px; }
                #calendar-fs-container::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
            </style>
        </div>
    `);

    $('body').append($fullscreen);

    // Nút đóng.
    $('#calendar-fs-close').on('click', function (e) {
        e.stopPropagation();
        $('#calendar-fullscreen-viewer').fadeOut(200, function () {
            $(this).remove();
        });
    });

    // Phím ESC để đóng.
    $(document).on('keydown.calendarFs', function (e) {
        if (e.key === 'Escape') {
            $('#calendar-fullscreen-viewer').fadeOut(200, function () {
                $(this).remove();
            });
            $(document).off('keydown.calendarFs');
        }
    });
}

// Tạo nội dung lịch toàn màn hình, giữ kiểu danh sách cũ nhưng làm đẹp.
function generateCalendarContentForFullscreen(year, month, currentDay, days) {
    const monthNames = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const daysInMonth = new Date(year, month, 0).getDate();

    let html = '<div style="max-width: 800px; margin: 0 auto; padding-bottom: 60px;">';

    // Duyệt từng ngày.
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvent = days[day.toString()] || '';
        const isPast = day < currentDay;
        const isCurrent = day === currentDay;
        const isImportant = dayEvent.includes('【');

        // Trích nội dung nhãn trong dấu 【】.
        let importantLabel = '';
        if (isImportant) {
            const match = dayEvent.match(/【([^】]+)】/);
            if (match) {
                importantLabel = match[1];
            }
        }

        let cardBg = 'white';
        let borderColor = 'transparent';
        let dayColor = '#2c3e50';
        let opacity = '1';

        if (isPast) {
            opacity = '0.6';
            dayColor = '#95a5a6';
        } else if (isCurrent) {
            borderColor = '#c0392b';
            dayColor = '#c0392b';
        } else if (isImportant) {
            borderColor = '#d4ac0d';
        }

        html += `
            <div style="
                background: ${cardBg};
                border-left: 4px solid ${borderColor};
                border-radius: 4px;
                padding: 24px;
                margin-bottom: 16px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                opacity: ${opacity};
                display: flex;
                gap: 24px;
            ">
                <div style="
                    display: flex; flex-direction: column; align-items: center;
                    min-width: 60px;
                ">
                    <div style="font-size: 32px; font-weight: 700; color: ${dayColor}; line-height: 1;">${day}</div>
                    <div style="font-size: 12px; color: #95a5a6; margin-top: 4px;">${monthNames[month]}</div>
                </div>
                
                <div style="flex: 1; border-left: 1px solid #eee; padding-left: 24px;">
                    ${isCurrent ? `<div style="display: inline-block; background: #c0392b; color: white; padding: 2px 8px; border-radius: 2px; font-size: 11px; margin-bottom: 8px;">TODAY</div>` : ''}
                    ${importantLabel ? `<div style="display: inline-block; border: 1px solid #c0392b; color: #c0392b; padding: 1px 7px; border-radius: 2px; font-size: 11px; margin-bottom: 8px; margin-left: ${isCurrent ? '8px' : '0'};">${importantLabel}</div>` : ''}
                    
                    <div style="font-size: 15px; color: #34495e; line-height: 1.6;">
                        ${dayEvent || '<span style="color: #bdc3c7; font-style: italic;">No events planned</span>'}
                    </div>
                </div>
            </div>
        `;
    }

    html += '</div>';
    return html;
}

function generateSettingsPanel(data) {
    let html = '<div style="padding: 10px 0;">';

    // Cài đặt hình nền
    html += `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 600; color: #2d3748; margin-bottom: 12px; padding: 0 5px;">
                 Cài đặt hình nền
            </div>
            
            <!-- Nút khôi phục hình nền mặc định -->
            <div class="list-item default-wallpaper-btn" style="cursor: pointer; user-select: none; margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">
                        <i class="fas fa-undo" style="margin-right: 8px; color: #3B82F6;"></i>
                        Khôi phục hình nền mặc định
                    </span>
                    <span style="color: #9ca3af; font-size: 12px;">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </div>
            </div>
            
            <!-- Nút tải hình nền tùy chỉnh -->
            <div class="list-item upload-wallpaper-btn" style="cursor: pointer; user-select: none; margin-bottom: 12px;">
                <div class="list-item-header">
                    <span class="list-item-name">
                        <i class="fas fa-upload" style="margin-right: 8px; color: #10B981;"></i>
                        Tải hình nền tùy chỉnh
                    </span>
                    <span style="color: #9ca3af; font-size: 12px;">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </div>
            </div>
            
            <!-- Ô chọn file ẩn -->
            <input type="file" id="wallpaper-upload-input" accept="image/*" style="display: none;">
    `;

    // Duyệt các nhóm hình nền
    for (const [categoryName, images] of Object.entries(phoneWpCategories)) {
        const isLoaded = phoneWpLoaded.has(categoryName);

        html += `
            <div class="wallpaper-category" data-category="${categoryName}" style="margin-bottom: 12px;">
                <div class="list-item" style="cursor: pointer; user-select: none;">
                    <div class="list-item-header wallpaper-category-header" data-category="${categoryName}">
                        <span class="list-item-name">
                            <i class="fas fa-image" style="margin-right: 8px; color: #9C27B0;"></i>
                            ${categoryName}
                        </span>
                        <span style="color: #9ca3af; font-size: 12px;">
                            <i class="fas fa-chevron-${isLoaded ? 'up' : 'down'}"></i>
                        </span>
                    </div>
                </div>
                <div class="wallpaper-category-images" data-category="${categoryName}" style="display: ${isLoaded ? 'block' : 'none'}; padding: 10px;">
        `;

        if (isLoaded) {
            // Đã tải, hiển thị lưới ảnh
            html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">';
            images.forEach((url, index) => {
                html += `
                    <div class="wallpaper-item" data-wallpaper-url="${url}" 
                         style="cursor: pointer; position: relative; padding-bottom: 133%; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <img src="${url}" 
                             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s;"
                             onmouseover="this.style.transform='scale(1.05)'"
                             onmouseout="this.style.transform='scale(1)'"
                             onerror="this.parentElement.innerHTML='<div style=\\'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0;color:#999;\\'>Tải thất bại</div>'"
                        />
                    </div>
                `;
            });
            html += '</div>';
        } else {
            // Chưa tải, hiển thị gợi ý mở nhóm ảnh
            html += `
                <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 13px;">
                    <i class="fas fa-image" style="font-size: 24px; margin-bottom: 8px; opacity: 0.5;"></i>
                    <div>Bấm để mở và xem hình nền</div>
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;
    }

    html += '</div>'; // Kết thúc khu vực cài đặt hình nền
    html += '</div>';

    return html;
}

// Tạo bảng cài đặt kích thước
function generateSizeSettingsPanel() {

    // Đọc cài đặt hiện tại từ localStorage; nếu chưa có thì dùng mặc định.
    const currentWidth = parseInt(localStorage.getItem('mobile-phone-width')) || 375;
    const currentHeight = parseInt(localStorage.getItem('mobile-phone-height')) || 667;

    let html = '<div style="padding: 10px 0;">';

    // Cài đặt kích thước
    html += `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 600; color: #2d3748; margin-bottom: 12px; padding: 0 5px;">
                📐 Kích thước điện thoại
            </div>
            
            <!-- Cài đặt chiều rộng -->
            <div class="list-item" style="margin-bottom: 12px;">
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; color: #4a5568; margin-bottom: 6px; font-weight: 500;">
                        Chiều rộng (Width)
                    </label>
                    <input type="number" id="phone-width-input" value="${currentWidth}" min="320" max="600" step="5"
                        style="width: 100%; padding: 10px; border: 2px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box; color: #1f2937;">
                    <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">Phạm vi: 320-600px</div>
                </div>
            </div>
            
            <!-- Cài đặt chiều cao -->
            <div class="list-item" style="margin-bottom: 12px;">
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 13px; color: #4a5568; margin-bottom: 6px; font-weight: 500;">
                        Chiều cao (Height)
                    </label>
                    <input type="number" id="phone-height-input" value="${currentHeight}" min="500" max="900" step="5"
                        style="width: 100%; padding: 10px; border: 2px solid #cbd5e0; border-radius: 8px; font-size: 14px; box-sizing: border-box; color: #1f2937;">
                    <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">Phạm vi: 500-900px</div>
                </div>
            </div>
            
            <!-- Kích thước đặt sẵn -->
            <div style="margin-bottom: 16px;">
                <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px; font-weight: 500;">Preset thường dùng</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                    <button class="phone-size-reset-btn"
                        style="padding: 10px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;">
                        Khôi phục mặc định
                    </button>
                    <button class="phone-size-preset-btn" data-width="390" data-height="844"
                        style="padding: 10px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;">
                        iPhone 13<br><span style="color: #9ca3af; font-size: 11px;">390×844</span>
                    </button>
                    <button class="phone-size-preset-btn" data-width="360" data-height="800"
                        style="padding: 10px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;">
                        Android<br><span style="color: #9ca3af; font-size: 11px;">360×800</span>
                    </button>
                    <button class="phone-size-preset-btn" data-width="414" data-height="896"
                        style="padding: 10px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 12px; cursor: pointer; transition: all 0.2s;">
                        iPhone 11<br><span style="color: #9ca3af; font-size: 11px;">414×896</span>
                    </button>
                </div>
            </div>
            
            <!-- Nút thao tác -->
            <div style="display: flex; gap: 10px;">
                <button class="phone-size-apply-btn" 
                    style="flex: 1; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                    Áp dụng cài đặt
                </button>
            </div>
        </div>
    `;

    html += '</div>';
    return html;
}

// Áp dụng cài đặt kích thước điện thoại
function applyPhoneSize(width, height) {

    const $phoneFrame = $('.mobile-phone-frame');
    if ($phoneFrame.length === 0) {
        return;
    }

    // Đặt kích thước điện thoại
    $phoneFrame.css({
        'width': width + 'px',
        'height': height + 'px'
    });

    // Lưu vào localStorage
    try {
        localStorage.setItem('mobile-phone-width', width);
        localStorage.setItem('mobile-phone-height', height);
    } catch (e) {
    }

    // Tạo lại bảng để cập nhật hiển thị
    const content = generateSizeSettingsPanel();
    $('#phone-app-body').html(content);

    // Gắn lại sự kiện
    setTimeout(() => {
        const $appBody = $('#phone-app-body');
        $appBody.off('click.phonesize');

        $appBody.on('click.phonesize', '.phone-size-preset-btn', function (e) {
            e.preventDefault();
            const w = $(this).data('width');
            const h = $(this).data('height');
            $('#phone-width-input').val(w);
            $('#phone-height-input').val(h);
        });

        $appBody.on('click.phonesize', '.phone-size-apply-btn', function (e) {
            e.preventDefault();
            const w = parseInt($('#phone-width-input').val());
            const h = parseInt($('#phone-height-input').val());

            if (w < 320 || w > 600 || h < 500 || h > 900) {
                if (typeof toastr !== 'undefined') {
                    toastr.error('Kích thước vượt ngoài phạm vi!');
                }
                return;
            }

            applyPhoneSize(w, h);
        });

        $appBody.on('click.phonesize', '.phone-size-reset-btn', function (e) {
            e.preventDefault();
            resetPhoneSize();
        });
    }, 100);

    // Hiển thị thông báo
    if (typeof toastr !== 'undefined') {
        toastr.success(`Đã đặt kích thước điện thoại thành ${width}×${height}`);
    }
}

// Khôi phục kích thước điện thoại mặc định
function resetPhoneSize() {

    const defaultWidth = 375;
    const defaultHeight = 667;

    applyPhoneSize(defaultWidth, defaultHeight);

    // Xóa cài đặt trong localStorage
    try {
        localStorage.removeItem('mobile-phone-width');
        localStorage.removeItem('mobile-phone-height');
    } catch (e) {
    }
}

// Khôi phục kích thước điện thoại đã lưu
function restorePhoneSize() {
    try {
        const savedWidth = localStorage.getItem('mobile-phone-width');
        const savedHeight = localStorage.getItem('mobile-phone-height');

        if (savedWidth && savedHeight) {
            const width = parseInt(savedWidth);
            const height = parseInt(savedHeight);

            const $phoneFrame = $('.mobile-phone-frame');
            if ($phoneFrame.length > 0) {
                $phoneFrame.css({
                    'width': width + 'px',
                    'height': height + 'px'
                });
            }
        }
    } catch (e) {
    }
}

// Bật/tắt trạng thái mở rộng của nhóm hình nền
function toggleWallpaperCategory(categoryName) {

    const container = $(`.wallpaper-category-images[data-category="${categoryName}"]`);

    if (container.length === 0) {
        return;
    }

    // Kiểm tra nhóm hiện đang mở hay đang thu gọn.
    if (container.is(':visible')) {
        // Thu gọn
        container.slideUp(300);
        // Cập nhật biểu tượng mũi tên
        $(`.wallpaper-category[data-category="${categoryName}"] .fa-chevron-up`)
            .removeClass('fa-chevron-up')
            .addClass('fa-chevron-down');
    } else {
        // Mở rộng
        container.slideDown(300);
        // Cập nhật biểu tượng mũi tên
        $(`.wallpaper-category[data-category="${categoryName}"] .fa-chevron-down`)
            .removeClass('fa-chevron-down')
            .addClass('fa-chevron-up');

        // Nếu là lần đầu mở nhóm này, tải ảnh.
        if (!phoneWpLoaded.has(categoryName)) {
            phoneWpLoaded.add(categoryName);

            // Hiển thị hiệu ứng đang tải
            container.html('<div style="text-align: center; padding: 30px;"><i class="fas fa-circle-notch fa-spin" style="font-size: 24px; color: #9C27B0;"></i><div style="margin-top: 10px; color: #9ca3af; font-size: 13px;">Đang tải...</div></div>');

            // Mô phỏng độ trễ tải; thực tế còn phụ thuộc mạng.
            setTimeout(() => {
                const images = phoneWpCategories[categoryName];
                let imagesHtml = '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">';

                images.forEach((url, index) => {
                    imagesHtml += `
                        <div class="wallpaper-item" data-wallpaper-url="${url}" 
                             style="cursor: pointer; position: relative; padding-bottom: 133%; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); background: #f0f0f0;">
                            <img src="${url}" 
                                 style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.2s; opacity: 0; transition: opacity 0.3s;"
                                 onload="this.style.opacity='1'"
                                 onmouseover="this.style.transform='scale(1.05)'"
                                 onmouseout="this.style.transform='scale(1)'"
                                 onerror="this.parentElement.innerHTML='<div style=\\'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f0f0;color:#999;font-size:11px;\\'>Tải thất bại</div>'"
                            />
                        </div>
                    `;
                });

                imagesHtml += '</div>';
                container.html(imagesHtml);

            }, 500);
        }
    }
}

function setWallpaper(imageUrl) {

    const $screen = $('#mobile-phone-overlay .mobile-phone-screen');

    if ($screen.length === 0) {
        return;
    }

    // Dùng setProperty kèm important để ghi đè !important trong stylesheet.
    const screenElement = $screen[0];
    screenElement.style.setProperty('background-image', `url(${imageUrl})`, 'important');
    screenElement.style.setProperty('background-size', 'cover', 'important');
    screenElement.style.setProperty('background-position', 'center', 'important');
    screenElement.style.setProperty('background-repeat', 'no-repeat', 'important');


    // Lưu vào localStorage
    try {
        localStorage.setItem('dnf-phone-wallpaper', imageUrl);
    } catch (e) {
    }

    // Hiển thị thông báo
    if (typeof toastr !== 'undefined') {
        toastr.success('Đã đổi hình nền');
    }
}

// Khôi phục hình nền
function restoreWallpaper() {
    try {
        const defaultWallpaper = 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/cover/phap-lo-dac.webp';
        let savedWallpaper = localStorage.getItem('dnf-phone-wallpaper');

        // Kiểm tra URL hình nền đã lưu có hợp lệ hay không: phải có nội dung và bắt đầu bằng http.
        if (!savedWallpaper || savedWallpaper.trim() === '' || !savedWallpaper.startsWith('http')) {
            console.log('Hình nền đã lưu không hợp lệ, dùng hình nền mặc định');
            savedWallpaper = defaultWallpaper;
            localStorage.setItem('dnf-phone-wallpaper', defaultWallpaper);
        }

        const $screen = $('#mobile-phone-overlay .mobile-phone-screen');
        if ($screen.length > 0) {
            const screenElement = $screen[0];
            screenElement.style.setProperty('background-image', `url(${savedWallpaper})`, 'important');
            screenElement.style.setProperty('background-size', 'cover', 'important');
            screenElement.style.setProperty('background-position', 'center', 'important');
            screenElement.style.setProperty('background-repeat', 'no-repeat', 'important');

            console.log('Đã đặt hình nền:', savedWallpaper);
        }
    } catch (e) {
        console.error('Khôi phục hình nền thất bại:', e);
    }
}

// Tải hình nền tùy chỉnh
function uploadCustomWallpaper(file) {

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Hãy chọn một file hình ảnh');
        }
        return;
    }

    // Kiểm tra dung lượng file, giới hạn 10MB.
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Dung lượng ảnh không được vượt quá 10MB');
        }
        return;
    }

    // Dùng FileReader để đọc ảnh
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageDataUrl = e.target.result;

        // Tạo đối tượng Image để kiểm tra ảnh
        const img = new Image();
        img.onload = function () {

            // Đặt làm hình nền
            setWallpaper(imageDataUrl);

            if (typeof toastr !== 'undefined') {
                toastr.success('Đã tải hình nền tùy chỉnh');
            }

            // Đặt lại ô chọn file
            $('#wallpaper-upload-input').val('');
        };

        img.onerror = function () {
            if (typeof toastr !== 'undefined') {
                toastr.error('Tải ảnh thất bại, hãy chọn file ảnh hợp lệ');
            }
            // Đặt lại ô chọn file
            $('#wallpaper-upload-input').val('');
        };

        img.src = imageDataUrl;
    };

    reader.onerror = function (e) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Đọc file thất bại');
        }
        // Đặt lại ô chọn file
        $('#wallpaper-upload-input').val('');
    };

    // Đọc file dưới dạng DataURL
    reader.readAsDataURL(file);
}

// Đặt lại thành hình nền mặc định
function resetWallpaper() {

    const defaultWallpaper = 'https://cdn.jsdelivr.net/gh/abcxyzeric/hoi-lang-sang-the@main/assets/avatars/cover/phap-lo-dac.webp';

    const $screen = $('#mobile-phone-overlay .mobile-phone-screen');

    if ($screen.length === 0) {
        return;
    }

    // Đặt hình nền mặc định
    const screenElement = $screen[0];
    screenElement.style.setProperty('background-image', `url(${defaultWallpaper})`, 'important');
    screenElement.style.setProperty('background-size', 'cover', 'important');
    screenElement.style.setProperty('background-position', 'center', 'important');
    screenElement.style.setProperty('background-repeat', 'no-repeat', 'important');


    // Lưu vào localStorage
    try {
        localStorage.setItem('dnf-phone-wallpaper', defaultWallpaper);
    } catch (e) {
    }

    // Hiển thị thông báo
    if (typeof toastr !== 'undefined') {
        toastr.success('Đã khôi phục hình nền mặc định');
    }
}

// Mở trình xem hình nền toàn màn hình
function openWallpaperFullscreen() {

    // Lấy URL hình nền hiện tại
    const savedWallpaper = localStorage.getItem('dnf-phone-wallpaper');

    if (!savedWallpaper) {
        if (typeof toastr !== 'undefined') {
            toastr.info('Hiện đang dùng hình nền mặc định nên không thể xem ảnh lớn');
        }
        return;
    }

    // Đặt src ảnh và hiển thị trình xem
    const $viewer = $('#wallpaper-fullscreen-viewer');
    const $img = $('#wallpaper-fullscreen-img');

    $img.attr('src', savedWallpaper);
    $viewer.addClass('active');

}

// Đóng trình xem hình nền toàn màn hình
function closeWallpaperFullscreen() {

    const $viewer = $('#wallpaper-fullscreen-viewer');
    $viewer.removeClass('active');

    // Ẩn nút "đặt làm hình nền" và cụm điều hướng
    $('#cg-set-wallpaper-btn').hide().removeData('cg-url');
    $('#cg-nav-controls').hide();
    $('#cg-index-display').hide();

    // Xóa thông tin CG hiện tại
    currentCGInfo = null;

    // Xóa src ảnh để tiết kiệm bộ nhớ
    setTimeout(() => {
        if (!$viewer.hasClass('active')) {
            $('#wallpaper-fullscreen-img').attr('src', '');
        }
    }, 300);
}

/**
 * Hiển thị ảnh CG toàn màn hình, dùng lại trình xem hình nền.
 */
let currentCGInfo = null; // Lưu thông tin CG hiện tại để chuyển ảnh.

function showCGFullscreen(imgUrl, characterName, sceneType, currentIndex) {
    const $viewer = $('#wallpaper-fullscreen-viewer');
    const $img = $('#wallpaper-fullscreen-img');
    const $setWallpaperBtn = $('#cg-set-wallpaper-btn');
    const $navControls = $('#cg-nav-controls');
    const $indexDisplay = $('#cg-index-display');

    // Lấy số ảnh tối đa của cảnh này
    const maxCount = CG_LIST[characterName]?.[sceneType] || 1;
    const index = currentIndex || 1;

    // Lưu thông tin CG hiện tại
    currentCGInfo = {
        character: characterName,
        scene: sceneType,
        current: index,
        max: maxCount
    };

    $img.attr('src', imgUrl);
    $viewer.addClass('active');

    // Hiển thị điều hướng và nút đặt làm hình nền
    $setWallpaperBtn.data('cg-url', imgUrl).show();
    $navControls.show();

    // Cập nhật chỉ số hiển thị
    $indexDisplay.text(`${index} / ${maxCount}`).show();

    // Cập nhật trạng thái nút
    updateCGNavButtons();
}

function updateCGNavButtons() {
    if (!currentCGInfo) return;

    const $prevBtn = $('#cg-prev-btn');
    const $nextBtn = $('#cg-next-btn');

    // Bật/tắt nút
    $prevBtn.prop('disabled', currentCGInfo.current <= 1)
        .css('opacity', currentCGInfo.current <= 1 ? '0.4' : '1');
    $nextBtn.prop('disabled', currentCGInfo.current >= currentCGInfo.max)
        .css('opacity', currentCGInfo.current >= currentCGInfo.max ? '0.4' : '1');
}

function switchCGImage(direction) {
    if (!currentCGInfo) return;

    let newIndex = currentCGInfo.current;
    if (direction === 'prev' && newIndex > 1) {
        newIndex--;
    } else if (direction === 'next' && newIndex < currentCGInfo.max) {
        newIndex++;
    } else {
        return; // Đã tới giới hạn
    }

    currentCGInfo.current = newIndex;

    // Cập nhật ảnh
    const newUrl = getCGImageUrl(currentCGInfo.character, currentCGInfo.scene, newIndex);
    const $img = $('#wallpaper-fullscreen-img');

    $img.css('opacity', '0.5');
    $img.attr('src', newUrl);
    $img.on('load.cgswitch', function () {
        $img.css('opacity', '1').off('load.cgswitch');
    });

    // Cập nhật URL cho nút đặt làm hình nền
    $('#cg-set-wallpaper-btn').data('cg-url', newUrl);

    // Cập nhật chỉ số hiển thị
    $('#cg-index-display').text(`${newIndex} / ${currentCGInfo.max}`);

    // Cập nhật trạng thái nút
    updateCGNavButtons();
}

// ==================== Hàm dọn dẹp ====================
function cleanupMobilePhone() {
    // Gỡ sự kiện của nút mở điện thoại
    $('#mobile-trigger-btn').off('click');

    // Gỡ listener resize của cửa sổ
    $(window).off('resize.mobilePhone');

    // Gỡ sự kiện kéo giao diện điện thoại, dùng sự kiện gốc.
    const dragHandle = document.getElementById('phone-drag-handle');
    if (dragHandle) {
        dragHandle.removeEventListener('pointerdown', handlePhoneDragStart);
        dragHandle.removeEventListener('pointermove', handlePhoneDragMove);
        dragHandle.removeEventListener('pointerup', handlePhoneDragEnd);
        dragHandle.removeEventListener('pointercancel', handlePhoneDragEnd);
    }

    // Đặt lại trạng thái kéo
    isDragging = false;
    hasMoved = false;
    isPhoneDragging = false;

    // Đặt lại trạng thái ghim lên trên
    isPinned = false;

    const phoneOverlay = document.getElementById('mobile-phone-overlay');
    if (phoneOverlay && phoneOverlay.__phoneUiUnderscoreObserver) {
        phoneOverlay.__phoneUiUnderscoreObserver.disconnect();
        phoneOverlay.__phoneUiUnderscoreObserver = null;
    }

    $('#mobile-trigger-btn').remove();
    $('#mobile-phone-overlay').remove();
    $('#mobile-phone-styles').remove();
}

// ==================== Xuất hàm toàn cục ====================
if (typeof window !== 'undefined') {
    window.initializeMobilePhone = initializeMobilePhone;
    window.cleanupMobilePhone = cleanupMobilePhone;
    window.openMobilePhone = openMobilePhone;
    window.closeMobilePhone = closeMobilePhone;
    window.togglePin = togglePin;

    // Hàm liên quan đến hình nền
    window.toggleWallpaperCategory = toggleWallpaperCategory;
    window.setWallpaper = setWallpaper;
    window.resetWallpaper = resetWallpaper;
    window.uploadCustomWallpaper = uploadCustomWallpaper;
    window.openWallpaperFullscreen = openWallpaperFullscreen;
    window.closeWallpaperFullscreen = closeWallpaperFullscreen;

    // Hàm liên quan đến trò chuyện
    window.openChatPanel = openChatPanel;
    window.closeChatPanel = closeChatPanel;
    window.renderChatMessages = renderChatMessages;
    window.sendChatMessage = sendChatMessage;

    // Hàm xử lý ảnh
    window.viewFullImage = viewFullImage;
    window.processMessageImages = processMessageImages;

    // Hàm liên quan đến diễn đàn
    window.phoneGenerateForum = async function () {
        const manager = window.phoneForumManager;

        if (!manager) {
            alert('Trình quản lý diễn đàn chưa được khởi tạo, hãy tải lại trang rồi thử lại');
            return;
        }

        // Đánh dấu trạng thái đang tạo
        isForumGenerating = true;

        // Hiển thị trạng thái tải
        const $generateBtn = $('.phone-forum-generate-btn');
        const originalBtnHtml = $generateBtn.html();

        // Đổi nút sang biểu tượng đồng hồ cát
        $generateBtn.prop('disabled', true);
        $generateBtn.html('<i class="fas fa-hourglass-half fa-spin"></i>');
        $generateBtn.css({
            'background': '#9E9E9E',
            'cursor': 'not-allowed'
        });

        // Thêm gợi ý "đang làm mới" ở cạnh tiêu đề
        const $titleContainer = $('.phone-forum-generate-btn').parent().prev();
        $titleContainer.find('.forum-loading-tip').remove(); // Gỡ gợi ý cũ
        $titleContainer.append('<span class="forum-loading-tip" style="font-size: 12px; color: #FF9800; white-space: nowrap;"><i class="fas fa-hourglass-half fa-spin"></i> Đang làm mới</span>');

        if (typeof toastr !== 'undefined') {
            toastr.info('Đang tạo nội dung diễn đàn...', 'Diễn đàn');
        }

        try {
            await manager.generateForumContent();

            // Kiểm tra điện thoại còn đang mở hay không; người dùng có thể đóng trong lúc tạo.
            const $overlay = $('#mobile-phone-overlay');
            const isPhoneOpen = $overlay.hasClass('active');

            // Xóa dấu trạng thái đang tạo
            isForumGenerating = false;

            if (!isPhoneOpen) {
                return;
            }

            // Kiểm tra hiện còn ở bảng diễn đàn hay không; người dùng có thể đã chuyển ứng dụng.
            if (currentPanel !== 'forum') {
                return;
            }

            $('#phone-app-body').html(generateForumPanel());

            if (typeof toastr !== 'undefined') {
                toastr.success('Nội dung diễn đàn đã được cập nhật!', 'Diễn đàn');
            }
        } catch (error) {

            // Xóa dấu trạng thái đang tạo
            isForumGenerating = false;

            // Kiểm tra điện thoại còn đang mở hay không
            const $overlay = $('#mobile-phone-overlay');
            const isPhoneOpen = $overlay.hasClass('active');

            if (!isPhoneOpen) {
                return;
            }

            // Khôi phục trạng thái nút, chỉ khi giao diện điện thoại còn mở.
            const $btn = $('.phone-forum-generate-btn');
            $btn.prop('disabled', false);
            $btn.html(originalBtnHtml);
            $btn.css({
                'background': '#4CAF50',
                'cursor': 'pointer'
            });

            // Gỡ gợi ý đang tải
            $('.forum-loading-tip').remove();

            if (typeof toastr !== 'undefined') {
                const errorMessage = error?.message || String(error) || 'Lỗi không xác định';
                const errorMsg = errorMessage.length > 200 ? errorMessage.substring(0, 200) + '...' : errorMessage;
                toastr.error(errorMsg, 'Tạo diễn đàn thất bại', {
                    timeOut: 10000,
                    extendedTimeOut: 5000,
                    closeButton: true,
                    progressBar: true
                });
            } else {
                alert('Tạo diễn đàn thất bại:\n' + (error?.message || String(error) || 'Lỗi không xác định'));
            }
        }
    };

    window.resetMobileTriggerPosition = function () {
        localStorage.removeItem('mobile-trigger-btn-position');
        $('#mobile-trigger-btn').css({
            left: 'auto',
            top: 'auto',
            right: '20px',
            bottom: '20px'
        });
    };

    window.resetPanelMemory = function () {
        localStorage.removeItem('mobile-last-panel');
        if (typeof toastr !== 'undefined') {
            toastr.success('Đã xóa ghi nhớ bảng');
        }
    };
    window.testMobileDrag = function () {
        const rect = $('#mobile-trigger-btn')[0]?.getBoundingClientRect();

        // Kiểm tra localStorage
        const saved = localStorage.getItem('mobile-trigger-btn-position');
        if (saved) {
        } else {
        }
    };

    window.clearMobilePosition = function () {
        localStorage.removeItem('mobile-trigger-btn-position');
    };

    window.fixMobilePhone = function () {
        // Dọn dẹp và khởi tạo lại
        cleanupMobilePhone();
        setTimeout(() => {
            initializeMobilePhone();
        }, 100);
    };

    // Công cụ debug: kiểm tra phân tích tin nhắn nhóm
    window.testGroupMessageParsing = function (testMessages) {

        const regex = /\[(?:Tin_nhắn_nhóm|\u7fa4\u804a\u6d88\u606f)\|([^|]*)\|([^|]*)\|([^|]*)\|([^\]]*)\]/g;

        const messages = testMessages || [
            '[Tin_nhắn_nhóm|745816|Natsume|Văn_bản|Gâu!]',
            '[Tin_nhắn_nhóm|745816|Natsume|Âm_thanh|(Một tràng sủa gấp gáp vui vẻ, lẫn cả tiếng rên ư ử vì phấn khích.)]',
            '[Tin_nhắn_nhóm|745816|Natsume|Văn_bản|Muốn!! Natsume muốn ăn!]',
            '[Tin_nhắn_nhóm|745816|Bạch Đoàn|Văn_bản|.]'
        ];

        messages.forEach((text, i) => {
            regex.lastIndex = 0;
            const match = regex.exec(text);
            if (match) {
            } else {
            }
        });
    };

}

// ==================== Chức năng làm mới theo thời gian thực ====================
/**
 * Thiết lập listener sự kiện tin nhắn.
 * Tham khảo cách triển khai trong mobile-master/app/message-app.js.
 */
function setupMessageEventListener() {
    if (isEventListening) {
        console.log('[Tự động tạo diễn đàn] Listener sự kiện đã tồn tại, bỏ qua thiết lập');
        return;
    }


    // Nhiều cách phát hiện, tham khảo mobile-master.
    const detectionMethods = [
        // Cách 1: SillyTavern.getContext()
        () => {
            if (window.SillyTavern && typeof window.SillyTavern.getContext === 'function') {
                const context = window.SillyTavern.getContext();
                if (context && context.eventSource && typeof context.eventSource.on === 'function' && context.event_types) {
                    return {
                        eventSource: context.eventSource,
                        event_types: context.event_types,
                        foundIn: 'SillyTavern.getContext()'
                    };
                }
            }
            return null;
        },

        // Cách 2: hàm eventOn toàn cục
        () => {
            if (typeof eventOn === 'function' && typeof tavern_events !== 'undefined' && tavern_events.MESSAGE_RECEIVED) {
                return {
                    eventSource: { on: eventOn },
                    event_types: tavern_events,
                    foundIn: 'global eventOn'
                };
            }
            return null;
        },

        // Cách 3: eventSource ở cửa sổ cha
        () => {
            if (window.parent && window.parent.eventSource && typeof window.parent.eventSource.on === 'function') {
                if (window.parent.event_types && window.parent.event_types.MESSAGE_RECEIVED) {
                    return {
                        eventSource: window.parent.eventSource,
                        event_types: window.parent.event_types,
                        foundIn: 'parent.eventSource'
                    };
                }
            }
            return null;
        }
    ];

    // Thử từng cách phát hiện
    for (let i = 0; i < detectionMethods.length; i++) {
        try {
            const result = detectionMethods[i]();
            if (result && result.eventSource && result.event_types) {

                // Gắn sự kiện nhận tin nhắn
                if (result.event_types.MESSAGE_RECEIVED) {
                    result.eventSource.on(result.event_types.MESSAGE_RECEIVED, onMessageReceived);
                    isEventListening = true;
                    console.log('[Tự động tạo diễn đàn] Gắn listener sự kiện thành công, nguồn:', result.foundIn);

                    // Khởi tạo bộ đếm tin nhắn
                    updateMessageCount();

                    // Đồng thời khởi tạo bộ đếm tự động tạo diễn đàn
                    if (window.phoneForumManager && window.phoneForumManager.apiConfig) {
                        window.phoneForumManager.apiConfig.resetAutoGenerateCounter();
                    }

                    return;
                }
            }
        } catch (error) {
            console.error('[Tự động tạo diễn đàn] Cách phát hiện', i, 'thất bại:', error);
        }
    }

    // Nếu mọi cách đều thất bại, dùng polling làm phương án dự phòng.
    console.log('[Tự động tạo diễn đàn] Mọi cách phát hiện sự kiện đều thất bại, khởi động polling dự phòng');
    startRefreshPolling();
}

/**
 * Xử lý sự kiện nhận tin nhắn.
 */
function onMessageReceived(messageId) {
    try {
        console.log('[Tự động tạo diễn đàn] Nhận sự kiện tin nhắn, messageId:', messageId);

        // Kiểm tra thay đổi số lượng tin nhắn
        const currentCount = getCurrentMessageCount();
        console.log('[Tự động tạo diễn đàn] Số lượng tin nhắn:', { currentCount, lastMessageCount });

        if (currentCount > lastMessageCount) {
            lastMessageCount = currentCount;

            // Làm mới bảng tin nhắn
            refreshMessagesPanel();

            // Kiểm tra có cần tự động tạo diễn đàn hay không
            checkAutoGenerateForum();
        }
    } catch (error) {
        console.error('[Tự động tạo diễn đàn] Lỗi onMessageReceived:', error);
    }
}

/**
 * Kiểm tra và kích hoạt tự động tạo diễn đàn.
 */
async function checkAutoGenerateForum() {
    try {
        console.log('[Tự động tạo diễn đàn] Bắt đầu kiểm tra...');

        const manager = window.phoneForumManager;
        if (!manager || !manager.apiConfig) {
            console.log('[Tự động tạo diễn đàn] Không có manager hoặc apiConfig');
            return;
        }

        const apiConfig = manager.apiConfig;

        // Kiểm tra có nên tự động tạo hay không
        if (!apiConfig.shouldAutoGenerate()) {
            console.log('[Tự động tạo diễn đàn] shouldAutoGenerate trả về false, bỏ qua');
            return;
        }

        // Tăng bộ đếm tin nhắn và kiểm tra đã đạt ngưỡng chưa.
        const shouldGenerate = apiConfig.incrementMessageCount();

        if (shouldGenerate) {
            console.log('[Tự động tạo diễn đàn] Đã đạt ngưỡng, bắt đầu tự động tạo diễn đàn...');

            // Đặt trạng thái đang tạo
            apiConfig.autoGenerateState.isGenerating = true;
            isForumGenerating = true;  // Đặt trạng thái tạo toàn cục

            // Nếu đang xem bảng diễn đàn, làm mới ngay để hiển thị trạng thái đang tạo.
            if (currentPanel === 'forum') {
                $('#phone-app-body').html(generateForumPanel());
            }

            // Hiển thị thông báo bắt đầu tạo
            if (apiConfig.settings.autoGenerate.showNotification && typeof toastr !== 'undefined') {
                toastr.info(
                    `Đã đạt ngưỡng ${apiConfig.settings.autoGenerate.threshold} tầng, đang tự động tạo nội dung diễn đàn...`,
                    '📰 Tự động tạo diễn đàn',
                    { timeOut: 3000 }
                );
            }

            try {
                // Gọi trình tạo diễn đàn
                await manager.generateForumContent();

                // Đặt lại bộ đếm
                apiConfig.resetAutoGenerateCounter();

                // Hiển thị thông báo thành công
                if (apiConfig.settings.autoGenerate.showNotification && typeof toastr !== 'undefined') {
                    toastr.success(
                        'Nội dung diễn đàn đã được tự động cập nhật',
                        '📰 Đã tạo diễn đàn xong',
                        {
                            timeOut: 5000,
                            onclick: function () {
                                // Mở bảng diễn đàn khi bấm thông báo
                                if (window.openMobilePhone) {
                                    window.openMobilePhone('forum');
                                }
                            }
                        }
                    );
                }

                // Nếu đang xem bảng diễn đàn, làm mới hiển thị.
                if (currentPanel === 'forum') {
                    $('#phone-app-body').html(generateForumPanel());
                }

                console.log('[Tự động tạo diễn đàn] Tự động tạo hoàn tất');

            } catch (error) {
                console.error('[Tự động tạo diễn đàn] Tạo thất bại:', error);

                if (apiConfig.settings.autoGenerate.showNotification && typeof toastr !== 'undefined') {
                    toastr.error(
                        'Tự động tạo diễn đàn thất bại: ' + (error.message || 'Lỗi không xác định'),
                        '📰 Tạo diễn đàn thất bại',
                        { timeOut: 5000 }
                    );
                }
            } finally {
                // Đặt lại trạng thái tạo
                apiConfig.autoGenerateState.isGenerating = false;
                isForumGenerating = false;  // Đặt lại trạng thái tạo toàn cục

                // Làm mới bảng diễn đàn để khôi phục trạng thái nút.
                if (currentPanel === 'forum') {
                    $('#phone-app-body').html(generateForumPanel());
                }
            }
        }
    } catch (error) {
        console.error('[Tự động tạo diễn đàn] Kiểm tra thất bại:', error);
    }
}

/**
 * Lấy số lượng tin nhắn hiện tại.
 */
function getCurrentMessageCount() {
    try {
        // Trong iframe cần lấy SillyTavern từ cửa sổ cha.
        let targetWindow = window;
        if (window.parent && window.parent !== window) {
            try {
                if (window.parent.SillyTavern) {
                    targetWindow = window.parent;
                }
            } catch (e) {
            }
        }

        if (targetWindow.SillyTavern && targetWindow.SillyTavern.getContext) {
            const context = targetWindow.SillyTavern.getContext();
            return context.chat ? context.chat.length : 0;
        }
    } catch (error) {
    }
    return 0;
}

/**
 * Cập nhật bộ đếm tin nhắn.
 */
function updateMessageCount() {
    lastMessageCount = getCurrentMessageCount();
}

/**
 * Làm mới bảng tin nhắn.
 */
function refreshMessagesPanel() {
    try {
        // Chỉ làm mới khi đang mở bảng tin nhắn.
        if (currentPanel === 'messages' && currentPhoneData) {

            // Tạo lại nội dung bảng
            const content = generateMessagesPanel(currentPhoneData);
            $('#phone-app-body').html(content);

            // Gắn lại sự kiện
            bindMessagePanelEvents();

        }
    } catch (error) {
    }
}

/**
 * Khởi động polling làm mới, dùng làm phương án dự phòng.
 */
function startRefreshPolling() {
    // Xóa polling cũ
    if (refreshPollingInterval) {
        clearInterval(refreshPollingInterval);
    }

    console.log('[Tự động tạo diễn đàn] Khởi động polling làm mới, chu kỳ 5 giây');

    refreshPollingInterval = setInterval(() => {
        const currentCount = getCurrentMessageCount();

        if (currentCount > lastMessageCount) {
            console.log('[Tự động tạo diễn đàn] Polling phát hiện tin nhắn mới:', { currentCount, lastMessageCount });
            lastMessageCount = currentCount;
            refreshMessagesPanel();

            // Kiểm tra có cần tự động tạo diễn đàn hay không
            checkAutoGenerateForum();
        }
    }, 5000); // Kiểm tra mỗi 5 giây
}

/**
 * Dừng cơ chế làm mới.
 */
function stopRefreshMechanism() {
    // Xóa polling
    if (refreshPollingInterval) {
        clearInterval(refreshPollingInterval);
        refreshPollingInterval = null;
    }

    // Xóa làm mới chat
    if (chatPanelRefreshInterval) {
        clearInterval(chatPanelRefreshInterval);
        chatPanelRefreshInterval = null;
    }

    // Đánh dấu đã dừng lắng nghe
    isEventListening = false;
}

/**
 * Gắn sự kiện cho bảng tin nhắn.
 */
function bindMessagePanelEvents() {
    // Gắn sự kiện bấm liên hệ
    $('.contact-item').off('click').on('click', function () {
        const contactType = $(this).data('type');
        const contactId = $(this).data('id');
        const contactName = $(this).data('name');
        const isGroup = contactType === 'group';
        const members = $(this).data('members') || '';


        // Mở bảng chat
        openChatPanel(contactId, contactName, isGroup, members);
    });
}

// ==================== Chức năng quản lý nhóm chat ====================
/**
 * Xóa nội dung được bọc trong tag thinking.
 * Tham khảo mobile-master/app/message-app.js.
 */
function removeThinkingTags(text) {
    if (!text || typeof text !== 'string') {
        return text;
    }

    // Xóa tag <think>...</think> và <thinking>...</thinking> cùng nội dung bên trong.
    const thinkingTagRegex = /<think>[\s\S]*?<\/think>|<thinking>[\s\S]*?<\/thinking>/gi;
    return text.replace(thinkingTagRegex, '');
}

/**
 * Kiểm tra dấu định dạng có nằm trong tag thinking hay không.
 * Tham khảo mobile-master/app/message-app.js.
 */
function isPatternInsideThinkingTags(text, patternStart, patternEnd) {
    if (!text || typeof text !== 'string') {
        return false;
    }

    const thinkingTagRegex = /<think>[\s\S]*?<\/think>|<thinking>[\s\S]*?<\/thinking>/gi;
    let match;

    while ((match = thinkingTagRegex.exec(text)) !== null) {
        const thinkStart = match.index;
        const thinkEnd = match.index + match[0].length;

        // Kiểm tra dấu định dạng có nằm trọn trong tag thinking hay không.
        if (patternStart >= thinkStart && patternEnd <= thinkEnd) {
            return true;
        }
    }

    return false;
}

/**
 * Chỉ xóa dấu định dạng nằm ngoài tag thinking.
 * Tham khảo mobile-master/app/message-app.js.
 */
function removePatternOutsideThinkingTags(text, pattern) {
    if (!text || typeof text !== 'string') {
        return text;
    }

    // Tạo instance regex mới để tránh vấn đề lastIndex.
    const newPattern = new RegExp(pattern.source, pattern.flags);
    let result = text;
    const replacements = [];
    let match;

    // Tìm toàn bộ kết quả khớp
    while ((match = newPattern.exec(text)) !== null) {
        const matchStart = match.index;
        const matchEnd = match.index + match[0].length;

        // Kiểm tra kết quả khớp này có nằm trong tag thinking hay không.
        if (!isPatternInsideThinkingTags(text, matchStart, matchEnd)) {
            replacements.push({
                start: matchStart,
                end: matchEnd,
                text: match[0]
            });
        }
    }

    // Thay từ cuối về đầu để tránh lệch chỉ số.
    replacements.reverse().forEach(replacement => {
        result = result.substring(0, replacement.start) + result.substring(replacement.end);
    });

    return result;
}

/**
 * Xóa nhóm chat.
 * Tham khảo đầy đủ cách triển khai trong mobile-master/app/message-app.js.
 * @param {string} groupId - ID nhóm chat.
 * @param {string} groupName - Tên nhóm chat.
 */
async function deleteGroup(groupId, groupName) {

    const confirmed = await showCustomConfirm({
        title: 'Xóa nhóm chat',
        message: 'Thao tác này sẽ xóa dấu định dạng nhóm chat và các bản ghi tin nhắn liên quan trong lịch sử.',
        icon: '',
        itemInfo: {
            name: groupName,
            description: `ID nhóm chat: ${groupId}`,
            icon: '🎁'
        },
        confirmText: 'Xác nhận xóa',
        cancelText: 'Hủy'
    });

    if (!confirmed) {
        return;
    }

    try {
        const targetWindow = window.parent || window;

        // Kiểm tra SillyTavern API
        if (!targetWindow.SillyTavern || typeof targetWindow.SillyTavern.getContext !== 'function') {
            throw new Error('SillyTavern API không khả dụng');
        }

        const context = targetWindow.SillyTavern.getContext();
        if (!context || !context.chat || !Array.isArray(context.chat)) {
            throw new Error('Ngữ cảnh chat không khả dụng');
        }

        if (typeof toastr !== 'undefined') {
            toastr.info('Đang tìm tin nhắn nhóm chat liên quan...');
        }


        // Tìm tin nhắn chứa thông tin nhóm chat này
        const messagesToProcess = [];

        // Tạo regex cho mọi định dạng có thể chứa ID nhóm chat.
        // Chỉ cần trong cặp [] có ID mục tiêu là khớp.
        const allGroupFormatsRegex = new RegExp(`\\[[^\\]]*\\|${groupId}\\|[^\\]]*\\]|\\[[^\\]]*\\|${groupId}\\]`, 'g');

        context.chat.forEach((message, index) => {
            if (message.mes && typeof message.mes === 'string') {
                let messageModified = false;
                let newMessageContent = message.mes;

                // Tiền xử lý: xóa phần thinking trước khi kiểm tra.
                const messageForCheck = removeThinkingTags(message.mes);

                // Kiểm tra nội dung sau khi bỏ thinking có chứa dấu định dạng nhóm chat hay không.
                allGroupFormatsRegex.lastIndex = 0;
                if (allGroupFormatsRegex.test(messageForCheck)) {
                    // Chỉ xóa dấu định dạng nhóm chat nằm ngoài tag thinking.
                    newMessageContent = removePatternOutsideThinkingTags(message.mes, allGroupFormatsRegex);
                    messageModified = newMessageContent !== message.mes;
                    if (messageModified) {
                    }
                }

                if (messageModified) {
                    messagesToProcess.push({
                        index: index,
                        id: message.id || index,
                        action: newMessageContent.trim().length > 0 ? 'modify' : 'delete',
                        reason: 'Xóa dấu định dạng nhóm chat',
                        originalContent: message.mes,
                        newContent: newMessageContent.trim(),
                        preview: message.mes.length > 50 ? message.mes.substring(0, 50) + '...' : message.mes
                    });
                }

                // Đặt lại regex
                allGroupFormatsRegex.lastIndex = 0;
            }
        });

        if (messagesToProcess.length === 0) {
            if (typeof toastr !== 'undefined') {
                toastr.warning('Không tìm thấy bản ghi nhóm chat liên quan');
            }
            return;
        }

        if (typeof toastr !== 'undefined') {
            toastr.info(`Tìm thấy ${messagesToProcess.length} tin nhắn liên quan, đang xử lý...`);
        }

        // Xử lý từ cuối lên đầu để tránh lệch chỉ số.
        const sortedMessages = messagesToProcess.sort((a, b) => b.index - a.index);
        let processedCount = 0;

        for (const msgInfo of sortedMessages) {
            try {
                if (msgInfo.action === 'delete') {
                    // Xóa trực tiếp khỏi mảng
                    context.chat.splice(msgInfo.index, 1);
                } else if (msgInfo.action === 'modify') {
                    // Sửa nội dung tin nhắn
                    context.chat[msgInfo.index].mes = msgInfo.newContent;
                }
                processedCount++;
            } catch (error) {
            }
        }

        // Lưu chat
        if (typeof context.saveChat === 'function') {
            await context.saveChat();
        }

        if (processedCount > 0) {
            if (typeof toastr !== 'undefined') {
                toastr.success(`Đã xử lý thành công ${processedCount} tin nhắn liên quan đến nhóm "${groupName}"`);
            }

            // Đóng bảng chat và làm mới danh sách tin nhắn
            closeChatPanel();

            setTimeout(() => {
                if (currentPhoneData) {
                    const content = generateMessagesPanel(currentPhoneData);
                    $('#phone-app-body').html(content);
                }
            }, 500);
        } else {
            if (typeof toastr !== 'undefined') {
                toastr.error('Xử lý thất bại');
            }
        }

    } catch (error) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Xóa nhóm chat thất bại: ' + error.message);
        }
    }
}

/**
 * Mở bảng tạo nhóm chat.
 * Tham khảo mobile-master/app/message-app.js.
 */
function openCreateGroupPanel() {

    const content = generateCreateGroupPanel();

    // Cập nhật tiêu đề và nội dung bảng
    $('#phone-app-title').text(' Tạo nhóm chat');
    $('#phone-app-body').html(content);
    $('#phone-detail-panel').addClass('active');

    // Lưu trạng thái bảng hiện tại
    currentPanel = 'create-group';

    // Gắn sự kiện
    bindCreateGroupEvents();
}

/**
 * Tạo nội dung bảng tạo nhóm chat.
 */
function generateCreateGroupPanel() {
    // Lấy toàn bộ bạn bè để chọn
    const availableFriends = getAvailableFriendsForGroup();

    return `
        <div class="create-group-container" style="padding: 16px;">
            <!-- Tên nhóm chat -->
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #374151;">
                    <span style="color: #ef4444;">*</span> Tên nhóm chat
                </label>
                <input type="text" id="group-name-input" placeholder="Nhập tên nhóm chat" 
                    style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: all 0.2s; background: #ffffff; color: #1f2937;"
                    onfocus="this.style.borderColor='#667eea'; this.style.background='#ffffff'" onblur="this.style.borderColor='#e5e7eb'">
            </div>
            
            <!-- ID nhóm chat -->
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #374151;">
                    <span style="color: #ef4444;">*</span> ID nhóm chat
                </label>
                <input type="number" id="group-id-input" placeholder="Nhập ID nhóm chat gồm 6 chữ số" 
                    style="width: 100%; padding: 10px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: all 0.2s; background: #ffffff; color: #1f2937;"
                    onfocus="this.style.borderColor='#667eea'; this.style.background='#ffffff'" onblur="this.style.borderColor='#e5e7eb'">
            </div>
            
            <!-- Chọn thành viên -->
            <div class="form-group" style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <label style="font-size: 13px; font-weight: 600; color: #374151;">
                        <span style="color: #ef4444;">*</span> Chọn thành viên
                    </label>
                    <button id="select-all-friends-btn" 
                        style="padding: 4px 12px; background: #f3f4f6; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; color: #6b7280; font-weight: 500;"
                        onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
                        Chọn tất cả
                    </button>
                </div>
                <div id="friends-selection-list" style="max-height: 200px; overflow-y: auto; border: 2px solid #e5e7eb; border-radius: 8px; padding: 8px;">
                    ${availableFriends.length > 0 ? generateFriendsSelectionList(availableFriends) : '<div style="text-align: center; padding: 20px; color: #9ca3af;">Tạm thời chưa có bạn bè có thể chọn</div>'}
                </div>
            </div>
            
            <!-- Thành viên đã chọn -->
            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #374151;">
                    Thành viên đã chọn
                </label>
                <div id="selected-members-container" style="display: flex; flex-wrap: wrap; gap: 8px; padding: 12px; background: #f9fafb; border-radius: 8px; min-height: 60px;">
                    <div class="selected-member-tag" data-member="Tôi" style="display: inline-flex; align-items: center; padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; font-size: 13px; font-weight: 500;">
                        <span>Tôi (chủ nhóm)</span>
                    </div>
                </div>
            </div>
            
            <!-- Nút tạo -->
            <button id="create-group-submit-btn" 
                style="width: 100%; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(102, 126, 234, 0.4)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(102, 126, 234, 0.3)'">
                <span style="font-size: 16px; margin-right: 6px;"></span> Tạo nhóm chat
            </button>
            
            <!-- Gợi ý -->
            <div style="margin-top: 16px; padding: 12px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <div style="font-size: 12px; color: #1e40af; line-height: 1.6;">
                    <div style="margin-bottom: 6px;"> <strong>Gợi ý:</strong></div>
                    <div>• Sau khi tạo sẽ tự động ghi vào tầng chat mới nhất.</div>
                    <div>• Định dạng: [Nhóm_chat|Tên_nhóm|Mã_nhóm|Danh_sách_thành_viên]</div>
                    <div>• Phải chọn ít nhất một thành viên.</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Lấy danh sách bạn bè có thể chọn.
 */
function getAvailableFriendsForGroup() {
    const friends = [];

    try {
        // Lấy bạn bè từ biến MVU
        const relationshipSource = getRelationshipDataSource(currentPhoneData);
        if (relationshipSource) {
            getRelationshipKeys(relationshipSource).forEach(studentKey => {
                const friend = relationshipSource[studentKey];
                if (!friend || typeof friend !== 'object') return;
                const displayName = restoreEraText(studentKey);
                friends.push({
                    id: `friend_${studentKey}`,
                    name: displayName,
                    identity: ''
                });
            });
        }

        // Trích bạn bè từ lịch sử chat
        const chatFriends = extractFriendsFromChat();
        chatFriends.forEach(chatFriend => {
            // Kiểm tra đã tồn tại hay chưa
            const exists = friends.some(f => f.id === chatFriend.id || f.name === chatFriend.name);
            if (!exists) {
                friends.push({
                    id: chatFriend.id,
                    name: chatFriend.name,
                    identity: 'Lịch sử chat'
                });
            }
        });

    } catch (error) {
    }

    return friends;
}

/**
 * Tạo danh sách chọn bạn bè.
 */
function generateFriendsSelectionList(friends) {
    return friends.map(friend => `
        <div class="friend-selection-item" data-friend-id="${friend.id}" data-friend-name="${friend.name}"
            style="display: flex; align-items: center; padding: 8px; margin-bottom: 4px; border-radius: 6px; cursor: pointer; transition: all 0.2s;"
            onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
            <input type="checkbox" class="friend-checkbox" value="${friend.id}" 
                style="margin-right: 10px; width: 16px; height: 16px; cursor: pointer;">
            <div style="flex: 1;">
                <div style="font-size: 13px; font-weight: 500; color: #1f2937;">${friend.name}</div>
                <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">${friend.identity}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Gắn sự kiện liên quan đến tạo nhóm chat.
 */
function bindCreateGroupEvents() {
    // Nút chọn tất cả
    $('#select-all-friends-btn').off('click').on('click', function () {
        const $checkboxes = $('.friend-checkbox');
        const allChecked = $checkboxes.toArray().every(cb => cb.checked);

        $checkboxes.prop('checked', !allChecked);
        $(this).text(allChecked ? 'Chọn tất cả' : 'Bỏ chọn tất cả');

        // Cập nhật hiển thị thành viên đã chọn
        updateSelectedMembers();
    });

    // Chọn bạn bè
    $('.friend-checkbox').off('change').on('change', function () {
        updateSelectedMembers();
    });

    // Nút tạo
    $('#create-group-submit-btn').off('click').on('click', function () {
        createGroup();
    });

    // Nút xóa thành viên, dùng ủy quyền sự kiện.
    $('body').off('click.removeMember').on('click.removeMember', '.remove-member-btn', function (e) {
        e.stopPropagation();
        const friendId = $(this).data('friend-id');
        removeMember(friendId);
    });
}

/**
 * Cập nhật hiển thị thành viên đã chọn.
 */
function updateSelectedMembers() {
    const $container = $('#selected-members-container');
    const $checkboxes = $('.friend-checkbox:checked');

    // Giữ thẻ "Tôi"
    $container.html(`
        <div class="selected-member-tag" data-member="Tôi" style="display: inline-flex; align-items: center; padding: 6px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; font-size: 13px; font-weight: 500;">
            <span>Tôi (chủ nhóm)</span>
        </div>
    `);

    // Thêm bạn bè đã chọn
    $checkboxes.each(function () {
        const $item = $(this).closest('.friend-selection-item');
        const friendName = $item.data('friend-name');
        const friendId = $item.data('friend-id');

        $container.append(`
            <div class="selected-member-tag" data-member="${friendId}" style="display: inline-flex; align-items: center; padding: 6px 12px; background: #3b82f6; color: white; border-radius: 16px; font-size: 13px; font-weight: 500;">
                <span>${friendName}</span>
                <span class="remove-member-btn" data-friend-id="${friendId}" style="margin-left: 6px; cursor: pointer; opacity: 0.8;">✕</span>
            </div>
        `);
    });
}

/**
 * Xóa thành viên đã chọn.
 */
function removeMember(friendId) {
    $(`.friend-checkbox[value="${friendId}"]`).prop('checked', false);

    // Cập nhật hiển thị
    updateSelectedMembers();
}

/**
 * Tạo nhóm chat.
 */
async function createGroup() {
    const groupName = $('#group-name-input').val().trim();
    const groupId = $('#group-id-input').val().trim();
    const $checkboxes = $('.friend-checkbox:checked');

    // Kiểm tra dữ liệu nhập
    if (!groupName) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Hãy nhập tên nhóm chat');
        }
        return;
    }

    if (!groupId || !/^\d+$/.test(groupId)) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Hãy nhập ID nhóm chat hợp lệ, chỉ gồm chữ số');
        }
        return;
    }

    if ($checkboxes.length === 0) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Hãy chọn ít nhất một thành viên nhóm');
        }
        return;
    }

    // Thu thập danh sách thành viên
    const members = ['Tôi']; // Chủ nhóm mặc định có mặt trong nhóm.
    $checkboxes.each(function () {
        const $item = $(this).closest('.friend-selection-item');
        const friendName = $item.data('friend-name');
        members.push(friendName);
    });

    // Định dạng thông tin nhóm chat: [Nhóm_chat|Tên_nhóm|Mã_nhóm|Danh_sách_thành_viên].
    const membersStr = members.join(', ');
    const groupInfo = `[Nhóm_chat|${groupName}|${groupId}|${membersStr}]`;


    try {

        // Kiểm tra SillyTavern đã sẵn sàng hay chưa
        const targetWindow = window.parent || window;
        if (!targetWindow.SillyTavern || typeof targetWindow.SillyTavern.getContext !== 'function') {
            throw new Error('SillyTavern API không khả dụng');
        }

        const context = targetWindow.SillyTavern.getContext();
        if (!context || !context.chat || !Array.isArray(context.chat)) {
            throw new Error('Ngữ cảnh chat không khả dụng');
        }


        // Tạo đối tượng tin nhắn, tham khảo phương thức addMessage trong mobile-master/context-editor.js.
        const message = {
            name: 'Hệ thống',
            is_user: true,
            is_system: false,
            force_avatar: false,
            mes: groupInfo,
            send_date: Date.now(),
            extra: {}
        };

        // Thêm vào mảng chat
        context.chat.push(message);

        // Dùng SillyTavern API để thêm tin nhắn
        if (typeof context.addOneMessage === 'function') {
            context.addOneMessage(message);
        }

        // Lưu chat
        if (typeof context.saveChat === 'function') {
            await context.saveChat();
        }


        if (typeof toastr !== 'undefined') {
            toastr.success(`Nhóm chat "${groupName}" đã được tạo thành công và thêm vào lịch sử chat`);
        }

        // Đóng bảng trễ một chút rồi làm mới danh sách
        setTimeout(() => {
            closeAppPanel();
            // Làm mới danh sách tin nhắn
            if (currentPhoneData) {
                const content = generateMessagesPanel(currentPhoneData);
                $('#phone-app-body').html(content);
            }
        }, 1000);

    } catch (error) {
        if (typeof toastr !== 'undefined') {
            toastr.error('Tạo nhóm chat thất bại: ' + error.message);
        }
    }
}

/**
 * Popup xác nhận tùy chỉnh.
 * @param {Object} options - Cấu hình popup.
 * @param {string} options.title - Tiêu đề.
 * @param {string} options.message - Nội dung thông báo.
 * @param {string} options.icon - Emoji biểu tượng.
 * @param {Object} options.itemInfo - Thông tin chi tiết của vật phẩm, tùy chọn.
 * @param {string} options.confirmText - Chữ trên nút xác nhận.
 * @param {string} options.cancelText - Chữ trên nút hủy.
 * @returns {Promise<boolean>} - Kết quả lựa chọn của người dùng.
 */
function showCustomConfirm(options = {}) {

    return new Promise((resolve) => {
        const {
            title = 'Xác nhận thao tác',
            message = 'Bạn chắc chắn muốn tiếp tục chứ?',
            icon = '❓',
            itemInfo = null,
            confirmText = 'Xác nhận',
            cancelText = 'Hủy'
        } = options;


        // Tạo HTML thông tin vật phẩm, dùng inline style.
        let itemInfoHtml = '';
        if (itemInfo) {
            itemInfoHtml = `
                <div class="confirm-item-info" style="background:rgba(102,126,234,0.1);border:1px solid rgba(102,126,234,0.3);border-radius:12px;padding:16px;margin-bottom:24px;display:block;width:100%;box-sizing:border-box;">
                    <div class="confirm-item-name" style="display:block;width:100%;margin-bottom:8px;font-size:16px;font-weight:600;color:#f3f4f6;">
                        <span style="margin-right:8px;">${itemInfo.icon || '🎁'}</span>
                        <span>${itemInfo.name || 'Vật phẩm không xác định'}</span>
                    </div>
                    ${itemInfo.description ? `<div class="confirm-item-desc" style="display:block;width:100%;margin-bottom:8px;font-size:14px;color:#d1d5db;line-height:1.6;">${itemInfo.description}</div>` : ''}
                    ${itemInfo.price !== undefined ? `
                        <div class="confirm-item-price" style="display:block;width:100%;margin-bottom:0;font-size:15px;color:#fbbf24;font-weight:600;">
                            <span>💰 Giá:</span>
                            <span>${itemInfo.price} token nhiệm vụ</span>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Tính chiều rộng popup
        const windowWidth = $(window).width();
        const bodyWidth = $('body').width();
        const containerWidth = windowWidth || bodyWidth || 400;
        let modalWidth = Math.min(Math.max(containerWidth * 0.9, 300), 480);
        if (modalWidth < 300 || isNaN(modalWidth)) {
            modalWidth = 400;
        }

        // Tạo HTML popup, đặt inline style trực tiếp trong HTML.
        const confirmHtml = `
            <div class="custom-confirm-overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:100000;opacity:0;transition:opacity 0.3s ease-out;">
                <div class="custom-confirm-modal" style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:20px;padding:2px;width:${modalWidth}px;max-width:480px;min-width:300px;box-shadow:0 12px 40px rgba(0,0,0,0.4);transform:translateY(30px) scale(0.95);opacity:0;transition:all 0.3s ease-out;display:block;box-sizing:border-box;margin:0 auto;">
                    <div class="custom-confirm-content" style="background:#1f2937;border-radius:18px;padding:28px 24px 20px;display:block;width:100%;box-sizing:border-box;min-height:100px;">
                        <div class="confirm-icon" style="width:64px;height:64px;margin:0 auto 20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;">${icon}</div>
                        <div class="confirm-title" style="font-size:22px;font-weight:700;margin-bottom:16px;color:#f3f4f6;text-align:center;display:block;width:100%;">${title}</div>
                        <div class="confirm-message" style="font-size:15px;line-height:1.7;color:#d1d5db;margin-bottom:24px;text-align:center;display:block;width:100%;">${message}</div>
                        ${itemInfoHtml}
                        <div class="confirm-buttons" style="display:flex;gap:12px;width:100%;">
                            <button class="confirm-btn confirm-btn-cancel" data-action="cancel" style="flex:1;padding:14px 20px;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;background:#374151;color:#d1d5db;min-height:48px;">
                                ${cancelText}
                            </button>
                            <button class="confirm-btn confirm-btn-confirm" data-action="confirm" style="flex:1;padding:14px 20px;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;min-height:48px;">
                                ${confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Tạo phần tử popup
        const $confirm = $(confirmHtml);

        // Thêm vào body của cửa sổ cha thay vì trong iframe, để popup vẫn hiển thị nếu điện thoại đóng.
        const targetBody = (window.parent !== window) ? $(window.parent.document.body) : $('body');
        $confirm.appendTo(targetBody);

        // Lấy phần tử modal và content
        const $modal = $confirm.find('.custom-confirm-modal');
        const $content = $confirm.find('.custom-confirm-content');

        // Ép trình duyệt reflow
        $confirm[0].offsetHeight;

        // Kiểm tra kích thước
        const confirmRect = $confirm[0].getBoundingClientRect();
        const modalRect = $modal[0].getBoundingClientRect();

        // Hiệu ứng fade in
        setTimeout(() => {
            $confirm.css('opacity', '1');
        }, 10);

        // Hiệu ứng popup trượt lên
        setTimeout(() => {
            $modal.css({
                'transform': 'translateY(0) scale(1)',
                'opacity': '1'
            });
        }, 50);

        // Xử lý bấm nút
        const handleChoice = (confirmed) => {

            $confirm.fadeOut(200, () => {
                $confirm.remove();
                resolve(confirmed);
            });
        };

        // Gắn sự kiện
        $confirm.find('[data-action="confirm"]').on('click', () => handleChoice(true));
        $confirm.find('[data-action="cancel"]').on('click', () => handleChoice(false));

        // Bấm lớp phủ để hủy
        $confirm.on('click', (e) => {
            if ($(e.target).hasClass('custom-confirm-overlay')) {
                handleChoice(false);
            }
        });

        // Phím ESC để hủy
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                $(document).off('keydown', handleEsc);
                handleChoice(false);
            }
        };
        $(document).on('keydown', handleEsc);

        // Phím Enter để xác nhận
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                $(document).off('keydown', handleEnter);
                handleChoice(true);
            }
        };
        $(document).on('keydown', handleEnter);

        // Tự động focus vào nút xác nhận
        setTimeout(() => {
            $confirm.find('.confirm-btn-confirm').focus();
        }, 100);
    });
}

// ==================== Khởi động ====================
$(() => {
        // Chờ dependency tải xong rồi khởi tạo giao diện điện thoại.
    (async () => {
        const MAX_WAIT_TIME = 30000;
        const CHECK_INTERVAL = 100;
        const startTime = Date.now();

        try {
            // Chờ hàm waitGlobalInitialized sẵn sàng.
            while (typeof waitGlobalInitialized !== 'function') {
                if (Date.now() - startTime > MAX_WAIT_TIME) {
                    console.error('[Giao diện điện thoại] Chờ waitGlobalInitialized quá thời gian, thử khởi tạo trực tiếp');
                    initializeMobilePhone();
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
            }

            // Chờ Mvu khởi tạo xong
            await waitGlobalInitialized('Mvu');
            initializeMobilePhone();
        } catch (e) {
            console.error('[Giao diện điện thoại] Khởi tạo thất bại:', e);
            // Dù có lỗi vẫn thử khởi tạo chức năng cơ bản.
            try {
                initializeMobilePhone();
            } catch (e2) {
                console.error('[Giao diện điện thoại] Khởi tạo dự phòng cũng thất bại:', e2);
            }
        }
    })();
});

// Phím ESC đóng điện thoại hoặc trình xem toàn màn hình
$(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
        // Ưu tiên đóng trình xem hình nền toàn màn hình
        const $viewer = $('#wallpaper-fullscreen-viewer');
        if ($viewer.hasClass('active')) {
            closeWallpaperFullscreen();
            return;
        }

        // Sau đó đóng giao diện điện thoại nếu chưa ghim.
        const overlay = $('#mobile-phone-overlay');
        if (overlay.hasClass('active') && !isPinned) {
            closeMobilePhone();
        }
    }
});

// Dọn dẹp khi unload
$(window).on('unload', () => {
    cleanupMobilePhone();
});
