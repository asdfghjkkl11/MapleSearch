<style>
    .item-modal{
        width: 100vw;
        height: 100vh;
        padding: 64px;
        display: none;
        justify-content: center;
        position: fixed;
        right: 0;
        top: 0;
        background: var(--modal-background);
        box-sizing: border-box;
    }
    .is-show{
        display: flex;
    }
    .modal-content{
        padding: 8px;
        height: fit-content;
        min-width: 360px;
        min-height: 460px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--modal-content-background);
        border-radius: 8px;
        opacity: 1;
        color: var(--text);
    }
    .modal-header{
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 500;
    }
    .modal-header span{
        padding-left: 8px;
    }
    .modal-body{
        padding: 0 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .btn-close{
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--close);
        border: none;
        cursor: pointer;
        background: none;
    }
</style>
<div class="item-modal" class:is-show={is_show} bind:this={modal}>
    <div class="modal-content">
        <div class="modal-header">
            <slot name="header">
                <!--                        slot이 없을때 default 값 -->
                <span>no title</span>
            </slot>
            <button class="btn-close" on:click={modal.hide}>
                <Close/>
            </button>
        </div>
        <div class="modal-body">
            <slot name="content"></slot>
        </div>
    </div>
</div>
<script>
    import Close from "./icon/Close.svelte";
    import {beforeUrlChange} from "@roxi/routify";
    import {onMount, tick} from "svelte";
    export let modal;
    let is_show = false;

    $beforeUrlChange(()=>{
        is_show = false;
        return true;
    });

    onMount(async () => {
        //show함수
        modal.show = function () {
            is_show = true;
            //스크롤잠금
            let body = document.querySelector("body");
            body.style.overflow = "hidden";
            //show이벤트
            const event = new Event("show");
            modal.dispatchEvent(event);

        }

        //hide함수
        modal.hide = function () {
            is_show = false;
            //스크롤잠금해제
            let body = document.querySelector("body");
            body.style.overflow = "auto";
            //hide이벤트
            const event = new Event("hide");
            modal.dispatchEvent(event);
        }
    });
</script>