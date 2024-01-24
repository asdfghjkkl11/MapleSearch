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
            {#each itemOrder1 as key, i}
                {#if parsedEquip[key]}
                    <div class="item" style="order: {itemOrder1[i]}">
                        <div class="item-name">
                            <span>
                                <span>{parsedEquip[key].item_name}</span>
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
        "EyeAcc_Cash 눈장식",
        "SubWeapon 보조무기",
        "Cap 모자",
        "Weapon_Cash 무기",
        "LongCoat 한벌옷",
        "Ring 반지",
        "Forehead 얼굴장식",
        "Gloves 장갑",
        "Shoes 신발",
        "Belt 벨트",
        "Cape 망토",
        "Shoulder 어깨",
        "Chair 의자",
        "Weapon 무기",
        "Ring_Cash 반지",
        "EyeAcc 눈장식",
        "Vehicle 탈것",
        "EarAcc 귀고리",
        "Pendant 목걸이",
        "Title 칭호",
        "Medal 훈장",
        "Cap_Cash 모자",
        "Shoes_Cash 신발",
        "LongCoat_Cash 한벌옷",
        "Gloves_Cash 장갑",
        "Cape_Cash 망토",
        "Forehead_Cash 얼굴장식"
    ];

    let parsedEquip = null;

    $:{
        parsedEquip = parseEquip();
    }

    function parseEquip(){
        let result = {};
        let equip = nvl(parsedData['item-equipment']?.item_equipment,[]);

        for(let i = 0; i < equip.length; i++){
            result[equip[i].item_equipment_page_name] = equip[i];
        }

        return result;
    }
</script>