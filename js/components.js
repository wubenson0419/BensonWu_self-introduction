/**
 * components.js
 * * 這個檔案負責動態載入網站的共用組件，例如導覽列 (nav) 和頁尾 (footer)。
 * 這樣做可以避免在每個 HTML 檔案中重複撰寫相同的程式碼，讓維護更容易。
 */

document.addEventListener("DOMContentLoaded", function() {
    // 定義組件的路徑和目標佔位符的 ID
    const components = [
        { id: 'nav-placeholder', url: 'nav.html' },
        { id: 'footer-placeholder', url: 'footer.html' }
    ];

    // 遍歷所有定義的組件
    components.forEach(component => {
        const placeholder = document.getElementById(component.id);
        if (placeholder) {
            // 使用 fetch API 取得組件的 HTML 內容
            fetch(component.url)
                .then(response => {
                    // 檢查請求是否成功
                    if (!response.ok) {
                        throw new Error(`無法載入 ${component.url}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    // 將取得的 HTML 內容插入到佔位符中
                    placeholder.innerHTML = data;
                    
                    // 如果載入的是導覽列，我們需要重新初始化導覽列的腳本
                    if (component.id === 'nav-placeholder') {
                        initializeMenu();
                    }
                })
                .catch(error => {
                    console.error('載入組件時發生錯誤:', error);
                    // 在頁面上顯示錯誤訊息，方便除錯
                    placeholder.innerHTML = `<p style="color: red;">無法載入 ${component.id}。</p>`;
                });
        }
    });
});

/**
 * 初始化導覽列功能
 * 這個函數會在 nav.html 被載入後執行
 */
function initializeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuIcon = document.getElementById('menu-icon');
    const dropdownItems = document.querySelectorAll('.menu-item-has-children');

    if (!menuToggle) return; // 如果找不到元素，就直接返回

    // 菜單開關按鈕的點擊事件
    menuToggle.addEventListener('click', () => {
        const isActive = document.body.classList.toggle('menu-active');
        // 根據菜單狀態切換圖示
        if (isActive) {
            menuIcon.classList.remove('fa-list-ul');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-list-ul');
        }
    });

    // 點擊遮罩層以關閉菜單
    menuOverlay.addEventListener('click', () => {
        document.body.classList.remove('menu-active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-list-ul');
    });

    // 處理下拉子選單的點擊事件
    dropdownItems.forEach(item => {
        // 找到觸發下拉的連結 (通常是父層的 <a>)
        const link = item.querySelector('a');
        link.addEventListener('click', (event) => {
            // 如果點擊的是有子選單的項目，阻止其預設的跳轉行為
            if (item.querySelector('.submenu')) {
                event.preventDefault();
                // 切換 is-open class 來展開或收合子選單
                item.classList.toggle('is-open');
            }
        });
    });
}
