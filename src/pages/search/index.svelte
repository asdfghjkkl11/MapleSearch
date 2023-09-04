<style>
    .main{
        width: 100%;
        min-width: 340px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
    .main > span{
        font-size: 20px;
        font-weight: 700;
        color: white;
    }
</style>
<div class="main">
    <span>메이플 캐릭터 검색</span>
    <Searchbar/>
</div>
<script>
    import Searchbar from "../../component/Searchbar.svelte";
</script>
