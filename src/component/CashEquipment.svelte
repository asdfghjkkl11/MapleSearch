<style>
    .items{
        min-width: 360px;
        height: fit-content;
        display: grid;
        grid-auto-flow: row;
        grid-template-rows: repeat(1, 1fr);
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
    .item-img-wrapper{
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-img{
        max-width: 32px;
    }
    .item-name{
        height: 32px;
        display: flex;
        align-items: center;
        flex: 1;
        cursor: pointer;
    }
    .btn-area{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }
    .btn-area > div{
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .btn{
        min-width: 24px;
        height: 24px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--highlight);
        stroke: var(--highlight);
        background: var(--btn-background);
        color: var(--highlight);
        border: 1px solid var(--btn-border);
        cursor: pointer;
    }
    .simple-items{
        width: 300px;
        height: fit-content;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }
    .simple-items .item{
        width: 60px !important;
        height: 60px;
        min-width: auto;
        justify-content: center;
        box-shadow: 1px 1px 0 0 var(--border), inset 1px 1px 0 0 var(--border);
        cursor: pointer;
    }
    .simple-items .empty{
        min-height: 60px;
        box-shadow: 1px 1px 0 0 var(--border), inset 1px 1px 0 0 var(--border);
    }
    .item-list{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .cash-items{
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 8px;
    }
    .beauty{
        min-width: 360px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 1px 0 0 var(--border),inset 0 1px 0 0 var(--border);
        box-sizing: border-box;
    }
    .beauty-raw{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }
    .preset-btn{
        width: 20px;
        height: 20px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        fill: var(--highlight);
        stroke: var(--highlight);
        background: var(--btn-background);
        color: var(--highlight);
        border: 1px solid var(--btn-border);
        border-radius: 10px;
        cursor: pointer;
    }
    .preset-btn.active{
        background: var(--btn-background-active);
    }
    .flex-col{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    @media (max-width: 1630px) {
        .item {
            width: 360px;
            justify-content: center;
        }
    }
    @media (max-width: 720px) {
        .cash-items{
            flex-direction: column;
            gap: 16px;
        }
    }
</style>
{#if parsedData.basic}
    <div class="item-list">
        <div class="btn-area">
            <div>
                {#if equipPreset}
                    <button class="preset-btn" class:active={equipPreset===1} on:click={()=>{equipPreset=1; parsedEquip = parsedEquip;}}>1</button>
                    <button class="preset-btn" class:active={equipPreset===2} on:click={()=>{equipPreset=2; parsedEquip = parsedEquip;}}>2</button>
                    <button class="preset-btn" class:active={equipPreset===3} on:click={()=>{equipPreset=3; parsedEquip = parsedEquip;}}>3</button>
                {/if}
            </div>
            <div>
                <button class="btn" on:click={refresh}>
                    <Refreash/>
                </button>
                <button class="btn" on:click={changeDisplayMode}>
                    {#if itemOrderMode===1}
                        <ItemType1/>
                    {:else}
                        <ItemType2/>
                    {/if}
                </button>
            </div>
        </div>
        <div class="beauty">
            {#if parsedData["beauty-equipment"].character_hair}
                <div class="beauty-raw">
                    <div>
                        <span class="highlight">헤어:</span>
                        <span class="beauty-name">{parsedData["beauty-equipment"].character_hair.hair_name}</span>
                    </div>
                    <div>
                        <span>{parsedData["beauty-equipment"].character_hair.base_color}</span>
                        {#if parsedData["beauty-equipment"].character_hair.mix_color}
                            <span>{parsedData["beauty-equipment"].character_hair.mix_color}</span>
                            <span>{parsedData["beauty-equipment"].character_hair.mix_rate}</span>
                        {/if}
                    </div>
                </div>
            {/if}
            {#if parsedData["beauty-equipment"].character_face}
                <div class="beauty-raw">
                    <div>
                        <span class="highlight">성형:</span>
                        <span class="beauty-name">{parsedData["beauty-equipment"].character_face.face_name}</span>
                    </div>
                    <div>
                        <span>{parsedData["beauty-equipment"].character_face.base_color}</span>
                        {#if parsedData["beauty-equipment"].character_face.mix_color}
                            <span>{parsedData["beauty-equipment"].character_face.mix_color}</span>
                            <span>{parsedData["beauty-equipment"].character_face.mix_rate}</span>
                        {/if}
                    </div>
                </div>
            {/if}
            {#if parsedData["beauty-equipment"].character_skin_name}
                <div class="beauty-raw">
                    <div>
                        <span class="highlight">피부:</span>
                        <span class="beauty-name">{parsedData["beauty-equipment"].character_skin_name}</span>
                    </div>
                </div>
            {/if}
            {#if parsedData["beauty-equipment"].additional_character_face}
                <div class="beauty-raw">
                    <div>
                        <span class="highlight">추가 헤어:</span>
                        <span class="beauty-name">{parsedData["beauty-equipment"].additional_character_hair.hair_name}</span>
                    </div>
                    <div>
                        <span>{parsedData["beauty-equipment"].additional_character_hair.base_color}</span>
                        {#if parsedData["beauty-equipment"].additional_character_hair.mix_color}
                            <span>{parsedData["beauty-equipment"].additional_character_hair.mix_color}</span>
                            <span>{parsedData["beauty-equipment"].additional_character_hair.mix_rate}</span>
                        {/if}
                    </div>
                </div>
            {/if}
            {#if parsedData["beauty-equipment"].additional_character_face}
                <div class="beauty-raw">
                    <div>
                        <span class="highlight">추가 성형:</span>
                        <span class="beauty-name">{parsedData["beauty-equipment"].additional_character_face.face_name}</span>
                    </div>
                    <div>
                        <span>{parsedData["beauty-equipment"].additional_character_face.base_color}</span>
                        {#if parsedData["beauty-equipment"].additional_character_face.mix_color}
                            <span>{parsedData["beauty-equipment"].additional_character_face.mix_color}</span>
                            <span>{parsedData["beauty-equipment"].additional_character_face.mix_rate}</span>
                        {/if}
                    </div>
                </div>
            {/if}
            {#if parsedData["beauty-equipment"].additional_character_skin_name}
                <div class="beauty-raw">
                    <div>
                        <span class="highlight">추가 피부:</span>
                        <span class="beauty-name">{parsedData["beauty-equipment"].additional_character_skin_name}</span>
                    </div>
                </div>
            {/if}
        </div>
        <div class="cash-items">
            {#if itemOrderMode === 1}
                {#if Object.keys(parsedEquip.base).length > 0}
                    <div class="flex-col">
                        <div class="highlight">베이스 아이템</div>
                        <div class="items">
                            {#each itemOrder1 as key, i}
                                {#if parsedEquip.base[key]}
                                    <div class="item" style="order: {itemOrder1[i]}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{parsedEquip.base[key].cash_item_icon}">
                                        </div>
                                        <div class="item-name" >
                                            <span>
                                                <span>{parsedEquip.base[key].cash_item_name}</span>
                                            </span>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if Object.keys(parsedEquip.preset).length > 0}
                    <div class="flex-col">
                        <div class="highlight">프리셋 아이템</div>
                        <div class="items">
                            {#each itemOrder1 as key, i}
                                {#if parsedEquip.preset[key]}
                                    <div class="item" style="order: {itemOrder1[i]}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{parsedEquip.preset[key].cash_item_icon}">
                                        </div>
                                        <div class="item-name" >
                                            <span>
                                                <span>{parsedEquip.preset[key].cash_item_name}</span>
                                            </span>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if Object.keys(parsedEquip.additional).length > 0}
                    <div class="flex-col">
                        <div class="highlight">에디셔널 아이템</div>
                        <div class="items">
                            {#each itemOrder1 as key, i}
                                {#if parsedEquip.additional[key]}
                                    <div class="item" style="order: {itemOrder1[i]}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{parsedEquip.additional[key].cash_item_icon}">
                                        </div>
                                        <div class="item-name" >
                                            <span>
                                                <span>{parsedEquip.additional[key].cash_item_name}</span>
                                            </span>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if Object.keys(parsedEquip.additionalPreset).length > 0}
                    <div class="flex-col">
                        <div class="highlight">에디셔널 프리셋 아이템</div>
                        <div class="items">
                            {#each itemOrder1 as key, i}
                                {#if parsedEquip.additionalPreset[key]}
                                    <div class="item" style="order: {itemOrder1[i]}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{parsedEquip.additionalPreset[key].cash_item_icon}">
                                        </div>
                                        <div class="item-name" >
                                            <span>
                                                <span>{parsedEquip.additionalPreset[key].cash_item_name}</span>
                                            </span>
                                        </div>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
            {:else}
                {#if Object.keys(parsedEquip.base).length > 0}
                    <div class="flex-col">
                        <div class="highlight">베이스 아이템</div>
                        <div class="simple-items">
                            {#each itemOrder2 as key, i}
                                {#if parsedEquip.base[key]}
                                    <div class="item" style="order: {i}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{parsedEquip.base[key].cash_item_icon}">
                                        </div>
                                    </div>
                                {:else if key !== ""}
                                    <div class="empty" style="order: {i}"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if Object.keys(parsedEquip.preset).length > 0}
                    <div class="flex-col">
                        <div class="highlight">프리셋 아이템</div>
                        <div class="simple-items">
                            {#each itemOrder2 as key, i}
                                {#if parsedEquip.preset[key]}
                                    <div class="item" style="order: {i}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{parsedEquip.preset[key].cash_item_icon}">
                                        </div>
                                    </div>
                                {:else if key !== ""}
                                    <div class="empty" style="order: {i}"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if Object.keys(parsedEquip.additional).length > 0}
                    <div class="flex-col">
                        <div class="highlight">에디셔널 아이템</div>
                        <div class="simple-items">
                            {#each itemOrder2 as key, i}
                                {#if parsedEquip.additional[key]}
                                    <div class="item" style="order: {i}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{parsedEquip.additional[key].cash_item_icon}">
                                        </div>
                                    </div>
                                {:else if key !== ""}
                                    <div class="empty" style="order: {i}"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
                {#if Object.keys(parsedEquip.additionalPreset).length > 0}
                    <div class="flex-col">
                        <div class="highlight">에디셔널 프리셋 아이템</div>
                        <div class="simple-items">
                            {#each itemOrder2 as key, i}
                                {#if parsedEquip.additionalPreset[key]}
                                    <div class="item" style="order: {i}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{parsedEquip.additionalPreset[key].cash_item_icon}">
                                        </div>
                                    </div>
                                {:else if key !== ""}
                                    <div class="empty" style="order: {i}"></div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    </div>
{/if}
<script>
    import Refreash from "./icon/Refreash.svelte";
    import ItemType1 from "./icon/ItemType1.svelte";
    import ItemType2 from "./icon/ItemType2.svelte";
    import {nvl} from "../js/common";
    import {pcCashItemOrder1, pcCashItemOrder2} from "../js/mapper";

    export let parsedData;
    export let refresh;

    let itemOrderMode = 1;
    let itemOrder1 = pcCashItemOrder1;
    let itemOrder2 = pcCashItemOrder2;
    let parsedEquip = {
        base: {},
        preset: {},
        additional: {},
        additionalPreset: {},
    };
    let equipPreset = parsedData['cashitem-equipment'].preset_no;

    $:{
        parsedEquip = parseEquip();
    }

    function changeDisplayMode(){
        itemOrderMode ^= 1;
    }

    function parseEquip(){
        let result = {
            base: {},
            preset: {},
            additional: {},
            additionalPreset: {}
        };
        let base = parsedData['cashitem-equipment'].cash_item_equipment_base;
        let additional = parsedData['cashitem-equipment'].additional_cash_item_equipment_base;
        let preset = {};
        let additionalPreset = {};

        if(equipPreset){
            preset = parsedData['cashitem-equipment'][`cash_item_equipment_preset_${equipPreset}`];
            additionalPreset =  parsedData['cashitem-equipment'][`additional_cash_item_equipment_preset_${equipPreset}`];
        }

        for(let i = 0; i < base.length; i++){
            result.base[base[i].cash_item_equipment_slot] = base[i];
        }
        for(let i = 0; i < additional.length; i++){
            result.additional[additional[i].cash_item_equipment_slot] = additional[i];
        }
        for(let i = 0; i < preset.length; i++){
            result.preset[preset[i].cash_item_equipment_slot] = preset[i];
        }
        for(let i = 0; i < additionalPreset.length; i++){
            result.additionalPreset[additionalPreset[i].cash_item_equipment_slot] = additionalPreset[i];
        }

        return result;
    }
</script>