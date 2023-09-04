<style>
    .selectbar{
        display: flex;
        align-items: center;
    }
    .selectbar > *{
        height: 40px;
        padding: 0;
        border: none;
        box-shadow: 1px 1px 0 0 #acacac,inset 1px 1px 0 0 #acacac;
        box-sizing: border-box;
        -webkit-appearance: none;
    }
    .selectbar > [type="text"]{
        width: 240px;
        padding: 8px;
        font-size: 16px;
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
        background: #f0f0f0;
    }
    .i_search {
        width: 32px;
        height: 32px;
        display: inline-block;
        background: url("/image/img_search.svg") no-repeat;
        background-size: contain;
    }
</style>
<div class="selectbar">
    <input type="text" bind:value={name} on:keydown={key_down} placeholder="캐릭터 이름을 입력해주세요.">
    <button on:click={search}>
        <i class="i_search"></i>
    </button>
</div>
<script>
    import {goto} from "@roxi/routify";

    let name = "";

    function key_down(e){
        if(e.keyCode == 13){
            search();
        }
    }

    function search(){
        $goto(`/search/${name}`);
    }
</script>
