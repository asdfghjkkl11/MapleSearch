<style>
    .items{
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(12, 1fr);
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
    .item-main-cube, .item-additional-cube{
        min-width: 320px;
        height: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
    }
    .item-name{
        height: 32px;
        display: flex;
        align-items: center;
        flex: 1;
        cursor: pointer;
    }
    .item-cls{
        min-width: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
    }
    .cube{
        min-width: 80px;
    }
    .modal-wrap{
        max-width: 400px;
    }
    .btn-area{
        display: flex;
        align-items: center;
        justify-content: flex-end;
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
        border: 1px solid var(--btn-border);
        cursor: pointer;
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
    .btn-close{
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--close);
        border: none;
        cursor: pointer;
        background: none;
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
    .modal-item-img-wrapper{
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--img-background);
    }
    .modal-item-img{
        min-width: 64px;
    }
    .stat{
        display: flex;
        flex-direction: column;
    }
    .divider{
        height: 8px;
    }
    .item-main-info{
        display: flex;
        gap: 8px;
    }
    .item-info{
        display: flex;
        flex-direction: column;
    }
    .input-text{
        width: 28px;
        text-align: right;
        padding: 4px 8px;
        border: none;
        border-radius: 8px;
        background: var(--input-text-background);
        color: var(--input-text);
    }
    .input-text:focus{
        outline: none;
    }
    .setting-row{
        padding-right: 24px;
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
            {#if equipPreset}
                <button class="preset-btn" class:active={equipPreset===1} on:click={()=>{equipPreset=1; parseEquip();}}>1</button>
                <button class="preset-btn" class:active={equipPreset===2} on:click={()=>{equipPreset=2; parseEquip();}}>2</button>
                <button class="preset-btn" class:active={equipPreset===3} on:click={()=>{equipPreset=3; parseEquip();}}>3</button>
            {/if}
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
            <button class="btn" on:click={settingModal.show}>
                <Setting/>
            </button>
        </div>
        {#if itemOrderMode === 1}
            <div class="items">
                {#each itemOrder1 as key, i}
                    {#if parsedEquip[key]}
                        <div class="item" style="order: {itemOrder1[i]}">
                            <div class="item-img-wrapper">
                                <img class="item-img" src="{parsedEquip[key].item_shape_icon}">
                            </div>
                            <div class="item-name" on:click={clickItem(parsedEquip[key])}>
                                <span>
                                    {#if nvl(parsedEquip[key].starforce) !== "0"}
                                        <span class="star">★{parsedEquip[key].starforce}</span>
                                    {/if}
                                    <span>{parsedEquip[key].item_name}{(parsedEquip[key].special_ring_level !== 0)?` ${parsedEquip[key].special_ring_level}레벨`:""}</span>
                                </span>
                            </div>
                            <div class="item-cls">
                                <span>{calculateOption(parsedEquip[key],main,parsedData.basic.character_class,atkStatMulti,atkStatMultiXenon)}</span>
                            </div>
                            <div class="item-cube">
                                <div class="item-main-cube">
                                    {#if parsedEquip[key].potential_option_grade}
                                        <div class='{gradeMapper[parsedEquip[key].potential_option_grade]}'>잠재</div>
                                        <div class='cube {gradeMapper[parsedEquip[key].potential_option_grade]}'>{optionParse(parsedEquip[key].potential_option_1)}</div>
                                        <div class='cube {gradeMapper[parsedEquip[key].potential_option_grade]}'>{optionParse(parsedEquip[key].potential_option_2)}</div>
                                        <div class='cube {gradeMapper[parsedEquip[key].potential_option_grade]}'>{optionParse(parsedEquip[key].potential_option_3)}</div>
                                    {/if}
                                </div>
                                <div class="item-additional-cube">
                                    {#if parsedEquip[key].additional_potential_option_grade}
                                        <div class='{gradeMapper[parsedEquip[key].additional_potential_option_grade]}'>에디</div>
                                        <div class='cube {gradeMapper[parsedEquip[key].additional_potential_option_grade]}'>{optionParse(parsedEquip[key].additional_potential_option_1)}</div>
                                        <div class='cube {gradeMapper[parsedEquip[key].additional_potential_option_grade]}'>{optionParse(parsedEquip[key].additional_potential_option_2)}</div>
                                        <div class='cube {gradeMapper[parsedEquip[key].additional_potential_option_grade]}'>{optionParse(parsedEquip[key].additional_potential_option_3)}</div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {:else}
            <div class="simple-items">
                {#each itemOrder2 as key, i}
                    {#if parsedEquip[key]}
                        <div class="item" style="order: {i}">
                            <div class="item-img-wrapper" on:click={clickItem(parsedEquip[key])}>
                                <img class="item-img" src="{parsedEquip[key].item_shape_icon}">
                            </div>
                        </div>
                    {:else}
                        <div class="empty" style="order: {i}"></div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
{/if}
<Modal bind:modal={equipModal}>
    <span slot="header">
        {#if nvl(selectedItem.starforce) !== "0"}
            <span class="star">★{selectedItem.starforce}</span>
        {/if}
        <span>{selectedItem.item_name}{(selectedItem.special_ring_level !== 0)?` ${selectedItem.special_ring_level}레벨`:""}</span>
    </span>
    <div slot="content">
        <div class="item-main-info">
            <div class="modal-item-img-wrapper">
                <img class="modal-item-img" src="{selectedItem.item_shape_icon}">
            </div>
            <div class="item-info">
                {#if selectedItem["soul_name"]}
                    <span>{selectedItem["soul_name"].replace("소울 적용","")}</span>
                {/if}
                <span>{selectedItem.item_name}{(selectedItem.special_ring_level !== 0)?` ${selectedItem.special_ring_level}레벨`:""}</span>
                {#if nvl(selectedItem.starforce) !== "0"}
                    <span>{selectedItem.starforce}성 강화</span>
                {/if}
                <span>level: {selectedItem.item_base_option?.base_equipment_level}</span>
            </div>
        </div>
        <div class="stat">
            {#if selectedItem.item_total_option}
                {#each itemOptionOrder as option,i}
                    {#if nvl(selectedItem.item_total_option[option.key]) != 0}
                        <div>
                            <span>
                                <span>{option.value} : <span class="highlight">{selectedItem.item_total_option[option.key]}{#if option.per}%{/if}</span></span>

                                {#if nvl(selectedItem.item_add_option[option.key]) != 0
                                || nvl(selectedItem.item_etc_option[option.key]) != 0
                                || nvl(selectedItem.item_starforce_option[option.key]) != 0
                                || nvl(selectedItem.item_exceptional_option[option.key]) != 0}
                                    <span>( </span><span class="highlight">{nvl(nvl(selectedItem?.item_base_option)[option.key],0)}{#if option.per}%{/if}</span>
                                    {#if nvl(selectedItem.item_add_option[option.key]) != 0}
                                        <span class="option1">+{selectedItem.item_add_option[option.key]}{#if option.per}%{/if}</span>
                                    {/if}
                                    {#if nvl(selectedItem.item_etc_option[option.key]) != 0}
                                        <span class="option2">+{selectedItem.item_etc_option[option.key]}{#if option.per}%{/if}</span>
                                    {/if}
                                    {#if nvl(selectedItem.item_starforce_option[option.key]) != 0}
                                        <span class="option3">+{selectedItem.item_starforce_option[option.key]}{#if option.per}%{/if}</span>
                                    {/if}
                                    {#if nvl(selectedItem.item_exceptional_option[option.key]) != 0}
                                        <span class="option4">+{selectedItem.item_exceptional_option[option.key]}{#if option.per}%{/if}</span>
                                    {/if}
                                    <span>)</span>
                                {/if}
                            </span>
                        </div>
                    {/if}
                {/each}
            {/if}
            <div>
                <span>가위 사용 가능 횟수 : <span class="highlight">{(selectedItem.cuttable_count==255)?0:selectedItem.cuttable_count}</span></span>
            </div>
            {#if selectedItem.potential_option_grade}
                <div class="divider"></div>
                <div>
                    <div class='{gradeMapper[selectedItem.potential_option_grade]}'>잠재옵션</div>
                    <div class='cube {gradeMapper[selectedItem.potential_option_grade]}'>{optionParse(selectedItem.potential_option_1)}</div>
                    <div class='cube {gradeMapper[selectedItem.potential_option_grade]}'>{optionParse(selectedItem.potential_option_2)}</div>
                    <div class='cube {gradeMapper[selectedItem.potential_option_grade]}'>{optionParse(selectedItem.potential_option_3)}</div>
                </div>
            {/if}
            {#if selectedItem.additional_potential_option_grade}
                <div class="divider"></div>
                <div>
                    <div class='{gradeMapper[selectedItem.additional_potential_option_grade]}'>에디셔널 잠재옵션</div>
                    <div class='cube {gradeMapper[selectedItem.additional_potential_option_grade]}'>{optionParse(selectedItem.additional_potential_option_1)}</div>
                    <div class='cube {gradeMapper[selectedItem.additional_potential_option_grade]}'>{optionParse(selectedItem.additional_potential_option_2)}</div>
                    <div class='cube {gradeMapper[selectedItem.additional_potential_option_grade]}'>{optionParse(selectedItem.additional_potential_option_3)}</div>
                </div>
            {/if}
            {#if selectedItem.soul_option}
                <div class="divider"></div>
                <div>
                    <span>{selectedItem.soul_name}</span>
                    <span class="highlight">{selectedItem.soul_option}</span>
                </div>
            {/if}
            {#if selectedItem.item_description}
                <div class="divider"></div>
                <div class="modal-wrap">
                    <span>{selectedItem.item_description}</span>
                </div>
            {/if}
        </div>
    </div>
</Modal>
<Modal bind:modal={settingModal}>
    <span slot="header">설정</span>
    <div slot="content">
        <div class="symbol-info">
            <div class="setting-row">
                <ul>
                    <li>
                        <span>공/마 1당 <input type="text" class="input-text" bind:value={atkStatMulti}> 급 (최대 소수점 2자리까지)</span>
                    </li>
                    <li>
                        <span>제논: 공/마 1당 <input type="text" class="input-text" bind:value={atkStatMultiXenon}> 급 (최대 소수점 2자리까지)</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</Modal>
<script>
    import {calculateOption, inputFloat, nvl, optionParse} from "../js/common";
    import Refreash from "./icon/Refreash.svelte";
    import Setting from "./icon/Setting.svelte";
    import ItemType1 from "./icon/ItemType1.svelte";
    import ItemType2 from "./icon/ItemType2.svelte";
    import Modal from "./Modal.svelte";
    import {gradeMapper, itemOptionOrder, pcItemOrder1, pcItemOrder2} from "../js/mapper";

    export let parsedData;
    export let parsedStat;
    export let refresh;

    let equipModal;
    let settingModal;
    let itemOrderMode = 1;
    let itemOrder1 = pcItemOrder1;
    let itemOrder2 = pcItemOrder2;
    let main = "STR";
    let selectedItem = {};
    let atkStatMulti = nvl(localStorage.getItem("atkStatMulti"),4);
    let atkStatMultiXenon = nvl(localStorage.getItem("atkStatMultiXenon"),7);
    let parsedEquip = null;
    let equipPreset = parsedData['item-equipment'].preset_no;

    $:{
        atkStatMulti = inputFloat(atkStatMulti,2);
        atkStatMultiXenon = inputFloat(atkStatMultiXenon,2);

        if(atkStatMulti != nvl(localStorage.getItem("atkStatMulti"),4)){
            localStorage.setItem("atkStatMulti",atkStatMulti);
        }
        if(atkStatMultiXenon != nvl(localStorage.getItem("atkStatMultiXenon"),7)){
            localStorage.setItem("atkStatMultiXenon",atkStatMultiXenon);
        }
    }

    $:{
        if(parsedStat){
            let str = parsedStat["STR"];
            let dex = parsedStat["DEX"];
            let int = parsedStat["INT"];
            let luk = parsedStat["LUK"];
            let max = Math.max(str,dex,int,luk);

            if(max == str){
                main = "str";
            }else if(max == dex){
                main = "dex";
            }else if(max == int){
                main = "int";
            }else if(max == luk){
                main = "luk";
            }
        }
        parseEquip();
    }

    function clickItem(item){
        selectedItem = item;
        equipModal.show();
    }

    function changeDisplayMode(){
        itemOrderMode ^= 1;
    }

    function parseEquip(){
        let result = {};
        let equip = nvl(parsedData['item-equipment']?.item_equipment,[]);

        if(equipPreset){
            equip = nvl(parsedData['item-equipment'][`item_equipment_preset_${equipPreset}`],equip);
        }

        for(let i = 0; i < equip.length; i++){
            result[equip[i].item_equipment_slot] = equip[i];
        }

        parsedEquip = result;
    }
</script>