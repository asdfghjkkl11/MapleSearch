<style>
    .items{
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(14, 1fr);
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
    .btn span{
        padding: 0 8px;
    }
    .btn.active{
        background: var(--btn-background-active);
    }
    .simple-items{
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
        box-shadow: 1px 1px 0 0 var(--border), inset 1px 1px 0 0 var(--border);
    }
    .item-list{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .cash-items{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
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
        <div class="btn-area">
            <div>
                {#each presetList as preset, i}
                    <button class="btn" class:active={presetIndex === i} on:click={()=>{presetIndex = i}}>
                        <span>프리셋{preset}</span>
                    </button>
                {/each}
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
                <div class="items">
                    {#each itemOrder1 as key, i}
                        {#if parsedEquip[`cash_item_equipment_preset_${presetList[presetIndex]}`][key]}
                            <div class="item" style="order: {itemOrder1[i]}">
                                <div class="item-img-wrapper">
                                    <img class="item-img" src="{parsedEquip[`cash_item_equipment_preset_${presetList[presetIndex]}`][key].cash_item_icon}">
                                </div>
                                <div class="item-name" >
                                    <span>
                                        <span>{parsedEquip[`cash_item_equipment_preset_${presetList[presetIndex]}`][key].cash_item_name}</span>
                                    </span>
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
                <div class="items">
                    {#each itemOrder1 as key, i}
                        {#if parsedEquip[`additional_cash_item_equipment_preset_${presetList[presetIndex]}`][key]}
                            <div class="item" style="order: {itemOrder1[i]}">
                                <div class="item-img-wrapper">
                                    <img class="item-img" src="{parsedEquip[`additional_cash_item_equipment_preset_${presetList[presetIndex]}`][key].cash_item_icon}">
                                </div>
                                <div class="item-name" >
                                    <span>
                                        <span>{parsedEquip[`additional_cash_item_equipment_preset_${presetList[presetIndex]}`][key].cash_item_name}</span>
                                    </span>
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            {:else}
                <div class="simple-items">
                    {#each itemOrder2 as key, i}
                        {#if parsedEquip[`cash_item_equipment_preset_${presetList[presetIndex]}`][key]}
                            <div class="item" style="order: {i}">
                                <div class="item-img-wrapper">
                                    <img class="item-img" src="{parsedEquip[`cash_item_equipment_preset_${presetList[presetIndex]}`][key].cash_item_icon}">
                                </div>
                            </div>
                        {:else if key !== ""}
                            <div class="empty" style="order: {i}"></div>
                        {/if}
                    {/each}
                </div>
                <div class="simple-items">
                    {#each itemOrder2 as key, i}
                        {#if parsedEquip[`additional_cash_item_equipment_preset_${presetList[presetIndex]}`][key]}
                            <div class="item" style="order: {i}">
                                <div class="item-img-wrapper">
                                    <img class="item-img" src="{parsedEquip[`additional_cash_item_equipment_preset_${presetList[presetIndex]}`][key].cash_item_icon}">
                                </div>
                            </div>
                        {:else if key !== ""}
                            <div class="empty" style="order: {i}"></div>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}
<script>
    import {calculateOption, inputFloat, nvl, optionParse} from "../js/common";
    import Close from "./icon/Close.svelte";
    import Refreash from "./icon/Refreash.svelte";
    import Setting from "./icon/Setting.svelte";
    import ItemType1 from "./icon/ItemType1.svelte";
    import ItemType2 from "./icon/ItemType2.svelte";

    export let parsedData;
    export let refresh;

    let itemOrderMode = 1;
    let itemOrder1 = [
        '무기',
        '모자',
        '상의',
        '하의',
        '망토',
        '장갑',
        '신발',
        '눈장식',
        '얼굴장식',
        '귀고리',
        '반지4',
        '반지3',
        '반지2',
        '반지1'
    ];
    let itemOrder2 = [
        '반지4',
        'empty',
        '모자',
        'empty',
        'empty',
        '반지3',
        'empty',
        '얼굴장식',
        'empty',
        'empty',
        '반지2',
        'empty',
        '눈장식',
        '귀고리',
        'empty',
        '반지1',
        '무기',
        '상의',
        'empty',
        'empty',
        'empty',
        'empty',
        '하의',
        '장갑',
        '망토',
        'empty',
        'empty',
        '신발',
        'empty',
        'empty',
    ];
    let parsedEquip = null;
    let presetList = [1,2,3];
    let presetIndex = 0;
    $:{
        parsedEquip = parseEquip();
    }

    function changeDisplayMode(){
        itemOrderMode ^= 1;
    }

    function parseEquip(){
        let result = {};
        let data = parsedData['cashitem-equipment'];
        let keys = Object.keys(data);

        for(let i = 0; i < keys.length; i++) {
            let equip = nvl(data[keys[i]], {});
            result[keys[i]] = {};
            for (let j = 0; j < equip.length; j++) {
                result[keys[i]][equip[j].cash_item_equipment_slot] = equip[j];
            }
        }

        return result;
    }
</script>