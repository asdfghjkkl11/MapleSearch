<style>
    .selectbar{
        display: flex;
        align-items: center;
    }
    .selectbar > *{
        height: 40px;
        padding: 0;
        border: none;
        box-shadow: 1px 1px 0 0 #303133,inset 1px 1px 0 0 #303133;
        box-sizing: border-box;
        -webkit-appearance: none;
    }
    .selectbar.is_focus > *{
        box-shadow: 1px 1px 0 0 #ffffff,inset 1px 1px 0 0 #ffffff;
    }

    .selectbar > [type="text"]{
        width: 320px;
        padding: 8px 16px;
        font-size: 18px;
        background: #141517;
        color: #ffffff;
    }
    .selectbar > [type="text"]::placeholder {
        font-size: 16px;
        color: #757575;
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
        background: #141517;
    }
    .i_search {
        width: 32px;
        height: 32px;
        display: inline-block;
        background: url("/image/img_search.svg") no-repeat;
        background-size: contain;
    }
</style>
<div class="selectbar" class:is_focus={is_focus}>
    <input type="text" bind:value={name} on:keydown={key_down} on:focus={()=>is_focus = true} on:blur={()=>is_focus=false} placeholder="캐릭터 이름을 입력해주세요.">
    <button on:click={search}>
        <i class="i_search"></i>
    </button>
</div>
<script>
    import {afterPageLoad, goto} from "@roxi/routify";
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
        $goto(`/search/${name}`);
    }
</script>
