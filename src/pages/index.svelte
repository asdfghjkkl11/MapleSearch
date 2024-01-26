<style>
    .main{
        width: 100%;
        min-width: 340px;
        max-width: 1200px;
        padding: 16px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-content: center;
        gap: 16px;
        box-sizing: border-box;
    }
    .content-area{
        height: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        border: 1px solid var(--border);
        border-radius: 8px;
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
        flex-wrap: wrap;
        gap: 16px;
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
    .ready{
        font-size: 20px;
        font-weight: 700;
        color: var(--highlight);
    }
    @media (max-width: 720px) {
        .main{
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
<div class="main">
    <div class="content-area">
        <a href="/search">메이플 캐릭터 검색</a>
        <Searchbar url="/search"/>
    </div>
    <div class="content-area">
        <a href="/">메이플 길드 검색</a>
        <span class="ready">준비중입니다.</span>
<!--        <Searchbar url="/search"/>-->
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
    <div class="content-area">
        <span class="ready">준비중입니다.</span>
    </div>
</div>
<script>
    import Searchbar from "../component/Searchbar.svelte";
    let serverList = ["아케인", "크로아", "엘리시움", "루나", "스카니아", "유니온", "제니스"];
    let selectedServer = "스카니아";
    $: url = `/mobile/${selectedServer}`;
</script>
