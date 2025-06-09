// 탭 전환 기능
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        // 실제로는 상품 목록 등도 바꿔야 하지만, 데모에서는 탭만 활성화
    });
});

// 메뉴 버튼 클릭 시 (예시)
document.querySelector('.menu-btn').addEventListener('click', () => {
    alert('메뉴 기능은 준비 중입니다!');
}); 
