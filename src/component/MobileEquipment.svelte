<style>
    .items{
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: repeat(2, 1fr);
    }
    .item{
        min-width: 360px;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 4px;
        font-size: 14px;
        box-shadow: inset 0 -1px 0 0 var(--border);
        box-sizing: border-box;
    }
    .item-list{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .item-title{
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 -1px 0 0 var(--border);
    }
    @media (max-width: 1630px) {
        .item {
            width: 360px;
        }
    }
    @media (max-width: 720px) {
        .items{
            grid-auto-flow: row;
            grid-template-columns: 1fr;
            grid-template-rows: none;
        }
    }
</style>
{#if parsedData.basic}
    <div class="item-list">
        <div class="item-title">
            <span class="highlight">장비</span>
        </div>
        <div class="items">
            {#each itemOrder1 as key, i}
                {#if parsedEquip[key[0]]}
                    {#if parsedEquip[key[0]][key[1]]}
                        <div class="item" style="order: {itemOrder1[i]}">
                            <span class="highlight">
                                {(key[0].includes("Cash"))?"캐시":""}{key[1]}
                                {#if key[1] === "반지" || key[1] === "아케인심볼" || key[1] === "목걸이" }
                                     (1번째 슬롯)
                                {/if}
                            </span>
                            <span>{parsedEquip[key[0]][key[1]].item_name.replace(" [Legendary]"," [레전더리]")}</span>
                        </div>
                    {/if}
                {/if}
            {/each}
        </div>
        <div class="item-title">
            <span class="highlight">심볼</span>
        </div>
        <div class="items">
            {#each itemOrder2 as key, i}
                {#if parsedEquip[key[0]]}
                    {#if parsedEquip[key[0]][key[1]]}
                        <div class="item" style="order: {itemOrder1[i]}">
                            <span class="highlight">
                                {(key[0].includes("Cash"))?"캐시":""}{key[1]}
                                {#if key[1] === "반지" || key[1] === "아케인심볼" || key[1] === "목걸이" }
                                     (1번째 슬롯)
                                {/if}
                            </span>
                            <span>{parsedEquip[key[0]][key[1]].item_name.replace(" [Legendary]"," [레전더리]")}</span>
                        </div>
                    {/if}
                {/if}
            {/each}
        </div>
        <div class="item-title">
            <span class="highlight">외형</span>
        </div>
        <div class="items">
            {#each itemOrder3 as key, i}
                {#if parsedEquip[key[0]]}
                    {#if parsedEquip[key[0]][key[1]]}
                        <div class="item" style="order: {itemOrder1[i]}">
                            <span class="highlight">
                                {(key[0].includes("Cash"))?"캐시":""}{key[1]}
                                {#if key[1] === "반지" || key[1] === "아케인심볼" || key[1] === "목걸이" }
                                     (1번째 슬롯)
                                {/if}
                            </span>
                            <span>{parsedEquip[key[0]][key[1]].item_name.replace(" [Legendary]"," [레전더리]")}</span>
                        </div>
                    {/if}
                {/if}
            {/each}
        </div>
        <div class="item-title">
            <span class="highlight">안드로이드</span>
        </div>
        <div class="items">
            {#each itemOrder4 as key, i}
                {#if parsedEquip[key[0]]}
                    {#if parsedEquip[key[0]][key[1]]}
                        <div class="item" style="order: {itemOrder1[i]}">
                            <span class="highlight">
                                {(key[0].includes("Cash"))?"캐시":""}{key[1]}
                                {#if key[1] === "반지" || key[1] === "아케인심볼" || key[1] === "목걸이" }
                                     (1번째 슬롯)
                                {/if}
                            </span>
                            <span>{parsedEquip[key[0]][key[1]].item_name.replace(" [Legendary]"," [레전더리]")}</span>
                        </div>
                    {/if}
                {/if}
            {/each}
        </div>
    </div>
{/if}
<script>
    import {nvl} from "../js/common";
    import {mobileItemOrder1, mobileItemOrder2, mobileItemOrder3, mobileItemOrder4} from "../js/mapper";

    export let parsedData;

    let itemOrder1 = mobileItemOrder1;
    let itemOrder2 = mobileItemOrder2;
    let itemOrder3 = mobileItemOrder3;
    let itemOrder4 = mobileItemOrder4;

    let parsedEquip = null;

    $:{
        parsedEquip = parseEquip();
    }

    function parseEquip(){
        let result = {};
        let equip = nvl(parsedData['item-equipment']?.item_equipment,[]);

        for(let i = 0; i < equip.length; i++){
            if(!result[equip[i].item_equipment_page_name]) {
                result[equip[i].item_equipment_page_name] = {};
            }
            result[equip[i].item_equipment_page_name][equip[i].item_equipment_slot_name] = equip[i];
            console.log(`${equip[i].item_equipment_page_name},${equip[i].item_equipment_slot_name}`)
        }

        return result;
    }

</script>