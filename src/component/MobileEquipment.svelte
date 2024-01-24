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
        flex-wrap: wrap;
        gap: 4px;
        font-size: 14px;
        box-shadow: inset 0 -1px 0 0 var(--border);
        box-sizing: border-box;
    }
    .item > div{
        flex-shrink: 0;
    }
    .item-name{
        height: 32px;
        display: flex;
        align-items: center;
        flex: 1;
        cursor: pointer;
    }
    .simple-items .item{
        width: 60px !important;
        height: 60px;
        min-width: auto;
        justify-content: center;
        box-shadow: 1px 1px 0 0 var(--border), inset 1px 1px 0 0 var(--border);
    }
    .item-list{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    @media (max-width: 1630px) {
        .item {
            width: 360px;
            justify-content: center;
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
        <div class="items">
            {#each parsedEquip as equip, i}
                {#if equip}
                    <div class="item">
<!--                    <div class="item" style="order: {itemOrder1[i]}">-->
                        <div class="item-name">
                            <span>
                                <span>{equip.item_name}</span>
                            </span>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}
<script>
    import {inputFloat, nvl} from "../js/common";

    export let parsedData;

    let itemOrder1 = [
    ];

    let parsedEquip = null;

    $:{
        parsedEquip = parseEquip();
    }

    function parseEquip(){
        let result = {};
        let equip = nvl(parsedData['item-equipment']?.item_equipment,[]);

        result = equip.sort((a,b)=>{
            return (a.item_equipment_slot_name < b.item_equipment_slot_name) ? -1 : 1;
        });

        return result;
    }
</script>