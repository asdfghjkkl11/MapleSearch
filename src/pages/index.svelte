<style>
    .main{
        width: 100%;
        min-width: 340px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
    }
    .content-area{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
    .content-area > a{
        font-size: 20px;
        font-weight: 700;
        color: var(--highlight);
        text-decoration: none;
    }
    .search-area{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    .select{
        width: 132px;
        height: 40px;
        padding: 8px 24px 8px 16px;
        font-size: 16px;
        box-sizing: border-box;
        background: var(--layer);
        color: var(--highlight);
        border: none;
        box-shadow: 1px 1px 0 0 var(--border),inset 1px 1px 0 0 var(--border);
    }
</style>
<div class="main">
    <div class="content-area">
        <a href="/search">메이플 캐릭터 검색</a>
        <Searchbar url="/search"/>
    </div>
    <div class="content-area">
        <a href="/mobile">메이플M 캐릭터 검색</a>
        <div class="search-area">
            <Searchbar url="{url}"/>
            <select class="select" bind:value={selectedServer}>
                {#each serverList as server,i}
                    <option value="{server}">{server}</option>
                {/each}
            </select>
        </div>
    </div>
</div>
<script>
    import Searchbar from "../component/Searchbar.svelte";
    let serverList = ["아케인", "크로아", "엘리시움", "루나", "스카니아", "유니온", "제니스"];
    let selectedServer = "스카니아";
    $: url = `/mobile/${selectedServer}`;
</script>
