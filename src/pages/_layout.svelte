<style>
    .layer{
        background: #141517;
    }
    .body{
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 144px);
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .header{
        height: 80px;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 24px;
        font-weight: 700;
        color: #fff;
        box-sizing: border-box;
        flex-shrink: 0;
    }
    .footer{
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        gap: 8px;
        color: #9da5b6;
        flex-shrink: 0;
    }
    @media (max-width: 1200px) {
        .header{
            height: 48px;
        }
    }
</style>
<div class="layer">
    <div class="header">
        MESO.GG
    </div>
    <div class="body">
        <slot/>
    </div>
    <div class="footer">
        <span>Copyright © 2023 asdfghjkkl11</span>
    </div>
</div>
<script>

    import {afterPageLoad} from "@roxi/routify";

    $afterPageLoad(()=>{
        let body = document.querySelector("body");
        body.style.overflow = "auto";
    })
</script>
