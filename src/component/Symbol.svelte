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
        cursor: pointer;
    }
    .flex{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .force{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    .symbol-info{
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .symbol-desc{
        word-break: break-all;
        white-space: pre-line;
    }
    .symbol-title{
        display: flex;
        align-items: center;
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
        <div class="force">
            <span class="highlight title">아케인심볼: <span class="green">{inputInt(parsedStat['아케인포스'])}</span></span>
            <span class="highlight title">어센틱심볼: <span class="green">{inputInt(parsedStat['어센틱포스'])}</span></span>
        </div>
        <div class="symbols">
            {#each symbols as symbol,i}
                <div class="symbol" on:click={()=>clickItem(symbol)}>
                    <div>
                        <img src="{symbol.symbol_icon}">
                    </div>
                    <span class="highlight">
                        <span>{symbol.symbol_name} </span><span class="green">{symbol.symbol_level}</span>
                    </span>
                    <span>포스: {symbol.symbol_force}</span>
                    <span>스텟: {Math.max(symbol.symbol_str, symbol.symbol_dex, symbol.symbol_int, symbol.symbol_luk)}</span>
                    <span>성장:
                        {#if (symbol.symbol_name.includes("아케인심볼")&&symbol.symbol_level === 20)||(symbol.symbol_name.includes("어센틱심볼")&&symbol.symbol_level === 11)}
                            MAX
                        {:else}
                            {symbol.symbol_growth_count} / {symbol.symbol_require_growth_count}
                        {/if}
                    </span>
                </div>
            {/each}
        </div>
    </div>
{/if}
<Modal bind:modal={symbolModal}>
    <span slot="header">심볼정보</span>
    <div slot="content">
        <div class="symbol-info">
            <div class="symbol-title">
                <img src="{selectedItem.symbol_icon}">
            <span class="highlight">{selectedItem.symbol_name} <span class="green">{selectedItem.symbol_level}</span></span>
            </div>
            <span>포스: {selectedItem.symbol_force}</span>
            <span>스텟: {Math.max(selectedItem.symbol_str, selectedItem.symbol_dex, selectedItem.symbol_int, selectedItem.symbol_luk)}</span>
            <span>성장:
                {#if (selectedItem.symbol_name.includes("아케인심볼")&&selectedItem.symbol_level === 20)||(selectedItem.symbol_name.includes("어센틱심볼")&&selectedItem.symbol_level === 11)}
                    MAX
                {:else}
                    {selectedItem.symbol_growth_count} / {selectedItem.symbol_require_growth_count}
                {/if}
            </span>
            <div>
                <span class="symbol-desc">{selectedItem.symbol_description}</span>
            </div>
        </div>
    </div>
</Modal>
<script>
    import {inputInt, nvl} from "../js/common";
    import Modal from "./Modal.svelte";

    export let parsedData;
    export let parsedStat;
    let symbolModal;
    let symbols = nvl(parsedData["symbol-equipment"].symbol,[]);
    let selectedItem = {
        "symbol_name": "",
        "symbol_icon": "",
        "symbol_description": "",
        "symbol_force": "0",
        "symbol_level": 0,
        "symbol_str": "0",
        "symbol_dex": "0",
        "symbol_int": "",
        "symbol_luk": "0",
        "symbol_hp": "0",
        "symbol_growth_count": 0,
        "symbol_require_growth_count": 0
    };

    function clickItem(item){
        selectedItem = item;
        symbolModal.show();
    }
</script>