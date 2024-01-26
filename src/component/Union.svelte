<style>
    .unions{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .union{
        min-width: 360px;
        min-height: 40px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        white-space: pre-line;
        text-align: center;
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
    .title{
        padding: 8px;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
    }
    .union-block{
        position: relative;
        display: flex;
        justify-content: center;
    }
    .block{
        border: none;
        border-collapse: collapse;
    }
    .block td{
        width: 16px;
        height: 16px;
        padding: 0;
        border: 1px solid var(--border);
        box-sizing: border-box;
    }
    .block td.active{
        background: var(--union-background);
    }
    .block-border{
        position: absolute;
        z-index: 1;
        stroke: var(--highlight);
        fill: none;
    }
    .block-span{
        min-width: 56px;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        font-weight: 500;
    }
    @media (max-width: 1630px) {
        .union {
            width: 360px;
            justify-content: center;
        }
    }
    @media (max-width: 720px) {
        .unions{
            grid-auto-flow: row;
            grid-template-columns: 1fr;
        }
    }
</style>
{#if parsedData.basic}
    <div class="flex">
        <span class="highlight title">{grade} (<span class="{unionCssList[index]}">{level}</span>)</span>
        <div class="union-block">
            <div class="block-border">
                <UnionBorder/>
                {#each blockList as span,i}
                    <span class="block-span highlight" style="top: {span.top}px; left: {span.left}px;">{span.name}</span>
                {/each}
            </div>
            <table class="block" style="width: {x * tileSize}px; height: {y * tileSize}px;">
                {#each Array(y) as Y, i}
                    <tr>
                        {#each  Array(x) as X, j}
                            <td class:active={tileSet.has(`${j}_${y-i}`)}></td>
                        {/each}
                    </tr>
                {/each}
            </table>
        </div>
        <span class="highlight title">공격대 점령 효과</span>
        <div class="unions">
            {#each unionOccupiedStat as stat, i}
                <div class="union">
                    {stat}
                </div>
            {/each}
        </div>
        <span class="highlight title">공격대원 효과</span>
        <div class="unions">
            {#each raiderList as stat, i}
                <div class="union">
                    {stat}
                </div>
            {/each}
        </div>
        <span class="highlight title">아티펙트 효과</span>
        <div class="unions">
            {#each unionArtifact as artifact, i}
                <div class="union">
                    <span>{artifact.name.replace(",","\n")}</span>
                </div>
            {/each}
        </div>
    </div>
{/if}
<script>
    import {nvl} from "../js/common";
    import UnionBorder from "./icon/UnionBorder.svelte";
    import {unionBlockList, unionCssList, unionGradeList, unionOrderMapper} from "../js/mapper";

    export let parsedData;
    let blockList = unionBlockList;
    let unionOccupiedStat = nvl(parsedData["union-raider"].union_occupied_stat,[]).sort(sortCallback);
    let unionRaiderStat = nvl(parsedData["union-raider"].union_raider_stat,[]).sort();
    let unionBlock = nvl(parsedData["union-raider"].union_block,[]);
    let unionInnerStat =  nvl(parsedData["union-raider"].union_inner_stat,[]);
    let unionArtifact =  nvl(parsedData["union-artifact"].union_artifact_effect,[]);
    let grade = parsedData.union.union_grade;
    let level = parsedData.union.union_level;
    let index = 0;
    let raiderList;
    let keyList = ["STR","DEX","INT","LUK","크리티컬 확률"];
    let valueList;
    let x = 22;
    let y = 20;
    let tileSize = 16;
    let tileSet = new Set();

    $:{
        valueList = [0,0,0,0,0];
        raiderList = [];
        tileSet.clear();

        for(let i = 0; i < unionBlock.length; i++){
            for(let j = 0; j < unionBlock[i].block_position.length; j++) {
                let position = unionBlock[i].block_position[j];
                let set = `${position.x + 11}_${position.y + 10}`;
                tileSet.add(set);
            }
        }

        for(let i = 0; i < unionGradeList.length; i++){
            if(grade.includes(unionGradeList[i])){
                index = i;
            }
        }

        for(let i = 0; i < unionRaiderStat.length; i++){
            let flag = true;

            for(let j = 0; j < keyList.length; j++){
                let key = keyList[j];
                if(unionRaiderStat[i].includes(key)){
                    let list = unionRaiderStat[i].split(" ");
                    list.pop();
                    let value = list.pop();
                    value = value.replace("%","")
                    valueList[j] += Number(value);
                    flag = false;
                }
            }

            if(flag){
                raiderList.push(unionRaiderStat[i]);
            }
        }

        for(let i = 0; i < keyList.length; i++) {
            let key = keyList[i];
            let value = valueList[i];
            raiderList.push(`${key} ${value}${(key==="크리티컬 확률")?"%":""} 증가`);
        }

        for(let i = 0; i < unionInnerStat.length; i++) {
            blockList[i].name = unionInnerStat[i].stat_field_effect.replace("유니온 ","");
        }

        raiderList = raiderList.sort(sortCallback);
    }

    function sortCallback(a,b){
        let a1 = a.split(" ");
        let b1 = b.split(" ");
        a1.pop();
        a1.pop();
        b1.pop();
        b1.pop();
        let a2 = a1.join(" ");
        let b2 = b1.join(" ");
        return unionOrderMapper[a2] - unionOrderMapper[b2];
    }
</script>