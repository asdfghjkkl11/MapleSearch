<style>
    .layer{
        background: var(--layer);
    }
    .title{
        text-decoration: none;
        color: var(--highlight);
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
        justify-content: space-between;
        gap: 8px;
        font-size: 24px;
        font-weight: 700;
        color: var(--highlight);
        box-sizing: border-box;
        flex-shrink: 0;
    }
    .footer{
        height: 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        gap: 8px;
        color: var(--footer);
        flex-shrink: 0;
    }
    .icon{
        width: 20px;
        height: 20px;
        cursor: pointer;
        fill: var(--highlight);
    }
    #loader-div{
        position: absolute;
        z-index: 99999;
        left: calc(50% - 66px);
        top: calc(50% - 66px);
    }
    #loader-div:before, #loader-div:after {
        content: "";
        position: absolute;
        top: -8vh;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 16px solid transparent;
        border-top-color: var(--green);
    }

    #loader-div:before {
        z-index: 100;
        animation: spin 1s infinite;
    }

    #loader-div:after {
        border: 16px solid var(--border);
    }

    .loading-background{
        width: 100%;
        height: 100%;
        opacity: 50%;
        background-color: #c1c1c1;
        position: fixed;
        z-index: 10000;
    }
    @media (max-width: 1200px) {
        .header{
            height: 48px;
        }
        .body {
            min-height: calc(100vh - 112px);
        }
    }
    @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
<div class="layer">
    <div class="header">
        <a class="title" href="/">MESO.GG</a>
        <div class="icon" on:click={changeMode}>
            <Darkmode/>
        </div>
    </div>
    <div class="body">
        <slot/>
    </div>
    <div class="footer">
        <span>Data by NEXON Open API</span>
        <span>Copyright © 2023 asdfghjkkl11</span>
    </div>
</div>
<div class="loading-background" style="display: none;">
    <div id="loader-div"></div>
</div>
<script>
    import {afterPageLoad} from "@roxi/routify";
    import {nvl} from "../js/common";
    import Darkmode from "../component/icon/Darkmode.svelte";

    $afterPageLoad(()=>{
        let mode = nvl(localStorage.getItem("mode"),"dark-mode");
        let body = document.querySelector("body");
        body.style.overflow = "auto";
        body.dataset.theme = mode;
    });

    function changeMode(){
        let mode = nvl(localStorage.getItem("mode"),"dark-mode");
        mode = (mode === "dark-mode")?"light-mode":"dark-mode";
        let body = document.querySelector("body");
        body.dataset.theme = mode;
        localStorage.setItem("mode",mode);
    }
</script>
