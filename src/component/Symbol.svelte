<style>
    .symbols{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .symbol{
        min-width: 360px;
        min-height: 40px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        font-size: 14px;
        box-shadow: inset 0 -1px 0 0 var(--border);
        box-sizing: border-box;
    }
    .flex{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    @media (max-width: 1630px) {
        .symbol {
            width: 360px;
            justify-content: center;
        }
    }
    @media (max-width: 720px) {
        .symbols{
            grid-auto-flow: row;
            grid-template-columns: 1fr;
        }
    }
</style>
{#if parsedData.basic}
    <div class="flex">
        <div class="symbols">
            {#each symbols as symbol,i}
                <div class="symbol">
                    <div>
                        <img src="{symbol.symbol_icon}">
                    </div>
                    <span class="highlight">
                        <span>{symbol.symbol_name} </span><span class="green">{symbol.symbol_level}</span>
                    </span>
                    <span>포스: {symbol.symbol_force}</span>
                    <span>스텟: {Math.max(symbol.symbol_str, symbol.symbol_dex, symbol.symbol_int, symbol.symbol_luk)}</span>
                    <span>성장: {symbol.symbol_growth_count} / {symbol.symbol_require_growth_count}</span>
                </div>
            {/each}
        </div>
    </div>
{/if}
<script>
    import {nvl} from "../js/common";

    export let parsedData;

    let symbols = nvl(parsedData["symbol-equipment"].symbol,[]);
</script>