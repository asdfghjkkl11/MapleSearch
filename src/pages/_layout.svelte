<style>
    .body{
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        background-image: url("/image/wallpaperbetter.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -999;
        opacity: 0.7;
    }
    .bg::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: black;
        opacity: 0.7;
    }
    .header{
        height: 80px;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 24px;
        font-weight: 700;
        background: #292c35;
        color: #fff;
        box-sizing: border-box;
    }
    .footer{
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        gap: 8px;
        background: #292c35;
        color: #b8b8b8;
    }
    @media (max-width: 1200px) {
        .header{
            height: 48px;
        }
        .footer{
            height: 64px;
        }
    }
</style>
<div class="header">
    메이플 캐릭터 검색
</div>
<div class="body">
    <div class="bg">
    </div>
    <slot/>
</div>
<div class="footer">
    <span>Copyright © 2023 asdfghjkkl11</span>
</div>
<script>
</script>
