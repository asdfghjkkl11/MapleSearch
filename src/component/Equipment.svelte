<style>
    .items{
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(13, 1fr);
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
        min-width: 280px;
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
    .cash .item-name{
        flex: none;
        min-width: 120px;
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
    .reload-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/refresh.svg') no-repeat;
        background-size: contain;
    }
    .item-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/item.svg') no-repeat;
        background-size: contain;
    }
    .menu-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/menu.svg') no-repeat;
        background-size: contain;
    }
    .setting-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/img_setting.svg') no-repeat;
        background-size: contain;
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
    .item-modal{
        width: 100vw;
        height: 100vh;
        padding: 64px;
        display: none;
        justify-content: center;
        position: fixed;
        right: 0;
        top: 0;
        background: var(--modal-background);
        box-sizing: border-box;
    }
    .is-show{
        display: flex;
    }
    .modal-content{
        padding: 8px;
        height: fit-content;
        min-width: 360px;
        min-height: 460px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--modal-content-background);
        border-radius: 8px;
        opacity: 1;
        color: var(--text);
    }
    .modal-header{
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 500;
    }
    .modal-header span{
        padding-left: 8px;
    }
    .modal-body{
        padding: 0 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .item-modal .item-img-wrapper{
        width: 80px;
        height: 80px;
        background: var(--img-background);
    }
    .item-modal .item-img{
        min-width: 64px;
    }
    .stat{
        display: flex;
        flex-direction: column;
    }
    .divider{
        height: 8px;
    }
    .modal-footer{
        padding: 8px;
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
        .item.cash {
            width: 300px;
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
{#if parsed_data.basic}
    <div class="item-list">
        <div class="btn-area">
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
            <button class="btn" on:click={settingOpen}>
                <Setting/>
            </button>
        </div>
        {#if itemOrderMode === 1}
            <div class="items">
                {#each itemOrder1 as key, i}
                    {#if parsed_equip[key]}
                        <div class="item" style="order: {itemOrder1[i]}">
                            <div class="item-img-wrapper">
                                <img class="item-img" src="{parsed_equip[key].item_shape_icon}">
                            </div>
                            <div class="item-name" on:click={clickItem(parsed_equip[key])}>
                                            <span>
                                                {#if nvl(parsed_equip[key].starforce) !== "0"}
                                                    <span class="star">★{parsed_equip[key].starforce}</span>
                                                {/if}
                                                <span>{parsed_equip[key].item_name}{(parsed_equip[key].special_ring_level !== 0)?` ${parsed_equip[key].special_ring_level}레벨`:""}</span>
                                            </span>
                            </div>
                            <div class="item-cls">
                                <span>{calculate_option(parsed_equip[key],main,parsed_data.basic.character_class,atkStatMulti,atkStatMultiXenon)}</span>
                            </div>
                            <div class="item-cube">
                                <div class="item-main-cube">
                                    {#if parsed_equip[key].potential_option_grade}
                                        <div class='{gradeMapper[parsed_equip[key].potential_option_grade]}'>잠재</div>
                                        <div class='cube {gradeMapper[parsed_equip[key].potential_option_grade]}'>{option_parse(parsed_equip[key].potential_option_1)}</div>
                                        <div class='cube {gradeMapper[parsed_equip[key].potential_option_grade]}'>{option_parse(parsed_equip[key].potential_option_2)}</div>
                                        <div class='cube {gradeMapper[parsed_equip[key].potential_option_grade]}'>{option_parse(parsed_equip[key].potential_option_3)}</div>
                                    {/if}
                                </div>
                                <div class="item-additional-cube">
                                    {#if parsed_equip[key].additional_potential_option_grade}
                                        <div class='{gradeMapper[parsed_equip[key].additional_potential_option_grade]}'>에디</div>
                                        <div class='cube {gradeMapper[parsed_equip[key].additional_potential_option_grade]}'>{option_parse(parsed_equip[key].additional_potential_option_1)}</div>
                                        <div class='cube {gradeMapper[parsed_equip[key].additional_potential_option_grade]}'>{option_parse(parsed_equip[key].additional_potential_option_2)}</div>
                                        <div class='cube {gradeMapper[parsed_equip[key].additional_potential_option_grade]}'>{option_parse(parsed_equip[key].additional_potential_option_3)}</div>
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
                    {#if parsed_equip[key]}
                        <div class="item" style="order: {i}">
                            <div class="item-img-wrapper" on:click={clickItem(parsed_equip[key])}>
                                <img class="item-img" src="{parsed_equip[key].item_shape_icon}">
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
<div class="item-modal" class:is-show={isModalOpen}>
    <div class="modal-content">
        <div class="modal-header">
            <span>
                {#if nvl(selectedItem.starforce) !== "0"}
                    <span class="star">★{selectedItem.starforce}</span>
                {/if}
                <span>{selectedItem.item_name}{(selectedItem.special_ring_level !== 0)?` ${selectedItem.special_ring_level}레벨`:""}</span>
            </span>
            <button class="btn-close" on:click={modalClose}>
                <Close/>
            </button>
        </div>
        <div class="modal-body">
            <div class="item-main-info">
                <div class="item-img-wrapper">
                    <img class="item-img" src="{selectedItem.item_shape_icon}">
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
                    {#each itemOptionOrder1 as option,i}
                        {#if nvl(selectedItem.item_total_option[option.key]) != 0}
                            <div>
                                <span>
                                    <span>{option.value} : <span class="highlight">{selectedItem.item_total_option[option.key]}{#if option.per}%{/if}</span></span>

                                    {#if nvl(selectedItem.item_add_option[option.key]) != 0
                                    || nvl(selectedItem.item_etc_option[option.key]) != 0
                                    || nvl(selectedItem.item_starforce_option[option.key]) != 0
                                    || nvl(selectedItem.item_exceptional_option[option.key]) != 0}
                                        <span>( </span><span class="highlight">{nvl(selectedItem?.item_base_option)[option.key]}</span>
                                        {#if nvl(selectedItem.item_add_option[option.key]) != 0}
                                            <span class="option1">+{selectedItem.item_add_option[option.key]}</span>
                                        {/if}
                                        {#if nvl(selectedItem.item_etc_option[option.key]) != 0}
                                            <span class="option2">+{selectedItem.item_etc_option[option.key]}</span>
                                        {/if}
                                        {#if nvl(selectedItem.item_starforce_option[option.key]) != 0}
                                            <span class="option3">+{selectedItem.item_starforce_option[option.key]}</span>
                                        {/if}
                                        {#if nvl(selectedItem.item_exceptional_option[option.key]) != 0}
                                            <span class="option4">+{selectedItem.item_exceptional_option[option.key]}</span>
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
                        <div class='cube {gradeMapper[selectedItem.potential_option_grade]}'>{option_parse(selectedItem.potential_option_1)}</div>
                        <div class='cube {gradeMapper[selectedItem.potential_option_grade]}'>{option_parse(selectedItem.potential_option_2)}</div>
                        <div class='cube {gradeMapper[selectedItem.potential_option_grade]}'>{option_parse(selectedItem.potential_option_3)}</div>
                    </div>
                {/if}
                {#if selectedItem.additional_potential_option_grade}
                    <div class="divider"></div>
                    <div>
                        <div class='{gradeMapper[selectedItem.additional_potential_option_grade]}'>에디셔널 잠재옵션</div>
                        <div class='cube {gradeMapper[selectedItem.additional_potential_option_grade]}'>{option_parse(selectedItem.additional_potential_option_1)}</div>
                        <div class='cube {gradeMapper[selectedItem.additional_potential_option_grade]}'>{option_parse(selectedItem.additional_potential_option_2)}</div>
                        <div class='cube {gradeMapper[selectedItem.additional_potential_option_grade]}'>{option_parse(selectedItem.additional_potential_option_3)}</div>
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
        <div class="modal-footer">
        </div>
    </div>
</div>
<div class="item-modal" class:is-show={isSettingOpen}>
    <div class="modal-content">
        <div class="modal-header">
            <span>설정</span>
            <button class="btn-close" on:click={settingClose}>
                <Close/>
            </button>
        </div>
        <div class="modal-body">
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
</div>
<script>
    import {calculate_option, input_float, input_int, nvl, option_parse} from "../js/common";
    import Close from "./icon/Close.svelte";
    import Refreash from "./icon/Refreash.svelte";
    import Setting from "./icon/Setting.svelte";
    import ItemType1 from "./icon/ItemType1.svelte";
    import ItemType2 from "./icon/ItemType2.svelte";

    export let parsed_data;
    export let parsed_stat;
    export let refresh;
    let itemType = 1;
    let itemOrderMode = 1;
    let itemOrder1 = [
        '엠블렘',
        '무기',
        '보조무기',
        '모자',
        '상의',
        '하의',
        '망토',
        '장갑',
        '신발',
        '어깨장식',
        '눈장식',
        '얼굴장식',
        '벨트',
        '귀고리',
        '펜던트2',
        '펜던트',
        '반지4',
        '반지3',
        '반지2',
        '반지1',
        '뱃지',
        '훈장',
        '포켓 아이템',
        '기계 심장'
    ];
    let itemOrder2 = [
        '반지1',
        'empty',
        '모자',
        'empty',
        '엠블렘',
        '반지2',
        '펜던트2',
        '얼굴장식',
        'empty',
        '뱃지',
        '반지3',
        '펜던트',
        '눈장식',
        '귀고리',
        '훈장',
        '반지4',
        '무기',
        '상의',
        '어깨장식',
        '보조무기',
        '포켓 아이템',
        '벨트',
        '하의',
        '장갑',
        '망토',
        'empty',
        'empty',
        '신발',
        'empty',
        '기계 심장'
    ];
    let itemOptionOrder1 = [
        {
            key: "str",
            value: "STR"
        },
        {
            key: "dex",
            value: "DEX"
        },
        {
            key: "int",
            value: "INT"
        },
        {
            key: "luk",
            value: "LUK"
        },
        {
            key: "max_hp",
            value: "MaxHP"
        },
        {
            key: "max_mp",
            value: "MaxMP"
        },
        {
            key: "attack_power",
            value: "공격력"
        },
        {
            key: "magic_power",
            value: "마력"
        },
        {
            key: "armor",
            value: "물리방어력"
        },
        {
            key: "boss_damage",
            value: "보스 몬스터공격 시 데미지",
            per: true
        },
        {
            key: "ignore_monster_armor",
            value: "몬스터 방어력 무시",
            per: true
        },
        {
            key: "damage",
            value: "데미지",
            per: true
        },
        {
            key: "all_stat",
            value: "올스탯",
            per: true
        }
    ];
    let main = "STR";
    let gradeMapper = {
        "레어": "blue",
        "에픽": "purple",
        "유니크": "yellow",
        "레전드리": "green",
    }
    let selectedItem = {};
    let isModalOpen = false;
    let isSettingOpen = false;
    let atkStatMulti = nvl(localStorage.getItem("atkStatMulti"),4);
    let atkStatMultiXenon = nvl(localStorage.getItem("atkStatMultiXenon"),7);

    let parsed_equip = null;

    $:{
        atkStatMulti = input_float(atkStatMulti,2);
        atkStatMultiXenon = input_float(atkStatMultiXenon,2);

        if(atkStatMulti != nvl(localStorage.getItem("atkStatMulti"),4)){
            localStorage.setItem("atkStatMulti",atkStatMulti);
        }
        if(atkStatMultiXenon != nvl(localStorage.getItem("atkStatMultiXenon"),7)){
            localStorage.setItem("atkStatMultiXenon",atkStatMultiXenon);
        }
    }

    $:{
        if(parsed_stat){
            let str = parsed_stat["STR"];
            let dex = parsed_stat["DEX"];
            let int = parsed_stat["INT"];
            let luk = parsed_stat["LUK"];
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
        parsed_equip = parse_equip();
    }

    function clickItem(item){
        selectedItem = item;
        modalOpen();
    }

    function modalOpen(){
        isModalOpen = true;
        let body = document.querySelector("body");
        body.style.overflow = "hidden";
    }

    function modalClose(){
        isModalOpen = false;
        let body = document.querySelector("body");
        body.style.overflow = "auto";
    }

    function changeDisplayMode(){
        itemOrderMode ^= 1;
    }

    function settingOpen(){
        isSettingOpen = true;
        let body = document.querySelector("body");
        body.style.overflow = "hidden";
    }

    function settingClose(){
        isSettingOpen = false;
        let body = document.querySelector("body");
        body.style.overflow = "auto";
    }

    function parse_equip(){
        let result = {};
        let equip = nvl(parsed_data['item-equipment']?.item_equipment,[]);

        for(let i = 0; i < equip.length; i++){
            result[equip[i].item_equipment_slot] = equip[i];
        }

        return result;
    }
</script>