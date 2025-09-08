/**
 * 心情紀錄應用程式 - 主要 JavaScript 檔案
 * 負責處理使用者互動、頁面切換動畫和主題切換功能
 */

// 等待 DOM 完全載入後執行
document.addEventListener('DOMContentLoaded', () => {
    // === DOM 元素選取 ===
    const mainCard = document.getElementById('main-card');           // 主要卡片容器
    const moodSection = document.getElementById('mood-section');     // 心情選擇區塊
    const roleSection = document.getElementById('role-section');     // 角色選擇區塊
    const moodButtons = document.querySelectorAll('.mood-btn');     // 所有心情按鈕
    const roleCards = document.querySelectorAll('.role-card');      // 所有角色卡片
    const backBtn = document.getElementById('back-btn');             // 返回按鈕
    const themeToggle = document.getElementById('theme-toggle');     // 主題切換按鈕
    const themeIcon = document.getElementById('theme-icon');         // 主題圖示
    const htmlEl = document.documentElement;                        // HTML 根元素（用於主題切換）

    // === 動態樣式設定 ===
    // 心情按鈕的基礎樣式（使用 Tailwind CSS 類別）
    const baseMoodStyles = "h-16 flex items-center justify-center text-2xl gap-4 p-4 rounded-full bg-white/60 border-2 border-transparent hover:border-violet-300 cursor-pointer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500";
    moodButtons.forEach(el => el.className += ` ${baseMoodStyles}`);
    
    // 角色卡片的基礎樣式
    const baseRoleStyles = "w-full h-20 flex items-center text-left gap-4 p-4 rounded-2xl bg-white/60 border-2 border-transparent hover:border-violet-300 cursor-pointer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500";
    roleCards.forEach(el => el.className += ` ${baseRoleStyles}`);

    /**
     * 頁面區塊切換函數
     * 處理兩個區塊之間的平滑切換動畫
     * @param {HTMLElement} showSection - 要顯示的區塊
     * @param {HTMLElement} hideSection - 要隱藏的區塊
     */
    function switchSection(showSection, hideSection) {
        // 固定主卡片高度，防止切換時的跳動效果
        mainCard.style.height = `${mainCard.offsetHeight}px`;

        // 開始隱藏動畫
        hideSection.classList.remove('fade-in');
        hideSection.classList.add('fade-out');

        // 等待隱藏動畫完成後執行顯示動畫
        setTimeout(() => {
            // 完全隱藏舊區塊並禁用互動
            hideSection.classList.add('opacity-0', 'pointer-events-none');
            
            // 準備顯示新區塊
            showSection.classList.remove('fade-out');
            showSection.classList.remove('opacity-0', 'pointer-events-none');
            showSection.classList.add('fade-in');
            
            // 調整卡片高度以適應新內容（包含 padding）
            mainCard.style.height = `${showSection.offsetHeight + parseInt(window.getComputedStyle(mainCard).paddingTop) * 2}px`;

            // 動畫完成後恢復自動高度
            setTimeout(() => { mainCard.style.height = 'auto' }, 500); 
        }, 500);
    }

    // === 心情按鈕事件處理 ===
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按鈕的選中狀態
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            // 設定當前按鈕為選中狀態
            button.classList.add('selected');
            // 取得選擇的心情值
            const mood = button.dataset.mood;
            console.log(`使用者選擇的心情: ${mood}`);
            
            // 切換到角色選擇頁面
            switchSection(roleSection, moodSection);
        });
    });

    // === 角色卡片事件處理 ===
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            // 取得選擇的角色
            const role = card.dataset.role;
            // 根據角色 ID 取得對應的顯示名稱
            const roleName = role === 'calm' ? '冷靜思考 BOT' : '寶寶 (嗚嗚) bot';
            // 顯示選擇結果（實際應用中可替換為導向聊天頁面）
            alert(`你選擇了 ${roleName}！準備開始聊天囉！`);
        });
    });

    // === 返回按鈕事件處理 ===
    backBtn.addEventListener('click', () => {
        // 從角色選擇頁面返回心情選擇頁面
        switchSection(moodSection, roleSection);
    });


    
    // === 主題切換事件處理 ===
    themeToggle.addEventListener('click', () => {
        // 切換 dark 類別來啟用/停用深色模式
        htmlEl.classList.toggle('dark');
        
        // 根據當前主題更新圖示
        if (htmlEl.classList.contains('dark')) {
            // 深色模式：顯示太陽圖示
            themeIcon.classList.remove('ri-moon-clear-fill');
            themeIcon.classList.add('ri-sun-fill');
        } else {
            // 淺色模式：顯示月亮圖示
            themeIcon.classList.remove('ri-sun-fill');
            themeIcon.classList.add('ri-moon-clear-fill');
        }
    });
});