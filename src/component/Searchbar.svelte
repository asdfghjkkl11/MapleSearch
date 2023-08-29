<style>
</style>
<div>
    <input type="text" bind:value={name} on:keydown={key_down}>
    <button on:click={search}>검색</button>
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
