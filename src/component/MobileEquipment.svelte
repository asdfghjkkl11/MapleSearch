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
    import {inputFloat, nvl} from "../js/common";

    export let parsedData;

    let itemOrder1 = [
        ["Weapon 무기","무기"],
        ["SubWeapon 보조무기","보조무기"],
        ["Cap 모자","모자"],
        ["Gloves 장갑","장갑"],
        ["LongCoat 한벌옷","한벌옷"],
        ["Clothes 상의","상의"],
        ["Pants 하의","하의"],
        ["Shoulder 어깨","어깨"],
        ["Shoes 신발","신발"],
        ["Belt 벨트","벨트"],
        ["Cape 망토","망토"],
        ["Pendant 목걸이","목걸이"],
        ["Pendant 목걸이","목걸이 (2번째 슬롯)"],
        ["Ring 반지","반지"],
        ["Ring 반지","반지 (2번째 슬롯)"],
        ["Ring 반지","반지 (3번째 슬롯)"],
        ["Ring 반지","반지 (4번째 슬롯)"],
        ["EarAcc 귀고리","귀고리"],
        ["EyeAcc 눈장식","눈장식"],
        ["Forehead 얼굴장식","얼굴장식"],
        ["Pocket 포켓","포켓"],
        ["Title 칭호","칭호"],
        ["Medal 훈장","훈장"],
        ["Badge 뱃지","뱃지"]
    ]

    let itemOrder2 = [
        ["ArcaneSymbol 아케인심볼","아케인심볼"],
        ["ArcaneSymbol 아케인심볼","아케인심볼 (2번째 슬롯)"],
        ["ArcaneSymbol 아케인심볼","아케인심볼 (3번째 슬롯)"],
        ["ArcaneSymbol 아케인심볼","아케인심볼 (4번째 슬롯)"],
        ["ArcaneSymbol 아케인심볼","아케인심볼 (5번째 슬롯)"],
        ["ArcaneSymbol 아케인심볼","아케인심볼 (6번째 슬롯)"]
    ]

    let itemOrder3 = [
        ["Weapon_Cash 무기","무기"],
        ["SubWeapon_Cash 보조무기","보조무기"],
        ["Cap_Cash 모자","모자"],
        ["Gloves_Cash 장갑","장갑"],
        ["LongCoat_Cash 한벌옷","한벌옷"],
        ["Clothes_Cash 상의","상의"],
        ["Pants_Cash 하의","하의"],
        ["Shoulder_Cash 어깨","어깨"],
        ["Shoes_Cash 신발","신발"],
        ["Belt_Cash 벨트","벨트"],
        ["Cape_Cash 망토","망토"],
        ["Ring_Cash 반지","반지"],
        ["Ring_Cash 반지","반지 (2번째 슬롯)"],
        ["Ring_Cash 반지","반지 (3번째 슬롯)"],
        ["Ring_Cash 반지","반지 (4번째 슬롯)"],
        ["EarAcc_Cash 귀고리","귀고리"],
        ["EyeAcc_Cash 눈장식","눈장식"],
        ["Forehead_Cash 얼굴장식","얼굴장식"],
        ["Chair 의자","의자"],
        ["Vehicle 탈것","탈것"],
        ["Effect 이펙트","이펙트"]
    ]

    let itemOrder4 = [
        ["Android 안드로이드","안드로이드"],
        ["Heart 하트","하트"],
        ["Cap_Cash 모자","모자 (안드로이드 슬롯)"],
        ["Gloves_Cash 장갑","장갑 (안드로이드 슬롯)"],
        ["LongCoat_Cash 한벌옷","한벌옷 (안드로이드 슬롯)"],
        ["Clothes_Cash 상의","상의 (안드로이드 슬롯)"],
        ["Pants_Cash 하의","하의 (안드로이드 슬롯)"],
        ["Shoulder_Cash 어깨","어깨 (안드로이드 슬롯)"],
        ["Shoes_Cash 신발","신발 (안드로이드 슬롯)"],
        ["Belt_Cash 벨트","벨트 (안드로이드 슬롯)"],
        ["Cape_Cash 망토","망토 (안드로이드 슬롯)"]
    ];

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