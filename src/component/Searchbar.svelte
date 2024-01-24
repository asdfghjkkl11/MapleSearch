<style>
    .selectbar{
        display: flex;
        align-items: center;
    }
    .selectbar > *{
        height: 40px;
        padding: 0;
        border: none;
        box-shadow: 1px 1px 0 0 var(--border),inset 1px 1px 0 0 var(--border);
        box-sizing: border-box;
        -webkit-appearance: none;
    }
    .selectbar.is_focus > *{
        box-shadow: 1px 1px 0 0 var(--highlight),inset 1px 1px 0 0 var(--highlight);
    }

    .selectbar > [type="text"]{
        width: 320px;
        padding: 8px 16px;
        font-size: 18px;
        background: var(--layer);
        color: var(--highlight);
    }
    .selectbar > [type="text"]::placeholder {
        font-size: 16px;
        color: var(--placeholder);
    }
    .selectbar > [type="text"]:focus,
    .selectbar > button:focus{
        outline: none;
    }
    .selectbar > button{
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--layer);
    }
    .search-btn{
        stroke: var(--highlight);
    }
</style>
<div class="selectbar" class:is_focus={is_focus}>
    <input type="text" bind:value={name} on:keydown={key_down} on:focus={()=>is_focus = true} on:blur={()=>is_focus=false} placeholder="캐릭터 이름을 입력해주세요.">
    <button class="search-btn" on:click={search}>
        <Search/>
    </button>
</div>
<script>
    import {afterPageLoad, goto} from "@roxi/routify";
    import Search from "./icon/Search.svelte";
    export let url;
    let is_focus = false;
    let name = "";

    $afterPageLoad(()=>{
        name = "";
    })

    function key_down(e){
        if(e.keyCode == 13){
            search();
        }
    }

    function search(){
        $goto(`${url}/${name}`);
    }
</script>
